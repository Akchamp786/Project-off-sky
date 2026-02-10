
import React from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  EyeOff, 
  MessageCircle, 
  ExternalLink,
  User,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { mockHiddenComments } from '../mockData';

const Comments: React.FC = () => {
  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Comment Moderation</h2>
          <p className="text-sm text-slate-500">Manage hidden and flagged comments automatically processed by AI</p>
        </div>
        <div className="flex gap-2">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">Bot Accuracy</p>
            <p className="text-lg font-bold text-green-600">98.4%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <EyeOff size={18} className="text-slate-500" /> Hidden Comments
            </h3>
            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">12 Total</span>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline">Clear History</button>
        </div>

        <div className="divide-y divide-slate-100">
          {mockHiddenComments.map(comment => (
            <div key={comment.comment_id} className="p-6 flex gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{comment.customer_name}</h4>
                    <p className="text-xs text-slate-400 mb-2">{new Date(comment.hidden_at).toLocaleString()}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    comment.reason === 'BAD_LANGUAGE' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    <ShieldAlert size={10} /> {comment.reason}
                  </span>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 text-sm text-slate-700 italic border-l-4 border-slate-300">
                  "{comment.text}"
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                    <ExternalLink size={14} /> View Original Post
                  </button>
                  <button className="text-xs font-bold text-green-600 flex items-center gap-1 hover:underline">
                    <CheckCircle size={14} /> Unhide (Allow)
                  </button>
                  <button className="text-xs font-bold text-red-600 flex items-center gap-1 hover:underline">
                    <Trash2 size={14} /> Delete Forever
                  </button>
                </div>
              </div>
            </div>
          ))}

          {mockHiddenComments.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <ShieldAlert size={64} className="mx-auto mb-4 opacity-10" />
              <p className="font-medium">No hidden comments found</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
        <AlertTriangle size={24} className="text-amber-500 shrink-0" />
        <div>
          <h4 className="font-bold text-amber-800 text-sm">AI Training Active</h4>
          <p className="text-xs text-amber-700 mt-1">
            The bot is currently hiding comments with bad language. You can manually unhide them if the AI makes a mistake. 
            This will help the bot learn your specific moderation preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
