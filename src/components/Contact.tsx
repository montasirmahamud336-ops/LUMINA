import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Linkedin, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-40 px-6 relative overflow-hidden" id="contact">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-full bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Open Channel</p>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase mb-12 leading-none text-neutral-900 dark:text-white">
              Let's <br />Arch— <br />itect.
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-500 font-light leading-relaxed mb-16 max-w-md">
               I am currently taking on high-fidelity projects and structural consulting. Let's build something lasting.
            </p>
            
            <div className="space-y-10">
              <div className="group cursor-default">
                 <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Direct Mail</p>
                 <a href="mailto:montasirmahamud336@gmail.com" className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white hover:text-orange-500 transition-colors">
                   hello@montasir.dev
                 </a>
              </div>
              
              <div className="flex gap-4">
                 {[Twitter, Instagram, Linkedin, MessageSquare].map((Icon, i) => (
                   <motion.button 
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--hover-bg)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/2 flex items-center justify-center transition-all"
                   >
                     <Icon className="w-5 h-5 text-neutral-400" />
                   </motion.button>
                 ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-emerald-500 hover:text-black transition-all"
              >
                WhatsApp Priority
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 md:p-14 rounded-[3.5rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-white/2 backdrop-blur-3xl shadow-2xl shadow-black/5"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 px-4 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500 ml-4">Email Addr</label>
                    <input 
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 px-4 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-white/10"
                    />
                  </div>
               </div>
               
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500 ml-4">Brief Scope</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 px-4 py-4 text-xl focus:outline-none focus:border-orange-500 transition-colors resize-none text-neutral-900 dark:text-white placeholder:text-neutral-300 dark:placeholder:text-white/10"
                  />
               </div>

               <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-black dark:bg-white text-white dark:text-black rounded-3xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 group shadow-xl"
               >
                 Transmit Mission
                 <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
