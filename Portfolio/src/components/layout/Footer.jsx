import GradientCard from '../common/GradientCard'
import Button from '../common/Button'

export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ background: 'var(--black-bg)', borderColor: 'rgba(100, 255, 218, 0.1)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold tracking-tighter text-white">
              JAINAM<span className="text-cyan-400">.</span>
            </div>
            <div className="text-xs font-medium tracking-widest uppercase opacity-40">
              Software Developer & AI enthusiast
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button links={[
              { href: 'https://www.linkedin.com/in/jainam-jain-9058611b1', label: 'LinkedIn' },
              { href: 'https://github.com/jainam30', label: 'GitHub' },
              { href: 'https://discord.com/channels/@me', label: 'Discord' }
            ]} />
          </div>
          
          <div className="text-xs font-medium text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} Jainam Jain<br/>
            Built with Next.js & Three.js
          </div>
        </div>
      </div>
    </footer>
  )
}
