import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Package, ShoppingCart, Archive, Wrench, Shield, CalendarDays, 
  Users, User, Tag, DollarSign, Activity, Star, MessageSquare, Bell, 
  Settings, TrendingUp, AlertTriangle, CheckCircle, Clock, ChevronRight,
  TrendingDown, PlusCircle, PenTool, ClipboardList, Percent, BarChart3, Search, ChevronDown, BellRing
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../store/useStore';
import DashboardLayout from '../components/DashboardLayout';

const revenueData = [
  { name: 'Mon', revenue: 12000 },
  { name: 'Tue', revenue: 19000 },
  { name: 'Wed', revenue: 15000 },
  { name: 'Thu', revenue: 22000 },
  { name: 'Fri', revenue: 18000 },
  { name: 'Sat', revenue: 35000 },
  { name: 'Sun', revenue: 45000 },
];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || { name: 'LG Electronics' });

  const navItems = [
    { name: 'Dashboard', icon: Home, onClick: () => setActiveTab('Overview') },
    { name: 'Products', icon: Package, onClick: () => setActiveTab('Products') },
    { name: 'Orders', icon: ShoppingCart, onClick: () => setActiveTab('Orders') },
    { name: 'Inventory', icon: Archive, onClick: () => setActiveTab('Inventory') },
    { name: 'Service Requests', icon: Wrench, onClick: () => setActiveTab('Service Requests') },
    { name: 'Warranty', icon: Shield, onClick: () => setActiveTab('Warranty') },
    { name: 'AMC', icon: CalendarDays, onClick: () => setActiveTab('AMC') },
    { name: 'Technicians', icon: Users, onClick: () => setActiveTab('Technicians') },
    { name: 'Customers', icon: User, onClick: () => setActiveTab('Customers') },
    { name: 'Offers', icon: Tag, onClick: () => setActiveTab('Offers') },
    { name: 'Revenue', icon: DollarSign, onClick: () => setActiveTab('Revenue') },
    { name: 'Analytics', icon: Activity, onClick: () => setActiveTab('Analytics') },
    { name: 'Reviews', icon: Star, onClick: () => setActiveTab('Reviews') },
    { name: 'Messages', icon: MessageSquare, onClick: () => setActiveTab('Messages') },
    { name: 'Notifications', icon: Bell, onClick: () => setActiveTab('Notifications') },
    { name: 'Shop Profile', icon: Store, onClick: () => setActiveTab('Shop Profile') },
    { name: 'Settings', icon: Settings, onClick: () => setActiveTab('Settings') },
  ];

  const inventoryData = [
    { name: 'In Stock', value: 320, color: '#10B981' },
    { name: 'Low Stock', value: 12, color: '#F59E0B' },
    { name: 'Out of Stock', value: 8, color: '#EF4444' },
  ];

  const recentOrders = [
    { id: '#ORD12345', name: 'Amit Verma', amount: '₹12,500', status: 'Pending', time: '2 mins ago', color: 'text-orange-500 bg-orange-50 border-orange-100' },
    { id: '#ORD12344', name: 'Neha Singh', amount: '₹8,900', status: 'Confirmed', time: '15 mins ago', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { id: '#ORD12343', name: 'Rahul Kumar', amount: '₹6,700', status: 'Processing', time: '30 mins ago', color: 'text-blue-500 bg-teal-50 border-teal-100' },
    { id: '#ORD12342', name: 'Pooja Kumari', amount: '₹4,200', status: 'Shipped', time: '1 hour ago', color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
    { id: '#ORD12341', name: 'Suresh Yadav', amount: '₹3,800', status: 'Delivered', time: '2 hours ago', color: 'text-teal-500 bg-teal-50 border-teal-100' },
  ];

  const topProducts = [
    { name: 'LG 1.5 Ton 5 Star AC', orders: '52 Orders', price: '₹32,990', icon: '❄️' },
    { name: 'Kent RO Water Purifier', orders: '45 Orders', price: '₹15,499', icon: '💧' },
    { name: 'Crompton Ceiling Fan', orders: '38 Orders', price: '₹2,199', icon: '🌀' },
    { name: 'Philips Mixer Grinder', orders: '30 Orders', price: '₹3,299', icon: '🌪️' },
  ];

  const renderContent = () => {
    if (activeTab === 'Overview' || activeTab === 'Dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-full">
          
          {/* Top Bar / Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100">
            <div className="flex-1 w-full max-w-xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search orders, products, customers..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-0 outline-none w-full" />
            </div>
            <div className="flex items-center gap-4 shrink-0 px-2">
               <div className="relative cursor-pointer">
                 <BellRing size={20} className="text-slate-600"/>
                 <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white"></div>
               </div>
               <div className="relative cursor-pointer">
                 <MessageSquare size={20} className="text-slate-600"/>
                 <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</div>
               </div>
               <div className="h-8 w-px bg-slate-200 mx-2"></div>
               <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-slate-200">
                     <img src="https://ui-avatars.com/api/?name=Sharma+Electronics&background=c7d2fe&color=3730a3" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden sm:block">
                     <p className="text-xs font-bold text-slate-800">Sharma Electronics</p>
                     <p className="text-[10px] text-slate-500">Vendor</p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400"/>
               </div>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Sales */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                <TrendingUp size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Today's Sales</p>
                <p className="text-xl font-black text-slate-800 leading-tight">₹45,680</p>
                <p className="text-[9px] font-bold text-emerald-500 mt-0.5">+16% vs yesterday</p>
              </div>
            </div>
            
            {/* Orders */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
                <ShoppingCart size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Total Orders</p>
                <p className="text-xl font-black text-slate-800 leading-tight">18</p>
                <p className="text-[9px] font-bold text-rose-500 mt-0.5">12 Pending</p>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                <Package size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Total Products</p>
                <p className="text-xl font-black text-slate-800 leading-tight">420</p>
                <p className="text-[9px] font-bold text-rose-500 mt-0.5">12 Low Stock</p>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
                <DollarSign size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Total Revenue (Month)</p>
                <p className="text-xl font-black text-slate-800 leading-tight">₹2,45,000</p>
                <p className="text-[9px] font-bold text-emerald-500 mt-0.5">+22% vs last month</p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FEF9C3] text-[#EAB308] flex items-center justify-center shrink-0">
                <Star size={24} strokeWidth={1.5} className="fill-[#EAB308]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 mb-0.5">Average Rating</p>
                <p className="text-xl font-black text-slate-800 leading-tight">4.8</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">250 Reviews</p>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Order Overview */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full lg:col-span-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-sm">Order Overview</h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-3 px-2 text-[10px] font-bold text-slate-500">{order.id}</td>
                        <td className="py-3 px-2 text-[11px] font-bold text-slate-800">{order.name}</td>
                        <td className="py-3 px-2 text-[11px] font-black text-slate-800">{order.amount}</td>
                        <td className="py-3 px-2">
                           <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${order.color}`}>{order.status}</span>
                        </td>
                        <td className="py-3 px-2 text-[9px] text-slate-400 whitespace-nowrap">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-sm">Top Selling Products</h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="space-y-4 flex-1">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                      {product.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                      <p className="text-[10px] text-slate-500">{product.orders}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-800">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory Status */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Inventory Status</h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center relative py-4">
                <div className="h-[160px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {inventoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Center text in Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                   <span className="text-2xl font-black text-slate-800 leading-none">420</span>
                   <span className="text-[9px] font-bold text-slate-500 mt-1">Total Products</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2.5 mt-2">
                {inventoryData.map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-[11px]">
                     <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="font-bold text-slate-600">{item.name}</span>
                     </div>
                     <span className="font-medium text-slate-500">{item.value} <span className="text-slate-400 ml-1">({Math.round((item.value/340)*100)}%)</span></span>
                   </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Actions (Takes 2 cols) */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 lg:col-span-2">
               <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 h-full items-center">
                  {[
                    { title: 'Add Product', icon: PlusCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', sub: 'List new product' },
                    { title: 'Manage Inventory', icon: Archive, color: 'text-blue-500', bg: 'bg-teal-50', sub: 'Update stock & price' },
                    { title: 'Manage Orders', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50', sub: 'Process customer orders' },
                    { title: 'Service Requests', icon: Wrench, color: 'text-rose-500', bg: 'bg-rose-50', sub: 'View & assign requests' },
                    { title: 'Create Offer', icon: Tag, color: 'text-purple-500', bg: 'bg-purple-50', sub: 'Add new offers' },
                    { title: 'View Reports', icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50', sub: 'Sales & performance' },
                  ].map((action, i) => (
                    <div key={i} className="flex flex-col items-center text-center cursor-pointer group">
                       <div className={`w-12 h-12 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                         <action.icon size={22} strokeWidth={1.5} />
                       </div>
                       <h4 className="text-[10px] font-bold text-slate-800 leading-tight mb-1">{action.title}</h4>
                       <p className="text-[8px] text-slate-400 font-medium leading-tight px-1">{action.sub}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Earnings Sparkline */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Earnings Overview</h3>
                  <p className="text-2xl font-black text-slate-800">₹2,45,000</p>
                  <p className="text-[9px] font-bold text-emerald-500 mt-0.5">+22% vs last month</p>
                </div>
                <button className="text-[9px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-slate-50">This Month <ChevronDown size={12}/></button>
              </div>
              <div className="h-[80px] w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </motion.div>
      );
    }
    if (activeTab === 'Settings') {
      return (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 max-w-3xl mx-auto mt-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                 <Settings size={28} className="text-slate-600" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-slate-800">Shop Settings</h2>
                 <p className="text-slate-500 font-medium">Update your business profile and preferences.</p>
              </div>
           </div>
           
           <form className="space-y-6" onSubmit={(e) => { 
             e.preventDefault(); 
             const formData = new FormData(e.target);
             const updatedInfo = {
               ...userInfo,
               name: formData.get('name'),
               email: formData.get('email'),
               address: formData.get('address'),
               gstin: formData.get('gstin')
             };
             localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
             setUserInfo(updatedInfo);
             alert("Shop settings saved successfully!"); 
           }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Shop Name</label>
                    <input type="text" name="name" defaultValue={userInfo.name} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Business Email</label>
                    <input type="email" name="email" defaultValue={userInfo.email || ''} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Store Address</label>
                    <textarea name="address" rows="3" defaultValue={userInfo.address || '123 Main Market, Ranchi, Jharkhand'} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium resize-none"></textarea>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">GSTIN / Tax ID</label>
                    <input type="text" name="gstin" defaultValue={userInfo.gstin || '20ABCDE1234F1Z5'} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
              </div>
              <div className="pt-4 flex justify-end">
                 <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Save Changes
                 </button>
              </div>
           </form>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Activity size={48} className="text-slate-300" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">{activeTab}</h3>
        <p className="text-slate-500 font-medium max-w-sm">This module is currently under development. Detailed features will be added here soon.</p>
        <button onClick={() => setActiveTab('Overview')} className="mt-8 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all">
          Back to Dashboard
        </button>
      </div>
    );
  };

  return (
    <DashboardLayout 
      role="Vendor" 
      userName={userInfo.name} 
      navItems={navItems} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

// Simple Store Icon fallback for profile
function Store(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default VendorDashboard;
