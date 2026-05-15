import { useState } from 'react';
import { Plus, Search, MoreHorizontal, FileText, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';

const mockPosts = [
  { id: '1', title: 'The Future of Immersive Web Design', author: 'Montasir', date: 'May 12, 2024', status: 'Published' },
  { id: '2', title: 'Generative AI in Brand Identity', author: 'Montasir', date: 'May 08, 2024', status: 'Draft' },
  { id: '3', title: 'Micro-interactions: The Secret Sauce', author: 'Montasir', date: 'Apr 28, 2024', status: 'Published' },
];

export default function BlogManager() {
  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 transition-all text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all w-full md:w-auto">
          <Plus className="w-4 h-4" />
          Write Post
        </button>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-white/5">
                <FileText className="w-6 h-6 text-neutral-400" />
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-6 group-hover:text-orange-500 transition-colors">
              {post.title}
            </h3>

            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
              <span className={`px-2 py-1 rounded-md text-[9px] ${
                post.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
              }`}>
                {post.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
