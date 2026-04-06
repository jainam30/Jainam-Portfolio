import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Experience from '@/components/experience/Experience'
import Skills from '@/components/skills/Skills'
import Projects from '@/components/projects/Projects'
import Contact from '@/components/contact/Contact'
import RobotGuide from '@/components/common/RobotGuide'

export default function Home() {
  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-cyan-500 selection:text-slate-950">
      <Header />
      <main className="overflow-hidden">
        <Hero />
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <About />
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <Experience />
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <Skills />
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <Projects />
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
        >
          <Contact />
        </motion.section>
      </main>
      <Footer />
      <RobotGuide />
    </div>
  )
}
