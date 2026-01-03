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
      url: '/projects/stitchflow-suite'
    },
    {
      title: 'SafeChat 360',
      desc: 'SafeChat360 is an AI-powered conversational safety system that provides secure, filtered, and context-aware interactions using custom instructions, automated checks, and integrated error-handling workflows.',
      tech: 'React, TypeScript, Tailwind CSS, Node.js, OpenAI GPT-5.1, Docker, PostgreSQL, Redis.',
      url: '/projects/safechat-360'
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
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed mb-3">{p.desc}</p>
              <p className="text-xs text-[#777]">{p.tech}</p>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  );
}
