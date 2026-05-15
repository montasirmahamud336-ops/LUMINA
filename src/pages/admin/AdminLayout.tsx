import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Settings, 
  Layers, 
  Users, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Globe,
  Zap
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Requests', icon: MessageSquare, path: '/admin/testimonials' },
  { name: 'Hero', icon: Layers, path: '/admin/hero' },
  { name: 'Portfolio', icon: ImageIcon, path: '/admin/portfolio' },
  { name: 'Services', icon: Layers, path: '/admin/services' },
  { name: 'Products', icon: Zap, path: '/admin/products' },
  { name: 'Global', icon: Globe, path: '/admin/global' },
  { name: 'Settings', icon: Settings, path: '/admin/navigation' },
];

export default function AdminLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-white/[0.02] backdrop-blur-3xl flex flex-col p-8">
        <div className="mb-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tighter block">LUMINA</span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-neutral-600 uppercase">Admin Command</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-blue-500'} transition-colors`} />
                  <span className="text-sm font-bold uppercase tracking-tight">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-white/10 mt-auto">
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-5 py-4 text-neutral-500 hover:text-red-500 transition-colors w-full rounded-2xl hover:bg-red-500/5 group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase">Terminate</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0a0a0a]">
        <header className="px-12 py-10 flex justify-between items-center border-b border-white/5 bg-white/[0.01]">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase italic underline decoration-blue-600 underline-offset-8">
              {sidebarLinks.find(l => l.path === location.pathname)?.name || 'Admin Center'}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-black text-white">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest italic">{user?.role || 'Lumina Core'}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 p-1">
               <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'admin'}`} 
                className="w-full h-full rounded-xl object-cover"
                alt="Admin"
               />
            </div>
          </div>
        </header>

        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
