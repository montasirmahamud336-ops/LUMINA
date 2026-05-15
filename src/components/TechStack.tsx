import { motion } from 'motion/react';
import { 
  Braces, 
  Database, 
  Globe, 
  Layout, 
  Terminal, 
  Zap, 
  Shield, 
  Cpu
} from 'lucide-react';

const techItems = [
  { name: "React", icon: Layout },
  { name: "Next.js", icon: Globe },
  { name: "Three.js", icon: Zap },
  { name: "TypeScript", icon: Braces },
  { name: "Node.js", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "FastAPI", icon: Cpu },
  { name: "Python", icon: Shield }
];

export default function TechStack() {
  return (
    <section className="py-32 px-6 border-t border-black/5 dark:border-white/5 overflow-hidden text-neutral-900 dark:text-white">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-wrapper {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .scrolling-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-7xl mx-auto overflow-hidden relative">
        <div className="scrolling-wrapper opacity-50 dark:opacity-30 hover:opacity-100 grayscale hover:grayscale-0 transition-opacity duration-1000">
          {[...techItems, ...techItems].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-4 group cursor-default shrink-0 mr-24"
            >
              <tech.icon className="w-8 h-8 group-hover:text-orange-500 transition-colors" />
              <span className="text-xl font-bold tracking-tighter uppercase font-mono">{tech.name}</span>
            </div>
          ))}
        </div>
        
        {/* Gradients for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10" />
      </div>
    </section>
  );
}
