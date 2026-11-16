import React from 'react';

/**
 * Claw Component:
 * - Rail: 16px tall horizontal bar near top of stage
 * - Carriage: 68 × 34px rounded white block riding along rail with 2 wheel dots
 * - Chrome rod: hangs from carriage with dynamic length and grey-white-grey horizontal gradient
 * - Grip head: 72 × 34px rounded white block
 * - Fingers: Two L-shaped white fingers spanning 1.06 × container width.
 *   Open state: rotate outward ±16° with spring bounce.
 *   Closed state: hang straight (0°).
 * - 3D Z-Depth: Carriage and rod move in Z to match lifted container depth!
 */
export default function Claw({
  x = 0,
  z = 0,
  rodLength = 40,
  fingersOpen = true,
  containerWidth = 260,
  transitionDuration = 0.75,
  isAnimating = false,
}) {
  // Span wide enough so clamping fingers hang on the outside left and right walls of the container, never inside!
  const span = Math.max(containerWidth + (containerWidth < 400 ? 12 : 28), 120);
  const halfSpan = span / 2;

  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none select-none z-30 preserve-3d"
      aria-hidden="true"
    >
      {/* 01 / Rail (16px tall, full-width, near top) */}
      <div
        className="relative w-full h-[16px] border-b border-white/40"
        style={{
          marginTop: '16px',
          background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 55%, #94a3b8 100%)',
          boxShadow: '0 8px 18px rgba(15, 116, 224, 0.45)',
        }}
      >
        {/* Faint dashed track running along the rail */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #cbd5e1 0, #cbd5e1 6px, transparent 6px, transparent 12px)',
          }}
        />
      </div>

      {/* 02 / Carriage + Rod + Grip Head + Fingers Assembly */}
      <div
        className="absolute top-[8px] preserve-3d"
        style={{
          left: `${x}px`,
          transform: `translateX(-50%) translateZ(${z}px)`,
          transition: isAnimating
            ? `left ${transitionDuration}s cubic-bezier(.55, 0, .25, 1), transform ${transitionDuration}s cubic-bezier(.55, 0, .25, 1)`
            : 'none',
        }}
      >
        {/* Carriage: 68 × 34px rounded white block */}
        <div
          className="relative w-[68px] h-[34px] rounded-[10px] flex items-center justify-between px-3 border border-white shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 65%, #cbd5e1 100%)',
          }}
        >
          {/* Wheel dots */}
          <div className="w-[10px] h-[10px] rounded-full bg-slate-500/80 shadow-inner border border-white/60" />
          <div className="w-[10px] h-[10px] rounded-full bg-slate-500/80 shadow-inner border border-white/60" />

          {/* Glossy top bevel reflection */}
          <div className="absolute top-[2px] inset-x-2 h-[3px] rounded-full bg-white/90" />
        </div>

        {/* Rod: Chrome rod with grey-white-grey horizontal gradient */}
        <div
          className="mx-auto w-[9px] relative origin-top"
          style={{
            height: `${rodLength}px`,
            background:
              'linear-gradient(90deg, #64748b 0%, #cbd5e1 25%, #ffffff 50%, #cbd5e1 75%, #475569 100%)',
            boxShadow: '0 0 6px rgba(0,0,0,0.25)',
            transition: isAnimating
              ? `height ${transitionDuration}s cubic-bezier(.55, 0, .25, 1)`
              : 'none',
          }}
        >
          {/* Rod segment ticks */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(0,0,0,0.4) 0 2px, transparent 2px 14px)',
            }}
          />
        </div>

        {/* Grip Head Assembly */}
        <div className="relative flex flex-col items-center">
          {/* Grip head: 72 × 34px rounded white block */}
          <div
            className="w-[72px] h-[34px] rounded-[10px] relative border border-white shadow-[0_8px_18px_rgba(0,0,0,0.28)] flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #cbd5e1 100%)',
            }}
          >
            {/* Center mechanism accent */}
            <div className="w-5 h-2 rounded bg-slate-400/50 shadow-inner" />
            <div className="absolute top-[2px] inset-x-2 h-[3px] rounded-full bg-white/90" />
          </div>

          {/* Left L-shaped Arm & Clamping Finger */}
          <div
            className="absolute top-[20px] origin-top-right transition-transform"
            style={{
              right: '50%',
              width: `${halfSpan}px`,
              transform: fingersOpen ? 'rotate(-16deg)' : 'rotate(0deg)',
              transformOrigin: 'top right',
              transition: 'transform 0.4s cubic-bezier(.34, 1.56, .64, 1)',
            }}
          >
            {/* Horizontal reach-out arm */}
            <div
              className="w-full h-[12px] rounded-l-md border-t border-l border-white"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
              }}
            />
            {/* Vertical clamping finger */}
            <div
              className="w-[12px] h-[36px] rounded-b-md border-b border-l border-white -mt-[1px] relative"
              style={{
                background: 'linear-gradient(90deg, #cbd5e1 0%, #ffffff 50%, #94a3b8 100%)',
                boxShadow: '-2px 4px 10px rgba(0,0,0,0.22)',
              }}
            >
              {/* Rubber grip pad inside face */}
              <div className="absolute top-1.5 right-0 w-[3px] h-[24px] bg-slate-700 rounded-l-sm" />
            </div>
          </div>

          {/* Right L-shaped Arm & Clamping Finger */}
          <div
            className="absolute top-[20px] origin-top-left transition-transform"
            style={{
              left: '50%',
              width: `${halfSpan}px`,
              transform: fingersOpen ? 'rotate(16deg)' : 'rotate(0deg)',
              transformOrigin: 'top left',
              transition: 'transform 0.4s cubic-bezier(.34, 1.56, .64, 1)',
            }}
          >
            {/* Horizontal reach-out arm */}
            <div
              className="w-full h-[12px] rounded-r-md border-t border-r border-white"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
              }}
            />
            {/* Vertical clamping finger */}
            <div
              className="w-[12px] h-[36px] rounded-b-md border-b border-r border-white -mt-[1px] ml-auto relative"
              style={{
                background: 'linear-gradient(90deg, #94a3b8 0%, #ffffff 50%, #cbd5e1 100%)',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.22)',
              }}
            >
              {/* Rubber grip pad inside face */}
              <div className="absolute top-1.5 left-0 w-[3px] h-[24px] bg-slate-700 rounded-r-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
