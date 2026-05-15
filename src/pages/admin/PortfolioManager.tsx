import { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const mockProjects = [
  { id: '1', title: 'Neo-Dynamics', category: 'Interactive', status: 'Published', date: '2024-05-12' },
  { id: '2', title: 'Silk Road', category: 'Branding', status: 'Draft', date: '2024-05-10' },
  { id: '3', title: 'Quantum UX', category: 'Product', status: 'Published', date: '2024-05-08' },
];

export default function PortfolioManager() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Project Name</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Category</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Date</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockProjects.map((project, i) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                key={project.id} 
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="px-8 py-5 font-bold text-sm tracking-tight">{project.title}</td>
                <td className="px-8 py-5 text-sm text-neutral-400">{project.category}</td>
                <td className="px-8 py-5">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                    project.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm text-neutral-500">{project.date}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-neutral-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
