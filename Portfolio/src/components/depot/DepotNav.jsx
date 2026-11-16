import React from 'react';

export default function DepotNav({ onSelectContainer, activeId }) {
  const navItems = [
    { label: 'Work', id: 2 },
    { label: 'About', id: 3 },
    { label: 'Process', id: 4 },
    { label: 'Contact', id: 7 },
  ];

  return (
    <nav
      className="relative z-40 w-full bg-transparent px-4 sm:px-8 md:px-12 flex flex-col justify-center border-b border-white/10"
      style={{ height: '72px' }}
      role="navigation"
      aria-label="Depot navigation"
    >
      {/* Desktop / Tablet layout */}
      <div className="hidden sm:flex items-center justify-between w-full h-full">
        {/* Left: Logo */}
        <button
          onClick={() => onSelectContainer(1)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-lg p-1 transition-transform hover:scale-105"
          aria-label="Back to PORTFOLIO container"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[112px] h-auto object-contain select-none"
            style={{
              filter: 'invert(1)',
              mixBlendMode: 'screen',
            }}
          />
        </button>

        {/* Centre: Nav links */}
        <div className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectContainer(item.id)}
                className={`text-[15px] font-bold tracking-tight font-cabinet transition-all duration-200 px-3 py-1 rounded-md ${
                  isActive
                    ? 'text-white bg-white/15 shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'text-[#e6f3ff] hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Fetch container ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Let's Talk ↗ */}
        <div>
          <a
            href="mailto:jainamjainrj03@gmail.com"
            onClick={(e) => {
              // Also trigger container 7
              if (!e.metaKey && !e.ctrlKey) {
                onSelectContainer(7);
              }
            }}
            className="font-clash font-bold text-white hover:text-[#d7ecff] text-base inline-flex items-center gap-1.5 transition-all hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <span className="text-lg">↗</span>
          </a>
        </div>
      </div>

      {/* Mobile layout (<= 640px) */}
      <div className="flex sm:hidden flex-col justify-around h-full py-1">
        {/* Row 1: Logo and Let's Talk */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => onSelectContainer(1)}
            className="focus:outline-none"
            aria-label="Back to PORTFOLIO container"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[92px] h-auto object-contain"
              style={{
                filter: 'invert(1)',
                mixBlendMode: 'screen',
              }}
            />
          </button>

          <a
            href="mailto:jainamjainrj03@gmail.com"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey) {
                onSelectContainer(7);
              }
            }}
            className="font-clash font-bold text-white text-sm inline-flex items-center gap-1"
          >
            <span>Let's Talk</span>
            <span>↗</span>
          </a>
        </div>

        {/* Row 2: Four links centred */}
        <div className="flex items-center justify-center gap-4">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectContainer(item.id)}
                className={`text-[13px] font-bold font-cabinet transition-colors px-2 py-0.5 rounded ${
                  isActive ? 'text-white bg-white/20' : 'text-[#e6f3ff]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
