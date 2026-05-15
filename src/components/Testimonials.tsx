import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: "Alexander Voss",
    role: "CTO, Techvanguard",
    company: "Silicon Valley",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    text: "Montasir operates on a different frequency. His technical logic combined with a cinematic design eye is something we haven't found elsewhere."
  },
  {
    name: "Sarah Chen",
    role: "Founder, Aetheria.ai",
    company: "London UK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "Zero friction. Total execution. He took our complex dataset and turned it into a spatial mapping experience that our investors couldn't stop talking about."
  },
  {
    name: "Marcus Thorne",
    role: "Head of Product",
    company: "Design Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "The architectural integrity he brings to the table is unmatched. Scalability was our biggest worry, but he built a system that laughs at heavy load."
  }
];

export default function Testimonials() {
  return (
    <section className="py-40 px-6 border-t border-white/5" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Intelligence Voice</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">Client <br />Narratives.</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              viewport={{ once: true }}
              className="flex-1 p-12 rounded-[3.5rem] border border-white/5 bg-white/2 hover:border-white/10 transition-all flex flex-col justify-between group"
            >
              <div>
                <Quote className="w-12 h-12 text-orange-500/20 mb-10 group-hover:text-orange-500 transition-colors" />
                <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-6 mt-16 pt-10 border-t border-white/5">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full grayscale hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div>
                   <h5 className="font-bold tracking-tight text-white">{review.name}</h5>
                   <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{review.role}</p>
                   <p className="text-[9px] font-mono text-neutral-600 uppercase mt-1">{review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
