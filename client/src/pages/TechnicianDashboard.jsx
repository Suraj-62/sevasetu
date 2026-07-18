import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Calendar, CalendarDays, AlertTriangle, Navigation, Users, DollarSign, 
  Wallet, TrendingUp, Star, MessageSquare, Bell, User, Settings, CheckCircle, 
  Clock, MapPin, Power, Activity, ChevronDown, ChevronRight, Headphones, Wrench, MoreHorizontal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useStore from '../store/useStore';
import DashboardLayout from '../components/DashboardLayout';

const performanceData = [
  { name: 'Mon', jobs: 3, earnings: 2400 },
  { name: 'Tue', jobs: 5, earnings: 4000 },
  { name: 'Wed', jobs: 4, earnings: 3200 },
  { name: 'Thu', jobs: 6, earnings: 4800 },
  { name: 'Fri', jobs: 4, earnings: 3200 },
  { name: 'Sat', jobs: 7, earnings: 5600 },
  { name: 'Sun', jobs: 2, earnings: 1600 },
];

const TechnicianDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isOnline, setIsOnline] = useState(true);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || { name: 'Technician' });
  const [isEmergencyOn, setIsEmergencyOn] = useState(true);

  const navItems = [
    { name: 'Dashboard', icon: Home, onClick: () => setActiveTab('Overview') },
    { name: "Today's Jobs", icon: Calendar, onClick: () => setActiveTab("Today's Jobs") },
    { name: 'Booking Requests', icon: CalendarDays, onClick: () => setActiveTab('Booking Requests') },
    { name: 'Emergency Requests', icon: AlertTriangle, onClick: () => setActiveTab('Emergency Requests') },
    { name: 'Navigation', icon: Navigation, onClick: () => setActiveTab('Navigation') },
    { name: 'Customers', icon: Users, onClick: () => setActiveTab('Customers') },
    { name: 'Earnings', icon: DollarSign, onClick: () => setActiveTab('Earnings') },
    { name: 'Wallet', icon: Wallet, onClick: () => setActiveTab('Wallet') },
    { name: 'Performance', icon: TrendingUp, onClick: () => setActiveTab('Performance') },
    { name: 'Ratings', icon: Star, onClick: () => setActiveTab('Ratings') },
    { name: 'Calendar', icon: CalendarDays, onClick: () => setActiveTab('Calendar') },
    { name: 'Messages', icon: MessageSquare, onClick: () => setActiveTab('Messages') },
    { name: 'Notifications', icon: Bell, onClick: () => setActiveTab('Notifications') },
    { name: 'Profile', icon: User, onClick: () => setActiveTab('Profile') },
    { name: 'Settings', icon: Settings, onClick: () => setActiveTab('Settings') },
  ];

  const renderContent = () => {
    if (activeTab === 'Overview' || activeTab === 'Dashboard') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-full">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 cursor-pointer">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-2">Online <ChevronDown size={14} className="text-slate-400" /></span>
                <span className="text-[10px] text-slate-500 font-medium">Available for jobs</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">Hey, {userInfo.name} 👋</h1>
              <p className="text-sm font-medium text-slate-500">You have 4 jobs scheduled today.</p>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Today's Jobs */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                <CalendarDays size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1">Today's Jobs</p>
                <p className="text-2xl font-black text-slate-800 leading-none">4</p>
                <p className="text-[10px] font-bold text-indigo-500 mt-1 cursor-pointer hover:underline">View all</p>
              </div>
            </div>
            
            {/* Completed Jobs */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#D1FAE5]">
                <CheckCircle size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1">Completed Jobs</p>
                <p className="text-2xl font-black text-slate-800 leading-none">12</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1">This Week</p>
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
                <Wallet size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1">Earnings (Today)</p>
                <p className="text-2xl font-black text-slate-800 leading-none">₹3,200</p>
                <p className="text-[10px] font-bold text-blue-500 mt-1 cursor-pointer hover:underline">View details</p>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
                <Star size={24} strokeWidth={1.5} className="fill-[#F97316]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1">Rating</p>
                <p className="text-2xl font-black text-slate-800 leading-none flex items-baseline gap-1">4.9</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1">560 Reviews</p>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                <TrendingUp size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-1">Completion Rate</p>
                <p className="text-2xl font-black text-slate-800 leading-none">98%</p>
                <p className="text-[10px] font-medium text-slate-400 mt-1">Excellent</p>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Today's Schedule */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
              <h3 className="font-bold text-slate-800 mb-6 text-sm">Today's Schedule</h3>
              <div className="flex-1 relative">
                {/* Vertical Line */}
                <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-slate-200"></div>
                
                <div className="space-y-6">
                  {/* Job 1 */}
                  <div className="flex gap-4 relative">
                    <div className="w-12 text-right pt-1 shrink-0"><span className="text-[9px] font-bold text-slate-500 block leading-tight">10:00<br/>AM</span></div>
                    <div className="w-3 h-3 rounded-full bg-indigo-500 border-[3px] border-white shadow-sm relative z-10 mt-1.5 shrink-0"></div>
                    <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative">
                       <div className="absolute top-3 right-3 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">In Progress</div>
                       <h4 className="text-xs font-bold text-slate-800 mb-1">AC Repair & Service</h4>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-0.5"><User size={10}/> Amit Verma</p>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10}/> Ranchi, Jharkhand</p>
                       <button className="w-full mt-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 font-bold text-[10px] hover:bg-indigo-50 transition-colors">Navigate</button>
                    </div>
                  </div>
                  
                  {/* Job 2 */}
                  <div className="flex gap-4 relative">
                    <div className="w-12 text-right pt-1 shrink-0"><span className="text-[9px] font-bold text-slate-500 block leading-tight">12:30<br/>PM</span></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 border-[3px] border-white shadow-sm relative z-10 mt-1.5 shrink-0"></div>
                    <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100">
                       <div className="absolute top-3 right-3 text-[9px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">Upcoming</div>
                       <h4 className="text-xs font-bold text-slate-800 mb-1">Electrical Wiring</h4>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-0.5"><User size={10}/> Neha Singh</p>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10}/> Ranchi, Jharkhand</p>
                       <button className="w-full mt-3 py-1.5 rounded-lg border border-slate-200 text-indigo-600 font-bold text-[10px] hover:bg-slate-50 transition-colors">View Details</button>
                    </div>
                  </div>

                  {/* Job 3 */}
                  <div className="flex gap-4 relative">
                    <div className="w-12 text-right pt-1 shrink-0"><span className="text-[9px] font-bold text-slate-500 block leading-tight">03:00<br/>PM</span></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300 border-[3px] border-white shadow-sm relative z-10 mt-1.5 shrink-0"></div>
                    <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100">
                       <div className="absolute top-3 right-3 text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">Scheduled</div>
                       <h4 className="text-xs font-bold text-slate-800 mb-1">Fan Installation</h4>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-0.5"><User size={10}/> Suresh Yadav</p>
                       <p className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10}/> Ranchi, Jharkhand</p>
                       <button className="w-full mt-3 py-1.5 rounded-lg border border-slate-200 text-indigo-600 font-bold text-[10px] hover:bg-slate-50 transition-colors">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-[11px] font-bold text-indigo-600 py-2 hover:bg-indigo-50 rounded-xl transition-colors">View Full Schedule</button>
            </div>

            {/* Earnings Overview */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">Earnings Overview</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-800">₹18,000</span>
                    <span className="text-[10px] font-bold text-emerald-500">+24% <span className="text-slate-400 font-medium">vs last week</span></span>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-50 shadow-sm">This Week <ChevronDown size={12}/></button>
              </div>
              
              <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                    <CartesianGrid stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#64748b', fontSize: '12px' }}
                      itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Nearby Jobs */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-sm">Nearby Jobs</h3>
                <button className="text-[11px] font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'AC Repair', loc: 'Ranchi, Jharkhand', dist: '1.2 km away', price: '₹350', icon: Wrench, color: 'text-blue-500', bg: 'bg-teal-50' },
                  { title: 'Electrical Inspection', loc: 'Ranchi, Jharkhand', dist: '1.8 km away', price: '₹250', icon: Power, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { title: 'Fan Repair', loc: 'Ranchi, Jharkhand', dist: '2.5 km away', price: '₹150', icon: Activity, color: 'text-slate-700', bg: 'bg-slate-100' },
                ].map((job, i) => (
                  <div key={i} className="flex gap-4 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl ${job.bg} ${job.color} flex items-center justify-center shrink-0`}>
                      <job.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold text-slate-800 truncate">{job.title}</h4>
                      <p className="text-[9px] text-slate-500 truncate">{job.loc}</p>
                      <p className="text-[9px] font-bold text-indigo-500 mt-0.5">{job.dist}</p>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-full">
                      <span className="text-xs font-black text-slate-800 block mb-0.5">{job.price}</span>
                      <span className="text-[8px] text-slate-400 block mb-2 font-medium">Est. 1h</span>
                      <button className="bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">Accept</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-auto pt-4 text-[11px] font-bold text-indigo-600 py-2 hover:bg-indigo-50 border border-slate-100 rounded-xl transition-colors">View More Jobs</button>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Update Availability */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative shrink-0 p-1 cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Update Availability</h4>
                <p className="text-[9px] text-slate-500 font-medium leading-tight">Let customers know when you are available</p>
              </div>
            </div>

            {/* Emergency Jobs */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <AlertTriangle size={16} strokeWidth={2}/>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Emergency Jobs</h4>
                <p className="text-[9px] text-slate-500 font-medium leading-tight">Get notified for urgent requests</p>
              </div>
            </div>

            {/* My Tools */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Wrench size={16} strokeWidth={2}/>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">My Tools</h4>
                <p className="text-[9px] text-slate-500 font-medium leading-tight">Manage your tools & equipment</p>
              </div>
            </div>

            {/* Help Center */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Headphones size={16} strokeWidth={2}/>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800 mb-0.5">Help Center</h4>
                <p className="text-[9px] text-slate-500 font-medium leading-tight">Get help and support</p>
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
                    <input type="text" name="name" defaultValue={userInfo.name} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" name="email" defaultValue={userInfo.email || ''} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" defaultValue={userInfo.phone || ''} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Service Area</label>
                    <input type="text" name="address" defaultValue={userInfo.address || 'Ranchi, Jharkhand'} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium" />
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
      role="Technician" 
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

export default TechnicianDashboard;
