import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-32 pb-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-white dark:via-black/40 dark:to-black z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-10 text-neutral-900 dark:text-white">
            CREATING <br />
            <span className="text-neutral-200 dark:text-white/20 select-none">FUTURE</span> <br />
            INFRA.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-light mb-16 px-4 leading-relaxed">
            Surgical precision in code. Cinematic excellence in design. 
            Engineering high-performance digital systems for the global visionaries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 group"
            >
              Start Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full font-bold text-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-3xl hover:bg-black/10 dark:hover:bg-white/10 transition-all text-neutral-900 dark:text-white"
            >
              Explore Portfolio
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full animate-pulse " style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 dark:from-white to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-neutral-500 dark:text-white">Scroll to Explore</span>
      </div>
    </section>
  );
}
