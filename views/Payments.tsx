
import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ExternalLink, 
  Search, 
  Smartphone,
  AlertCircle
} from 'lucide-react';
import { mockPayments } from '../mockData';
import { PaymentSubmission, PaymentStatus } from '../types';

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentSubmission[]>(mockPayments);

  const getStatusStyle = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.VERIFIED: return 'bg-green-100 text-green-700';
      case PaymentStatus.REJECTED: return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Payment Verification</h2>
        <p className="text-sm text-slate-500">Verify mobile banking transactions and confirm orders</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {payments.map(payment => (
          <div key={payment.payment_id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-slate-50 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-200 min-h-[200px]">
              {payment.screenshot_url ? (
                <img src={payment.screenshot_url} className="max-h-full max-w-full rounded-lg shadow-sm" alt="screenshot" />
              ) : (
                <div className="text-center text-slate-400">
                  <AlertCircle size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs font-medium">No screenshot provided</p>
                </div>
              )}
            </div>
            <div className="flex-1 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Transaction Info</h3>
                  <p className="text-2xl font-bold text-slate-800 mt-1">৳{payment.amount}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(payment.status)}`}>
                  {payment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Order ID</p>
                  <p className="text-sm font-bold text-blue-600 flex items-center gap-1 cursor-pointer">
                    #ORD-{payment.order_id} <ExternalLink size={12} />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">TRX ID</p>
                  <p className="text-sm font-bold text-slate-800 font-mono tracking-tight uppercase bg-slate-50 px-2 py-1 rounded">{payment.trx_id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Sender Number</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Smartphone size={14} className="text-slate-400" />
                    {payment.sender_number}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Time</p>
                  <p className="text-sm font-medium text-slate-800">{new Date(payment.submitted_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
                  <Check size={18} /> Verify & Confirm
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
