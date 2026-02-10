
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Package,
  Truck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockOrders } from '../mockData';
import { Order, OrderStatus } from '../types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleUpdateStatus = (id: number, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.order_id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-orange-100 text-orange-700';
      case OrderStatus.CONFIRMED: return 'bg-blue-100 text-blue-700';
      case OrderStatus.PACKING: return 'bg-purple-100 text-purple-700';
      case OrderStatus.SHIPPED: return 'bg-indigo-100 text-indigo-700';
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return <Clock size={14} />;
      case OrderStatus.PACKING: return <Package size={14} />;
      case OrderStatus.SHIPPED: return <Truck size={14} />;
      case OrderStatus.DELIVERED: return <CheckCircle2 size={14} />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'ALL') return true;
    return order.status.includes(filterStatus);
  });

  return (
    <div className="p-6 flex-1 overflow-y-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
          <p className="text-sm text-slate-500">Manage customer orders and tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 transition-colors">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            <Plus size={18} /> Create Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"><Filter size={18} /></button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  filterStatus === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Quick Actions</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">#ORD-{order.order_id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{order.customer_name}</span>
                      <span className="text-xs text-slate-500">{order.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace('ORDER_', '')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-800">৳{order.total_amount}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                      {order.payment_method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleUpdateStatus(order.order_id, OrderStatus.SHIPPED)}
                        disabled={order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Quick Ship"
                      >
                        <Truck size={16} />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(order.order_id, OrderStatus.DELIVERED)}
                        disabled={order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED}
                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Quick Deliver"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 border-l border-slate-100 pl-2 ml-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to {filteredOrders.length} of {orders.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
