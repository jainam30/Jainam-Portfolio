export const CONTAINERS_DATA = [
  {
    id: 1,
    name: 'PORTFOLIO',
    color: '#e5322d',
    faceColor: '#e5322d',
    darkShade: '#a91f1b',
    labelTop: 'PORT',
    labelBottom: 'FOLIO',
    tag: 'JAINAM',
    // Upper / Back row center: elevated, centered, unobstructed
    desktopPos: { x: 0.50, y: 0.56, rx: -10, ry: 0, rz: 0 },
    phonePos: { x: 0.72, y: 0.50, rx: -12, ry: -14, rz: 0 },
    kicker: '01 / HELLO',
    headingPrefix: "Hi, I'm ",
    headingAccent: 'Jainam.',
    headingSuffix: '',
    roleSubtitle: 'Full-Stack Developer • Software Engineer • Creative Technologist',
    body: "A vibe coder and software developer with a curious mind, building scalable architecture and playful digital experiences. Every container in the depot holds a piece of my work.",
    isIntro: true
  },
  {
    id: 2,
    name: 'WORK',
    color: '#f26a1f',
    faceColor: '#f26a1f',
    darkShade: '#b84a10',
    labelTop: 'THE',
    labelBottom: 'WORK',
    tag: '02',
    // Front row far-left: perfectly clear of bottom edge and well separated
    desktopPos: { x: 0.12, y: 0.77, rx: -12, ry: 16, rz: 0 },
    phonePos: { x: 0.50, y: 0.88, rx: -14, ry: 0, rz: 0 },
    kicker: '02 / SELECTED WORK',
    headingPrefix: 'The ',
    headingAccent: 'work.',
    headingSuffix: '',
    projects: [
      {
        title: 'Doctor Appointment Portal',
        badge: 'Full Stack • Healthcare',
        desc: 'Complete doctor-patient scheduling portal with real-time booking, doctor schedule management, secure auth, and MySQL database.',
        tech: 'PHP • MySQL • JavaScript • HTML5 / CSS3',
        url: '/projects/doctor-appointment',
        githubUrl: 'https://github.com/Jainam-03',
        isLive: true
      },
      {
        title: 'StitchFlow Suite (ERP)',
        badge: 'Enterprise • ERP',
        desc: 'Enterprise resource planning platform featuring modular dashboards, inventory supply flow tracking, order workflows, and role-based permissions.',
        tech: 'React.js • Node.js • Express • MySQL • Tailwind',
        url: 'https://stitchflow-suite.vercel.app/',
        githubUrl: 'https://github.com/Jainam-03',
        isLive: true
      },
      {
        title: 'SafeChat 360',
        badge: 'AI & Security',
        desc: 'AI-driven conversational safety platform with OpenAI GPT-5.1 moderation, low-latency Redis caching layer, Docker containerization, and real-time monitoring.',
        tech: 'Next.js • TypeScript • OpenAI GPT • Redis • Docker',
        url: 'https://safe-chat360.vercel.app/',
        githubUrl: 'https://github.com/Jainam-03',
        isLive: true
      }
    ]
  },
  {
    id: 3,
    name: 'ABOUT',
    color: '#1d55d8',
    faceColor: '#1d55d8',
    darkShade: '#123a9c',
    labelTop: 'ABOUT',
    labelBottom: 'ME',
    tag: '03',
    // Front row mid-left: sits cleanly beside 02 with zero overlap
    desktopPos: { x: 0.37, y: 0.78, rx: -12, ry: -8, rz: 0 },
    phonePos: { x: 0.72, y: 0.63, rx: -12, ry: -12, rz: 0 },
    kicker: '03 / ABOUT ME',
    headingPrefix: 'A little ',
    headingAccent: 'about',
    headingSuffix: ' me.',
    body: "I design with AI as a creative partner: Figma, Claude and a lot of heart. Software Developer focused on building high-performance web systems, clean modular code, and scalable user-centric architectures.",
    cvPdf: '/Jainam_Jain_Software_Developer.pdf'
  },
  {
    id: 4,
    name: 'PROCESS',
    color: '#f6b919',
    faceColor: '#f6b919',
    darkShade: '#c08a0a',
    labelTop: 'PRO',
    labelBottom: 'CESS',
    tag: '04',
    // Front row mid-right: sits cleanly beside 05
    desktopPos: { x: 0.63, y: 0.78, rx: -12, ry: 8, rz: 0 },
    phonePos: { x: 0.28, y: 0.76, rx: -12, ry: 10, rz: 0 },
    kicker: '04 / PROCESS',
    headingPrefix: 'How I ',
    headingAccent: 'build.',
    headingSuffix: '',
    steps: [
      { step: '01 / Architect', detail: 'Clarify project vision, design scalable data schemas, and draft robust system architecture.' },
      { step: '02 / Develop', detail: 'Build with clean modular code, type safety, responsive UI, and optimized RESTful APIs.' },
      { step: '03 / Deploy & Scale', detail: 'Ship to production with CI/CD, Docker containers, caching, and ongoing performance tuning.' }
    ]
  },
  {
    id: 5,
    name: 'TOOLKIT',
    color: '#97a1ad',
    faceColor: '#97a1ad',
    darkShade: '#6c7682',
    labelTop: 'TOOL',
    labelBottom: 'KIT',
    tag: '05',
    // Front row far-right: fully above stage bottom
    desktopPos: { x: 0.88, y: 0.77, rx: -12, ry: -16, rz: 0 },
    phonePos: { x: 0.72, y: 0.76, rx: -12, ry: -10, rz: 0 },
    kicker: '05 / TOOLKIT',
    headingPrefix: "What's in the ",
    headingAccent: 'box.',
    headingSuffix: '',
    categories: [
      { name: 'Frontend', chips: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 / CSS3'] },
      { name: 'Backend & Systems', chips: ['Node.js', 'Express', 'Python', 'Java', 'PHP', 'REST APIs'] },
      { name: 'Databases & Cloud', chips: ['MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Git / GitHub', 'Vercel'] },
      { name: 'Design & AI', chips: ['Figma', 'OpenAI GPT', 'Claude API', 'Postman', 'System Design'] }
    ]
  },
  {
    id: 6,
    name: 'WHAT I DO',
    color: '#e5322d',
    faceColor: '#e5322d',
    darkShade: '#a91f1b',
    labelTop: 'WHAT',
    labelBottom: 'I DO',
    tag: '06',
    // Upper / Back row left: sits in the gap between 02 and 03
    desktopPos: { x: 0.24, y: 0.58, rx: -10, ry: 12, rz: 0 },
    phonePos: { x: 0.28, y: 0.50, rx: -12, ry: 14, rz: 0 },
    kicker: '06 / WHAT I DO & EXPERIENCE',
    headingPrefix: 'What I ',
    headingAccent: 'do.',
    headingSuffix: '',
    chips: ['Full Stack Architecture', 'REST & Microservices', 'UI / UX Prototyping', 'Database Optimization', 'AI Workflow Integration'],
    experienceNote: 'Software Development Intern at Bluestock Fintech (Backend & API Design). BCA 74.8% • MCA Candidate at Swaminarayan University (8.0 CGPA).'
  },
  {
    id: 7,
    name: 'CONTACT',
    color: '#2546b8',
    faceColor: '#2546b8',
    darkShade: '#172f80',
    labelTop: 'SAY',
    labelBottom: 'HELLO',
    tag: '07',
    // Upper / Back row right: sits in the gap between 04 and 05
    desktopPos: { x: 0.76, y: 0.58, rx: -10, ry: -12, rz: 0 },
    phonePos: { x: 0.28, y: 0.63, rx: -12, ry: 12, rz: 0 },
    kicker: '07 / SAY HELLO',
    headingPrefix: 'Got an ',
    headingAccent: 'idea?',
    headingSuffix: '',
    body: 'Have a project in mind, a freelance opportunity, or just want to connect? Reach out directly or drop a message below.',
    email: 'jainamjainrj03@gmail.com',
    phone: '+91 7878597484',
    hasForm: true
  }
];
