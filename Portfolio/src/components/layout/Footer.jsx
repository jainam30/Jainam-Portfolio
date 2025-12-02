import GradientCard from '../common/GradientCard'
import Button from '../common/Button'

export default function Footer(){
  return (
    <footer className="py-8 bg-[#F5F5F7] border-t border-[#E5E5E7]">
      <div className="max-w-6xl mx-auto px-6">
        <GradientCard index={0}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#777]">© {new Date().getFullYear()} Jainam Jain — All Rights Reserved</div>

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
