import { motion } from 'framer-motion';
import { 
  Users, Briefcase, Store, Package, Calendar, ShoppingCart, DollarSign, 
  AlertOctagon, Activity, CheckCircle, AlertTriangle, Search, MessageSquare, Bell, Star, FileText, Settings, Shield, Clock, Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 59000 },
  { name: 'Jun', revenue: 80000 },
];

const serviceDistribution = [
  { name: 'AC Service', value: 45 },
  { name: 'Plumbing', value: 25 },
  { name: 'Electrical', value: 20 },
  { name: 'Cleaning', value: 10 },
];
const COLORS = ['#14b8a6', '#6366f1', '#f59e0b', '#ec4899'];

const recentActivities = [
  { id: 1, title: 'New Shop Registered', desc: 'LG Electronics Store', time: '10 mins ago', type: 'store' },
  { id: 2, title: 'Booking Completed', desc: 'AC Repair by Rajesh', time: '2 hours ago', type: 'success' },
  { id: 3, title: 'Complaint Raised', desc: 'Delay in delivery', time: '3 hours ago', type: 'alert' },
  { id: 4, title: 'High Value Order', desc: '₹45,000 via Credit Card', time: '5 hours ago', type: 'payment' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { bookings, orders } = useStore();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  
  // Calculate dynamic stats
  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.price, 0) + 
                       bookings.filter(b => b.status === 'Completed').reduce((acc, b) => acc + b.price, 0) + 345000;
  
  const fetchPendingUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/pending-users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setPendingUsers(data);
    } catch (err) {
      console.error('Failed to fetch pending users', err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/all-users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setAllUsers(data);
    } catch (err) {
      console.error('Failed to fetch all users', err);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
    fetchAllUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/approve-user/${id}`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${userInfo?.token}` }
      });
      if (res.ok) {
        setPendingUsers(prev => prev.filter(u => u._id !== id));
        fetchAllUsers(); // refresh table
      } else {
        alert('Failed to approve. Make sure backend is restarted.');
      }
    } catch (err) {
      console.error(err);
      alert('Network Error');
    }
  };

  const handleReject = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/reject-user/${id}`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${userInfo?.token}` }
      });
      if (res.ok) {
        setPendingUsers(prev => prev.filter(u => u._id !== id));
        fetchAllUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlock = async (id) => {
    if (!window.confirm('Are you sure you want to toggle block status for this user?')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/block-user/${id}`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${userInfo?.token}` }
      });
      if (res.ok) fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('WARNING: This will permanently delete the user. Proceed?')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/delete-user/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${userInfo?.token}` }
      });
      if (res.ok) {
        setPendingUsers(prev => prev.filter(u => u._id !== id));
        fetchAllUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/update-user/${editingUser._id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser)
      });
      if (res.ok) {
        setEditingUser(null);
        fetchAllUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: Activity, onClick: () => setActiveTab('Overview') },
    { 
      name: 'User Management', icon: Users, 
      subItems: [
        { name: 'Customers', onClick: () => setActiveTab('Customers') },
        { name: 'Service Providers', onClick: () => setActiveTab('Service Providers') },
        { name: 'Shops', onClick: () => setActiveTab('Shops') },
        { name: 'Admins', onClick: () => setActiveTab('Admins') },
      ]
    },
    { name: 'Service Management', icon: Briefcase, onClick: () => setActiveTab('Service Management') },
    { 
      name: 'Marketplace', icon: Store, 
      subItems: [
        { name: 'Products', onClick: () => setActiveTab('Products') },
        { name: 'Categories', onClick: () => setActiveTab('Categories') },
        { name: 'Brands', onClick: () => setActiveTab('Brands') },
        { name: 'Inventory', onClick: () => setActiveTab('Inventory') },
      ]
    },
    { name: 'Booking Management', icon: Calendar, onClick: () => setActiveTab('Booking Management') },
    { name: 'Order Management', icon: Package, onClick: () => setActiveTab('Order Management') },
    { name: 'Technician Tracking', icon: Users, onClick: () => setActiveTab('Technician Tracking') },
    { name: 'Finance', icon: DollarSign, onClick: () => setActiveTab('Finance') },
    { name: 'Warranty & AMC', icon: Shield, onClick: () => setActiveTab('Warranty & AMC') },
    { name: 'Messages', icon: MessageSquare, onClick: () => setActiveTab('Messages') },
    { name: 'Notifications', icon: Bell, onClick: () => setActiveTab('Notifications') },
    { name: 'Reviews', icon: Star, onClick: () => setActiveTab('Reviews') },
    { name: 'Complaints', icon: AlertOctagon, onClick: () => setActiveTab('Complaints') },
    { name: 'Analytics', icon: Activity, onClick: () => setActiveTab('Analytics') },
    { name: 'Reports', icon: FileText, onClick: () => setActiveTab('Reports') },
    { name: 'Audit Logs', icon: FileText, onClick: () => setActiveTab('Audit Logs') },
    { name: 'Settings', icon: Settings, onClick: () => setActiveTab('Settings') },
  ];

  const renderContent = () => {
    if (['Customers', 'Service Providers', 'Shops', 'Admins'].includes(activeTab)) {
      const roleMap = {
        'Customers': 'customer',
        'Service Providers': 'technician',
        'Shops': 'vendor',
        'Admins': 'admin'
      };
      const roleFilter = roleMap[activeTab];
      const pendingList = pendingUsers.filter(u => u.role === roleFilter);
      const userList = allUsers.filter(u => u.role === roleFilter && u.status !== 'pending');

      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeTab} Management</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Manage all {activeTab.toLowerCase()} on the platform.</p>
          </div>

          {(activeTab === 'Service Providers' || activeTab === 'Shops') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={20} /> Pending Approvals ({pendingList.length})
              </h3>
              
              {pendingList.length === 0 ? (
                <p className="text-sm text-slate-500 font-medium">No pending {activeTab.toLowerCase()} requiring approval.</p>
              ) : (
                <div className="space-y-4">
                  {pendingList.map(user => (
                    <div key={user._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900">{user.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{user.email} | Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleApprove(user._id)} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors">Approve</button>
                        <button onClick={() => handleReject(user._id)} className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition-colors border border-rose-200">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-slate-900">All Registered {activeTab}</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="text" placeholder="Search users..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
               </div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-slate-200 text-sm text-slate-500">
                     <th className="pb-3 font-bold">Name</th>
                     <th className="pb-3 font-bold">Email</th>
                     <th className="pb-3 font-bold">Status</th>
                     <th className="pb-3 font-bold">Join Date</th>
                     <th className="pb-3 font-bold text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {userList.map(user => (
                     <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                       <td className="py-4">
                         {editingUser?._id === user._id ? (
                           <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="border rounded px-2 py-1 text-sm w-full" />
                         ) : (
                           <span className="font-bold text-slate-900">{user.name}</span>
                         )}
                       </td>
                       <td className="py-4 text-sm text-slate-500">
                         {editingUser?._id === user._id ? (
                           <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="border rounded px-2 py-1 text-sm w-full" />
                         ) : (
                           user.email
                         )}
                       </td>
                       <td className="py-4">
                         <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                           user.status === 'blocked' ? 'bg-red-100 text-red-600' : 
                           user.status === 'approved' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
                         }`}>
                           {user.status.toUpperCase()}
                         </span>
                       </td>
                       <td className="py-4 text-sm text-slate-500">
                         {new Date(user.createdAt).toLocaleDateString()}
                       </td>
                       <td className="py-4 flex items-center justify-end gap-2">
                         {editingUser?._id === user._id ? (
                           <>
                             <button onClick={handleUpdate} className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">Save</button>
                             <button onClick={() => setEditingUser(null)} className="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                           </>
                         ) : (
                           <>
                             <button onClick={() => setEditingUser(user)} className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
                             <button onClick={() => handleBlock(user._id)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${user.status === 'blocked' ? 'bg-teal-50 text-teal-600 hover:bg-teal-100' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>
                               {user.status === 'blocked' ? 'Unblock' : 'Block'}
                             </button>
                             <button onClick={() => handleDelete(user._id)} className="text-xs font-bold bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">Delete</button>
                           </>
                         )}
                       </td>
                     </tr>
                   ))}
                   {userList.length === 0 && (
                     <tr><td colSpan="5" className="py-8 text-center text-slate-500 text-sm font-medium">No active users found in this category.</td></tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'Overview' || activeTab === 'Dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Dashboard</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">System overview and critical alerts.</p>
            </div>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 transition-all w-fit">
              <Plus size={18} /> Download Report
            </button>
          </div>
          
          {pendingUsers.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0"><AlertTriangle size={24} /></div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 text-sm">Action Required: Pending Approvals</h3>
                <p className="text-amber-700 text-xs mt-1 font-medium">There are {pendingUsers.length} shops/technicians waiting for your approval to access their dashboards.</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setActiveTab('Shops')} className="text-xs font-bold bg-white text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-50">View Shops</button>
                  <button onClick={() => setActiveTab('Service Providers')} className="text-xs font-bold bg-white text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm hover:bg-amber-50">View Technicians</button>
                </div>
              </div>
            </div>
          )}

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><DollarSign size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-teal-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Calendar size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Bookings</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{bookings.length + 12}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-rose-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Users size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">1,248</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-amber-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Briefcase size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Techs</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">142</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
              <h3 className="text-lg font-black text-slate-900 mb-6">Revenue Trend</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                    <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-black text-slate-900 mb-6">Service Distribution</h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value) => [`${value}%`, 'Share']}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Recent Activity</h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-500">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentActivities.map(activity => (
                <div key={activity.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === 'store' ? 'bg-indigo-100 text-indigo-600' :
                    activity.type === 'success' ? 'bg-teal-100 text-teal-600' :
                    activity.type === 'alert' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {activity.type === 'store' && <Store size={18} />}
                    {activity.type === 'success' && <CheckCircle size={18} />}
                    {activity.type === 'alert' && <AlertOctagon size={18} />}
                    {activity.type === 'payment' && <DollarSign size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{activity.title}</p>
                    <p className="text-xs font-medium text-slate-500 truncate">{activity.desc}</p>
                  </div>
                  <div className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock size={12} /> {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Activity size={48} className="text-slate-300" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">{activeTab} Module</h3>
        <p className="text-slate-500 font-medium max-w-sm">This module is currently under development. Detailed features will be added here soon.</p>
        <button onClick={() => setActiveTab('Overview')} className="mt-8 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all">
          Back to Dashboard
        </button>
      </div>
    );
  };

  return (
    <DashboardLayout 
      role="Super Admin" 
      userName="Mishra" 
      navItems={navItems} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
