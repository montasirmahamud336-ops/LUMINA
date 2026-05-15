import { useState } from 'react';
import { Save, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroManager() {
  const [hero, setHero] = useState({
    title: 'CRAFTING THE UNSEEN',
    subtitle: 'We architecturalize high-fidelity digital products for visionary standard-setters.',
    ctaText: 'Start a Project'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Editor Pane */}
      <div className="space-y-8">
        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Hero Main Title</label>
            <textarea 
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-bold tracking-tight focus:outline-none focus:border-white/20 transition-all resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Subtitle Description</label>
            <textarea 
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-6 text-neutral-400 focus:outline-none focus:border-white/20 transition-all resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">CTA Button Text</label>
            <input 
              value={hero.ctaText}
              onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-white/20 transition-all"
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Preview Pane */}
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-neutral-500 mb-4 px-2">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Real-time Preview</span>
        </div>
        
        <div className="aspect-video rounded-3xl border border-white/10 bg-[#050505] relative overflow-hidden flex items-center justify-center text-center p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-orange-600/10 pointer-events-none" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none mb-6">
              {hero.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 max-w-md mx-auto mb-8 font-light">
              {hero.subtitle}
            </p>
            <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-[10px] uppercase">
              {hero.ctaText}
            </button>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-white/5 bg-white/2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-600">Quick Tips</h4>
          <ul className="text-xs text-neutral-500 space-y-3 list-disc pl-4">
            <li>Keep the title under 5 words for maximum impact.</li>
            <li>Use the subtitle to explain your unique value proposition.</li>
            <li>CTA buttons work best with action-oriented verbs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
