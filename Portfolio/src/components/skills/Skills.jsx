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
        <div className="grid md:grid-cols-2 gap-10">
          {items.map((t, i) => (
            <GradientCard key={i} index={i}>
              <h3 className="text-xl font-semibold mb-3">{t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#C4C4CC' }}>{content[i]}</p>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  )
}
