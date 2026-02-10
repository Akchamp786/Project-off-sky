
import React, { useState } from 'react';
import { 
  Facebook, 
  Plus, 
  MapPin, 
  Zap, 
  Lock, 
  Globe, 
  BellRing,
  Trash2,
  Sparkles,
  Timer,
  History
} from 'lucide-react';
import { mockPages } from '../mockData';

const Settings: React.FC = () => {
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState(
    "জি, আসসালামু আলাইকুম! আপনাকে কীভাবে সাহায্য করতে পারি? আপনার কোনো পছন্দের পন্য থাকলে আমাদের জানাতে পারেন।"
  );

  const [isFollowUpEnabled, setIsFollowUpEnabled] = useState(false);
  const [followUpDelay, setFollowUpDelay] = useState(24);
  const [followUpMessage, setFollowUpMessage] = useState(
    "জি, আপনি কি আমাদের অফারটি নিয়ে আরো কিছু জানতে চান? আমরা আপনার উত্তরের অপেক্ষায় আছি।"
  );

  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Configuration</h2>
        <p className="text-sm text-slate-500">Manage connected pages, delivery charges, and automation rules</p>
      </div>

      {/* Pages Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Facebook size={20} className="text-blue-600" /> Connected Facebook Pages
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">
            <Plus size={16} /> Add Page
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPages.map(page => (
            <div key={page.page_id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <Facebook size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{page.page_name}</h4>
                  <p className="text-xs text-slate-500">ID: {page.page_id} • Connected {page.connected_at}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">ACTIVE</span>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Charges */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <MapPin size={20} className="text-orange-500" /> Delivery Charges
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Amount (৳)</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-6 py-4 font-medium">Inside Dhaka</td>
                <td className="px-6 py-4">
                  <input type="number" defaultValue={60} className="w-20 px-2 py-1 bg-slate-50 border rounded text-sm" />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-bold text-xs hover:underline">Update</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Outside Dhaka</td>
                <td className="px-6 py-4">
                  <input type="number" defaultValue={120} className="w-20 px-2 py-1 bg-slate-50 border rounded text-sm" />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-bold text-xs hover:underline">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Automation Section */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Zap size={20} className="text-purple-500" /> AI Bot Logic
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* AI Auto-Reply */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Sparkles size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-800">AI Auto-Reply</h4>
                  <p className="text-xs text-slate-500">Send an automated greeting message to new customer conversations</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAutoReplyEnabled} 
                  onChange={() => setIsAutoReplyEnabled(!isAutoReplyEnabled)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {isAutoReplyEnabled && (
              <div className="ml-14 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Greeting Message (Bangla)</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={2}
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* New Engagement Follow-up Rule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600"><History size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-800">Engagement Follow-up</h4>
                  <p className="text-xs text-slate-500">Automatically nudge customers who haven't responded within a period</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isFollowUpEnabled} 
                  onChange={() => setIsFollowUpEnabled(!isFollowUpEnabled)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {isFollowUpEnabled && (
              <div className="ml-14 animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nudge After (Hours)</label>
                  <input 
                    type="number"
                    className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
                    value={followUpDelay}
                    onChange={e => setFollowUpDelay(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Follow-up Message (Bangla)</label>
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={2}
                    value={followUpMessage}
                    onChange={(e) => setFollowUpMessage(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><Globe size={24} /></div>
              <div>
                <h4 className="font-bold text-slate-800">24/7 Smart Bot Chat</h4>
                <p className="text-xs text-slate-500">Use AI to automatically reply to product and price queries in Bangla</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="p-3 bg-red-100 rounded-lg text-red-600"><Lock size={24} /></div>
              <div>
                <h4 className="font-bold text-slate-800">Comment Moderation</h4>
                <p className="text-xs text-slate-500">Hide comments containing offensive or spam content using AI</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
