import { motion } from 'motion/react';
import { Target, CheckCircle2, Shield, Zap, Layout, Terminal } from 'lucide-react';

const reasons = [
  { icon: Zap, title: "Surgical Speed", desc: "Optimizing every function and asset for zero latency and high response." },
  { icon: Shield, title: "Hardened Security", desc: "Building fortress-level data integrity into every backend layer." },
  { icon: CheckCircle2, title: "Clean Code", desc: "Obsessive focus on readable, maintainable, and documentable syntax." },
  { icon: Layout, title: "Premium UI/UX", desc: "Bridging architectural depth with high-fidelity, cinematic visual design." },
  { icon: Terminal, title: "Professional Workflow", desc: "Git-based collaboration with automated CI/CD pipelines." },
  { icon: Target, title: "SEO Centric", desc: "Semantic site structure for maximum visibility and index performance." }
];

export default function WhyChooseMe() {
  return (
    <section className="py-40 px-6 border-t border-white/5 relative overflow-hidden" id="why">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Value Proposition</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">Why <br />Execution <br />Matters.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] border border-white/5 bg-white/2 hover:border-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors duration-500">
                <item.icon className="w-6 h-6 text-neutral-500 group-hover:text-black transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
              <p className="text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-400 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
