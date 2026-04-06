import { motion, useScroll } from 'framer-motion'
import NavButton from '@/components/common/NavButton'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const handleScroll = (href) => (e) => {
    e.preventDefault()
    const id = href === '#' ? null : href.replace(/^#/, '')
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cyan-500/10 bg-slate-950/70">
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight title-grad cursor-pointer" onClick={handleScroll('#')}>
          Jainam Jain
        </h1>

        <div className="hidden md:flex gap-6 items-center">
          <NavButton asButton href="#" onClick={handleScroll('#')} label="Home" />
          <NavButton asButton href="#about" onClick={handleScroll('#about')} label="About" />
          <NavButton asButton href="#skills" onClick={handleScroll('#skills')} label="Skills" />
          <NavButton asButton href="#projects" onClick={handleScroll('#projects')} label="Projects" />
          <NavButton asButton href="#contact" onClick={handleScroll('#contact')} label="Contact" />
        </div>

        {/* mobile menu */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-md hover:bg-cyan-500/10 transition-all text-cyan-400"
          >
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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden backdrop-blur-lg border-t border-cyan-500/10 bg-slate-950/90"
        >
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            <NavButton asButton href="#" onClick={handleScroll('#')} label="Home" />
            <NavButton asButton href="#about" onClick={handleScroll('#about')} label="About" />
            <NavButton asButton href="#skills" onClick={handleScroll('#skills')} label="Skills" />
            <NavButton asButton href="#projects" onClick={handleScroll('#projects')} label="Projects" />
            <NavButton asButton href="#contact" onClick={handleScroll('#contact')} label="Contact" />
          </div>
        </motion.div>
      )}
    </header>
  )
}
