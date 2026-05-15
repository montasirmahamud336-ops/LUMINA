import { motion } from 'motion/react';
import { Code2, Palette, Terminal, Cpu, Coffee, Github, Twitter, Linkedin, ExternalLink, Download } from 'lucide-react';

const skills = [
  { name: 'Frontend', items: ['React', 'Next.js', 'Three.js', 'Tailwind', 'Framer Motion'], color: 'text-blue-500' },
  { name: 'Backend', items: ['Node.js', 'Express', 'Firebase', 'Groq SDK', 'PostgreSQL'], color: 'text-orange-500' },
  { name: 'Design', items: ['Figma', 'Blender', 'Cinema 4D', 'Creative Coding', 'UI/UX'], color: 'text-emerald-500' },
  { name: 'Systems', items: ['Docker', 'Vercel', 'AWS', 'Linux Terminal', 'Git'], color: 'text-purple-500' },
];

const experience = [
  { year: '2024 - Present', role: 'Full-Stack Architect', company: 'Self-Employed / Studio', desc: 'Engineering high-fidelity digital platforms and technical infrastructures for global visionary clients.' },
  { year: '2022 - 2024', role: 'Lead Software Engineer', company: 'TechNova Solutions', desc: 'Spearheaded a team of 12 engineers building scalable SaaS platforms with real-time data visualizations.' },
  { year: '2020 - 2022', role: 'Interactive Developer', company: 'Studio Matrix', desc: 'Focused on creative technology and WebGL-based experiences for global luxury brands.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group"
          >
            <img 
              src="https://picsum.photos/seed/montasir/800/800" 
              alt="Montasir Mahamud" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
              <h2 className="text-3xl font-bold tracking-tight">Montasir Mahamud</h2>
              <p className="text-orange-500 font-mono text-xs uppercase tracking-widest">Founder & Developer</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.4rem] mb-6">Expertise Overview</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                ARCHITECTING THE <br/>FUTURE OF WEB.
              </h1>
              <p className="text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
                I am a technical director and full-stack architect specializing in high-performance digital experiences. 
                My work exists at the intersection of creative intuition and surgical technical precision.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-6">
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all active:scale-95">
                <Download className="w-5 h-5" />
                Curriculum Vitae
              </button>
              <div className="flex gap-4">
                <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <section className="mb-48">
          <div className="mb-20 flex justify-between items-end">
            <h3 className="text-4xl font-bold tracking-tighter uppercase">Technical <br/>Core Stack.</h3>
            <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest hidden md:block">v.4.2.0-stable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] border border-white/5 bg-white/2 hover:border-white/20 transition-all group"
              >
                <h4 className={skill.color + " text-[10px] font-bold uppercase tracking-[0.3em] mb-10 group-hover:tracking-[0.4em] transition-all"}>{skill.name}</h4>
                <ul className="space-y-4">
                  {skill.items.map(item => (
                    <li key={item} className="text-neutral-300 font-medium tracking-tight flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy Block - To address "shortness" */}
        <section className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-white/2 p-16 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent opacity-50" />
              <div className="relative text-center">
                <Terminal className="w-24 h-24 text-neutral-800 mx-auto mb-10" />
                <blockquote className="text-3xl font-light italic text-neutral-400 mb-8 leading-relaxed font-sans">
                  "Execution is the only currency that matters in digital infrastructure. Scalability is not a feature, it is an obligation."
                </blockquote>
                <cite className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">— Architectural Motto</cite>
              </div>
            </div>
            <div className="space-y-12">
              <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.4rem]">Philosophy</p>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">Engineering <br/>Integrity.</h3>
              <div className="space-y-8">
                {[
                  { title: "Scalable Logic", desc: "Building systems that don't just work, but flourish under extreme load and complexity." },
                  { title: "Obsessive Performance", desc: "Every millisecond is a structural weakness. I optimize recursively for zero latency." },
                  { title: "User Intuition", desc: "Data is useless if it's not accessible. I bridge the gap between backend depth and frontend clarity." }
                ].map((item, i) => (
                  <div key={i} className="group cursor-default">
                    <h5 className="text-lg font-bold tracking-tight mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h5>
                    <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline - Surgical & Sleek */}
        <section className="mt-40">
          <div className="mb-20">
            <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5rem] mb-4">Historical Archive</p>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">Professional <br/>Logbook.</h3>
          </div>

          <div className="space-y-3">
            {experience.map((exp, i) => (
              <motion.div 
                key={exp.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="p-6 md:p-10 rounded-[2rem] border border-white/5 bg-white/1 hover:border-white/20 transition-all duration-700 hover:bg-white/[0.04]">
                  {/* Subtle Accent Line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-orange-500 group-hover:h-12 transition-all duration-700" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold font-mono text-neutral-700 group-hover:text-orange-500 transition-colors uppercase tracking-widest">
                          {exp.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                        <h4 className="text-2xl md:text-4xl font-bold tracking-tighter transition-all duration-500 group-hover:tracking-tight">
                          {exp.role} 
                        </h4>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3 py-1 rounded-full border border-white/5 bg-white/2">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-base text-neutral-400 font-light leading-relaxed max-w-4xl">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
