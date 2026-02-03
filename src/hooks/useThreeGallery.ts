'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Project } from '@/data/projects';
import { AnimationConfig } from '@/components/Debug/AnimationControls';

// Case study position (directly on camera focal axis for no distortion)
const CASE_STUDY = {
  posX: 0.8,  // Camera looks at x=0.8
  posY: 0.2,  // Slightly above center
  posZ: 0,
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  bend: 0,
  scale: 1,
};

interface UseThreeGalleryProps {
  projects: Project[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  onIndexChange: (index: number) => void;
  onCaseStudyOpen: () => void;
  isCaseStudyOpen: boolean;
  config: AnimationConfig;
  startAnimation?: boolean;
}

export interface GalleryControls {
  openCaseStudy: () => void;
  closeCaseStudy: () => void;
  goToProject: (index: number) => void;
  goToProjectInCaseStudy: (index: number) => void;
  replayEntry: () => void;
}

// Easing functions
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const smoothEase = (t: number, s: number) => (easeOutQuint(t) + (1 - Math.pow(1 - t, s))) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Scroll physics constants
const SCROLL_FRICTION = 0.92; // Deceleration factor (lower = more friction)
const SCROLL_SENSITIVITY = 0.0015; // Wheel sensitivity (slower)
const TOUCH_SENSITIVITY = 0.003; // Touch drag sensitivity (slower)
const SNAP_STRENGTH = 0.08; // How strongly it snaps to cards
const MIN_VELOCITY = 0.0001; // Threshold to stop scrolling

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

// Create a placeholder texture while the real image loads
function createPlaceholderTexture(index: number, project: Project): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 700;
  const ctx = canvas.getContext('2d')!;

  // Dark background
  ctx.fillStyle = '#0a0a10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Loading indicator
  const projectNumber = String(index + 1).padStart(2, '0');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 320px monospace';
  ctx.fillText(projectNumber, canvas.width / 2, canvas.height / 2 - 20);

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 38px system-ui';
  ctx.fillText(project.title, canvas.width / 2, canvas.height - 85);

  return canvas;
}

// Load project screenshot and update card texture
function loadCardTexture(
  project: Project,
  material: THREE.MeshBasicMaterial,
  textureLoader: THREE.TextureLoader
): void {
  // Use first screenshot (dark version for gallery card)
  const imagePath = project.screenshots[0];
  if (!imagePath) return;

  textureLoader.load(
    imagePath,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      material.map?.dispose();
      material.map = texture;
      material.needsUpdate = true;
    },
    undefined,
    (error) => {
      console.warn(`Failed to load texture for ${project.title}:`, error);
    }
  );
}

export function useThreeGallery({
  projects,
  containerRef,
  onIndexChange,
  onCaseStudyOpen,
  isCaseStudyOpen,
  config,
  startAnimation = true,
}: UseThreeGalleryProps): GalleryControls {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const stripGroupRef = useRef<THREE.Group | null>(null);
  const cardsRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);

  // Config ref - update synchronously
  const configRef = useRef(config);
  configRef.current = config;

  // Callback refs - always current without triggering re-init
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;

  // Animation state
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const currentIndexRef = useRef(0);
  const animStartTimeRef = useRef<number | null>(null);
  const entryCompleteRef = useRef(false);
  const currentBendRef = useRef(0);

  // Scroll physics state
  const scrollVelocityRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Transition state
  const transitionProgressRef = useRef(0);
  const isAnimatingToCaseRef = useRef(false);
  const isAnimatingToGalleryRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const isCaseStudyOpenRef = useRef(false);

  // Store starting position for smooth transition
  const transitionStartPos = useRef({ x: 0, y: 0, z: 0, scale: 1 });

  // Track startAnimation prop
  const startAnimationRef = useRef(startAnimation);
  const animationTriggeredRef = useRef(false);

  useEffect(() => {
    isCaseStudyOpenRef.current = isCaseStudyOpen;
  }, [isCaseStudyOpen]);

  // Watch for startAnimation to become true and trigger entry animation
  useEffect(() => {
    startAnimationRef.current = startAnimation;
    if (startAnimation && !animationTriggeredRef.current && stripGroupRef.current) {
      animationTriggeredRef.current = true;
      animStartTimeRef.current = performance.now();
    }
  }, [startAnimation]);

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

    // Capture starting position of the active card
    const activeCard = cardsRef.current[currentIndexRef.current];
    if (activeCard) {
      transitionStartPos.current = {
        x: activeCard.position.x,
        y: activeCard.position.y,
        z: activeCard.position.z,
        scale: activeCard.scale.x,
      };
    }

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

  // Navigate to a project while case study is open (swaps visible card)
  const goToProjectInCaseStudy = useCallback((index: number) => {
    if (!isCaseStudyOpenRef.current || index < 0 || index >= projects.length) return;

    const cfg = configRef.current;
    const oldIndex = currentIndexRef.current;
    const oldCard = cardsRef.current[oldIndex];
    const newCard = cardsRef.current[index];

    if (!oldCard || !newCard) return;

    // Update scroll position first (needed for old card positioning)
    currentIndexRef.current = index;
    targetScrollYRef.current = index * cfg.spacing;
    scrollYRef.current = index * cfg.spacing;

    // Move old card back to its gallery position (so it's correct when shown again)
    const oldCardGalleryY = oldCard.userData.origY + scrollYRef.current;
    const oldCardDistance = Math.abs(oldCardGalleryY);
    const oldCardScale = THREE.MathUtils.lerp(1, 0.82, Math.min(oldCardDistance / 4.5, 1));
    const oldCardZ = -oldCardDistance * 0.12;

    oldCard.position.set(cfg.galleryPosX, oldCardGalleryY, oldCardZ);
    oldCard.rotation.set(cfg.galleryRotX, cfg.galleryRotY, cfg.galleryRotZ);
    oldCard.scale.setScalar(oldCardScale);

    // Update old card geometry back to gallery bend
    const oldGeoOld = oldCard.geometry;
    oldCard.geometry = createBentPlane(cfg.cardWidth, cfg.cardHeight, cfg.galleryBend);
    oldGeoOld.dispose();

    // Hide the old card
    oldCard.visible = false;

    // Show the new card and position it in case study position
    newCard.visible = true;
    newCard.position.set(CASE_STUDY.posX, CASE_STUDY.posY, CASE_STUDY.posZ);
    newCard.rotation.set(CASE_STUDY.rotX, CASE_STUDY.rotY, CASE_STUDY.rotZ);
    newCard.scale.setScalar(CASE_STUDY.scale);

    // Update new card geometry to flat (no bend)
    const oldGeoNew = newCard.geometry;
    newCard.geometry = createBentPlane(cfg.cardWidth, cfg.cardHeight, 0);
    oldGeoNew.dispose();

    // Notify React of the index change
    onIndexChangeRef.current(index);
  }, [projects]);

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
    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    for (let i = 0; i < projects.length; i++) {
      // Start with no bend (will animate in)
      const geo = createBentPlane(cfg.cardWidth, cfg.cardHeight, 0);

      // Create placeholder texture while real image loads
      const placeholderCanvas = createPlaceholderTexture(i, projects[i]);
      const placeholderTexture = new THREE.CanvasTexture(placeholderCanvas);
      placeholderTexture.minFilter = THREE.LinearFilter;
      placeholderTexture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({
        map: placeholderTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0, // Start invisible for entry animation
      });

      // Load actual project screenshot (dark version for gallery)
      loadCardTexture(projects[i], material, textureLoader);

      const mesh = new THREE.Mesh(geo, material);

      // Individual card position and rotation (the key to the look!)
      mesh.position.set(cfg.galleryPosX, -i * cfg.spacing, 0);
      mesh.rotation.set(cfg.galleryRotX, cfg.galleryRotY, cfg.galleryRotZ);
      mesh.userData = { origY: -i * cfg.spacing, index: i };

      stripGroup.add(mesh);
      cards.push(mesh);
    }

    cardsRef.current = cards;

    // Set up entry animation starting state
    stripGroup.position.y = cfg.stripScroll;
    stripGroup.position.z = cfg.entryZ;
    stripGroup.rotation.x = cfg.entryTilt;
    entryCompleteRef.current = false;
    currentBendRef.current = 0;
    animStartTimeRef.current = null; // Not started yet
    animationTriggeredRef.current = false; // Reset for fresh mount

    // Keep cards invisible until animation starts
    cards.forEach(card => {
      (card.material as THREE.MeshBasicMaterial).opacity = 0;
    });

    // Only start animation if startAnimation is already true (returning visitor)
    // Otherwise, the useEffect watching startAnimation will trigger it later
    if (startAnimationRef.current) {
      // Delay before animation begins (400ms)
      setTimeout(() => {
        if (!animationTriggeredRef.current) {
          animationTriggeredRef.current = true;
          animStartTimeRef.current = performance.now();
        }
      }, 400);
    }

    // Event handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleWheel = (e: WheelEvent) => {
      const cfg = configRef.current;
      if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;

      // Normalize wheel delta (trackpad vs mouse wheel)
      const delta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY;

      // Add to velocity instead of directly to position
      scrollVelocityRef.current += delta * SCROLL_SENSITIVITY;
      isScrollingRef.current = true;
      lastScrollTimeRef.current = performance.now();

      // Clear existing timeout and set new one for scroll end
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    let touchY = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;
    let touchVelocity = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      lastTouchY = touchY;
      lastTouchTime = performance.now();
      touchVelocity = 0;
      isScrollingRef.current = true;
      scrollVelocityRef.current = 0; // Stop any existing momentum
    };

    const handleTouchMove = (e: TouchEvent) => {
      const cfg = configRef.current;
      if (!entryCompleteRef.current || isCaseStudyOpenRef.current || isTransitioningRef.current) return;

      const currentY = e.touches[0].clientY;
      const currentTime = performance.now();
      const deltaY = lastTouchY - currentY;
      const deltaTime = currentTime - lastTouchTime;

      // Calculate instantaneous velocity
      if (deltaTime > 0) {
        touchVelocity = deltaY / deltaTime * 16; // Normalize to ~60fps
      }

      // Apply scroll directly during drag
      targetScrollYRef.current += deltaY * TOUCH_SENSITIVITY;
      targetScrollYRef.current = Math.max(0, Math.min(targetScrollYRef.current, (projects.length - 1) * cfg.spacing));

      lastTouchY = currentY;
      lastTouchTime = currentTime;
      touchY = currentY;
    };

    const handleTouchEnd = () => {
      // Transfer touch velocity to scroll velocity for momentum
      scrollVelocityRef.current = touchVelocity * TOUCH_SENSITIVITY * 0.5;
      isScrollingRef.current = false;
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
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
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
      const stripGroup = stripGroupRef.current!;

      const GALLERY = {
        posX: cfg.galleryPosX,
        rotX: cfg.galleryRotX,
        rotY: cfg.galleryRotY,
        rotZ: cfg.galleryRotZ,
        bend: cfg.galleryBend,
      };

      // Entry animation - only run if animation has started (after delay)
      if (!entryCompleteRef.current && animStartTimeRef.current !== null) {
        const entryElapsedTime = (performance.now() - animStartTimeRef.current) / 1000;
        const rawP = Math.min(1, entryElapsedTime / cfg.entryDuration);
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
        transitionProgressRef.current += 0.035;
        const t = easeInOutCubic(Math.min(1, transitionProgressRef.current));
        const start = transitionStartPos.current;

        // Interpolate card position (from current pos to center)
        activeCard.position.x = lerp(start.x, CASE_STUDY.posX, t);
        activeCard.position.y = lerp(start.y, CASE_STUDY.posY, t);
        activeCard.position.z = lerp(start.z, CASE_STUDY.posZ, t);

        // Interpolate rotation (to flat)
        activeCard.rotation.x = lerp(GALLERY.rotX, CASE_STUDY.rotX, t);
        activeCard.rotation.y = lerp(GALLERY.rotY, CASE_STUDY.rotY, t);
        activeCard.rotation.z = lerp(GALLERY.rotZ, CASE_STUDY.rotZ, t);

        // Interpolate scale and bend
        activeCard.scale.setScalar(lerp(start.scale, CASE_STUDY.scale, t));
        updateCardGeometry(activeCard, lerp(GALLERY.bend, CASE_STUDY.bend, t));

        // Hide other cards
        cardsRef.current.forEach((card, i) => {
          if (i !== currentIndexRef.current) {
            card.visible = t < 0.3;
          }
        });

        if (transitionProgressRef.current >= 1) {
          // Ensure final flat state
          activeCard.position.set(CASE_STUDY.posX, CASE_STUDY.posY, CASE_STUDY.posZ);
          activeCard.rotation.set(0, 0, 0);
          activeCard.scale.setScalar(1);
          updateCardGeometry(activeCard, 0); // Completely flat

          isAnimatingToCaseRef.current = false;
          isCaseStudyOpenRef.current = true;
          isTransitioningRef.current = false;
        }
      }

      // Back to gallery transition (faster than opening)
      if (isAnimatingToGalleryRef.current) {
        const activeCard = cardsRef.current[currentIndexRef.current];
        transitionProgressRef.current += 0.05;
        const t = easeInOutCubic(Math.min(1, transitionProgressRef.current));

        // Calculate target gallery position for this card
        const targetY = activeCard.userData.origY + scrollYRef.current;
        const d = Math.abs(targetY);
        const targetScale = THREE.MathUtils.lerp(1, 0.82, Math.min(d / 4.5, 1));
        const targetZ = -d * 0.12;

        // Interpolate back to gallery position
        activeCard.position.x = lerp(CASE_STUDY.posX, GALLERY.posX, t);
        activeCard.position.y = lerp(CASE_STUDY.posY, targetY, t);
        activeCard.position.z = lerp(CASE_STUDY.posZ, targetZ, t);

        // Interpolate rotation
        activeCard.rotation.x = lerp(CASE_STUDY.rotX, GALLERY.rotX, t);
        activeCard.rotation.y = lerp(CASE_STUDY.rotY, GALLERY.rotY, t);
        activeCard.rotation.z = lerp(CASE_STUDY.rotZ, GALLERY.rotZ, t);

        // Interpolate scale and bend
        activeCard.scale.setScalar(lerp(CASE_STUDY.scale, targetScale, t));
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

      // Normal scroll (only in gallery mode) - Physics-based
      if (entryCompleteRef.current && !isCaseStudyOpenRef.current && !isTransitioningRef.current) {
        const maxScroll = (projects.length - 1) * cfg.spacing;

        // Apply velocity to target
        if (Math.abs(scrollVelocityRef.current) > MIN_VELOCITY) {
          targetScrollYRef.current += scrollVelocityRef.current;

          // Apply friction to velocity
          scrollVelocityRef.current *= SCROLL_FRICTION;

          // Clamp target within bounds
          targetScrollYRef.current = Math.max(0, Math.min(targetScrollYRef.current, maxScroll));

          // Bounce back if past edges (rubber band effect)
          if (targetScrollYRef.current <= 0 || targetScrollYRef.current >= maxScroll) {
            scrollVelocityRef.current *= 0.5; // Reduce velocity at edges
          }
        } else {
          scrollVelocityRef.current = 0;
        }

        // Snap to nearest card when not actively scrolling
        if (!isScrollingRef.current && Math.abs(scrollVelocityRef.current) < MIN_VELOCITY * 10) {
          const nearestCard = Math.round(targetScrollYRef.current / cfg.spacing) * cfg.spacing;
          const snapDelta = nearestCard - targetScrollYRef.current;

          // Apply snap with spring-like easing
          if (Math.abs(snapDelta) > 0.001) {
            targetScrollYRef.current += snapDelta * SNAP_STRENGTH;
          }
        }

        // Smooth interpolation to target (exponential ease-out)
        const scrollDelta = targetScrollYRef.current - scrollYRef.current;
        const scrollSpeed = 0.12 + Math.min(Math.abs(scrollDelta) * 0.05, 0.15); // Dynamic speed
        scrollYRef.current += scrollDelta * scrollSpeed;

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

        // Update current index (textures stay as loaded images)
        const newIdx = Math.round(scrollYRef.current / cfg.spacing);
        if (newIdx !== currentIndexRef.current && newIdx >= 0 && newIdx < projects.length) {
          currentIndexRef.current = newIdx;
          onIndexChangeRef.current(newIdx);
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
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, containerRef]);

  return {
    openCaseStudy,
    closeCaseStudy,
    goToProject,
    goToProjectInCaseStudy,
    replayEntry,
  };
}
