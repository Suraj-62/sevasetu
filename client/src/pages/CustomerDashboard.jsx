import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Search, ShoppingBag, Calendar, Package, MapPin, Shield, CalendarDays, 
  CreditCard, Settings, AlertTriangle, Wrench, ChevronRight, MoreHorizontal, 
  Heart, Wallet, Tag, MessageSquare, Bell, Star, User, Activity, Zap, Truck, CheckCircle,
  Gift, Plus, Droplet, Bug, Paintbrush, Hammer, Sparkles, Grid
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import DashboardLayout from '../components/DashboardLayout';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { bookings, orders } = useStore();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Suraj' };

  const navItems = [
    { name: 'Dashboard', icon: Home, onClick: () => setActiveTab('Overview') },
    { name: 'Browse Services', icon: Search, link: '/services' },
    { name: 'Marketplace', icon: ShoppingBag, link: '/store' },
    { name: 'My Bookings', icon: Calendar, onClick: () => setActiveTab('My Bookings') },
    { name: 'My Orders', icon: Package, onClick: () => setActiveTab('My Orders') },
    { name: 'Live Tracking', icon: MapPin, onClick: () => setActiveTab('Live Tracking') },
    { name: 'My Home', icon: Home, onClick: () => setActiveTab('My Home') },
    { name: 'My Warranty', icon: Shield, onClick: () => setActiveTab('My Warranty') },
    { name: 'AMC Plans', icon: CalendarDays, onClick: () => setActiveTab('AMC Plans') },
    { name: 'Wishlist', icon: Heart, onClick: () => setActiveTab('Wishlist') },
    { name: 'Payments', icon: CreditCard, onClick: () => setActiveTab('Payments') },
    { name: 'Wallet', icon: Wallet, onClick: () => setActiveTab('Wallet') },
    { name: 'Coupons & Offers', icon: Tag, onClick: () => setActiveTab('Coupons & Offers') },
    { name: 'Messages', icon: MessageSquare, onClick: () => setActiveTab('Messages') },
    { name: 'Notifications', icon: Bell, onClick: () => setActiveTab('Notifications') },
    { name: 'Reviews', icon: Star, onClick: () => setActiveTab('Reviews') },
    { name: 'Profile', icon: User, onClick: () => setActiveTab('Profile') },
    { name: 'Settings', icon: Settings, onClick: () => setActiveTab('Settings') },
  ];

  const renderContent = () => {
    if (activeTab === 'Overview' || activeTab === 'Dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Hero Section */}
              <div className="bg-[#eef2fa] rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[240px]">
                <div 
                  className="absolute right-0 bottom-0 top-0 w-3/5 pointer-events-none"
                  style={{ 
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
                  }}
                >
                   <img src="/living_room_hero.png" alt="Living Room" className="object-cover h-full w-full object-center opacity-95" />
                </div>
                
                <div className="relative z-10 w-full md:w-3/5 pr-4">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 leading-tight">Hey,<br/>{userInfo.name} <span className="inline-block animate-bounce origin-bottom-right">👋</span></h1>
                  <p className="text-slate-600 font-medium mb-2">What would you like to book today?</p>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/80 rounded-2xl bg-white p-1.5 flex items-center z-20 transform -translate-y-2">
                <div className="pl-5 pr-2 text-indigo-400 shrink-0">
                  <Search size={22} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for services like AC Repair, Plumbing, Cleaning..." 
                  className="flex-1 py-3.5 px-3 border-0 border-transparent focus:border-transparent focus:ring-0 outline-none focus:outline-none shadow-none bg-transparent text-sm font-bold text-slate-800 placeholder:text-slate-400 w-full" 
                  style={{ boxShadow: 'none' }}
                />
                <button className="bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all ml-2 shrink-0">Search</button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { icon: Wrench, color: 'text-indigo-500', bg: 'bg-indigo-50', label: 'Book Service', link: '/services' },
                  { icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Buy Product', link: '/store' },
                  { icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Emergency Service' },
                  { icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Track Booking' },
                  { icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50', label: 'My Warranty' },
                  { icon: Home, color: 'text-amber-500', bg: 'bg-amber-50', label: 'My Home' },
                ].map((item, i) => (
                  <Link to={item.link || '#'} key={i} className="bg-white rounded-3xl p-4 py-5 flex flex-col items-center justify-center gap-3 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-transform`}>
                      <item.icon size={26} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Bookings & Orders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* My Bookings */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">My Bookings</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-5">
                    {[
                      { title: 'AC Repair & Service', id: '#BK12345', date: 'Tomorrow 10:00 AM', status: 'Confirmed', statusColor: 'text-indigo-600 bg-indigo-50' },
                      { title: 'Plumbing Service', id: '#BK12312', date: '12 May 2025 02:00 PM', status: 'Completed', statusColor: 'text-emerald-600 bg-emerald-50' },
                      { title: 'Deep Cleaning', id: '#BK12233', date: '18 May 2025 11:00 AM', status: 'Pending', statusColor: 'text-amber-600 bg-amber-50' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-center group cursor-pointer">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 text-indigo-500 group-hover:bg-indigo-50 transition-colors"><Wrench size={20}/></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 font-medium leading-tight">Booking ID: {item.id}</span>
                              <span className="text-[10px] text-slate-500 font-bold leading-tight mt-0.5">{item.date.split(' ')[0]} {item.date.split(' ')[1]}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${item.statusColor}`}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Orders */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">My Orders</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-5">
                    {[
                      { title: 'Samsung Washing Machine', id: '#ORD12345', status: 'Delivered', statusColor: 'text-emerald-500' },
                      { title: 'Kent RO Water Purifier', id: '#ORD12312', status: 'Shipped', statusColor: 'text-blue-500' },
                      { title: 'Philips Mixer Grinder', id: '#ORD12231', status: 'Processing', statusColor: 'text-amber-500' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-center group cursor-pointer">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 text-slate-600 group-hover:bg-slate-100 transition-colors"><Package size={20}/></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Order ID: {item.id}</span>
                          <span className={`text-[10px] font-bold mt-0.5 block ${item.statusColor}`}>{item.status}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended For You */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">Recommended For You</h3>
                  <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                   {[
                     { name: 'AC Service', icon: Wrench, color: 'text-blue-500' },
                     { name: 'RO Service', icon: Droplet, color: 'text-cyan-500' },
                     { name: 'Electrician', icon: Zap, color: 'text-amber-500' },
                     { name: 'Pest Control', icon: Bug, color: 'text-rose-500' },
                     { name: 'Painting', icon: Paintbrush, color: 'text-purple-500' },
                     { name: 'Carpentry', icon: Hammer, color: 'text-amber-700' },
                     { name: 'Home Cleaning', icon: Sparkles, color: 'text-teal-500' },
                     { name: 'More', icon: Grid, color: 'text-slate-500' },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
                       <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:shadow-md group-hover:border-slate-200 transition-all">
                         <item.icon size={22} className={`${item.color} group-hover:scale-110 transition-transform`} />
                       </div>
                       <span className="text-[10px] font-bold text-slate-600 text-center leading-tight whitespace-nowrap">{item.name}</span>
                     </div>
                   ))}
                </div>
              </div>

            </div>

            {/* Right Column (1/3 width) */}
            <div className="space-y-6">
              
              {/* Home Health Score */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 text-sm">Home Health Score</h3>
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="351.8" strokeDashoffset={351.8 * (1 - 86/100)} className="transition-all duration-1000" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center mt-1">
                      <span className="text-3xl font-black text-slate-800 tracking-tighter">86</span>
                      <span className="text-[10px] font-bold text-slate-500">Excellent</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 text-slate-700 font-bold"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> AC Service Due</span>
                    <span className="text-emerald-500 font-bold">In 12 days</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 text-slate-700 font-bold"><div className="w-2 h-2 rounded-full bg-amber-500"></div> RO Filter Due</span>
                    <span className="text-amber-500 font-bold">In 5 days</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 text-slate-700 font-bold"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Deep Cleaning Due</span>
                    <span className="text-rose-500 font-bold">Overdue</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Booking */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Upcoming Booking</h3>
                  <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 border border-slate-100">
                    <Wrench className="text-indigo-400" size={24}/>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">AC Repair & Service</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Technician: Raj Kumar</p>
                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1"><CalendarDays size={10} className="text-slate-400"/> Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">Confirmed</span>
                </div>
              </div>

              {/* Wallet Balance */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                    <Wallet size={20}/>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 mb-0.5">Wallet Balance</p>
                    <p className="text-lg font-black text-slate-800">₹1,250.00</p>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white text-[11px] font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">Add Money</button>
              </div>

              {/* Invite & Earn */}
              <div className="bg-[#EEF2FF] rounded-[2rem] p-6 border border-[#E0E7FF] relative overflow-hidden flex items-center">
                <div className="relative z-10 flex-1 pr-12">
                  <h3 className="font-black text-indigo-950 mb-1 text-sm">Invite & Earn</h3>
                  <p className="text-[11px] font-medium text-indigo-800/80 mb-4 leading-relaxed">Invite your friends and earn exciting rewards</p>
                  <button className="bg-white text-indigo-600 text-[11px] font-bold px-4 py-2 rounded-xl shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-colors">Invite Now</button>
                </div>
                <div className="absolute right-[-10px] bottom-[-10px] transform -rotate-6">
                   <Gift size={90} className="text-indigo-200" strokeWidth={1.5} />
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      );
    }

    // Fallback for other tabs (Mock for now since they are under development)
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
      role="Customer" 
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

export default CustomerDashboard;
