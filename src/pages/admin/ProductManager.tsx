import { useState } from 'react';
import { Plus, Search, Tag, DollarSign, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

const mockProducts = [
  { id: '1', name: 'UI Kit Pro', price: '$49', category: 'Assets', sales: '142' },
  { id: '2', name: 'Agency Framework', price: '$199', category: 'Standard', sales: '28' },
  { id: '3', name: 'Custom Bot Service', price: '$99/mo', category: 'Service', sales: '12' },
];

export default function ProductManager() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 transition-all text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-neutral-200 transition-all w-full md:w-auto">
          <Plus className="w-4 h-4" />
          New Product
        </button>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Product</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Price</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Sales</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {mockProducts.map((p, i) => (
              <motion.tr 
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{p.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-neutral-500">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 font-mono text-sm text-emerald-500">{p.price}</td>
                <td className="px-8 py-5 text-sm font-bold">{p.sales}</td>
                <td className="px-8 py-5">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-500">
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
