import { motion } from 'motion/react';
import { Twitter, Instagram, Linkedin, Mail, ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative py-40 px-6 bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-orange-600/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-black tracking-widest mb-10 block uppercase text-neutral-900 dark:text-white">
               LUMINA<span className="text-orange-500">.</span>
            </Link>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 uppercase leading-none text-neutral-900 dark:text-white">
              Building <br />Resilient <br />Legacies.
            </h2>
            <div className="flex gap-4">
               {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                 <a 
                  key={i}
                  href="#"
                  className="w-14 h-14 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/2 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all duration-500 text-neutral-400 hover:text-white"
                 >
                   <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10 text-neutral-500 dark:text-neutral-600">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Digital Identity</Link></li>
              <li><Link to="/services" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/portfolio" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Case Archives</Link></li>
              <li><Link to="/products" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Lab Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10 text-neutral-500 dark:text-neutral-600">Open Data</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Node</a></li>
              <li><a href="#" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">System Terms</a></li>
              <li><a href="#" className="text-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Media Kit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/5 dark:border-white/5">
          <p className="text-[10px] font-mono text-neutral-700 tracking-widest uppercase">
            © 2026 MONTASIR DEV STUDIO — ARCHITECTURAL INTEGRITY GUARANTEED.
          </p>
          <div className="flex gap-10 mt-6 md:mt-0">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-neutral-600 uppercase">Systems Operational</span>
             </div>
             <span className="text-[9px] font-mono text-neutral-700">V.4.2.0-STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
