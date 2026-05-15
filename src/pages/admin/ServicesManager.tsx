import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit2, Save, X, Globe, Code, Box, Cpu, Laptop, Smartphone, Search, Check, ChevronDown, ListPlus } from 'lucide-react';
import { DynamicIcon, availableIcons } from '../../lib/icons';

interface Service {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  processJson: string;
  featuresJson: string;
  image: string;
  published: boolean;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    iconName: 'Globe',
    shortDescription: '',
    longDescription: '',
    processJson: '[]',
    featuresJson: '[]',
    published: true
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
  };

  const handleSave = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/services/${editingId}` : '/api/services';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setEditingId(null);
      setIsAdding(false);
      fetchServices();
      setFormData({
        name: '',
        slug: '',
        iconName: 'Globe',
        shortDescription: '',
        longDescription: '',
        processJson: '[]',
        featuresJson: '[]',
        published: true
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      fetchServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setIsAdding(true);
  };

  const filteredIcons = availableIcons.filter(name => 
    name.toLowerCase().includes(iconSearch.toLowerCase())
  ).slice(0, 50); // Show only 50 at once for performance

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white uppercase">Services Manager</h1>
          <p className="text-neutral-500 mt-2 font-mono text-xs uppercase tracking-widest">Manage your digital capabilities</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-orange-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
          >
            <Plus className="w-4 h-4" />
            Add New Service
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/5 p-12 mb-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold dark:text-white">{editingId ? 'Edit Service' : 'New Service'}</h2>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-neutral-500 hover:text-white"><X /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-2">Service Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-colors text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-2">URL Slug</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-orange-500 transition-colors text-neutral-900 dark:text-white"
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-2">Icon Select</label>
                <button 
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full flex items-center justify-between bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <DynamicIcon name={formData.iconName || 'Globe'} className="w-5 h-5 text-orange-500" />
                    <span>{formData.iconName}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showIconPicker && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-3xl p-4 shadow-2xl max-h-80 overflow-y-auto">
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Search icons..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 mb-4 text-sm"
                      value={iconSearch}
                      onChange={e => setIconSearch(e.target.value)}
                    />
                    <div className="grid grid-cols-5 gap-2">
                      {filteredIcons.map(name => (
                        <button 
                          key={name}
                          onClick={() => { setFormData({...formData, iconName: name}); setShowIconPicker(false); }}
                          className={`p-3 rounded-xl hover:bg-orange-500 flex flex-col items-center gap-1 transition-colors ${formData.iconName === name ? 'bg-orange-600 shadow-lg' : 'bg-white/5'}`}
                          title={name}
                        >
                          <DynamicIcon name={name} className="w-5 h-5" />
                          <span className="text-[8px] font-mono truncate w-full text-center">{name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-2">Short Description</label>
                <textarea 
                  value={formData.shortDescription}
                  onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 h-32 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-2">Long Details (Professional Page Content)</label>
                <textarea 
                  value={formData.longDescription}
                  onChange={e => setFormData({...formData, longDescription: e.target.value})}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 h-[22.5rem] text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 bg-black/5 dark:bg-white/5 rounded-3xl p-8 border border-white/5">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                <ListPlus className="w-5 h-5 text-orange-500" />
                Dynamic Sections (JSON)
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-4">Process Steps (JSON Array of Title/Desc)</label>
                  <textarea 
                    value={formData.processJson}
                    onChange={e => setFormData({...formData, processJson: e.target.value})}
                    placeholder='[{"title": "Consultation", "description": "Analyzing your needs..."}]'
                    className="w-full bg-black/10 dark:bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-xs dark:text-neutral-400 h-40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-4">Features List (JSON Array of Strings)</label>
                  <textarea 
                    value={formData.featuresJson}
                    onChange={e => setFormData({...formData, featuresJson: e.target.value})}
                    placeholder='["Responsive Design", "SEO Ready", "Performance Focus"]'
                    className="w-full bg-black/10 dark:bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-xs dark:text-neutral-400 h-40"
                  />
                </div>
             </div>
          </div>

          <div className="mt-10 flex justify-end gap-4">
             <button 
               onClick={handleSave}
               className="px-10 py-4 bg-white dark:bg-white text-black dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-all"
             >
                <Save className="w-4 h-4" />
                {editingId ? 'Update Service' : 'Create Service'}
             </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 group hover:border-orange-500/50 transition-all">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                    <DynamicIcon name={service.iconName} className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="p-3 rounded-xl bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(service.id)} className="p-3 rounded-xl bg-white/5 text-neutral-400 hover:text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                  </div>
               </div>
               <h3 className="text-xl font-bold mb-3 dark:text-white">{service.name}</h3>
               <p className="text-xs text-neutral-500 font-mono mb-6 uppercase tracking-widest">/{service.slug}</p>
               <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8 line-clamp-3">{service.shortDescription}</p>
               <div className="flex items-center justify-between pt-6 border-t border-white/5">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${service.published ? 'text-green-500' : 'text-orange-500'}`}>
                    {service.published ? 'Published' : 'Draft'}
                 </span>
                 <Link 
                   to={`/services/${service.slug}`} 
                   className="text-[10px] font-black text-neutral-500 hover:text-orange-500 uppercase tracking-widest transition-colors"
                   target="_blank"
                 >
                   Preview Page
                 </Link>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
