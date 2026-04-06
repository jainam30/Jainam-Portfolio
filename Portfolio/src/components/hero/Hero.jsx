import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import VoltageButton from '@/components/common/VoltageButton'
import { Scene } from '@/components/layout/Scene'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  }

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-black/20" style={{ zIndex: 1 }}>
      {/* Decorative Cyan Blooms */}
      <div className="bloom" style={{ top: '10%', left: '5%', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', opacity: 0.05 }} />
      <div className="bloom" style={{ bottom: '20%', right: '10%', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', opacity: 0.05 }} />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
              Available for new opportunities
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold title-grad leading-[1.1] tracking-tight"
          >
            Crafting Digital <br />
            <span className="text-white">Masterpieces</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl mt-8 max-w-xl leading-relaxed text-slate-400"
          >
            A high-performance software engineer focused on building 
            scalable architecture and pixel-perfect user experiences for the modern web.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-12 flex gap-6 items-center">
            <a href="#projects">
              <VoltageButton>Explore Projects</VoltageButton>
            </a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
              Let's Talk →
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="relative"
        >
          <HeroCanvas />
          {/* Subtle Glow behind 3D */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full -z-10" />
        </motion.div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-20 opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(var(--black-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--black-secondary) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} 
      />
    </section>
  )
}
