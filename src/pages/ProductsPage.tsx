import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, ShieldCheck } from 'lucide-react';

const storeProducts = [
  { 
    id: 'saas-starter-kit',
    name: 'SaaS Starter Kit', 
    price: '$199', 
    category: 'Full-Stack Framework',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' 
  },
  { 
    id: 'component-library',
    name: 'Component Library', 
    price: '$49', 
    category: 'UI/UX Assets',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000' 
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-32 px-6 bg-[#050505] pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <p className="text-orange-500 font-mono text-xs uppercase tracking-[0.4rem] mb-6">Digital Store</p>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-12 uppercase">ASSETS.</h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Exclusive technical frameworks and design systems built for high-performance production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {storeProducts.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <Link to={`/products/${p.id}`}>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-neutral-900">
                  <img src={p.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{p.category}</span>
                    <h3 className="text-3xl font-bold tracking-tight mb-2">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-emerald-500 font-mono font-bold text-xl">{p.price}</p>
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="text-xl font-bold">Instant Access</h4>
            <p className="text-neutral-500 text-sm font-light">Upon acquisition, receive immediate digital distribution of source code and assets.</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold">Secure Frameworks</h4>
            <p className="text-neutral-500 text-sm font-light">Every asset undergoes rigorous security audits before entering the collective store.</p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-8 h-8 text-emerald-500" />
            </div>
            <h4 className="text-xl font-bold">Enterprise Logic</h4>
            <p className="text-neutral-500 text-sm font-light">Built for industrial scale, ensuring your implementation stays resilient under load.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
