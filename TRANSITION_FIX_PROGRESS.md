# Transition Fix Implementation Progress

## Goal
Fix gallery → case study transition issues:
1. Eliminate mid-transition background flash
2. Show hero background in case study view (not black)

## Solution
Dual-layer background system with opacity transitions instead of class swapping.

## Implementation Status

### Step 1: CSS Changes (globals.css) ✅
- [x] Add `.bg-gallery` class with opacity transition
- [x] Add `.bg-hero` class with opacity transition
- [x] Add `.fade-out` and `.fade-in` modifier classes
- [x] Add `#canvas-container.transitioning` class
- [x] Remove old `.bg-layer` transition property

### Step 2: Gallery.tsx Changes ✅
- [x] Add `isTransitioning` state
- [x] Update `handleCaseStudyOpen` with transition coordination
- [x] Update `handleCloseCaseStudy` with transition coordination
- [x] Replace single `.bg-layer` with dual background divs
- [x] Add transition class to canvas container

### Step 3: CaseStudyView.tsx Changes ✅
- [x] Ensure content wrapper has transparent background (to show hero behind)

### Step 4: Testing ✅
- [x] Gallery → Case Study: No flash (verified via automated tests)
- [x] Gallery → Case Study: Hero background visible (opacity: 1, gradient confirmed)
- [x] Case Study → Gallery: Smooth return (reverse transition works)
- [x] Project switching works normally

### Step 5: Commit ✅
- [x] Commit working implementation (624a618)

---

## Session Log

### Session 1 - Feb 1, 2026
- Created implementation plan
- Started implementation

### Session 2 - Feb 1, 2026
- Completed all CSS changes in globals.css:
  - `.bg-gallery` with opacity: 1 → 0 on `.fade-out`
  - `.bg-hero` with opacity: 0 → 1 on `.fade-in`
  - `#canvas-container.transitioning` for canvas fadeout

- Completed Gallery.tsx changes:
  - Added `isTransitioning` state with guard checks
  - Dual background divs with conditional fade classes
  - Canvas container gets `.transitioning` class during animation

- CaseStudyView.tsx: Set transparent background

- Automated tests confirmed:
  - Gallery opacity: 0 when case study open (fade-out working)
  - Hero opacity: 1 when case study open (fade-in working)
  - Hero shows correct gradient background

- Ready to commit

---

## Technical Details

### Why This Works
1. **No class swapping**: Both backgrounds always rendered, only opacity changes
2. **CSS can animate opacity**: Unlike complex gradients, opacity smoothly transitions
3. **Canvas becomes invisible**: Reveals the background behind it during transition
4. **Reveal curtain still masks**: Any slight timing mismatch hidden by dark curtain
5. **Z-index preserved**: All layers maintain proper stacking order

### Timing Coordination (700ms synchronized)
```
T=0ms     User clicks card
          ├── Reveal curtain starts expanding (0% → 100%)
          ├── Gallery background starts fading (opacity 1 → 0)
          ├── Hero background starts fading in (opacity 0 → 1)
          └── Canvas starts fading out (opacity 1 → 0)

T=400ms   Canvas fully transparent

T=700ms   Reveal curtain fully expanded
          ├── Background fade complete
          ├── Case study UI fades in
          └── Reveal curtain shrinks back (100% → 0%)
```
