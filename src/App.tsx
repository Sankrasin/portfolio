import { motion, AnimatePresence } from 'framer-motion';
import Snow from './Snow';
import AudioPlayer from './AudioPlayer';
import { useState, useEffect } from 'react';

const projectsData = [
  {
    id: 'devpilot',
    title: 'Devpilot',
    tags: ['🧠 Generative AI', '⚡ Next.js', '🚀 FastAPI'],
    shortDesc: 'An AI-powered software engineering assistant that helps developers generate documentation, analyze requirements, and design scalable software architectures through specialized GenAI modules.',
    features: [
      'AI-powered documentation generation from source code repositories.',
      'Intelligent requirements analysis with PDF and Markdown document support.',
      'Interactive software architecture planning with live Mermaid diagrams.',
      'Persistent multi-session conversations with context-aware AI memory.'
    ],
    borderClass: 'border-t-[var(--color-frost-light)]',
    bgClass: 'bg-[var(--color-frost-light)]',
    hoverShadowClass: 'hover:shadow-[0_0_50px_rgba(224,242,254,0.15)]',
    btnHoverTextClass: 'hover:text-[var(--color-frost-light)]',
    btnHoverBorderClass: 'hover:border-[var(--color-frost-light)]',
    btnSolidHoverBgClass: 'hover:bg-[var(--color-frost-light)]',
    video: '/devpilotdemo.webm',
    github: 'https://github.com/Sankrasin/devpilot',
    live: 'https://devpilot-coral.vercel.app/'
  },
  {
    id: 'kinosoca',
    title: 'Kinosoca',
    tags: ['🎬 React', '🤖 AI Search', '🗄️ PostgreSQL'],
    shortDesc: 'A modern movie discovery platform that combines AI-powered semantic search, personalized recommendations, and rich movie insights to help users find the perfect film.',
    features: [
      'Natural language movie search with AI-powered semantic recommendations.',
      'Mood-based discovery, advanced filters, and personalized watchlists.',
      'TMDB integration for trending, popular, top-rated, and detailed movie information.',
      'Secure JWT authentication with user profiles and protected watchlist management.'
    ],
    borderClass: 'border-t-[var(--color-frost-blue)]',
    bgClass: 'bg-[var(--color-frost-blue)]',
    hoverShadowClass: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.2)]',
    btnHoverTextClass: 'hover:text-[var(--color-frost-blue)]',
    btnHoverBorderClass: 'hover:border-[var(--color-frost-blue)]',
    btnSolidHoverBgClass: 'hover:bg-[var(--color-frost-blue)]',
    video: '/kinosocademo.webm',
    github: 'https://github.com/Sankrasin/kinosoca',
    live: 'https://kinosoca.vercel.app/'
  },
  {
    id: 'hireamigo',
    title: 'Hireamigo',
    tags: ['📄 FastAPI', '🐍 Python', '📊 Resume Screening'],
    shortDesc: 'A recruiter-first resume screening platform that automates candidate ranking using transparent rule-based evaluation, helping HR teams shortlist applicants faster and more efficiently.',
    features: [
      'Batch PDF resume processing with automated candidate ranking.',
      'Rule-based scoring using hiring tags and keyword relevance matching.',
      'Anti-bias screening with anonymized candidate evaluation and manual overrides.',
      'Interactive recruiter dashboard featuring resume preview, drag-and-drop buckets, notes, and CSV export.'
    ],
    borderClass: 'border-t-[var(--color-frost-medium)]',
    bgClass: 'bg-[var(--color-frost-medium)]',
    hoverShadowClass: 'hover:shadow-[0_0_40px_rgba(125,211,252,0.2)]',
    btnHoverTextClass: 'hover:text-[var(--color-frost-medium)]',
    btnHoverBorderClass: 'hover:border-[var(--color-frost-medium)]',
    btnSolidHoverBgClass: 'hover:bg-[var(--color-frost-medium)]',
    video: '/hireamigodemo.webm',
    github: 'https://github.com/Sankrasin/hireamigo',
    live: 'https://hireamigo.vercel.app/'
  }
];

function App() {
  const [entered, setEntered] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [shownVideos, setShownVideos] = useState<string[]>([]);

  const toggleProject = (id: string) => {
    if (expandedProjects.includes(id)) {
      setExpandedProjects(prev => prev.filter(p => p !== id));
      setShownVideos(prev => prev.filter(p => p !== id));
    } else {
      setExpandedProjects(prev => [...prev, id]);
      setTimeout(() => {
        document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 450);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.project-card')) {
        if (expandedProjects.length > 0) {
          setExpandedProjects([]);
          setShownVideos([]);
          setTimeout(() => {
            document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expandedProjects]);
  return (
    <>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Snow />
        <AudioPlayer />
      </div>
      {/* Background Video - Local File */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-2] opacity-80"
      >
        <source src="/portfolio.webm" type="video/webm" />
      </video>

      {/* Icy Dark Overlay to ensure text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#080f1a]/50 to-[#080f1a]/90 z-[-1]"></div>

      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-[#080f1a]/40"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-panel p-8 md:p-10 rounded-2xl text-center max-w-sm w-full flex flex-col items-center gap-6 border-t border-[var(--color-frost-light)] shadow-[0_0_50px_rgba(224,242,254,0.1)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-frost-light)] opacity-10 blur-3xl pointer-events-none"></div>

              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">Glad you're here</h2>

              <button
                onClick={() => setEntered(true)}
                className="px-6 py-3 bg-white/5 hover:bg-[var(--color-frost-light)] text-white hover:text-[#080f1a] transition-all duration-300 rounded-full font-body tracking-widest uppercase font-bold text-sm border border-[var(--color-frost-light)] hover:border-transparent shadow-[0_0_15px_rgba(224,242,254,0.1)] hover:shadow-[0_0_30px_rgba(224,242,254,0.4)]"
              >
                View portfolio
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >

          <nav className="fixed top-0 w-full p-6 glass-panel z-50 flex justify-between items-center border-b border-white/10">
            <h1 className="text-2xl font-bold font-heading tracking-widest text-[var(--color-frost-light)]">
              PORTFOLIO
            </h1>
            <div className="hidden md:flex gap-8 font-body text-sm tracking-widest uppercase">
              <a href="#about" className="hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all">About</a>
              <a href="#skills" className="hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all">Skills</a>
              <a href="#experience" className="hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all">Experience</a>
              <a href="#projects" className="hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all">Projects</a>
              <a href="#contact" className="hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all">Contact</a>
            </div>
          </nav>

          <main className="relative pt-32 pb-20 px-8 max-w-6xl mx-auto flex flex-col gap-40 overflow-hidden">

            {/* Hero Section */}
            <section className="min-h-[70vh] flex flex-col justify-center">


              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-black mb-8 leading-tight drop-shadow-lg"
              >
                SANKALP<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--color-frost-medium)' }}>RAJ SINGH</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-body text-[var(--color-frost-light)] opacity-80 max-w-xl leading-relaxed mb-10"
              >
                I like turning “What if?” into “It works!”
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-6"
              >

                <a href="/Sankalp_Raj_Singh_Resume.pdf" download="Sankalp_Raj_Singh_Resume.pdf" className="inline-block px-8 py-4 bg-transparent text-white font-body tracking-widest uppercase font-bold hover:bg-white/10 hover:border-[var(--color-frost-blue)] hover:text-[var(--color-frost-blue)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 rounded-3xl border border-white/20 backdrop-blur-md">
                  RESUMÉ ⬇
                </a>
                <div className="flex gap-6 ml-4">
                  <a href="https://github.com/Sankrasin" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all duration-300" aria-label="GitHub">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>

                </div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-12 text-[var(--color-frost-light)] flex items-center gap-4 drop-shadow-md"
              >
                <svg className="w-10 h-10 text-[var(--color-frost-blue)] drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transform rotate-45" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5 L55 20 L54 75 L46 75 L45 20 Z" fill="currentColor" />
                  <line x1="50" y1="15" x2="50" y2="70" stroke="#080f1a" strokeWidth="1.5" />
                  <path d="M25 75 L75 75 L78 77 L75 79 L25 79 L22 77 Z" fill="currentColor" />
                  <rect x="46" y="79" width="8" height="14" fill="currentColor" opacity="0.8" />
                  <circle cx="50" cy="95" r="5" fill="currentColor" />
                  <circle cx="50" cy="95" r="2" fill="#ffffff" />
                </svg>
                BACKGROUND
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-panel p-8 border-l-4 border-l-[var(--color-frost-blue)] space-y-4 font-body text-sm text-gray-200 leading-loose rounded-3xl transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                >
                  <p>
                    I’m <span className="text-white font-bold">Sankalp Raj Singh</span>, a Computer Science Engineering student at <span className="text-white font-bold">Graphic Era (Deemed to be University)</span>, currently in my 7th semester of B.Tech. I completed my schooling at City Montessori School, Lucknow.
                  </p>
                  <p>
                    My interest in technology started during my school years when I became curious about how the software and websites I used every day actually worked and were built. That curiosity motivated me to start learning C and Java, where I was introduced to programming and problem-solving.
                  </p>
                  <p>
                    Over time, my interest grew beyond writing simple programs. I started exploring <span className="text-[var(--color-frost-medium)]">software development, algorithms, artificial intelligence, machine learning, and data analytics,</span> which continue to be the areas I’m most interested in learning and building projects in.
                  </p>

                  <div className="pt-6">
                    <h4 className="text-[var(--color-frost-medium)] uppercase tracking-widest mb-4 text-xs font-bold">Hobbies & Interests</h4>
                    <div className="flex flex-wrap gap-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">🎮 Gaming</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">✈️ Travelling</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">🤖 Exploring AI</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">💻 Building Projects</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-panel p-6 flex justify-between items-center rounded-3xl transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] cursor-default">
                    <span className="font-body text-xs text-[var(--color-frost-light)] opacity-70 uppercase tracking-widest">Education</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">B.Tech CSE</div>
                      <div className="font-body text-xs text-[var(--color-frost-blue)]">Graphic Era (Deemed to be University)</div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-panel p-6 flex justify-between items-center rounded-3xl transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] cursor-default">
                    <span className="font-body text-xs text-[var(--color-frost-light)] opacity-70 uppercase tracking-widest">Current CGPA</span>
                    <div className="font-bold text-3xl text-[var(--color-frost-light)]">7.9/10</div>
                  </motion.div>


                </motion.div>
              </div>
            </section>


            {/* Skills Section */}
            <section id="skills" className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-12 text-[var(--color-frost-light)] flex items-center gap-4 drop-shadow-md"
              >
                <svg className="w-10 h-10 text-[var(--color-frost-blue)] drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transform rotate-45" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5 L55 20 L54 75 L46 75 L45 20 Z" fill="currentColor" />
                  <line x1="50" y1="15" x2="50" y2="70" stroke="#080f1a" strokeWidth="1.5" />
                  <path d="M25 75 L75 75 L78 77 L75 79 L25 79 L22 77 Z" fill="currentColor" />
                  <rect x="46" y="79" width="8" height="14" fill="currentColor" opacity="0.8" />
                  <circle cx="50" cy="95" r="5" fill="currentColor" />
                  <circle cx="50" cy="95" r="2" fill="#ffffff" />
                </svg>
                SKILLS
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-10 rounded-3xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <div>
                  <h4 className="text-[var(--color-frost-blue)] font-body tracking-widest uppercase text-sm mb-4 font-bold">Languages</h4>
                  <ul className="text-gray-300 font-body text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Python</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>C / C++</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Java</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>TypeScript</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>JavaScript</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[var(--color-frost-blue)] font-body tracking-widest uppercase text-sm mb-4 font-bold">AI / ML</h4>
                  <ul className="text-gray-300 font-body text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Generative AI (GenAI)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Semantic Search</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>NLP</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Recommendation Systems</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Rule-Based Scoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[var(--color-frost-blue)] font-body tracking-widest uppercase text-sm mb-4 font-bold">Data Analysis</h4>
                  <ul className="text-gray-300 font-body text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Pandas / NumPy</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>PostgreSQL</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Tableau</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[var(--color-frost-blue)] font-body tracking-widest uppercase text-sm mb-4 font-bold">Web Dev</h4>
                  <ul className="text-gray-300 font-body text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>React 19</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Next.js 15</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>FastAPI</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>SQLAlchemy</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Tailwind CSS</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Vite</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[var(--color-frost-blue)] font-body tracking-widest uppercase text-sm mb-4 font-bold">Tools</h4>
                  <ul className="text-gray-300 font-body text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>Git / GitHub</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>VS Code</li>
                  </ul>
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-16 text-[var(--color-frost-light)] flex items-center gap-4 drop-shadow-md"
              >
                <svg className="w-10 h-10 text-[var(--color-frost-blue)] drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transform rotate-45" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5 L55 20 L54 75 L46 75 L45 20 Z" fill="currentColor" />
                  <line x1="50" y1="15" x2="50" y2="70" stroke="#080f1a" strokeWidth="1.5" />
                  <path d="M25 75 L75 75 L78 77 L75 79 L25 79 L22 77 Z" fill="currentColor" />
                  <rect x="46" y="79" width="8" height="14" fill="currentColor" opacity="0.8" />
                  <circle cx="50" cy="95" r="5" fill="currentColor" />
                  <circle cx="50" cy="95" r="2" fill="#ffffff" />
                </svg>
                EXPERIENCE
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-12 text-center rounded-3xl transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <div className="text-2xl mb-4 text-[var(--color-frost-medium)]">✦ Your experience will appear here ✦</div>
                <p className="font-body text-sm text-[var(--color-frost-light)] opacity-70">Add your internships, hackathons, or certifications here.</p>
              </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-16 text-[var(--color-frost-light)] flex items-center gap-4 drop-shadow-md"
              >
                <svg className="w-10 h-10 text-[var(--color-frost-blue)] drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transform rotate-45" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5 L55 20 L54 75 L46 75 L45 20 Z" fill="currentColor" />
                  <line x1="50" y1="15" x2="50" y2="70" stroke="#080f1a" strokeWidth="1.5" />
                  <path d="M25 75 L75 75 L78 77 L75 79 L25 79 L22 77 Z" fill="currentColor" />
                  <rect x="46" y="79" width="8" height="14" fill="currentColor" opacity="0.8" />
                  <circle cx="50" cy="95" r="5" fill="currentColor" />
                  <circle cx="50" cy="95" r="2" fill="#ffffff" />
                </svg>
                PROJECTS
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="mb-12 font-body text-sm md:text-base text-[var(--color-frost-light)] opacity-80 border-l-4 border-[var(--color-frost-blue)] rounded-3xl px-6 py-4 w-full glass-panel transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:opacity-100"
                style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(5px)' }}
              >
                <span className="text-[var(--color-frost-blue)] font-bold">Just a heads up:</span> As these live demos are hosted on free-tier platforms, the servers may need a brief moment to wake up on your first visit. I really appreciate you giving them a minute to load!
              </motion.div>

              <div id="projects-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, idx) => {
                  const isExpanded = expandedProjects.includes(project.id);

                  return (
                    <motion.div
                      key={project.id}
                      id={`project-${project.id}`}
                      layout
                      onClick={() => !isExpanded && toggleProject(project.id)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: isExpanded ? 0 : idx * 0.2,
                        layout: { duration: 0.4, ease: "easeOut" }
                      }}
                      whileHover={!isExpanded ? { y: -10, scale: 1.02 } : {}}
                      className={`project-card glass-panel p-10 md:p-12 rounded-3xl border-t-2 ${project.borderClass} relative overflow-hidden group transition-shadow duration-500 cursor-pointer
                        ${isExpanded ? 'col-span-1 md:col-span-2 lg:col-span-3 shadow-2xl z-20' : project.hoverShadowClass}`}
                    >
                      <div className={`absolute top-0 right-0 w-48 h-48 ${project.bgClass} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}></div>

                      <motion.div layout className="flex flex-wrap gap-2 mb-6 relative z-10">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-body text-[10px] text-[var(--color-frost-light)] tracking-widest uppercase">{tag}</span>
                        ))}
                      </motion.div>

                      <motion.h3 layout className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md relative z-10">
                        {project.title}
                      </motion.h3>

                      <motion.p layout className="font-body text-base text-gray-300 leading-relaxed mb-10 min-h-[80px] relative z-10">
                        {project.shortDesc}
                      </motion.p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                          >
                            <div className="mb-8 font-body text-sm md:text-base text-gray-300 space-y-4 border-l-2 border-white/20 pl-6 py-2">
                              {project.features?.map((feature, fIdx) => (
                                <p key={fIdx}><strong className="text-white">.{fIdx + 1}</strong> {feature}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div layout className="flex flex-wrap gap-4 pt-6 border-t border-white/10 relative z-10">
                        {!isExpanded && (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleProject(project.id); }}
                            className={`flex items-center gap-2 text-xs font-body tracking-widest uppercase text-white hover:text-[var(--color-frost-blue)] hover:border-[var(--color-frost-blue)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 border border-white/20 px-6 py-3 rounded-full backdrop-blur-sm bg-white/5`}
                          >
                            Know More
                          </button>
                        )}
                        {isExpanded && (
                          <>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`flex items-center gap-2 text-xs font-body tracking-widest uppercase text-white hover:text-[var(--color-frost-blue)] hover:border-[var(--color-frost-blue)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 border border-white/20 px-6 py-3 rounded-full backdrop-blur-sm bg-white/5`}>
                              <span>⌥</span> GitHub
                            </a>
                            <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`flex items-center gap-2 text-xs font-body tracking-widest uppercase text-[#080f1a] bg-white hover:bg-[var(--color-frost-light)] transition-all duration-300 px-6 py-3 font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:text-[var(--color-frost-blue)]`}>
                              <span>↗</span> Live Demo
                            </a>

                            {project.video && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShownVideos(prev =>
                                    prev.includes(project.id)
                                      ? prev.filter(id => id !== project.id)
                                      : [...prev, project.id]
                                  );
                                  if (!shownVideos.includes(project.id)) {
                                    setTimeout(() => {
                                      document.getElementById(`video-${project.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 400);
                                  }
                                }}
                                className={`flex items-center gap-2 text-xs font-body tracking-widest uppercase text-white hover:text-[var(--color-frost-blue)] hover:border-[var(--color-frost-blue)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 border border-white/20 px-6 py-3 rounded-full backdrop-blur-sm bg-white/5`}
                              >
                                <span>{shownVideos.includes(project.id) ? '▼' : '▶'}</span> {shownVideos.includes(project.id) ? 'Hide Video' : 'Demo Video'}
                              </button>
                            )}

                            <button onClick={(e) => {
                              e.stopPropagation();
                              toggleProject(project.id);
                              setTimeout(() => {
                                document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }, 500);
                            }} className="flex items-center gap-2 text-xs font-body tracking-widest uppercase text-white/50 hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all duration-300">
                              ✕ Close
                            </button>
                          </>
                        )}
                      </motion.div>

                      <AnimatePresence>
                        {isExpanded && shownVideos.includes(project.id) && project.video && (
                          <motion.div
                            id={`video-${project.id}`}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                          >
                            <video
                              src={project.video}
                              autoPlay
                              loop
                              controls
                              className="w-full h-auto max-h-[60vh] object-contain bg-black/50"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative z-10 text-center py-20">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-md"
              >
                Connect with me
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-body text-[var(--color-frost-light)] opacity-80 mb-12 max-w-md mx-auto"
              >
                Open to Opportunities
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-8"
              >
                <a href="mailto:sankalprajsingh14@gmail.com" className="text-white/60 hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-300 hover:scale-110" aria-label="Email">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/sankalprajsingh" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[var(--color-frost-blue)] hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </motion.div>
            </section>

          </main>

          <footer className="flex flex-col items-center justify-center pt-16 pb-8 font-body text-[var(--color-frost-light)] tracking-widest uppercase border-t border-white/10 bg-[#080f1a]/80 backdrop-blur-md relative z-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-4 group mb-12"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/10 group-hover:border-[var(--color-frost-blue)] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                <svg className="w-6 h-6 text-white group-hover:text-[var(--color-frost-blue)] transition-all duration-300 transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <span className="text-[10px] font-bold opacity-60 group-hover:opacity-100 group-hover:text-[var(--color-frost-blue)] transition-colors duration-300">Trace to Top</span>
            </button>
            <div className="text-xs opacity-50">SANKALP RAJ SINGH</div>
          </footer>
        </motion.div>
      )}
    </>
  )
}

export default App
