import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  FileText, 
  Bell, 
  Shield, 
  LogOut,
  Send,
  Zap
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Conversations', value: '0', icon: MessageSquare },
    { label: 'Cloud Files', value: '0', icon: FileText },
    { label: 'Notifications', value: '1', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl hidden lg:flex flex-col p-6">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">LUMINA</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'overview', icon: Zap, label: 'Overview' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
            { id: 'files', icon: FileText, label: 'Resources' },
            { id: 'settings', icon: Settings, label: 'Settings' },
            { id: 'security', icon: Shield, label: 'Security' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                : 'text-neutral-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 text-neutral-500 hover:text-red-500 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              WELCOME, {user?.name?.toUpperCase() || 'VISIONARY'}
            </h1>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Status: Active Visionary
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-orange-600 rounded-full" />
            </button>
            <div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden">
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-white/5">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Action Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-10 rounded-[3rem] border border-orange-600/20 bg-gradient-to-br from-orange-600/5 to-transparent relative overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">ELEVATE YOUR VISION</h2>
                <p className="text-neutral-400 mb-8 max-w-md">
                  Submit a request to our engineering team. Once approved, you'll unlock direct real-time communication with our architects.
                </p>
                <button className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  Send a Request
                </button>
              </div>
              <Zap className="absolute -right-20 -bottom-20 w-80 h-80 text-orange-600/10 rotate-12" />
            </motion.div>

            {/* History Table */}
            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
              <h3 className="text-xl font-black mb-8 px-2 uppercase tracking-tighter">Recent Signals</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center py-20 text-neutral-600 font-mono text-xs uppercase tracking-widest italic border border-dashed border-white/5 rounded-3xl">
                  No active signals detected
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Account Health</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest mb-3">
                    <span className="text-neutral-500">Security Score</span>
                    <span className="text-orange-600">85%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-orange-600" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-widest mb-3">
                    <span className="text-neutral-500">Storage Used</span>
                    <span className="text-blue-600">12%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">System Nodes</h3>
              <div className="space-y-4">
                {[
                  { name: 'US-EAST-1', status: 'Online' },
                  { name: 'EU-WEST-1', status: 'Optimal' },
                  { name: 'ASIA-SOUTH-1', status: 'Online' },
                ].map(node => (
                  <div key={node.name} className="flex justify-between items-center px-4 py-2 rounded-xl bg-white/5">
                    <span className="text-xs font-mono text-neutral-500">{node.name}</span>
                    <span className="text-[10px] font-black uppercase text-emerald-500">{node.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
