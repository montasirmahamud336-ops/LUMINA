import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
} from 'lucide-react';
import { DynamicIcon } from '../lib/icons';

interface Service {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  shortDescription: string;
  featuresJson: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(() => {});
  }, []);

  // Fallback to static list if none in DB
  const displayServices = services.length > 0 ? services : [
    {
      id: '1',
      slug: 'technical-architecture',
      name: "Technical Architecture",
      iconName: 'Globe',
      shortDescription: "Designing the skeletal structure of complex digital systems with a focus on scalability and security.",
      featuresJson: '["Scalable Data Logic", "System Blueprints", "API Engineering", "Zero-Latency Flows"]'
    },
    {
      id: '2',
      slug: 'full-stack-development',
      name: "Full-Stack Development",
      iconName: 'Code',
      shortDescription: "Building high-performance applications using React, Next.js, and robust server-side technologies.",
      featuresJson: '["Reactive Interfaces", "Distributed Backend", "Real-time Sync", "Edge Computing"]'
    }
  ];

  return (
    <section className="py-40 px-6 border-t border-black/5 dark:border-white/5" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end mb-24">
          <div className="lg:col-span-2">
            <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">What I Deliver</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-neutral-900 dark:text-white">Surgical <br />Capabilities.</h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-500 font-light text-lg leading-relaxed border-l border-black/10 dark:border-white/10 pl-8 mb-4">
             I combine technical mastery with creative intuition to solve problems before they even register as obstacles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayServices.map((service, i) => {
            const specs = JSON.parse(service.featuresJson || '[]');
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="p-12 rounded-[3.5rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/2 hover:border-black/20 dark:hover:border-white/20 transition-all duration-700 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] group relative overflow-hidden"
              >
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="flex flex-col h-full justify-between gap-12 relative z-10">
                  <div>
                     <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-10 group-hover:bg-orange-500/10 transition-colors duration-500">
                       <DynamicIcon name={service.iconName} className="w-8 h-8 text-neutral-400 group-hover:text-orange-500 transition-colors" />
                     </div>
                     <h3 className="text-3xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-white">{service.name}</h3>
                     <p className="text-neutral-600 dark:text-neutral-500 font-light leading-relaxed mb-8">{service.shortDescription}</p>
                     
                     <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 group/link">
                        Explore Methodology
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-10 border-t border-black/5 dark:border-white/5">
                    {specs.slice(0, 4).map((spec: string) => (
                      <div key={spec} className="flex items-center gap-2">
                         <div className="w-1 h-1 rounded-full bg-orange-500/30 group-hover:bg-orange-500 transition-colors" />
                         <span className="text-[10px] font-bold font-mono text-neutral-600 uppercase tracking-widest">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
