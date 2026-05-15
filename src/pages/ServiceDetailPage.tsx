import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MessageSquare, Zap, Target, TrendingUp } from 'lucide-react';
import { DynamicIcon } from '../lib/icons';

interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  processJson: string;
  featuresJson: string;
  image: string;
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-[#050505]"><div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!service) return <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#050505] text-white">Service Not Found <Link to="/" className="mt-4 text-orange-500">Go Home</Link></div>;

  const process = JSON.parse(service.processJson || '[]');
  const features = JSON.parse(service.featuresJson || '[]');

  return (
    <div className="pt-32 pb-40 px-6 dark:bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 text-neutral-500 hover:text-orange-500 transition-colors font-mono text-[10px] uppercase tracking-widest mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-orange-500/10 flex items-center justify-center mb-8">
              <DynamicIcon name={service.iconName} className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 dark:text-white leading-none">
              {service.name}
            </h1>
            <p className="text-xl dark:text-neutral-400 font-light leading-relaxed mb-12">
              {service.longDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-700 transition-all flex items-center gap-3">
                Start a Project
                <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-square rounded-[4rem] overflow-hidden border border-white/5 bg-neutral-900 relative group"
          >
            {service.image ? (
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/5">
                <DynamicIcon name={service.iconName} className="w-40 h-40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-40">
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Features</p>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-12 dark:text-white">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/5 bg-white/2 flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" />
                <span className="text-lg font-medium dark:text-neutral-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div>
          <p className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Methodology</p>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-12 dark:text-white">Delivery Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] border border-white/5 bg-white/2 hover:border-orange-500/20 transition-all group"
              >
                <div className="text-6xl font-black text-white/5 mb-6 group-hover:text-orange-500/20 transition-colors">0{i + 1}</div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{step.title}</h3>
                <p className="text-sm dark:text-neutral-400 font-light leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
