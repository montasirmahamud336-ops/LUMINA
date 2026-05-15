import { motion } from 'motion/react';
import { Code2, Cpu, Globe, Rocket, Shield, Zap, Terminal, Database } from 'lucide-react';

const serviceTiers = [
  {
    title: "Technical Architecture",
    icon: Globe,
    desc: "Designing the skeletal structure of complex digital systems with a focus on scalability and security.",
    specs: ["Cloud Native", "SQL/NoSQL Hybrid", "Microservices", "Event-Driven"],
    color: "from-blue-600/20 to-cyan-600/20"
  },
  {
    title: "Full-Stack Engineering",
    icon: Terminal,
    desc: "High-performance application development using modern reactive frameworks and secure backend logic.",
    specs: ["Next.js 15", "Turborepo", "GraphQL / tRPC", "Auth0 / Firebase"],
    color: "from-orange-600/20 to-rose-600/20"
  },
  {
    title: "AI / SaaS Infrastructure",
    icon: Cpu,
    desc: "Integrating intelligent logic and machine learning models into existing workflows to boost efficiency.",
    specs: ["RAG Pipelines", "Vector Databases", "Prompt Engineering", "Custom LLMs"],
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    title: "Security & DevOps",
    icon: Shield,
    specs: ["Pen-Testing", "CI/CD Hardening", "IaC (Terraform)", "SRE Monitoring"],
    desc: "Ensuring zero-downtime deployments and resilient system health through automated monitoring.",
    color: "from-emerald-600/20 to-teal-600/20"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-40"
        >
          <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.4rem] mb-6">Capabilities</p>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 uppercase">SERVICES.</h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Surgical technical solutions for founders and standard-setters who demand high-performance digital infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceTiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/2 hover:border-white/10 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${tier.color} blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-orange-500/10 transition-all duration-500">
                <tier.icon className="w-7 h-7 text-neutral-600 group-hover:text-orange-500 transition-colors" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:tracking-normal transition-all">{tier.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 font-light">{tier.desc}</p>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-8 border-t border-white/5">
                {tier.specs.map(spec => (
                  <div key={spec} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500/50" />
                    <span className="text-[9px] font-bold font-mono text-neutral-500 uppercase tracking-widest">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Method - Terminal Style */}
        <section className="mt-60">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-16 px-4">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-sm font-bold font-mono text-neutral-600 uppercase tracking-[0.5em]">System Logic / Workflow</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <div className="space-y-4">
              {[
                { id: '01', name: 'System Audit', task: 'analyzing_infrastructure' },
                { id: '02', name: 'Blueprinting', task: 'architectural_mapping' },
                { id: '03', name: 'Implementation', task: 'surgical_coding' },
                { id: '04', name: 'Deployment', task: 'zero_downtime_push' }
              ].map(step => (
                <div key={step.id} className="flex items-center justify-between p-10 rounded-3xl border border-white/5 hover:bg-white/5 transition-all group cursor-default">
                  <div className="flex items-center gap-12">
                    <span className="text-sm font-mono text-neutral-700 group-hover:text-orange-500 transition-colors">[{step.id}]</span>
                    <h4 className="text-2xl font-bold tracking-tight">{step.name}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-neutral-600">STATE:</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">READY_{step.task}.sh</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
