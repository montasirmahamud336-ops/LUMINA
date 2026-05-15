import { useState } from 'react';
import { Plus, Search, FileText, Layout, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

const mockPages = [
  { id: '1', title: 'Services', slug: '/services', status: 'Published', lastModified: '2 days ago' },
  { id: '2', title: 'Portfolio', slug: '/portfolio', status: 'Published', lastModified: '1 week ago' },
  { id: '3', title: 'Products', slug: '/products', status: 'Draft', lastModified: '3 hours ago' },
];

export default function PageManager() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search pages..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 transition-all text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all w-full md:w-auto">
          <Plus className="w-4 h-4" />
          Create New Page
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPages.map((page, i) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2rem] border border-white/10 bg-white/5 group relative hover:border-white/20 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-orange-600/10 transition-colors">
                <Layout className="w-6 h-6 text-neutral-400 group-hover:text-orange-500" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-500 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-neutral-500 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">{page.title}</h3>
            <p className="text-sm font-mono text-neutral-500 mb-6">{page.slug}</p>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                page.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
              }`}>
                {page.status}
              </span>
              <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">
                Modified {page.lastModified}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
