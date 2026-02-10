
import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  User, 
  CheckCircle,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { mockCalls } from '../mockData';

const CallRequests: React.FC = () => {
  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Call Queue</h2>
          <p className="text-sm text-slate-500">Requests for voice confirmation or support</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg shadow-blue-200">
          <Phone size={18} /> Online (Active)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCalls.map(call => (
          <div key={call.call_request_id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${call.customer_psid}/48`} className="w-12 h-12 rounded-full" alt="avatar" />
                <div>
                  <h3 className="font-bold text-slate-800">{call.customer_name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar size={12} /> {new Date(call.requested_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button className="p-1 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreVertical size={18} /></button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-slate-700 line-clamp-2">{call.notes}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                <Clock size={12} /> Awaiting Call
              </span>
              <span className="text-slate-400">#REQ-{call.call_request_id}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                <Phone size={16} /> Call Now
              </button>
              <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                <CheckCircle size={16} /> Mark Done
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallRequests;
