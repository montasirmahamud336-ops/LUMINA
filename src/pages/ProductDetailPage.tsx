import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, ShieldCheck, Zap, Package, Layers } from 'lucide-react';

const products = {
  'saas-starter-kit': {
    name: 'SaaS Starter Kit',
    price: '$199',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    desc: 'The ultimate foundation for modern web applications. Battery-included with Auth, Billing, and CI/CD pipelines.',
    features: [
      { title: 'Auth Ready', desc: 'Pre-configured Firebase and NextAuth integrations.' },
      { title: 'Billing Logic', desc: 'Native Stripe support with subscription management.' },
      { title: 'Scale Ready', desc: 'Containerized with Docker for instant scaling.' },
      { title: 'Full Design System', desc: 'Tailwind configuration with custom variants.' }
    ]
  },
  'component-library': {
    name: 'Component Library',
    price: '$49',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000',
    desc: 'A surgical collection of high-fidelity UI components built with Radix and Framer Motion.',
    features: [
      { title: 'Atomic Design', desc: 'Perfectly categorized into atoms, molecules, and organisms.' },
      { title: 'Accessible', desc: 'WCAG 2.1 compliant components out of the box.' },
      { title: 'Type Safe', desc: 'Full TypeScript support for every single prop.' },
      { title: 'Animatable', desc: 'Optimized for smooth 60fps animations.' }
    ]
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products[id as keyof typeof products];

  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-all mb-12 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          RETURN TO STORE
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 group h-[600px]"
          >
            <img 
              src={product.img} 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 h-full" 
            />
          </motion.div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase">{product.name}</h1>
            <p className="text-3xl font-mono font-bold text-orange-500 mb-8">{product.price}</p>
            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
              {product.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {product.features.map(f => (
                <div key={f.title} className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-all">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">{f.title}</h4>
                  <p className="text-xs text-neutral-500 font-light">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all active:scale-95">
                Acquire Asset
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="w-20 py-5 border border-white/10 rounded-2xl font-bold flex items-center justify-center hover:bg-white/5 transition-all">
                <ShieldCheck className="w-6 h-6 text-neutral-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Technical Data Section */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
          <div>
            <Layers className="w-8 h-8 text-neutral-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">Version Control</h3>
            <p className="text-neutral-500 text-sm font-light">Current Version: 2.1.0-beta. Updated weekly with latest security patches and framework optimization.</p>
          </div>
          <div>
            <Zap className="w-8 h-8 text-neutral-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">Core Performance</h3>
            <p className="text-neutral-500 text-sm font-light">Optimized for sub-second lighthouse scores. Zero layout shift architecture with pre-bundle assets.</p>
          </div>
          <div>
            <Package className="w-8 h-8 text-neutral-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">License Type</h3>
            <p className="text-neutral-500 text-sm font-light">Enterprise usage license included. Permission granted for unlimited projects within a single organization.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
