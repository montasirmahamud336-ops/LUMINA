import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, ShieldCheck, Mail, Zap } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function LoginPage() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  const [email, setEmail] = useState(isAdminPath ? 'admin' : '');
  const [password, setPassword] = useState(isAdminPath ? 'admin12' : '');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Authentication failed');
      }

      const data = await res.json();
      login(data.accessToken, data.user);
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-neutral-900 dark:text-white transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-blue-600/10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-10 rounded-[3rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Welcome Back</h1>
          <p className="text-neutral-500 text-sm font-mono tracking-widest uppercase italic">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-[10px] font-mono mb-6 text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500 ml-4">{isAdminPath ? 'Username' : 'Email Address'}</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdminPath ? "Username" : "email@example.com"}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-700 font-mono text-sm text-neutral-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-700 font-mono text-neutral-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 group shadow-xl"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-white/5" />
          <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Or Continue With</span>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>

        <GoogleLoginButton />

        <div className="mt-10 text-center space-y-4">
           <Link to="/auth/signup" className="block text-xs text-neutral-500 font-mono italic hover:text-white transition-colors">
            New here? <span className="text-blue-500 uppercase font-black tracking-widest ml-1">Sign Up</span>
          </Link>
          <Link to="/" className="block text-[8px] uppercase tracking-[0.4em] text-neutral-700 hover:text-neutral-500 transition-colors">
            Back to Home
          </Link>
        </div>

        <Zap className="absolute -left-10 -bottom-10 w-40 h-40 text-blue-500/5 -rotate-12" />
      </motion.div>
    </div>
  );
}
