import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/auth/login');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-orange-600/10 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-10 rounded-[3rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-600/20">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Join Lumina</h1>
          <p className="text-neutral-500 text-sm font-mono tracking-widest uppercase italic">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-[10px] font-mono mb-6 text-center uppercase tracking-widest">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500 ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-orange-600 transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-700 text-neutral-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-orange-600 transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-700 text-neutral-900 dark:text-white"
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
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-orange-600 transition-colors placeholder:text-neutral-300 dark:placeholder:text-neutral-700 text-neutral-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
          >
            Sign Up
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-white/5" />
          <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Or Continue With</span>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>

        <GoogleLoginButton />

        <p className="mt-10 text-center text-xs text-neutral-500 font-mono italic">
          Already have an account? <Link to="/auth/login" className="text-orange-600 hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
