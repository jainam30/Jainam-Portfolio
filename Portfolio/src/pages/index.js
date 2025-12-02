import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Experience from '@/components/experience/Experience'
import Skills from '@/components/skills/Skills'
import Projects from '@/components/projects/Projects'
import Contact from '@/components/contact/Contact'

export default function Home(){
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
