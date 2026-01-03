import GradientCard from '@/components/common/GradientCard'

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-28">
      <h2 className="text-4xl font-semibold mb-6 reveal title-grad" data-reveal>Experience & Education</h2>
      <p className="mb-8 text-lg" style={{ color: '#C4C4CC' }}>Continues growth and learning in Software Development</p>

      <div className="grid md:grid-cols-3 gap-6">
        <GradientCard index={0}>
          <h3 className="text-xl font-semibold mb-2">Software Development Intern — Bluestock Fintech</h3>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#C4C4CC' }}>Worked remotely on backend development tasks, API design, and reliability improvements.</p>
          <p className="text-xs" style={{ color: '#8B8B99' }}>Feb 2025 — Mar 2025 (Remote)</p>
        </GradientCard>

        <GradientCard index={1}>
          <h3 className="text-xl font-semibold mb-2">MCA — Master's of Computer Application - Swaminarayan University, Kalol</h3>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#C4C4CC' }}>Expected CGPA: 8.0 — focused on software development, system design, and databases.</p>
          <p className="text-xs" style={{ color: '#8B8B99' }}>2024 — 2026 (expected)</p>
        </GradientCard>

        <GradientCard index={2}>
          <h3 className="text-xl font-semibold mb-2">BCA — Bachelor's of Computer Application - Leo College, Banswara</h3>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#C4C4CC' }}>Graduated with 74.8% — coursework in programming, data structures, and databases.</p>
          <p className="text-xs" style={{ color: '#8B8B99' }}>2021 — 2024</p>
        </GradientCard>
      </div>
    </section>
  )
}
