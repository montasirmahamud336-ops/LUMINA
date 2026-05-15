import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, Save, Palette, Globe, CheckCircle, AlertCircle } from 'lucide-react';

export default function GlobalSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [settings, setSettings] = useState({
    primaryColor: '#ea580c',
    secondaryColor: '#2563eb',
    siteName: 'Lumina Digital Agency'
  });

  useEffect(() => {
    fetch('/api/settings/global')
      .then(res => res.json())
      .then(data => {
        setSettings({
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          siteName: data.siteName
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching settings:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/settings/global', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Fix if using cookies
        },
        body: JSON.stringify(settings)
      });

      if (!res.ok) throw new Error('Failed to update settings');

      // Update root CSS variables immediately
      const root = document.documentElement;
      root.style.setProperty('--primary', settings.primaryColor);
      root.style.setProperty('--secondary', settings.secondaryColor);

      setMessage({ type: 'success', text: 'Settings updated successfully node.' });
      
      // Force refresh or emit event for other components if needed
      window.dispatchEvent(new Event('settingsUpdated'));
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center text-neutral-900 dark:text-white">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Global Config</h1>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-2">Neural network parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[2rem] p-10 border border-black/5 dark:border-white/5"
        >
          <form onSubmit={handleSave} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2 text-neutral-900 dark:text-white">
                <Globe className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-bold uppercase tracking-tight">Identity</h3>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 ml-4">Site Name</label>
                <input 
                  type="text"
                  value={settings.siteName}
                  onChange={e => setSettings({...settings, siteName: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-colors text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2 text-neutral-900 dark:text-white">
                <Palette className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold uppercase tracking-tight">Visual Theme</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 ml-4">Primary Color</label>
                  <div className="flex gap-4">
                    <input 
                      type="color"
                      value={settings.primaryColor}
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-12 h-14 bg-transparent border-none p-0 cursor-pointer"
                    />
                    <input 
                      type="text"
                      value={settings.primaryColor}
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-colors font-mono text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 ml-4">Secondary Color</label>
                  <div className="flex gap-4">
                    <input 
                      type="color"
                      value={settings.secondaryColor}
                      onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                      className="w-12 h-14 bg-transparent border-none p-0 cursor-pointer"
                    />
                    <input 
                      type="text"
                      value={settings.secondaryColor}
                      onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                      className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-colors font-mono text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${
                message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}

            <button 
              type="submit"
              disabled={saving}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              {saving ? 'Synchronizing...' : (
                <>
                  <Save className="w-5 h-5" />
                  Apply Signal Changes
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold uppercase tracking-tight ml-4 text-neutral-900 dark:text-white">Preview</h3>
          <div className="glass rounded-[2rem] p-10 space-y-8 border border-black/5 dark:border-white/5">
             <div className="p-8 rounded-3xl bg-neutral-900 border border-white/10 space-y-6">
                <div className="flex items-center gap-4">
                   <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: settings.primaryColor }}
                   >
                     <Settings className="text-white w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-white uppercase">{settings.siteName}</h4>
                     <p className="text-white/40 text-xs font-mono">Live Simulation</p>
                   </div>
                </div>
                
                <div className="h-[2px] w-full bg-white/5" />
                
                <div className="space-y-4">
                  <div 
                    className="h-10 w-full rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    Primary Action
                  </div>
                  <div 
                    className="h-10 w-full rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: settings.secondaryColor }}
                  >
                    Secondary Action
                  </div>
                </div>
             </div>

             <div className="space-y-4">
                <p className="text-sm text-neutral-500 leading-relaxed">
                  These parameters will alter the visual signature of the entire platform. 
                  Colors are applied as CSS variables and will propagate through the neural network.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase">Variable Injection</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 uppercase">Root Scope</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
