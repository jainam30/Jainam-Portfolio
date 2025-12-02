import React, { useState } from 'react'
import NavButton from '@/components/common/NavButton'

export default function Header(){
  const [open, setOpen] = useState(false)

  const handleScroll = (href) => (e) => {
    e.preventDefault()
    const id = href === '#' ? null : href.replace(/^#/, '')
    if(!id){
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-[#E2E2E4]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Jainam Jain</h1>

        <div className="hidden md:flex gap-4 items-center">
          <NavButton asButton href="#" onClick={handleScroll('#')} label="Home" />
          <NavButton asButton href="#about" onClick={handleScroll('#about')} label="About" />
          <NavButton asButton href="#skills" onClick={handleScroll('#skills')} label="Skills" />
          <NavButton asButton href="#contact" onClick={handleScroll('#contact')} label="Contact" />
        </div>

        {/* mobile menu */}
        <div className="md:hidden flex items-center">
          <button aria-label="Toggle menu" onClick={() => setOpen(v => !v)} className="p-2 rounded-md text-[#333] hover:bg-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-[#E2E2E4]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            <NavButton asButton href="#" onClick={handleScroll('#')} label="Home" />
            <NavButton asButton href="#about" onClick={handleScroll('#about')} label="About" />
            <NavButton asButton href="#skills" onClick={handleScroll('#skills')} label="Skills" />
            <NavButton asButton href="#contact" onClick={handleScroll('#contact')} label="Contact" />
          </div>
        </div>
      )}
    </header>
  )
}
