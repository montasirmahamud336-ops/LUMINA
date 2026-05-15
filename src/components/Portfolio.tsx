import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: "neural-core",
    title: "NEURAL-CORE",
    category: "AI Infrastructure",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    color: "from-blue-600 to-indigo-900"
  },
  {
    id: "distributed-ledger",
    title: "DISTRIBUTED LEDGER",
    category: "Web3 Engineering",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
    color: "from-orange-600 to-rose-900"
  },
  {
    id: "kube-control",
    title: "KUBE-CONTROL",
    category: "DevOps & SRE",
    image: "https://images.unsplash.com/photo-1667372333374-0d2d885ee5a8?auto=format&fit=crop&q=80&w=1000",
    color: "from-emerald-600 to-teal-900"
  },
  {
    id: "ether-proto",
    title: "ETHER-PROTO",
    category: "SaaS Framework",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
    color: "from-purple-600 to-violet-900"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">PORTFOLIO</h2>
          </div>
          <Link to="/portfolio" className="text-white hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm font-bold uppercase tracking-widest">
            View All Projects
            <div className="w-8 h-[1px] bg-white group-hover:bg-orange-500 transition-colors" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
            >
              <Link to={`/portfolio/${project.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-neutral-900">
                  {/* Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-10`} />
                  
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 flex flex-col justify-end p-12 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs font-bold tracking-widest text-white/50 uppercase mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter flex items-center gap-4">
                      {project.title}
                      <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
