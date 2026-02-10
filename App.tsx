
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingCart, 
  CreditCard, 
  PhoneCall, 
  Settings, 
  ShieldAlert,
  Menu,
  X,
  Bell,
  Search,
  Sparkles,
  Send,
  Loader2,
  BrainCircuit
} from 'lucide-react';

import DashboardView from './views/Dashboard';
import InboxView from './views/Inbox';
import OrdersView from './views/Orders';
import PaymentsView from './views/Payments';
import CallRequestsView from './views/CallRequests';
import CommentsView from './views/Comments';
import SettingsView from './views/Settings';
import { getProAssistantReply } from './geminiService';

const SidebarLink = ({ to, icon: Icon, children, badge }: { to: string, icon: any, children?: React.ReactNode, badge?: number }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium">{children}</span>
      </div>
      {badge && badge > 0 && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
};

const Header = ({ title }: { title: string }) => (
  <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
    <h1 className="text-xl font-bold text-slate-800">{title}</h1>
    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>
      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-700">Admin Agent</p>
          <p className="text-xs text-slate-500">Super User</p>
        </div>
        <img src="https://picsum.photos/40" className="w-10 h-10 rounded-full bg-slate-200" alt="avatar" />
      </div>
    </div>
  </header>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    const response = await getProAssistantReply(userText);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BrainCircuit size={20} className="text-blue-400" />
              <span className="font-bold text-sm tracking-tight">AI PRO ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                <Sparkles size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs font-medium">Ask me for business analysis, advice, or operational help.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl flex items-center gap-2 text-slate-500 text-xs">
                  <Loader2 size={14} className="animate-spin" /> Thinking deeply...
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input 
                className="flex-1 text-sm bg-slate-100 border-none rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={18} /></button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform group"
        >
          <BrainCircuit size={28} className="group-hover:text-blue-400 transition-colors" />
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50 relative">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}>
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
              {isSidebarOpen && <span className="font-bold text-lg whitespace-nowrap">FB-Auto-Admin</span>}
            </div>
          </div>
          
          <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
            <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
            <SidebarLink to="/inbox" icon={MessageSquare} badge={3}>Inbox</SidebarLink>
            <SidebarLink to="/orders" icon={ShoppingCart} badge={5}>Orders</SidebarLink>
            <SidebarLink to="/payments" icon={CreditCard} badge={2}>Payments</SidebarLink>
            <SidebarLink to="/calls" icon={PhoneCall} badge={1}>Call Queue</SidebarLink>
            <SidebarLink to="/comments" icon={ShieldAlert}>Moderation</SidebarLink>
            <SidebarLink to="/settings" icon={Settings}>Settings</SidebarLink>
          </nav>

          <div className="p-4 border-t border-slate-200">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<><Header title="System Overview" /><DashboardView /></>} />
            <Route path="/inbox" element={<><Header title="Unified Inbox" /><InboxView /></>} />
            <Route path="/orders" element={<><Header title="Orders Management" /><OrdersView /></>} />
            <Route path="/payments" element={<><Header title="Payment Verification" /><PaymentsView /></>} />
            <Route path="/calls" element={<><Header title="Call Queue" /><CallRequestsView /></>} />
            <Route path="/comments" element={<><Header title="Comment Moderation" /><CommentsView /></>} />
            <Route path="/settings" element={<><Header title="Configuration" /><SettingsView /></>} />
          </Routes>
        </main>

        <AIAssistant />
      </div>
    </HashRouter>
  );
};

export default App;
