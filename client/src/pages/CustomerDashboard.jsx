import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Search, ShoppingBag, Calendar, Package, MapPin, Shield, CalendarDays, 
  CreditCard, Settings, AlertTriangle, Wrench, ChevronRight, MoreHorizontal, 
  Heart, Wallet, Tag, MessageSquare, Bell, Star, User, Activity, Zap, Truck, CheckCircle,
  Gift, Plus, Droplet, Bug, Paintbrush, Hammer, Sparkles, Grid, Clock, Check, ArrowRight, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { name: 'Jan', spend: 4000 },
  { name: 'Feb', spend: 3000 },
  { name: 'Mar', spend: 2000 },
  { name: 'Apr', spend: 2780 },
  { name: 'May', spend: 1890 },
  { name: 'Jun', spend: 2390 },
];

const bookingsData = [
  { name: 'Mon', count: 2 },
  { name: 'Tue', count: 1 },
  { name: 'Wed', count: 4 },
  { name: 'Thu', count: 2 },
  { name: 'Fri', count: 5 },
  { name: 'Sat', count: 8 },
  { name: 'Sun', count: 7 },
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || { name: 'Suraj' });
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = userInfo?.token;
      if (!token) return;

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const [resBookings, resOrders] = await Promise.all([
        fetch(`${API_URL}/api/bookings`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/orders`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (resBookings.ok) {
        setBookings(await resBookings.json());
      }
      if (resOrders.ok) {
        setOrders(await resOrders.json());
      }
    } catch (error) {
      console.error("Failed to fetch customer data", error);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, onClick: () => setActiveTab('Overview') },
    { name: 'Services', icon: Search, link: '/services' },
    { name: 'Marketplace', icon: ShoppingBag, link: '/store' },
    { name: 'Bookings', icon: Calendar, onClick: () => setActiveTab('My Bookings') },
    { name: 'Orders', icon: Package, onClick: () => setActiveTab('My Orders') },
    { name: 'Warranty', icon: Shield, onClick: () => setActiveTab('My Warranty') },
    { name: 'Messages', icon: MessageSquare, onClick: () => setActiveTab('Messages') },
    { name: 'Settings', icon: Settings, onClick: () => setActiveTab('Settings') },
  ];

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl mx-auto">
      
      {/* 1. Hero Section */}
      <div className="rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]" style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE, #F0FDFA)' }}>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 pointer-events-none opacity-90 hidden md:block" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%)' }}>
           <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000" alt="Beautiful Home" className="object-cover h-full w-full object-center mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 w-full md:w-3/5 pr-4">
          <h1 className="text-3xl font-black text-slate-800 mb-2 leading-tight tracking-tight">Hey {userInfo.name.split(' ')[0]} <span className="inline-block animate-bounce origin-bottom-right">👋</span></h1>
          <p className="text-slate-600 font-semibold mb-6">Book trusted home services instantly.</p>
          
          <div className="flex flex-wrap gap-3">
             <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-semibold border-none focus:ring-2 focus:ring-[#0F766E] shadow-sm outline-none" />
             </div>
             <button className="bg-[#0F766E] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#115E59] shadow-sm transition-colors">Book Service</button>
             <button className="bg-white text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-sm transition-colors border border-slate-200">Buy Product</button>
             <button className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors hidden sm:block">Emergency</button>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { icon: Zap, label: 'Book Service', color: 'text-[#0F766E]', bg: 'bg-teal-50', link: '/services' },
          { icon: ShoppingBag, label: 'Buy Product', color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/store' },
          { icon: Shield, label: 'Warranty', color: 'text-purple-600', bg: 'bg-purple-50' },
          { icon: MapPin, label: 'Track', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: Home, label: 'My Home', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { icon: AlertTriangle, label: 'Emergency', color: 'text-red-500', bg: 'bg-red-50' },
        ].map((item, i) => (
          <Link to={item.link || '#'} key={i} className="dashboard-card p-4 flex flex-col items-center justify-center gap-3 text-center group cursor-pointer h-[110px]">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <item.icon size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* 3. KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
         {[
           { value: '2', label: 'Upcoming', icon: Calendar },
           { value: '4', label: 'Orders', icon: Package },
           { value: '₹1,250', label: 'Wallet', icon: Wallet },
           { value: '98%', label: 'Home Health', icon: Heart },
           { value: '450', label: 'Reward Pts', icon: Star },
           { value: '3', label: 'Coupons', icon: Tag },
         ].map((stat, i) => (
           <div key={i} className="dashboard-card p-4 flex flex-col justify-between h-[100px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400"><stat.icon size={16} /></span>
              </div>
              <div>
                <div className="text-xl font-black text-slate-800">{stat.value}</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 4. Booking Timeline */}
          <div className="dashboard-card p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Active Booking</h2>
                <span className="px-3 py-1 bg-teal-50 text-[#0F766E] rounded-lg text-xs font-bold">Tomorrow, 10 AM</span>
             </div>
             
             <div className="flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Wrench className="text-[#0F766E]" size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-900">AC Repair & Service</h3>
                  <p className="text-sm font-semibold text-slate-500">LG Split AC (Master Bedroom)</p>
               </div>
             </div>

             {/* Beautiful Timeline */}
             <div className="relative flex justify-between items-center w-full max-w-md mx-auto px-4 mb-4">
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-8 w-1/3 h-1 bg-green-500 -translate-y-1/2 z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                      <Check size={16} strokeWidth={3} />
                   </div>
                   <span className="text-xs font-bold text-slate-700">Confirmed</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white flex items-center justify-center ring-4 ring-white shadow-sm">
                      <User size={16} />
                   </div>
                   <span className="text-xs font-bold text-[#0F766E]">Assigned</span>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-white shadow-sm">
                      <Truck size={16} />
                   </div>
                   <span className="text-xs font-bold text-slate-400">On the Way</span>
                </div>
             </div>
          </div>

          {/* 5. Service Recommendations */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-bold text-slate-800">Recommended Services</h2>
              <button className="text-sm font-bold text-[#0F766E] hover:text-[#0F766E] flex items-center gap-1">View All <ArrowRight size={16} /></button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {[
                { title: 'Home Cleaning', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'Electrical', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                { title: 'Painting', icon: Paintbrush, color: 'text-purple-500', bg: 'bg-purple-50' },
                { title: 'Pest Control', icon: Bug, color: 'text-rose-500', bg: 'bg-rose-50' },
                { title: 'Plumbing', icon: Droplet, color: 'text-blue-500', bg: 'bg-teal-50' },
              ].map((service, i) => (
                <div key={i} className="dashboard-card p-4 min-w-[160px] flex flex-col items-center justify-center text-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon size={24} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{service.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Marketplace Products */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-bold text-slate-800">Featured Products</h2>
              <button className="text-sm font-bold text-[#0F766E] hover:text-[#0F766E] flex items-center gap-1">Go to Shop <ArrowRight size={16} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC', price: '₹42,999', rating: '4.8', img: 'https://images.unsplash.com/photo-1627986064973-2e069504c5dc?q=80&w=400' },
                 { name: 'Dyson V12 Detect Slim Absolute Vacuum', price: '₹55,900', rating: '4.9', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400' },
               ].map((prod, i) => (
                 <div key={i} className="dashboard-card p-3 flex gap-4 cursor-pointer group">
                    <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      <img src={prod.img} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                       <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug mb-1">{prod.name}</h3>
                       <div className="flex items-center gap-1 mb-2">
                         <Star className="fill-amber-400 text-amber-400" size={12} />
                         <span className="text-[11px] font-bold text-slate-600">{prod.rating}</span>
                       </div>
                       <div className="text-sm font-black text-[#0F766E]">{prod.price}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          {/* 7. Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Monthly Spending</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="spend" stroke="#0F766E" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="dashboard-card p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Bookings Overview</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* 8. Live Tracking Widget */}
          <div className="dashboard-card overflow-hidden">
             <div className="h-32 bg-slate-200 relative">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" alt="Map" className="w-full h-full object-cover opacity-70" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
               
               {/* Map Markers Fake */}
               <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#0F766E] rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
               <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-slate-900 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white"><Home size={10} /></div>
             </div>
             
             <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                      <img src="https://ui-avatars.com/api/?name=Rakesh+Kumar&background=random" alt="Tech" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 text-sm">Rakesh Kumar</h4>
                     <p className="text-xs font-semibold text-slate-500">AC Technician (4.9 ⭐)</p>
                   </div>
                </div>
                
                <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Distance</p>
                      <p className="text-sm font-black text-slate-800">2.3 km</p>
                   </div>
                   <div className="w-px h-6 bg-slate-200"></div>
                   <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">ETA</p>
                      <p className="text-sm font-black text-[#0F766E]">12 min</p>
                   </div>
                </div>
                
                <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">Track Live</button>
             </div>
          </div>

          {/* 9. Professional Activity Feed */}
          <div className="dashboard-card p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
                <button className="text-slate-400 hover:text-slate-700"><MoreHorizontal size={20} /></button>
             </div>
             
             <div className="space-y-6">
                {[
                  { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Payment Successful', desc: '₹42,999 for LG AC', time: '2 hours ago' },
                  { icon: Calendar, color: 'text-blue-500', bg: 'bg-teal-50', title: 'Booking Confirmed', desc: 'AC Repair tomorrow at 10 AM', time: '4 hours ago' },
                  { icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50', title: 'Warranty Activated', desc: '1 year extended warranty', time: 'Yesterday' },
                  { icon: Package, color: 'text-amber-500', bg: 'bg-amber-50', title: 'Product Delivered', desc: 'Dyson V12 Vacuum', time: '2 days ago' },
                  { icon: Tag, color: 'text-rose-500', bg: 'bg-rose-50', title: 'Coupon Applied', desc: 'Saved ₹500 on cleaning', time: '1 week ago' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl ${act.bg} ${act.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <act.icon size={18} strokeWidth={2.5} />
                      </div>
                      {i !== 4 && <div className="absolute top-10 bottom-[-24px] left-1/2 w-0.5 bg-slate-100 -translate-x-1/2"></div>}
                    </div>
                    <div className="flex-1 pb-1">
                      <h4 className="text-sm font-bold text-slate-800">{act.title}</h4>
                      <p className="text-xs font-semibold text-slate-500">{act.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{act.time}</span>
                  </div>
                ))}
             </div>
             <div className="space-y-3 mt-4">
             <h3 className="font-bold text-slate-700 text-sm mb-2">My Bookings</h3>
             {bookings.length === 0 ? (
               <p className="text-slate-500 text-sm text-center py-4">No active bookings.</p>
             ) : (
               bookings.slice(0, 3).map((b, i) => (
                 <div key={b._id} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                   <div className="flex gap-3 items-center">
                     <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                       <PenTool size={16} />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-slate-800">{b.service}</h4>
                       <p className="text-xs text-slate-500">{new Date(b.createdAt).toLocaleDateString()}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${b.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>{b.status.toUpperCase()}</span>
                   </div>
                 </div>
               ))
             )}
           </div>

           <div className="space-y-3 mt-8">
             <h3 className="font-bold text-slate-700 text-sm mb-2">My Orders</h3>
             {orders.length === 0 ? (
               <p className="text-slate-500 text-sm text-center py-4">No recent orders.</p>
             ) : (
               orders.slice(0, 3).map((o, i) => (
                 <div key={o._id} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                   <div className="flex gap-3 items-center">
                     <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                       <Package size={16} />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-slate-800">{o.items[0]?.product}</h4>
                       <p className="text-xs text-slate-500">Total: ₹{o.totalAmount}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${o.orderStatus === 'Pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>{o.orderStatus.toUpperCase()}</span>
                   </div>
                 </div>
               ))
             )}
           </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout 
      role="Customer" 
      userName={userInfo.name} 
      navItems={navItems} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'Overview' || activeTab === 'Dashboard' ? renderOverview() : activeTab === 'Settings' ? (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 max-w-3xl mx-auto mt-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                 <Settings size={28} className="text-[#0F766E]" />
              </div>
              <div>
                 <h2 className="text-2xl font-black text-slate-800">Account Settings</h2>
                 <p className="text-slate-500 font-medium">Update your profile and preferences.</p>
              </div>
           </div>
           
           <form className="space-y-6" onSubmit={(e) => { 
             e.preventDefault(); 
             const formData = new FormData(e.target);
             const updatedInfo = {
               ...userInfo,
               name: formData.get('name'),
               email: formData.get('email'),
               phone: formData.get('phone'),
               address: formData.get('address')
             };
             localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
             setUserInfo(updatedInfo);
             alert("Settings saved successfully!"); 
           }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" name="name" defaultValue={userInfo.name} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" name="email" defaultValue={userInfo.email || ''} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" defaultValue={userInfo.phone || ''} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                    <input type="text" name="address" defaultValue={userInfo.address || 'Ranchi, Jharkhand'} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 transition-all font-medium" />
                 </div>
              </div>
              <div className="pt-4 flex justify-end">
                 <button type="submit" className="bg-[#0F766E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#115E59] transition-colors shadow-lg shadow-[#0F766E]/20">
                    Save Changes
                 </button>
              </div>
           </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center w-full max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white shadow-xl">
            <Settings size={40} className="text-[#0F766E]" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">{activeTab} Settings</h3>
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 w-full mb-8">
             <p className="text-slate-600 font-semibold mb-2 text-lg">Your {activeTab.toLowerCase()} configuration</p>
             <p className="text-slate-400 font-medium">This module is currently being developed and will be fully available in the next release.</p>
          </div>
          <button onClick={() => setActiveTab('Overview')} className="px-8 py-4 bg-[#0F766E] hover:bg-[#115E59] text-white font-black rounded-2xl shadow-xl transition-all flex items-center gap-3">
            Back to Dashboard <ArrowRight size={20} />
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CustomerDashboard;
