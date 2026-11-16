import React, { useState } from 'react';

export default function Container3D({
  data,
  isLifted = false,
  doorsOpen = false,
  onClick,
  onClose,
  onSelectContainer,
  onOpenCvModal,
  width = 250,
  height = 108,
  depth = 100,
  x = 0,
  y = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  isMobile = false,
  zIndex = 1,
  transitionDuration = 0.85,
  isAnimating = false,
  isOtherContainerLifted = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Lift 10px on hover or focus if in pile (not lifted)
  const hoverOffset = !isLifted && (isHovered || isFocused) ? -10 : 0;
  const currentY = y + hoverOffset;

  // Forward 3D offset: 320px forward when lifted (30px mobile to prevent perspective blowout).
  // When another container is lifted, push background containers deeper into the yard (-80px desktop, -40px mobile) to guarantee clear separation.
  const currentZ = isLifted
    ? (isMobile ? 30 : 320)
    : (isOtherContainerLifted ? (isMobile ? -40 : -80) : 0);

  // Door label font size: 0.28 * height (0.25 on mobile)
  const fontSizeFactor = isMobile ? 0.25 : 0.28;
  const labelFontSize = Math.max(Math.round(height * fontSizeFactor), 13);

  // Ribbed pattern style for container faces
  const ribStyle = {
    backgroundColor: data.faceColor,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.22) 0px,
      rgba(0, 0, 0, 0.22) 6px,
      rgba(255, 255, 255, 0.14) 6px,
      rgba(255, 255, 255, 0.14) 12px
    )`,
  };

  const endCapRibStyle = {
    backgroundColor: data.darkShade,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.25) 0px,
      rgba(0, 0, 0, 0.25) 5px,
      rgba(255, 255, 255, 0.08) 5px,
      rgba(255, 255, 255, 0.08) 10px
    )`,
  };

  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  const handleContainerClick = (e) => {
    // When lifted, clicks inside the container MUST NEVER close it or trigger pickup!
    if (isLifted) {
      e?.stopPropagation?.();
      return;
    }
    // When in pile, clicking picks it up!
    e?.stopPropagation?.();
    onClick?.();
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Inquiry from Depot Portfolio' }),
      });
    } catch (err) {
      console.error(err);
    }
    setFormSent(true);
  };

  return (
    <div
      className="container-box absolute preserve-3d select-none"
      onClick={handleContainerClick}
      onMouseDown={(e) => {
        if (isLifted) e.stopPropagation();
      }}
      style={{
        left: `${x}px`,
        top: `${currentY}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: isLifted ? 1000 : zIndex,
        transform: `translate(-50%, -50%) translateZ(${currentZ}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        opacity: 1, // Keep 1 to prevent Chromium 3D flattening bugs so all background containers stay visible
        transition: isAnimating
          ? `left ${transitionDuration}s cubic-bezier(.55,0,.25,1), top ${transitionDuration}s cubic-bezier(.55,0,.25,1), transform ${transitionDuration}s cubic-bezier(.55,0,.25,1), width ${transitionDuration}s cubic-bezier(.55,0,.25,1), height ${transitionDuration}s cubic-bezier(.55,0,.25,1)`
          : 'top 0.25s ease-out, transform 0.25s ease-out',
        cursor: isLifted ? 'default' : 'pointer',
        pointerEvents: 'auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={isLifted ? -1 : 0}
      onKeyDown={(e) => {
        if (!isLifted && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="button"
      aria-label={`Container ${data.name}: ${data.kicker}`}
    >
      {/* Focus outline inside doors for accessibility */}
      {isFocused && !isLifted && (
        <div
          className="absolute inset-0 pointer-events-none z-50 rounded-sm"
          style={{
            border: '3px solid #ffd23f',
            boxShadow: '0 0 15px #ffd23f',
          }}
        />
      )}

      {/* 3D CUBROID FACES */}

      {/* 1A. SOLID OUTER BACK WALL - perfectly opaque physical barrier */}
      <div
        className="absolute inset-0"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translateZ(${-halfDepth}px)`,
          backgroundColor: data.darkShade,
          border: '1px solid rgba(0, 0, 0, 0.7)',
          pointerEvents: 'none',
        }}
      />

      {/* 1B. SOLID INNER BACK WALL & CONTENT (facing forward, brought to front plane when open) */}
      <div
        className="absolute inset-0"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: isLifted && doorsOpen ? 'translateZ(2px)' : `translateZ(${-halfDepth + 1}px)`,
          backgroundColor: '#070f1e',
          border: '1px solid rgba(0, 0, 0, 0.6)',
          boxShadow: 'inset 0 0 45px rgba(0,0,0,0.95), 0 16px 36px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          zIndex: isLifted ? 50 : 30,
          pointerEvents: isLifted && doorsOpen ? 'auto' : 'none',
        }}
      >
        {/* Faint internal corrugation on back wall */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 8px, rgba(255,255,255,0.12) 8px 10px)',
          }}
        />

        {/* INSIDE CONTENT: Centred on inner wall, fully interactive when doors swing open */}
        <div
          className="inside-content relative z-50 w-full h-full p-3 sm:p-5 flex flex-col justify-between overflow-y-auto container-scroll text-slate-100 transition-opacity duration-500"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            opacity: doorsOpen ? 1 : 0,
            pointerEvents: doorsOpen ? 'auto' : 'none',
            fontSize: isMobile ? '12px' : isLifted ? '13.5px' : '11px',
            userSelect: 'text',
          }}
          tabIndex={doorsOpen ? 0 : -1}
          aria-hidden={!doorsOpen}
        >
          {/* Header section with kicker, heading, and close button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-[0.7em] font-extrabold uppercase tracking-widest font-cabinet px-2 py-0.5 rounded bg-white/10"
                style={{ color: data.color }}
              >
                {data.kicker}
              </span>
              {isLifted && doorsOpen && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.();
                  }}
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/25 text-slate-200 hover:text-white text-[0.75em] font-cabinet font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 active:scale-95 shadow-md"
                  aria-label="Close container"
                >
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Close Depot</span>
                </button>
              )}
            </div>

            <h2 className="text-[1.35em] sm:text-[1.6em] font-bold tracking-tight font-clash text-white leading-tight mb-2">
              <span>{data.headingPrefix}</span>
              <span
                className="font-instrument italic font-normal text-[1.2em]"
                style={{ color: data.color }}
              >
                {data.headingAccent}
              </span>
              <span>{data.headingSuffix}</span>
            </h2>

            {/* Container 1: HELLO / INTRO */}
            {data.id === 1 && (
              <div className="space-y-3">
                {data.roleSubtitle && (
                  <p className="text-[0.8em] font-cabinet uppercase tracking-wider text-slate-400 font-bold">
                    {data.roleSubtitle}
                  </p>
                )}
                <p className="text-[0.92em] leading-relaxed text-slate-200 font-medium">
                  {data.body}
                </p>

                {/* Highlights / Strengths */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center">
                    <span className="text-[0.72em] text-red-400 font-bold uppercase font-cabinet">Education</span>
                    <span className="text-[0.82em] text-white font-semibold">MCA Candidate</span>
                    <span className="text-[0.7em] text-slate-400">Swaminarayan Univ (8.0 CGPA)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center">
                    <span className="text-[0.72em] text-red-400 font-bold uppercase font-cabinet">Experience</span>
                    <span className="text-[0.82em] text-white font-semibold">Bluestock Fintech</span>
                    <span className="text-[0.7em] text-slate-400">Software Dev Intern (APIs)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-center">
                    <span className="text-[0.72em] text-red-400 font-bold uppercase font-cabinet">Expertise</span>
                    <span className="text-[0.82em] text-white font-semibold">Full Stack Systems</span>
                    <span className="text-[0.7em] text-slate-400">Next.js • Node • Databases</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(2);
                    }}
                    className="px-4 py-2 rounded-md text-[0.82em] font-bold font-cabinet text-slate-950 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    style={{ backgroundColor: data.color }}
                  >
                    <span>View The Work (02)</span>
                    <span>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCvModal?.();
                    }}
                    className="px-4 py-2 rounded-md text-[0.82em] font-bold font-cabinet text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    View Resume / CV
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(7);
                    }}
                    className="px-4 py-2 rounded-md text-[0.82em] font-bold font-cabinet text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Get In Touch (07) ↗
                  </button>
                  <a
                    href="https://github.com/Jainam-03"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 rounded-md text-[0.82em] font-bold font-cabinet text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors inline-flex items-center gap-1 cursor-pointer ml-auto"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Container 2: THE WORK - FULLY FUNCTIONAL PROJECT CARDS */}
            {data.id === 2 && (
              <div className="space-y-2.5 mt-1.5">
                {data.projects?.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex flex-col justify-between gap-1.5 shadow-md group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[0.95em] text-white font-cabinet group-hover:text-orange-400 transition-colors">
                          {p.title}
                        </span>
                        {p.badge && (
                          <span className="px-2 py-0.5 rounded text-[0.68em] font-bold font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {p.url && (
                          <a
                            href={p.url}
                            target={p.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-[0.75em] font-cabinet inline-flex items-center gap-1.5 shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <span>Live App</span>
                            <span>↗</span>
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-bold text-[0.75em] font-cabinet inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Code</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-[0.82em] text-slate-200 leading-snug">{p.desc}</p>
                    <span className="text-[0.72em] text-orange-300 font-mono font-bold">
                      {p.tech}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Container 3: ABOUT ME */}
            {data.id === 3 && (
              <div className="space-y-3 mt-1.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2.5">
                    <p className="text-[0.9em] leading-relaxed text-slate-200 font-medium">
                      {data.body}
                    </p>
                    <div className="pt-1 flex flex-wrap gap-2">
                      <a
                        href="/Jainam_Jain_Software_Developer.pdf"
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[0.8em] font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Download CV (PDF)</span>
                        <span>↓</span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCvModal?.();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-[0.8em] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                      >
                        <span>Preview CV</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectContainer?.(2);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-[0.8em] font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                      >
                        <span>See Projects (02) →</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[0.78em] space-y-1">
                      <div className="text-white font-bold flex items-center gap-1.5">
                        <span>🎓</span>
                        <span>Master's of Computer Application (2024 - 2026)</span>
                      </div>
                      <div className="text-blue-300 font-medium pl-5">
                        Swaminarayan University • 8.0 CGPA
                      </div>
                      <div className="text-slate-400 pl-5 text-[0.92em]">
                        Specializing in Full Stack Systems, Distributed Architecture & Cloud
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[0.78em] space-y-1">
                      <div className="text-white font-bold flex items-center gap-1.5">
                        <span>💼</span>
                        <span>Software Development Intern — Bluestock Fintech</span>
                      </div>
                      <div className="text-blue-300 font-medium pl-5">
                        Backend Engineering & API Design
                      </div>
                      <div className="text-slate-400 pl-5 text-[0.92em]">
                        Developed modular microservices, REST APIs, and database caching layers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Container 4: PROCESS */}
            {data.id === 4 && (
              <div className="space-y-2.5 mt-1.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {data.steps?.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between gap-2"
                    >
                      <span
                        className="px-2.5 py-1 rounded text-[0.72em] font-black text-slate-950 font-cabinet w-fit"
                        style={{ backgroundColor: data.color }}
                      >
                        {s.step}
                      </span>
                      <p className="text-[0.82em] text-slate-200 font-medium leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(2);
                    }}
                    className="px-4 py-2 rounded-md text-[0.8em] font-bold text-slate-950 bg-yellow-400 hover:bg-yellow-300 font-cabinet transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  >
                    See The Results In Work (02) →
                  </button>
                  <span className="text-[0.72em] text-yellow-300/80 font-mono">
                    Disciplined Architecture • Fast Shipping
                  </span>
                </div>
              </div>
            )}

            {/* Container 5: TOOLKIT */}
            {data.id === 5 && (
              <div className="mt-1.5 space-y-2.5">
                <p className="text-[0.82em] text-slate-300 font-medium">
                  Core frameworks, distributed systems, and tooling I leverage daily:
                </p>

                {data.categories ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {data.categories.map((cat, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-[0.72em] text-slate-400 font-mono uppercase tracking-wider font-bold block mb-1.5">
                          {cat.name}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.chips.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2 py-0.5 rounded text-[0.72em] font-bold font-cabinet bg-white/10 text-white border border-white/15 hover:bg-white/20 transition-colors cursor-default"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {data.chips?.map((c, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-[0.75em] font-bold font-cabinet bg-white/10 text-white border border-white/15"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(2);
                    }}
                    className="px-4 py-2 rounded-md text-[0.8em] font-bold text-slate-950 bg-slate-200 hover:bg-white font-cabinet transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  >
                    Explore Projects Built With These Tools →
                  </button>
                  <a
                    href="https://github.com/Jainam-03"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[0.75em] text-slate-400 hover:text-white font-cabinet inline-flex items-center gap-1"
                  >
                    <span>View GitHub Repos</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Container 6: WHAT I DO & EXPERIENCE */}
            {data.id === 6 && (
              <div className="space-y-3 mt-1.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[0.72em] font-mono text-red-400 uppercase tracking-wider font-bold block mb-1.5">
                      Core Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {data.chips?.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded text-[0.75em] font-bold font-cabinet text-white bg-red-500/20 border border-red-500/30"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {data.experienceNote && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[0.8em] text-slate-200 leading-relaxed">
                      <span className="font-bold text-white block mb-1">
                        Professional Track Record:
                      </span>
                      {data.experienceNote}
                    </div>
                  )}
                </div>

                <div className="pt-1 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(2);
                    }}
                    className="px-4 py-2 rounded-md text-[0.8em] font-bold font-cabinet text-white bg-red-600 hover:bg-red-500 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    View Project Portfolio (02) →
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCvModal?.();
                    }}
                    className="px-4 py-2 rounded-md text-[0.8em] font-bold font-cabinet text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                  >
                    View Full Resume (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectContainer?.(7);
                    }}
                    className="px-4 py-2 rounded-md text-[0.8em] font-bold font-cabinet text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                  >
                    Contact Me (07) ↗
                  </button>
                </div>
              </div>
            )}

            {/* Container 7: SAY HELLO / CONTACT */}
            {data.id === 7 && (
              <div className="space-y-3 mt-1.5">
                <p className="text-[0.85em] text-slate-300 font-medium">{data.body}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Left Column: Direct Contacts */}
                  <div className="space-y-2">
                    <a
                      href={`mailto:${data.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 flex items-center justify-between text-white transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sky-400 font-bold text-[1.1em]">✉</span>
                        <div className="flex flex-col">
                          <span className="text-[0.68em] text-slate-400 font-mono uppercase">Direct Email</span>
                          <span className="text-[0.85em] font-bold font-mono group-hover:text-sky-300">{data.email}</span>
                        </div>
                      </div>
                      <span className="text-[0.8em] text-sky-400">↗</span>
                    </a>

                    <a
                      href={`tel:${data.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between text-white transition-all hover:scale-[1.02] cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold text-[1.1em]">☎</span>
                        <div className="flex flex-col">
                          <span className="text-[0.68em] text-slate-400 font-mono uppercase">Phone / WhatsApp</span>
                          <span className="text-[0.85em] font-bold font-mono group-hover:text-green-300">{data.phone}</span>
                        </div>
                      </div>
                      <span className="text-[0.8em] text-slate-400">↗</span>
                    </a>

                    <div className="p-2 rounded bg-white/5 border border-white/10 text-[0.72em] text-slate-400 flex items-center justify-between">
                      <span>📍 India • Available for Remote & On-Site</span>
                      <a
                        href="https://github.com/Jainam-03"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sky-400 hover:underline font-mono"
                      >
                        github.com/Jainam-03 ↗
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Contact Form */}
                  <div>
                    {data.hasForm && (
                      <div>
                        {formSent ? (
                          <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-[0.85em] font-bold text-center flex flex-col items-center justify-center gap-1 h-full min-h-[120px]">
                            <span className="text-2xl">✓</span>
                            <span>Message transmitted successfully!</span>
                            <span className="text-[0.8em] text-green-400/80 font-normal">I'll get back to you promptly.</span>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-3 py-1.5 rounded-md bg-black/40 border border-white/20 text-[0.8em] text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                              />
                              <input
                                type="email"
                                placeholder="Your Email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-3 py-1.5 rounded-md bg-black/40 border border-white/20 text-[0.8em] text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Project brief or message..."
                                required
                                value={formData.message}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 px-3 py-1.5 rounded-md bg-black/40 border border-white/20 text-[0.8em] text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                              />
                              <button
                                type="submit"
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-1.5 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[0.8em] transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow"
                              >
                                Send ↗
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom container status bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[0.68em] text-slate-400">
            <span className="font-mono uppercase tracking-wider">{data.name} DEPOT</span>
            <span className="font-mono">SEC // {data.id < 10 ? `0${data.id}` : data.id}</span>
          </div>
        </div>
      </div>

      {/* 2. TOP FACE (pointerEvents: none when lifted so it NEVER blocks clicks on content) */}
      <div
        className="absolute top-0 left-0 preserve-3d"
        style={{
          width: `${width}px`,
          height: `${depth}px`,
          transform: `translateY(${-halfDepth}px) rotateX(90deg)`,
          ...ribStyle,
          border: '1px solid rgba(0,0,0,0.35)',
          boxShadow: 'inset 0 0 18px rgba(255,255,255,0.22)',
          pointerEvents: isLifted ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-6 border border-black/30 bg-black/10 rounded-sm" />
        </div>
      </div>

      {/* 3. BOTTOM FACE */}
      <div
        className="absolute bottom-0 left-0 preserve-3d"
        style={{
          width: `${width}px`,
          height: `${depth}px`,
          transform: `translateY(${halfDepth}px) rotateX(-90deg)`,
          backgroundColor: data.darkShade,
          border: '1px solid rgba(0,0,0,0.45)',
          boxShadow: '0 20px 30px rgba(0,0,0,0.45)',
          pointerEvents: 'none',
        }}
      />

      {/* 4. LEFT END CAP */}
      <div
        className="absolute top-0 left-0 preserve-3d"
        style={{
          width: `${depth}px`,
          height: `${height}px`,
          transform: `translateX(${-halfDepth}px) rotateY(-90deg)`,
          ...endCapRibStyle,
          border: '1px solid rgba(0,0,0,0.4)',
          pointerEvents: isLifted ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-black/40 border-r border-white/20 pointer-events-none" />
      </div>

      {/* 5. RIGHT END CAP */}
      <div
        className="absolute top-0 right-0 preserve-3d"
        style={{
          width: `${depth}px`,
          height: `${height}px`,
          transform: `translateX(${halfDepth}px) rotateY(90deg)`,
          ...endCapRibStyle,
          border: '1px solid rgba(0,0,0,0.4)',
          pointerEvents: isLifted ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-black/40 border-r border-white/20 pointer-events-none" />
      </div>

      {/* 6. FRONT DOORS (Left and Right halves) */}
      {/* FRONT LEFT DOOR */}
      <div
        className="absolute top-0 left-0 preserve-3d overflow-hidden"
        style={{
          width: `${halfWidth}px`,
          height: `${height}px`,
          transformOrigin: 'left center',
          transform: `translateZ(${halfDepth}px) rotateY(${doorsOpen ? (isMobile ? -90 : -118) : 0}deg)`,
          transition: 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
          ...ribStyle,
          border: '1px solid rgba(0,0,0,0.35)',
          borderRight: '2px solid rgba(0,0,0,0.5)',
          boxShadow: doorsOpen ? '10px 0 25px rgba(0,0,0,0.4)' : 'none',
          pointerEvents: isLifted ? 'none' : 'auto',
        }}
      >
        <div
          className="absolute top-1 left-2 font-clash font-bold text-white select-none pointer-events-none"
          style={{
            width: `${width}px`,
            fontSize: `${labelFontSize}px`,
            lineHeight: 0.84,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div>{data.labelTop}</div>
          <div>{data.labelBottom}</div>
        </div>

        <div className="absolute top-1 bottom-1 right-2 w-[3px] bg-slate-200/80 rounded-full border border-black/30 shadow-md pointer-events-none">
          <div className="w-2.5 h-1.5 -ml-1 top-1/2 absolute bg-slate-300 border border-black/40 rounded-sm" />
        </div>
      </div>

      {/* FRONT RIGHT DOOR */}
      <div
        className="absolute top-0 preserve-3d overflow-hidden"
        style={{
          left: `${halfWidth}px`,
          width: `${halfWidth}px`,
          height: `${height}px`,
          transformOrigin: 'right center',
          transform: `translateZ(${halfDepth}px) rotateY(${doorsOpen ? (isMobile ? 90 : 118) : 0}deg)`,
          transition: 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
          ...ribStyle,
          border: '1px solid rgba(0,0,0,0.35)',
          borderLeft: '2px solid rgba(0,0,0,0.5)',
          boxShadow: doorsOpen ? '-10px 0 25px rgba(0,0,0,0.4)' : 'none',
          pointerEvents: isLifted ? 'none' : 'auto',
        }}
      >
        <div
          className="absolute top-1 font-clash font-bold text-white select-none pointer-events-none"
          style={{
            left: `-${halfWidth - 8}px`,
            width: `${width}px`,
            fontSize: `${labelFontSize}px`,
            lineHeight: 0.84,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div>{data.labelTop}</div>
          <div>{data.labelBottom}</div>
        </div>

        <div
          className="absolute bottom-1.5 right-2 font-cabinet font-extrabold text-white/90 uppercase tracking-widest pointer-events-none select-none"
          style={{
            fontSize: `${Math.max(Math.round(labelFontSize * 0.38), 9)}px`,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {data.tag}
        </div>

        <div className="absolute top-1 bottom-1 left-2 w-[3px] bg-slate-200/80 rounded-full border border-black/30 shadow-md pointer-events-none">
          <div className="w-2.5 h-1.5 -ml-1 top-1/2 absolute bg-slate-300 border border-black/40 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
