import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  MessageSquare,
  Layout
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Mon', views: 2400 },
  { name: 'Tue', views: 1398 },
  { name: 'Wed', views: 9800 },
  { name: 'Thu', views: 3908 },
  { name: 'Fri', views: 4800 },
  { name: 'Sat', views: 3800 },
  { name: 'Sun', views: 4300 },
];

const stats = [
  { name: 'Total Views', value: '12,402', change: '+12.5%', icon: Eye, color: 'text-blue-500' },
  { name: 'New Leads', value: '48', change: '+5.2%', icon: Users, color: 'text-orange-500' },
  { name: 'Engagement Rate', value: '24.2%', change: '+2.1%', icon: TrendingUp, color: 'text-emerald-500' },
  { name: 'System Pulse', value: '99.9%', change: 'Stable', icon: ShieldCheck, color: 'text-purple-500' },
];

const managerCards = [
  { title: "Landing Sections", desc: "Edit Hero, About, and Process texts.", count: "12 Sections", path: "/admin/pages", icon: Layout },
  { title: "Case Archives", desc: "Manage portfolio items and case studies.", count: "24 Projects", path: "/admin/portfolio", icon: Zap },
  { title: "Incoming Signals", desc: "Review contact form submissions.", count: "5 New", path: "/admin/testimonials", icon: MessageSquare }
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-3xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-neutral-500 text-sm font-medium mb-1 uppercase tracking-widest">{stat.name}</p>
            <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-8 rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-3xl"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Visitor Pulsar
            </h3>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid #ffffff10',
                    borderRadius: '16px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#f97316" 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* System Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-3xl space-y-6"
        >
          <h3 className="text-xl font-bold tracking-tight uppercase mb-8">Quick Control</h3>
          <div className="space-y-4">
            {managerCards.map((card, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl border border-white/5 bg-white/1 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                    <card.icon className="w-5 h-5 text-neutral-500 group-hover:text-orange-500" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{card.count}</span>
                </div>
                <h4 className="font-bold mb-1">{card.title}</h4>
                <p className="text-xs text-neutral-500 font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
