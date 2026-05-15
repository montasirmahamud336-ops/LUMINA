import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.4em] mb-4">Get in Touch</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">INITIATE <br/>CONNECTION.</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-8">CONTACT INFORMATION</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-600/10 group-hover:border-orange-500/20 transition-all">
                    <Mail className="w-5 h-5 text-neutral-400 group-hover:text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Email</p>
                    <p className="text-lg font-medium">dev@montasir.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                    <MessageSquare className="w-5 h-5 text-neutral-400 group-hover:text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Discord</p>
                    <p className="text-lg font-medium">montasir_dev</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-600/10 group-hover:border-emerald-500/20 transition-all">
                    <Globe className="w-5 h-5 text-neutral-400 group-hover:text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Location</p>
                    <p className="text-lg font-medium">Digital Ether // Global</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-white/5 bg-white/2 backdrop-blur-3xl">
              <h4 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">Availability</h4>
              <p className="text-neutral-400 leading-relaxed font-light">
                I am currently accepting high-fidelity engineering commissions for Q3 2026. 
                Our team responds to all inquiries within 24 operational hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] -z-10" />
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-4">Full Identity</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-4">Digital Mail</label>
                  <input type="email" placeholder="john@domain.com" className="w-full bg-white/5 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-4">Inquiry Nature</label>
                <select className="w-full bg-white/5 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all text-sm font-medium appearance-none">
                  <option className="bg-[#050505]" value="design">Product Design</option>
                  <option className="bg-[#050505]" value="brand">Brand Identity</option>
                  <option className="bg-[#050505]" value="web3">Web3 Development</option>
                  <option className="bg-[#050505]" value="ai">AI Automation</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-4">Message</label>
                <textarea rows={5} placeholder="Describe your vision..." className="w-full bg-white/5 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all text-sm font-medium resize-none"></textarea>
              </div>

              <button className="w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all group active:scale-95">
                Transmit Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
