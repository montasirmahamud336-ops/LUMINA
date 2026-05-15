import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Code2, Cpu, Globe } from 'lucide-react';

const projects = {
  'neural-core': {
    title: "NEURAL-CORE",
    category: "AI Infrastructure",
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    desc: "A high-performance neural engine for distributed AI computations, utilizing decentralized node logic.",
    tech: ["Python", "Rust", "Docker", "PyTorch", "gRPC"],
    challenge: "Scaling real-time inference across heterogeneous edge devices while maintaining low latency.",
    solution: "Implemented a custom scheduler in Rust that optimizes task distribution based on node capacity and network health."
  },
  'distributed-ledger': {
    title: "DISTRIBUTED LEDGER",
    category: "Web3 Engineering",
    hero: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000",
    desc: "A scalable layer-2 solution for high-throughput financial transactions with instant finality.",
    tech: ["Solidity", "Go", "Ethers.js", "Redis", "Kafka"],
    challenge: "Achieving true decentralization without sacrificing transaction per second (TPS) metrics.",
    solution: "Developed a hybrid consensus mechanism that validates transactions in parallel across multiple side-chains."
  },
  'kube-control': {
    title: "KUBE-CONTROL",
    category: "DevOps & SRE",
    hero: "https://images.unsplash.com/photo-1667372333374-0d2d885ee5a8?auto=format&fit=crop&q=80&w=2000",
    desc: "Autonomous orchestration mesh for multi-cloud Kubernetes clusters with AI-driven self-healing.",
    tech: ["Kubernetes", "Terraform", "Prometheus", "Grafana", "Go"],
    challenge: "Managing cluster drift across different cloud providers with varying API behaviors.",
    solution: "Built a custom controller using the Operator pattern that abstracts cloud-specific logic into a unified state."
  },
  'ether-proto': {
    title: "ETHER-PROTO",
    category: "SaaS Framework",
    hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000",
    desc: "A rapid-deployment framework for high-fidelity SaaS applications with built-in identity and billing.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Prisma"],
    challenge: "Providing extreme flexibility for developers while maintaining a standardized core that receives regular updates.",
    solution: "Used a plugin-based architecture where core features are immutable but extensible through well-defined hooks."
  }
};

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black pb-20">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={project.hero} 
          className="w-full h-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
          <div className="max-w-7xl mx-auto">
            <Link to="/portfolio" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-all mb-8 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              BACK TO LOG
            </Link>
            <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.4rem] mb-4">{project.category}</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6">Brief Overview</h2>
              <p className="text-2xl font-light leading-relaxed text-neutral-300">
                {project.desc}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/10">
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-6">The Challenge</h3>
                <p className="text-neutral-400 leading-relaxed font-light">{project.challenge}</p>
              </section>
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6">The Solution</h3>
                <p className="text-neutral-400 leading-relaxed font-light">{project.solution}</p>
              </section>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/2">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8">System Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map(t => (
                  <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all active:scale-95">
                Launch Live Session
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="w-full py-5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-neutral-400 hover:text-white">
                View Source Repository
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
