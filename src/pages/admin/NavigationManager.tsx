import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, Globe, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

export default function NavigationManager() {
  const [headerLinks, setHeaderLinks] = useState<NavLink[]>([
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'Twitter', url: '#' },
    { platform: 'Instagram', url: '#' },
    { platform: 'LinkedIn', url: '#' },
  ]);

  const [logo, setLogo] = useState('https://via.placeholder.com/150');
  const [isSaving, setIsSaving] = useState(false);

  const addHeaderLink = () => setHeaderLinks([...headerLinks, { label: 'New Link', path: '/' }]);
  const removeHeaderLink = (index: number) => setHeaderLinks(headerLinks.filter((_, i) => i !== index));

  const addSocialLink = () => setSocialLinks([...socialLinks, { platform: 'Platform', url: '#' }]);
  const removeSocialLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-12 max-w-4xl">
      {/* Header Links */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold tracking-tight">Header Menu</h3>
          <button onClick={addHeaderLink} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>
        <div className="grid gap-3">
          {headerLinks.map((link, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-center">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">Label</label>
                <input 
                  value={link.label}
                  onChange={(e) => {
                    const newLinks = [...headerLinks];
                    newLinks[i].label = e.target.value;
                    setHeaderLinks(newLinks);
                  }}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold"
                />
              </div>
              <div className="flex-[2] space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">Path</label>
                <input 
                  value={link.path}
                  onChange={(e) => {
                    const newLinks = [...headerLinks];
                    newLinks[i].path = e.target.value;
                    setHeaderLinks(newLinks);
                  }}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-neutral-400"
                />
              </div>
              <button onClick={() => removeHeaderLink(i)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold tracking-tight">Social Presence</h3>
          <button onClick={addSocialLink} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Social
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-center">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500">Platform</label>
                <input 
                  value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...socialLinks];
                    newLinks[i].platform = e.target.value;
                    setSocialLinks(newLinks);
                  }}
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold"
                />
              </div>
              <button onClick={() => removeSocialLink(i)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Branding */}
      <section className="p-8 rounded-[2rem] bg-orange-600/10 border border-orange-500/20 space-y-6">
        <h3 className="text-xl font-bold tracking-tight">Brand Identity</h3>
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            {logo ? <img src={logo} className="w-full h-full object-contain p-4" /> : <ImageIcon className="w-8 h-8 text-neutral-600" />}
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Logo Image URL</label>
              <input 
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      <button 
        onClick={handleSave}
        className="fixed bottom-12 right-12 px-8 py-4 bg-white text-black rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95"
      >
        <Save className="w-5 h-5" />
        {isSaving ? 'Synching Ether...' : 'Save Global UI'}
      </button>
    </div>
  );
}
