import useReveal from '@/utils/useReveal'
import GradientCard from '../common/GradientCard'

export default function Projects() {
  useReveal();

  const projects = [
    {
      title: 'Doctor Appointment Portal',
      desc: 'A full online doctor‑patient scheduling system with authentication and real‑time tracking.',
      tech: 'HTML • CSS • JavaScript • PHP • MySQL',
      url: '/projects/doctor-appointment'
    },
    {
      title: 'StitchFlow Suite (ERP)',
      desc: 'Enterprise Resource Planning system with role‑based dashboards and scalable architecture.',
      tech: 'React.js • Node.js • MySQL • Tailwind',
      url: '/projects/stitchflow-suite',
      liveUrl: 'https://stitchflow-suite.vercel.app/'
    },
    {
      title: 'SafeChat 360',
      desc: 'SafeChat360 is an AI-powered conversational safety system that provides secure, filtered, and context-aware interactions using custom instructions, automated checks, and integrated error-handling workflows.',
      tech: 'React, TypeScript, Tailwind CSS, Node.js, OpenAI GPT-5.1, Docker, PostgreSQL, Redis.',
      url: '/projects/safechat-360',
      liveUrl: 'https://safe-chat360.vercel.app/'
    }
  ];

  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold mb-10 reveal" data-reveal>
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-10 projects-grid">
          {projects.map((p, i) => (
            <GradientCard key={i} index={i} url={p.url}>
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.split(' • ').map((t, idx) => (
                      <span key={idx} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-wider font-bold rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {p.liveUrl && (
                  <div className="mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-700 text-slate-950 text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <span>View Live</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  );
}
