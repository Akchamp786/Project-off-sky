
import React from 'react';
import { 
  Users, 
  MessageCircle, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const data = [
  { name: 'Mon', orders: 12, rev: 4500 },
  { name: 'Tue', orders: 19, rev: 7200 },
  { name: 'Wed', orders: 15, rev: 6100 },
  { name: 'Thu', orders: 22, rev: 8900 },
  { name: 'Fri', orders: 30, rev: 12400 },
  { name: 'Sat', orders: 25, rev: 9800 },
  { name: 'Sun', orders: 18, rev: 6500 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {change && (
        <span className={`text-xs font-bold flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp size={12} className={change < 0 ? 'rotate-180' : ''} />
          {Math.abs(change)}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Customers" value="1,284" change={12} icon={Users} color="bg-blue-600" />
        <StatCard title="Active Conversations" value="48" change={-5} icon={MessageCircle} color="bg-purple-600" />
        <StatCard title="New Orders" value="156" change={24} icon={ShoppingBag} color="bg-orange-600" />
        <StatCard title="Monthly Revenue" value="৳142,500" change={18} icon={DollarSign} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Revenue & Orders Growth</h3>
            <select className="text-sm border-slate-200 rounded-lg py-1 px-3">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          {/* Robust Container: Solution 3 (Aspect Ratio) + min-height fallback */}
          <div className="w-full min-h-[300px]">
            <ResponsiveContainer width="100%" aspect={2.5}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="rev" stroke="#2563eb" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Clock size={18} />
                  </div>
                  {i < 5 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100"></div>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Order #50{i} confirmed</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
