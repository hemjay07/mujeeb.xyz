'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Project } from '@/data/projects';
import { AnimationConfig } from '@/components/Debug/AnimationControls';

// Case study position (flat, centered)
const CASE_STUDY = {
  posX: 0.8,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  bend: 0,
};

interface UseThreeGalleryProps {
  projects: Project[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onIndexChange: (index: number) => void;
  onCaseStudyOpen: () => void;
  isCaseStudyOpen: boolean;
  config: AnimationConfig;
}

export interface GalleryControls {
  openCaseStudy: () => void;
  closeCaseStudy: () => void;
  goToProject: (index: number) => void;
  replayEntry: () => void;
}

// Easing functions
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const smoothEase = (t: number, s: number) => (easeOutQuint(t) + (1 - Math.pow(1 - t, s))) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Create bent plane geometry (parabolic bend - center forward, edges back)
function createBentPlane(width: number, height: number, bend: number): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(width, height, 64, 48);
  if (bend > 0.001) {
    const pos = geo.attributes.position;
    const halfW = width / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Parabolic bend: center bulges forward, edges stay back
      pos.setZ(i, bend * (1 - (x / halfW) * (x / halfW)));
    }
    geo.computeVertexNormals();
  }
  return geo;
}

function createCardTexture(index: number, project: Project, isActive: boolean): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 700;
  const ctx = canvas.getContext('2d')!;

  // Background - lighter for active, darker for inactive
  if (isActive) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a24');
    gradient.addColorStop(1, '#12121a');
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = '#0a0a10';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle grid pattern
  ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.015)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 35) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 35) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Large number
  const projectNumber = String(index + 1).padStart(2, '0');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = isActive ? 0.12 : 0.06;
  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 320px monospace';
  ctx.fillText(projectNumber, canvas.width / 2, canvas.height / 2 - 20);

  // Project title
  ctx.globalAlpha = isActive ? 0.9 : 0.5;
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 38px system-ui';
  ctx.fillText(project.title, canvas.width / 2, canvas.height - 85);

  // Category
  ctx.globalAlpha = isActive ? 0.6 : 0.3;
  ctx.fillStyle = '#22d3ee';
  ctx.font = '400 16px monospace';
  ctx.fillText(project.category.toLowerCase().replace(' / ', '_'), canvas.width / 2, canvas.height - 45);

  // Border
  ctx.globalAlpha = isActive ? 0.25 : 0.1;
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

  return canvas;
}

export function useThreeGallery({
  projects,
  containerRef,
  onIndexChange,
  onCaseStudyOpen,
  isCaseStudyOpen,
  config,
}: UseThreeGalleryProps): GalleryControls {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const stripGroupRef = useRef<THREE.Group | null>(null);
  const cardsRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Config ref - update synchronously
  const configRef = useRef(config);
  configRef.current = config;

  // Animation state
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const currentIndexRef = useRef(0);
  const animStartTimeRef = useRef<number | null>(null);
  const entryCompleteRef = useRef(false);
  const currentBendRef = useRef(0);

  // Transition state
  const transitionProgressRef = useRef(0);
  const isAnimatingToCaseRef = useRef(false);
  const isAnimatingToGalleryRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const isCaseStudyOpenRef = useRef(false);

  useEffect(() => {
    isCaseStudyOpenRef.current = isCaseStudyOpen;
  }, [isCaseStudyOpen]);

  const replayEntry = useCallback(() => {
    const cfg = configRef.current;
    const stripGroup = stripGroupRef.current;
    if (!stripGroup) return;

    animStartTimeRef.current = performance.now();
    entryCompleteRef.current = false;
    currentBendRef.current = 0;
    stripGroup.position.y = cfg.stripScroll;
    stripGroup.position.z = cfg.entryZ;
    stripGroup.rotation.x = cfg.entryTilt;
  }, []);

  const openCaseStudy = useCallback(() => {
    if (isTransitioningRef.current || isCaseStudyOpenRef.current || !entryCompleteRef.current) return;

    isTransitioningRef.current = true;
    isAnimatingToCaseRef.current = true;
    transitionProgressRef.current = 0;

    onCaseStudyOpen();
  }, [onCaseStudyOpen]);

  const closeCaseStudy = useCallback(() => {
    if (isTransitioningRef.current || !isCaseStudyOpenRef.current) return;

    isTransitioningRef.current = true;
    isAnimatingToGalleryRef.current = true;
    transitionProgressRef.current = 0;
  }, []);

  const goToProject = useCallback((index: number) => {
    const cfg = configRef.current;
    if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;
    targetScrollYRef.current = index * cfg.spacing;
  }, []);

  // Initialize Three.js
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cfg = configRef.current;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - positioned to the side, looking at offset point
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(1.5, 0, 6);
    camera.lookAt(0.8, 0, 0);
    cameraRef.current = camera;

    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Strip group (for entry animation only)
    const stripGroup = new THREE.Group();
    scene.add(stripGroup);
    stripGroupRef.current = stripGroup;

    // Create cards
    const cards: THREE.Mesh[] = [];

    for (let i = 0; i < projects.length; i++) {
      // Start with no bend (will animate in)
      const geo = createBentPlane(cfg.cardWidth, cfg.cardHeight, 0);

      // Create texture
      const canvas = createCardTexture(i, projects[i], i === 0);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0, // Start invisible for entry animation
      });

      const mesh = new THREE.Mesh(geo, material);

      // Individual card position and rotation (the key to the look!)
      mesh.position.set(cfg.galleryPosX, -i * cfg.spacing, 0);
      mesh.rotation.set(cfg.galleryRotX, cfg.galleryRotY, cfg.galleryRotZ);
      mesh.userData = { origY: -i * cfg.spacing, index: i };

      stripGroup.add(mesh);
      cards.push(mesh);
    }

    cardsRef.current = cards;

    // Start entry animation
    animStartTimeRef.current = performance.now();
    entryCompleteRef.current = false;
    currentBendRef.current = 0;
    stripGroup.position.y = cfg.stripScroll;
    stripGroup.position.z = cfg.entryZ;
    stripGroup.rotation.x = cfg.entryTilt;

    // Event handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleWheel = (e: WheelEvent) => {
      const cfg = configRef.current;
      if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;
      targetScrollYRef.current += e.deltaY * 0.0025;
      targetScrollYRef.current = Math.max(0, Math.min(targetScrollYRef.current, (projects.length - 1) * cfg.spacing));
    };

    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const cfg = configRef.current;
      if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;
      targetScrollYRef.current += (touchY - e.touches[0].clientY) * 0.005;
      targetScrollYRef.current = Math.max(0, Math.min(targetScrollYRef.current, (projects.length - 1) * cfg.spacing));
      touchY = e.touches[0].clientY;
    };

    const handleClick = (event: MouseEvent) => {
      const cfg = configRef.current;
      if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;

      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(cardsRef.current);

      if (intersects.length > 0) {
        const cardIndex = intersects[0].object.userData.index;
        if (cardIndex === currentIndexRef.current) {
          openCaseStudy();
        } else {
          targetScrollYRef.current = cardIndex * cfg.spacing;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        replayEntry();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    renderer.domElement.addEventListener('click', handleClick);

    // Helper to update card geometry with new bend
    const updateCardGeometry = (card: THREE.Mesh, bend: number) => {
      const cfg = configRef.current;
      const oldGeo = card.geometry;
      card.geometry = createBentPlane(cfg.cardWidth, cfg.cardHeight, bend);
      oldGeo.dispose();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const cfg = configRef.current;
      const entryElapsed = (performance.now() - (animStartTimeRef.current || 0)) / 1000;
      const stripGroup = stripGroupRef.current!;

      const GALLERY = {
        posX: cfg.galleryPosX,
        rotX: cfg.galleryRotX,
        rotY: cfg.galleryRotY,
        rotZ: cfg.galleryRotZ,
        bend: cfg.galleryBend,
      };

      // Entry animation
      if (!entryCompleteRef.current) {
        const rawP = Math.min(1, entryElapsed / cfg.entryDuration);
        const p = smoothEase(rawP, cfg.smoothness);

        // Group moves down and forward
        stripGroup.position.y = cfg.stripScroll * (1 - p);
        stripGroup.position.z = cfg.entryZ * (1 - p);
        stripGroup.rotation.x = cfg.entryTilt * (1 - p);

        // Fade in cards with stagger
        cardsRef.current.forEach((card, i) => {
          const staggeredP = Math.max(0, Math.min(1, (p * 1.8) - (i * 0.08)));
          (card.material as THREE.MeshBasicMaterial).opacity = staggeredP;
        });

        // Animate bend (starts after 30% of animation)
        const bendP = Math.max(0, (rawP - 0.3) / 0.7);
        const targetBend = GALLERY.bend * easeOutQuint(bendP);
        if (Math.abs(targetBend - currentBendRef.current) > 0.005) {
          currentBendRef.current += (targetBend - currentBendRef.current) * 0.15;
          cardsRef.current.forEach(card => updateCardGeometry(card, currentBendRef.current));
        }

        if (rawP >= 1) {
          entryCompleteRef.current = true;
          stripGroup.position.set(0, 0, 0);
          stripGroup.rotation.x = 0;
          currentBendRef.current = GALLERY.bend;
          cardsRef.current.forEach(card => {
            updateCardGeometry(card, currentBendRef.current);
            (card.material as THREE.MeshBasicMaterial).opacity = 1;
          });
        }
      }

      // Case study transition - animate the active card
      if (isAnimatingToCaseRef.current) {
        const activeCard = cardsRef.current[currentIndexRef.current];
        transitionProgressRef.current += 0.025;
        const t = easeInOutCubic(Math.min(1, transitionProgressRef.current));

        // Interpolate card position, rotation, and bend
        activeCard.position.x = lerp(GALLERY.posX, CASE_STUDY.posX, t);
        activeCard.rotation.x = lerp(GALLERY.rotX, CASE_STUDY.rotX, t);
        activeCard.rotation.y = lerp(GALLERY.rotY, CASE_STUDY.rotY, t);
        activeCard.rotation.z = lerp(GALLERY.rotZ, CASE_STUDY.rotZ, t);
        updateCardGeometry(activeCard, lerp(GALLERY.bend, CASE_STUDY.bend, t));

        // Hide other cards
        cardsRef.current.forEach((card, i) => {
          if (i !== currentIndexRef.current) {
            card.visible = t < 0.3;
          }
        });

        if (transitionProgressRef.current >= 1) {
          isAnimatingToCaseRef.current = false;
          isCaseStudyOpenRef.current = true;
          isTransitioningRef.current = false;
        }
      }

      // Back to gallery transition
      if (isAnimatingToGalleryRef.current) {
        const activeCard = cardsRef.current[currentIndexRef.current];
        transitionProgressRef.current += 0.025;
        const t = easeInOutCubic(Math.min(1, transitionProgressRef.current));

        // Interpolate back to gallery position
        activeCard.position.x = lerp(CASE_STUDY.posX, GALLERY.posX, t);
        activeCard.rotation.x = lerp(CASE_STUDY.rotX, GALLERY.rotX, t);
        activeCard.rotation.y = lerp(CASE_STUDY.rotY, GALLERY.rotY, t);
        activeCard.rotation.z = lerp(CASE_STUDY.rotZ, GALLERY.rotZ, t);
        updateCardGeometry(activeCard, lerp(CASE_STUDY.bend, GALLERY.bend, t));

        // Show other cards
        cardsRef.current.forEach((card, i) => {
          if (i !== currentIndexRef.current) {
            card.visible = t > 0.7;
          }
        });

        if (transitionProgressRef.current >= 1) {
          isAnimatingToGalleryRef.current = false;
          isCaseStudyOpenRef.current = false;
          isTransitioningRef.current = false;
        }
      }

      // Normal scroll (only in gallery mode)
      if (entryCompleteRef.current && !isCaseStudyOpenRef.current && !isTransitioningRef.current) {
        scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.08;

        cardsRef.current.forEach((card, i) => {
          // Position based on scroll
          card.position.y = card.userData.origY + scrollYRef.current;

          // Scale and Z based on distance from center
          const d = Math.abs(card.position.y);
          const scaleFactor = THREE.MathUtils.lerp(1, 0.82, Math.min(d / 4.5, 1));
          card.scale.setScalar(scaleFactor);
          card.position.z = -d * 0.12;

          // Maintain individual rotation
          card.position.x = GALLERY.posX;
          card.rotation.set(GALLERY.rotX, GALLERY.rotY, GALLERY.rotZ);
        });

        // Update current index and textures
        const newIdx = Math.round(scrollYRef.current / cfg.spacing);
        if (newIdx !== currentIndexRef.current && newIdx >= 0 && newIdx < projects.length) {
          currentIndexRef.current = newIdx;
          onIndexChange(newIdx);

          // Update card textures (active vs inactive)
          cardsRef.current.forEach((card, i) => {
            const mat = card.material as THREE.MeshBasicMaterial;
            const canvas = createCardTexture(i, projects[i], i === newIdx);
            mat.map?.dispose();
            mat.map = new THREE.CanvasTexture(canvas);
            mat.map.minFilter = THREE.LinearFilter;
          });
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      renderer.domElement.removeEventListener('click', handleClick);

      cardsRef.current.forEach(card => {
        card.geometry.dispose();
        (card.material as THREE.MeshBasicMaterial).map?.dispose();
        (card.material as THREE.MeshBasicMaterial).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [projects, containerRef, onIndexChange, openCaseStudy, replayEntry]);

  return {
    openCaseStudy,
    closeCaseStudy,
    goToProject,
    replayEntry,
  };
}
