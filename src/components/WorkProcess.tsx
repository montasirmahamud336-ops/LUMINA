import { motion } from 'motion/react';
import { Search, PenTool, Database, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  { id: '01', icon: Search, name: 'Discovery', label: 'SYSTEM_AUDIT', desc: 'Analyzing existing infrastructure and technical constraints.' },
  { id: '02', icon: PenTool, name: 'Architecture', label: 'BLUEPRINTING', desc: 'Mapping data flow, user logic, and system hierarchies.' },
  { id: '03', icon: Database, name: 'Engineering', label: 'IMPLEMENTATION', desc: 'Surgical development using modern, reactive paradigms.' },
  { id: '04', icon: ShieldCheck, name: 'Validation', label: 'TEST_AND_QC', desc: 'Rigorous security audits and high-load stress testing.' },
  { id: '05', icon: Rocket, name: 'Deployment', label: 'ZERO_DOWNTIME', desc: 'Orchestrating the push to production with full CI/CD support.' }
];

export default function WorkProcess() {
  return (
    <section className="py-40 px-6 border-t border-black/5 dark:border-white/5" id="process">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32 items-start">
           <div className="lg:col-span-1 sticky top-32">
              <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Methodology</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-10 text-neutral-900 dark:text-white">THE <br />SYSTEM <br />LOGIC.</h2>
              <p className="text-neutral-600 dark:text-neutral-500 font-light leading-relaxed max-w-sm">
                A non-linear but highly systematic approach to digital creation. We don't just build; we engineer resilience.
              </p>
           </div>
           
           <div className="lg:col-span-2 space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group relative flex items-center p-10 md:p-14 rounded-[3rem] border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/1 hover:bg-black/[0.03] dark:hover:bg-white/5 transition-all cursor-default"
                >
                  <div className="flex gap-12 items-center w-full">
                    <span className="text-sm font-mono text-neutral-300 dark:text-neutral-700 group-hover:text-orange-500 transition-colors uppercase">[{step.id}]</span>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-4">
                          <h4 className="text-2xl md:text-4xl font-bold tracking-tighter group-hover:tracking-normal transition-all text-neutral-900 dark:text-white">{step.name}</h4>
                          <span className="text-[9px] font-bold font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.3em] bg-emerald-500/10 px-3 py-1 rounded-full">
                            READY_{step.label}.sh
                          </span>
                       </div>
                       <p className="text-neutral-600 dark:text-neutral-500 text-sm md:text-lg font-light leading-relaxed max-w-xl dark:group-hover:text-neutral-300 transition-colors">
                         {step.desc}
                       </p>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
