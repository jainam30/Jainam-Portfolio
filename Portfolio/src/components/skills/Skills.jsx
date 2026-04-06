import useReveal from '@/utils/useReveal'
import GradientCard from '../common/GradientCard'

export default function Skills() {
  useReveal();
  const items = ['Programming Languages', 'Core Competencies', 'Tools & Frameworks', 'Practices'];
  const content = ['Java, Python, C++, JavaScript, SQL', 'DSA, System Design (HLD/LLD), API Design, OOP', 'React.js, Node.js, Git/GitHub, MySQL', 'Clean Code, Modular Architecture, Agile'];
  return (
    <section id="skills" className="py-28" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold mb-10 reveal title-grad" data-reveal>Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((t, i) => (
            <GradientCard key={i} index={i}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    {i === 0 && '⌨️'}
                    {i === 1 && '🏗️'}
                    {i === 2 && '🛠️'}
                    {i === 3 && '🚀'}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{t}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 font-medium">{content[i]}</p>
              </div>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  )
}
