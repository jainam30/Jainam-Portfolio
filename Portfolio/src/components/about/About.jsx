import useReveal from '@/utils/useReveal'
import GradientCard from '../common/GradientCard'
import CvCard from '../common/CvCard'

export default function About() {
  useReveal();
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-28">
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="flex justify-start">
          <CvCard />
        </div>

        <div className="md:col-span-2">
          <GradientCard index={0}>
            <div className="p-2">
              <h2 className="text-4xl font-bold mb-6 text-white tracking-tight">About Me</h2>
              <p className="text-lg leading-relaxed text-slate-300 font-medium">
                AI-minded Software Developer focused on building <span className="text-cyan-400">scalable, high-quality applications</span>. 
                As a fresher, I'm eager to join a forward-thinking environment where innovation, mentorship, and impactful engineering define the culture.
              </p>
            </div>
          </GradientCard>
        </div>
      </div>
    </section>
  )
}
