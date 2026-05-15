import { motion } from 'motion/react';
import { Terminal, Code2, Layers, Cpu } from 'lucide-react';

export default function About() {
  const experiences = [
    { icon: Terminal, title: "Systemic Logic", val: "100%", desc: "Architecting backend reliability." },
    { icon: Code2, title: "Modern Stacks", val: "99%", desc: "React, Next.js, Node.js expert." },
    { icon: Layers, title: "Visual Depth", val: "95%", desc: "Three.js and cinematic UI." },
    { icon: Cpu, title: "AI Integration", val: "90%", desc: "LLM and RAG orchestration." }
  ];

  return (
    <section className="py-40 px-6 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Introduction</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 leading-none text-neutral-900 dark:text-white">
              Engineering <br />
              Digital <br />
              <span className="text-neutral-400 dark:text-neutral-700">Legacies.</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-12 max-w-xl">
              I am Montasir, a digital architect obsessed with technical purity. I bridge the gap between complex backend logic and immersive frontend storytelling.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {experiences.map((exp, i) => (
                <div key={i} className="space-y-3 p-8 rounded-[2rem] border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.04] dark:hover:bg-white/5 transition-all group">
                  <exp.icon className="w-6 h-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-sm uppercase tracking-tight text-neutral-900 dark:text-white">{exp.title}</h4>
                  <p className="text-[10px] text-neutral-600 dark:text-neutral-500 uppercase font-mono">{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" 
                alt="Developer Profile"
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-12 left-12 right-12">
                <div className="p-8 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-black/10 dark:border-white/10">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Active Status</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                        <div className="w-1 h-1 rounded-full bg-emerald-500/20" />
                      </div>
                   </div>
                   <p className="text-neutral-800 dark:text-neutral-300 font-light italic text-lg leading-relaxed">
                     "Code is more than syntax; it is the structural integrity of our modern world."
                   </p>
                </div>
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
