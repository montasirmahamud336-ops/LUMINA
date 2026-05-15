import { motion } from 'motion/react';
import { Globe, Code2, Database, ShieldCheck, Zap, Cog, Smartphone, Cloud } from 'lucide-react';

const skillGroups = [
  {
    name: "Frontend Architecture",
    icon: Globe,
    skills: ["React / Next.js", "Three.js / WebGL", "Tailwind CSS", "Framer Motion", "GSAP Animations"]
  },
  {
    name: "Backend Infrastructure",
    icon: Database,
    skills: ["Node.js / Express", "Go / Python", "PostgreSQL / MongoDB", "Redis / Queues", "GraphQL / tRPC"]
  },
  {
    name: "System Engineering",
    icon: ShieldCheck,
    skills: ["Cloud Native (AWS/GCP)", "Docker / Kubernetes", "CI/CD Hardening", "Terraform / IaC", "SRE / Monitoring"]
  },
  {
    name: "Specializations",
    icon: Zap,
    skills: ["LLM Orchestration", "Real-time WebSockets", "SaaS Multi-tenancy", "Auth0 / FireBase", "Stripe / Fintech"]
  }
];

export default function Skills() {
  return (
    <section className="py-40 px-6 border-t border-black/5 dark:border-white/5" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Core Stack</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-neutral-900 dark:text-white">Technical <br />Ecosystem.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/2 hover:border-black/20 dark:hover:border-white/10 transition-all group shadow-sm"
            >
              <group.icon className="w-10 h-10 text-neutral-400 dark:text-neutral-600 group-hover:text-orange-500 transition-colors mb-10" />
              <h4 className="text-xl font-bold mb-8 tracking-tight text-neutral-900 dark:text-white transition-colors">{group.name}</h4>
              <ul className="space-y-4">
                {group.skills.map((skill, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 font-light transition-colors">
                    <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/20 group-hover:bg-orange-500 transition-all duration-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Marquee or extra tech icons could go here */}
      </div>
    </section>
  );
}
