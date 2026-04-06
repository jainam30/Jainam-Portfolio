import GradientCard from '@/components/common/GradientCard'

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-28">
      <h2 className="text-4xl font-bold mb-6 text-white tracking-tight reveal title-grad" data-reveal>Experience & Education</h2>
      <p className="mb-10 text-lg font-medium text-slate-400">Continual growth and learning in Software Development</p>

      <div className="grid md:grid-cols-3 gap-6">
        <GradientCard index={0}>
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3 text-white">Software Development Intern</h3>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Bluestock Fintech</p>
            <p className="text-sm leading-relaxed mb-6 text-slate-300">Worked on backend development, API design, and reliability improvements.</p>
            <p className="text-[10px] mt-auto font-bold uppercase tracking-widest text-slate-500">Feb 2025 — Mar 2025 • Remote</p>
          </div>
        </GradientCard>

        <GradientCard index={1}>
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3 text-white">Master's of Computer Application</h3>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Swaminarayan University</p>
            <p className="text-sm leading-relaxed mb-6 text-slate-300">Expected CGPA: 8.0 — focused on software development, system design, and databases.</p>
            <p className="text-[10px] mt-auto font-bold uppercase tracking-widest text-slate-500">2024 — 2026 • expected</p>
          </div>
        </GradientCard>

        <GradientCard index={2}>
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-3 text-white">Bachelor's of Computer Application</h3>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">Leo College, Banswara</p>
            <p className="text-sm leading-relaxed mb-6 text-slate-300">Graduated with 74.8% — coursework in programming, data structures, and databases.</p>
            <p className="text-[10px] mt-auto font-bold uppercase tracking-widest text-slate-500">2021 — 2024 • Banswara</p>
          </div>
        </GradientCard>
      </div>
    </section>
  )
}
