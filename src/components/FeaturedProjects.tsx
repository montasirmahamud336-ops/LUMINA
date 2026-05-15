import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Quantum Ledger",
    category: "Fintech Architecture",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Firebase", "Web3"],
    color: "from-blue-600/20 to-indigo-600/20"
  },
  {
    title: "Aether OS",
    category: "Cloud Infrastructure",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "fastAPI", "AWS"],
    color: "from-orange-600/20 to-red-600/20"
  },
  {
    title: "Synapse AI",
    category: "Machine Learning",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "Tensorflow", "FastAPI"],
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    title: "Omni Dashboard",
    category: "SaaS Platform",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    color: "from-emerald-600/20 to-teal-600/20"
  }
];

export default function FeaturedProjects() {
  return (
    <section className="py-40 px-6 border-t border-black/5 dark:border-white/5" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div>
            <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Case Studies</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-neutral-900 dark:text-white">Featured <br />Projects.</h2>
          </div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            View All Archives <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] mb-8 group-hover:border-black/10 dark:group-hover:border-white/10 transition-all duration-700">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-20 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-40`} />
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
                   <div className="flex gap-4">
                     <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
                        <ExternalLink className="w-6 h-6" />
                     </motion.button>
                     <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full bg-neutral-900 border border-white/20 text-white flex items-center justify-center">
                        <Github className="w-6 h-6" />
                     </motion.button>
                   </div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Details / Case Study</p>
                </div>
              </div>

              <div className="px-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 dark:border-white/5 bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-1">{p.category}</span>
                    <h4 className="text-3xl font-bold tracking-tighter group-hover:tracking-normal transition-all text-neutral-900 dark:text-white">{p.title}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
