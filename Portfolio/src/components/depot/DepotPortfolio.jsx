import React, { useState, useEffect, useRef, useCallback } from 'react';
import DepotNav from './DepotNav';
import Claw from './Claw';
import Container3D from './Container3D';
import { CONTAINERS_DATA } from './depotData';

export default function DepotPortfolio() {
  const stageRef = useRef(null);

  // Viewport dimensions
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 750,
    isMobile: false,
  });

  // State machine for claw and containers
  const [heldId, setHeldId] = useState(null); // id of container currently lifted (null = all in pile)
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [fingersOpen, setFingersOpen] = useState(true);

  // Claw physical coordinates
  const [clawX, setClawX] = useState(600);
  const [clawZ, setClawZ] = useState(0);
  const [rodLength, setRodLength] = useState(40);
  const [clawSpanWidth, setClawSpanWidth] = useState(250);
  const [clawTransitionTime, setClawTransitionTime] = useState(0.75);
  const [isClawAnimating, setIsClawAnimating] = useState(false);

  // Container motion state: map of id -> { x, y, rx, ry, rz, width, height, depth, isLifted, isAnimating }
  const [containerStates, setContainerStates] = useState({});

  // Queue and animation locks
  const isRunningRef = useRef(false);
  const queueRef = useRef(null);
  const heldIdRef = useRef(null);
  const containerStatesRef = useRef({});
  const dimensionsRef = useRef(dimensions);

  // CV modal state
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Keep refs in sync
  useEffect(() => {
    heldIdRef.current = heldId;
  }, [heldId]);

  useEffect(() => {
    containerStatesRef.current = containerStates;
  }, [containerStates]);

  useEffect(() => {
    dimensionsRef.current = dimensions;
  }, [dimensions]);

  // Measure stage dimensions & set up resize listener
  const updateDimensions = useCallback(() => {
    if (!stageRef.current) return;
    const w = stageRef.current.clientWidth || window.innerWidth;
    const h = stageRef.current.clientHeight || (window.innerHeight - 72);
    const isMobile = w <= 720;
    const newDims = { width: w, height: h, isMobile };
    setDimensions(newDims);
    dimensionsRef.current = newDims;
    recalculateContainerPositions(newDims, heldIdRef.current);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Sizing calculations
  const computeSizes = (dims) => {
    const { width, height, isMobile } = dims;
    let baseW, baseH, baseD, liftedW, liftedH, liftedD;

    if (isMobile) {
      // Responsive phone width: leaves comfortable gutters on 360px-430px screens
      baseW = Math.min(Math.max(width * 0.36, 120), 150);
      baseH = Math.round(baseW * 0.58);
      baseD = Math.round(baseW * 0.52);
      liftedW = Math.min(Math.max(width - 48, 260), 320);
      liftedH = Math.min(Math.max(height * 0.54, 330), 430);
      liftedD = Math.round(baseD * 1.2);
    } else {
      // Proportional tablet and desktop width giving generous 40px+ clearance even on iPad portrait (768px)
      baseW = Math.min(Math.max(width * 0.16, 150), 235);
      baseH = Math.round(baseW * 0.44);
      baseD = Math.round(baseW * 0.40);
      // Spacious lifted dimensions taking full advantage of available screen space
      liftedW = Math.min(Math.max(width * 0.54, 620), 800);
      liftedH = Math.min(Math.max(height * 0.48, 340), 420);
      liftedD = Math.round(baseD * 1.3);
    }

    const showcaseX = width * 0.5;
    // Balanced positioning: container suspended in upper-mid stage with realistic crane cable
    const roofY = isMobile
      ? Math.max(90, Math.round(height * 0.12))
      : Math.max(115, Math.round(height * 0.14));
    const showcaseY = Math.round(roofY + liftedH / 2);

    // Deep Z forward showcase (320px desktop, 30px mobile to prevent perspective blowout on phones)
    const showcaseZ = isMobile ? 30 : 320;

    return {
      baseW,
      baseH,
      baseD,
      liftedW,
      liftedH,
      liftedD,
      showcaseX,
      showcaseY,
      showcaseZ,
      roofY,
    };
  };

  // Recalculate container coordinates in pile and showcase
  const recalculateContainerPositions = (dims, currentHeldId) => {
    const { baseW, baseH, baseD, liftedW, liftedH, liftedD, showcaseX, showcaseY, showcaseZ } =
      computeSizes(dims);
    const { width, height, isMobile } = dims;

    const newStates = {};
    CONTAINERS_DATA.forEach((c) => {
      const pos = isMobile ? c.phonePos : c.desktopPos;
      const pileX = Math.round(pos.x * width);
      const pileY = Math.round(pos.y * height);

      const isLifted = currentHeldId === c.id;

      newStates[c.id] = {
        pileX,
        pileY,
        pileRx: pos.rx,
        pileRy: pos.ry,
        pileRz: pos.rz,
        x: isLifted ? showcaseX : pileX,
        y: isLifted ? showcaseY : pileY,
        rx: isLifted ? (isMobile ? -2 : -4) : pos.rx,
        ry: isLifted ? (isMobile ? 0 : -3) : pos.ry,
        rz: isLifted ? 0 : pos.rz,
        width: isLifted ? liftedW : baseW,
        height: isLifted ? liftedH : baseH,
        depth: isLifted ? liftedD : baseD,
        isLifted,
        isAnimating: false,
      };
    });

    setContainerStates(newStates);
    containerStatesRef.current = newStates;

    // Reposition claw: spreader arm sits strictly ABOVE container roof (Y_arm = 62 + rodLength <= Y_roof - 8)
    if (currentHeldId) {
      setClawX(showcaseX);
      setClawZ(showcaseZ);
      const rod = Math.max(30, showcaseY - liftedH / 2 - 82);
      setRodLength(rod);
      setClawSpanWidth(liftedW);
    } else {
      setClawX(width * 0.5);
      setClawZ(0);
      setRodLength(40);
      setClawSpanWidth(baseW);
    }
  };

  // Sleep utility with reduced-motion support
  const wait = (ms) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return new Promise((resolve) => setTimeout(resolve, prefersReduced ? 10 : ms));
  };

  // Close currently opened container and lower it back to pile
  const closeCurrentContainer = async () => {
    if (isRunningRef.current || heldIdRef.current === null) return;
    isRunningRef.current = true;
    setIsClawAnimating(true);

    const targetId = heldIdRef.current;
    const dims = dimensionsRef.current;
    const { baseW, baseH, baseD } = computeSizes(dims);
    const curState = containerStatesRef.current[targetId];

    // 1a. Close doors (0.45s)
    setDoorsOpen(false);
    await wait(450);

    // 1b. Lower back to pile spot & shrink (0.85s)
    setClawTransitionTime(0.85);
    setClawZ(0);

    if (curState) {
      setClawX(curState.pileX);
      const pileRod = Math.max(30, curState.pileY - baseH / 2 - 82);
      setRodLength(pileRod);
      setClawSpanWidth(baseW);

      setContainerStates((prev) => ({
        ...prev,
        [targetId]: {
          ...prev[targetId],
          x: curState.pileX,
          y: curState.pileY,
          rx: curState.pileRx,
          ry: curState.pileRy,
          rz: curState.pileRz,
          width: baseW,
          height: baseH,
          depth: baseD,
          isLifted: false,
          isAnimating: true,
        },
      }));
    }
    await wait(850);

    // 1c. Open fingers (0.24s)
    setFingersOpen(true);
    setHeldId(null);
    heldIdRef.current = null;
    await wait(240);

    // Raise claw slightly above pile
    setClawTransitionTime(0.35);
    setRodLength(40);
    await wait(350);

    setIsClawAnimating(false);
    isRunningRef.current = false;

    // Check if user clicked another container while closing
    if (queueRef.current !== null) {
      const nextTarget = queueRef.current;
      queueRef.current = null;
      executePick(nextTarget);
    }
  };

  // The Master Pick Sequence
  const executePick = async (targetId) => {
    if (!stageRef.current) return;
    isRunningRef.current = true;
    setIsClawAnimating(true);

    const dims = dimensionsRef.current;
    const { baseW, baseH, baseD, liftedW, liftedH, liftedD, showcaseX, showcaseY, showcaseZ } =
      computeSizes(dims);

    const currentHeld = heldIdRef.current;

    // STEP 1: Put back currently held container if holding a different one
    if (currentHeld !== null && currentHeld !== targetId) {
      // 1a. Close doors (0.45s)
      setDoorsOpen(false);
      await wait(450);

      // 1b. Lower back to pile spot & shrink back to pile size (0.85s)
      const curState = containerStatesRef.current[currentHeld];
      setClawTransitionTime(0.85);

      if (curState) {
        setClawX(curState.pileX);
        setClawZ(0); // Return claw to Z = 0
        const pileRod = Math.max(30, curState.pileY - baseH / 2 - 82);
        setRodLength(pileRod);
        setClawSpanWidth(baseW);

        setContainerStates((prev) => ({
          ...prev,
          [currentHeld]: {
            ...prev[currentHeld],
            x: curState.pileX,
            y: curState.pileY,
            rx: curState.pileRx,
            ry: curState.pileRy,
            rz: curState.pileRz,
            width: baseW,
            height: baseH,
            depth: baseD,
            isLifted: false,
            isAnimating: true,
          },
        }));
      }
      await wait(850);

      // 1c. Open fingers to release it (0.24s)
      setFingersOpen(true);
      setHeldId(null);
      heldIdRef.current = null;
      await wait(240);

      // Raise claw slightly above pile
      setClawTransitionTime(0.35);
      setRodLength(40);
      await wait(350);
    }

    // STEP 2: Claw travels along rail to above the chosen container (0.75s) with fingers open
    const targetState = containerStatesRef.current[targetId];
    if (!targetState) {
      isRunningRef.current = false;
      return;
    }

    setClawTransitionTime(0.75);
    setFingersOpen(true);
    setClawX(targetState.pileX);
    setClawZ(0);
    setClawSpanWidth(baseW);
    setRodLength(40);
    await wait(750);

    // STEP 3: Drop down onto the container (0.56s)
    setClawTransitionTime(0.56);
    const dropRod = Math.max(30, targetState.pileY - baseH / 2 - 82);
    setRodLength(dropRod);
    await wait(560);

    // STEP 4: Fingers close and grip it (0.24s)
    setFingersOpen(false);
    await wait(240);

    // STEP 5: Claw lifts it to top centre of the stage (0.95s)
    setClawTransitionTime(0.95);
    setHeldId(targetId);
    heldIdRef.current = targetId;

    setClawX(showcaseX);
    setClawZ(showcaseZ);
    const liftedRod = Math.max(30, showcaseY - liftedH / 2 - 82);
    setRodLength(liftedRod);
    setClawSpanWidth(liftedW);

    setContainerStates((prev) => ({
      ...prev,
      [targetId]: {
        ...prev[targetId],
        x: showcaseX,
        y: showcaseY,
        rx: dims.isMobile ? -2 : -4,
        ry: dims.isMobile ? 0 : -3,
        rz: 0,
        width: liftedW,
        height: liftedH,
        depth: liftedD,
        isLifted: true,
        isAnimating: true,
      },
    }));
    await wait(950);

    // STEP 6: Doors swing open (-122deg and +122deg) with soft spring over 0.75s
    setDoorsOpen(true);
    await wait(750);

    isRunningRef.current = false;

    // Check if another click arrived during the sequence
    if (queueRef.current !== null && queueRef.current !== targetId) {
      const nextTarget = queueRef.current;
      queueRef.current = null;
      executePick(nextTarget);
    }
  };

  const handleSelectContainer = (targetId) => {
    if (isRunningRef.current) {
      queueRef.current = targetId;
      return;
    }
    if (heldIdRef.current === targetId && doorsOpen) {
      return; // Already open
    }
    executePick(targetId);
  };

  // Keyboard controls: Escape key closes current container or CV modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (cvModalOpen) {
          setCvModalOpen(false);
          return;
        }
        if (heldIdRef.current !== null) {
          closeCurrentContainer();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cvModalOpen]);

  // Click outside container closes it
  const handleStageClick = (e) => {
    // If the click was on/inside a container, inside content, button, link, modal, input, or nav, do NOT close!
    if (
      e.target.closest('.container-box') ||
      e.target.closest('.inside-content') ||
      e.target.closest('.cv-modal') ||
      e.target.closest('header') ||
      e.target.closest('.frosted-pill') ||
      e.target.closest('button') ||
      e.target.closest('a') ||
      e.target.closest('input') ||
      e.target.closest('textarea')
    ) {
      return;
    }

    // Only close if a container is lifted and not animating
    if (heldIdRef.current !== null && !isRunningRef.current) {
      closeCurrentContainer();
    }
  };

  return (
    <div
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col select-none touch-manipulation"
      style={{
        background: 'linear-gradient(180deg, #0f74e0 0%, #1f93f2 55%, #46b8ff 100%)',
      }}
    >
      {/* 01 / Navigation bar (72px tall, sits on the blue) */}
      <DepotNav
        onSelectContainer={handleSelectContainer}
        activeId={heldId}
      />

      {/* 02 / The Full-Height Stage */}
      <main
        ref={stageRef}
        onClick={handleStageClick}
        className="relative flex-1 w-full overflow-hidden preserve-3d cursor-default"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 45%',
        }}
        role="main"
        aria-label="Depot stage"
      >
        {/* Faint white blueprint grid */}
        <div className="absolute inset-0 pointer-events-none blueprint-grid opacity-90 z-0" />

        {/* Huge white backdrop word: "PORTFOLIO" in Clash Display 700 */}
        <div
          className="absolute font-clash font-bold text-white uppercase select-none pointer-events-none z-10 text-center whitespace-nowrap"
          style={{
            top: '58%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(90px, 19vw, 330px)',
            letterSpacing: '-0.04em',
            color: 'rgba(255, 255, 255, 0.22)',
            textShadow: '0 4px 24px rgba(15, 116, 224, 0.35)',
          }}
          aria-hidden="true"
        >
          PORTFOLIO
        </div>

        {/* Top-left stage indicator: JAINAM'S DEPOT · 7 CONTAINERS · 2026 */}
        {!dimensions.isMobile && (
          <div
            className="absolute top-8 left-8 sm:left-12 font-cabinet font-bold text-[11px] tracking-widest uppercase text-[#d7ecff] z-20 pointer-events-none"
            style={{ letterSpacing: '0.12em' }}
          >
            <span>JAINAM'S DEPOT · </span>
            <span className="text-[#ffd23f]">7 CONTAINERS</span>
            <span> · 2026</span>
          </div>
        )}

        {/* The Claw and Rail */}
        <Claw
          x={clawX}
          z={clawZ}
          rodLength={rodLength}
          fingersOpen={fingersOpen}
          containerWidth={clawSpanWidth}
          transitionDuration={clawTransitionTime}
          isAnimating={isClawAnimating}
        />

        {/* The 7 Shipping Containers */}
        <div className="absolute inset-0 preserve-3d z-20 pointer-events-none">
          {CONTAINERS_DATA.map((c) => {
            const state = containerStates[c.id];
            if (!state) return null;

            const isLifted = heldId === c.id;
            const areDoorsOpen = isLifted && doorsOpen;

            // Z-index: lifted container is always 1000, pile containers follow pileY
            const pileZ = Math.round(state.y);

            return (
              <Container3D
                key={c.id}
                data={c}
                isLifted={isLifted}
                doorsOpen={areDoorsOpen}
                width={state.width}
                height={state.height}
                depth={state.depth}
                x={state.x}
                y={state.y}
                rx={state.rx}
                ry={state.ry}
                rz={state.rz}
                zIndex={isLifted ? 1000 : pileZ}
                isMobile={dimensions.isMobile}
                transitionDuration={clawTransitionTime}
                isAnimating={state.isAnimating}
                isOtherContainerLifted={heldId !== null && !isLifted}
                onClick={() => handleSelectContainer(c.id)}
                onClose={closeCurrentContainer}
                onSelectContainer={handleSelectContainer}
                onOpenCvModal={() => setCvModalOpen(true)}
              />
            );
          })}
        </div>

        {/* Bottom-center Frosted Pill: "PICK A CONTAINER ↓" (Clickable to pick next container) */}
        {!dimensions.isMobile && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const current = heldIdRef.current || 0;
              const nextId = (current % 7) + 1;
              handleSelectContainer(nextId);
            }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full font-cabinet font-bold text-[12px] uppercase tracking-wider text-white border border-white/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.18)] z-30 cursor-pointer hover:bg-white/25 active:scale-95 transition-all"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
            }}
            aria-label="Pick shipping container"
          >
            {heldId !== null ? 'PICK ANOTHER CONTAINER ↺' : 'PICK A CONTAINER ↓'}
          </button>
        )}
      </main>

      {/* Accessible Full CV Modal */}
      {cvModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setCvModalOpen(false)}
        >
          <div
            className="cv-modal relative w-full max-w-4xl h-[88vh] bg-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-950">
              <div>
                <h3 className="font-clash font-bold text-white text-lg">
                  Jainam Jain — Software Developer CV
                </h3>
                <p className="text-xs text-slate-400 font-cabinet">
                  Official Resume & Credentials
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/Jainam_Jain_Software_Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold font-cabinet text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  Open in New Tab ↗
                </a>
                <a
                  href="/Jainam_Jain_Software_Developer.pdf"
                  download
                  className="px-4 py-1.5 rounded-lg text-xs font-bold font-cabinet text-slate-950 bg-[#ffd23f] hover:bg-yellow-400 transition-colors"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close CV Modal"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-800">
              <iframe
                src="/Jainam_Jain_Software_Developer.pdf"
                className="w-full h-full border-none"
                title="CV Document"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
