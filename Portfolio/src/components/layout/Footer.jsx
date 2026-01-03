import GradientCard from '../common/GradientCard'
import Button from '../common/Button'

export default function Footer() {
  return (
    <footer className="py-8 border-t" style={{ background: '#0A0A0F', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <GradientCard index={0}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm" style={{ color: '#8B8B99' }}>© {new Date().getFullYear()} Jainam Jain — All Rights Reserved</div>

            <div className="flex items-center gap-4">
              <Button links={[
                { href: 'https://www.linkedin.com/in/jainam-jain-9058611b1', label: 'LinkedIn' },
                { href: 'https://github.com/jainam30', label: 'GitHub' },
                { href: 'https://discord.com/channels/@me', label: 'Discord' }
              ]} />
            </div>
          </div>
        </GradientCard>
      </div>
    </footer>
  )
}
