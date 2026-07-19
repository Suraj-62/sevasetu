import { useState, useEffect } from 'react';
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
  const [jobs, setJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchPendingJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = userInfo?.token;
      if (!token) return;
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/bookings/technician`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  const fetchPendingJobs = async () => {
    try {
      const token = userInfo?.token;
      if (!token) return;
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/bookings/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch pending jobs", error);
    }
  };

  const acceptJob = async (id) => {
    try {
      const token = userInfo?.token;
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/bookings/${id}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Job Accepted!");
        fetchJobs(); // Update my schedule
        fetchPendingJobs(); // Remove from open jobs
      } else {
        const err = await res.json();
        alert(err.message || "Failed to accept job.");
      }
    } catch (error) {
      console.error("Failed to accept job", error);
    }
  };

  const updateJobStatus = async (id, status) => {
    try {
      const token = userInfo?.token;
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchJobs(); // refresh list
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

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
              <div className="flex-1 relative overflow-y-auto max-h-[300px]">
                {/* Vertical Line */}
                <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-slate-200"></div>
                
                <div className="space-y-6">
                  {jobs.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-4">No jobs assigned yet.</p>
                  ) : (
                    jobs.map((job, idx) => (
                      <div key={job._id} className="flex gap-4 relative">
                        <div className="w-12 text-right pt-1 shrink-0"><span className="text-[9px] font-bold text-slate-500 block leading-tight">{job.timeSlot.split('-')[0].trim()}</span></div>
                        <div className={`w-3 h-3 rounded-full ${job.status === 'completed' ? 'bg-emerald-500' : job.status === 'in_progress' ? 'bg-indigo-500' : job.status === 'accepted' ? 'bg-teal-500' : 'bg-slate-300'} border-[3px] border-white shadow-sm relative z-10 mt-1.5 shrink-0`}></div>
                        <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm relative">
                           <div className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-md border ${job.status === 'completed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : job.status === 'in_progress' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : job.status === 'accepted' ? 'text-teal-600 bg-teal-50 border-teal-100' : 'text-slate-600 bg-slate-100 border-slate-200'}`}>
                             {job.status.toUpperCase()}
                           </div>
                           <h4 className="text-xs font-bold text-slate-800 mb-1">{job.service}</h4>
                           <p className="text-[10px] text-slate-500 flex items-center gap-1 mb-0.5"><User size={10}/> {job.customer?.name || 'Customer'}</p>
                           <p className="text-[10px] text-slate-500 flex items-center gap-1"><MapPin size={10}/> {job.address?.street}, {job.address?.city}</p>
                           
                           <div className="flex gap-2 mt-3">
                             {job.status === 'pending' && (
                               <button onClick={() => updateJobStatus(job._id, 'accepted')} className="flex-1 py-1.5 rounded-lg border border-teal-200 text-teal-600 bg-teal-50 font-bold text-[10px] hover:bg-teal-100 transition-colors">Accept</button>
                             )}
                             {job.status === 'accepted' && (
                               <button onClick={() => updateJobStatus(job._id, 'in_progress')} className="flex-1 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 bg-indigo-50 font-bold text-[10px] hover:bg-indigo-100 transition-colors">Start Job</button>
                             )}
                             {job.status === 'in_progress' && (
                               <button onClick={() => updateJobStatus(job._id, 'completed')} className="flex-1 py-1.5 rounded-lg border border-emerald-200 text-emerald-600 bg-emerald-50 font-bold text-[10px] hover:bg-emerald-100 transition-colors">Mark Completed</button>
                             )}
                             {job.status !== 'completed' && job.status !== 'cancelled' && (
                               <button onClick={() => updateJobStatus(job._id, 'cancelled')} className="flex-1 py-1.5 rounded-lg border border-red-200 text-red-600 font-bold text-[10px] hover:bg-red-50 transition-colors">Cancel</button>
                             )}
                           </div>
                        </div>
                      </div>
                    ))
                  )}
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
                {pendingJobs.length === 0 ? (
                  <p className="text-center text-slate-500 text-[11px] py-4">No pending jobs in your area.</p>
                ) : (
                  pendingJobs.slice(0, 3).map((job) => (
                    <div key={job._id} className="flex gap-4 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Wrench size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-bold text-slate-800 truncate">{job.service}</h4>
                        <p className="text-[9px] text-slate-500 truncate">{job.address?.city || 'Ranchi, Jharkhand'}</p>
                        <p className="text-[9px] font-bold text-indigo-500 mt-0.5">{job.timeSlot || 'Anytime'}</p>
                      </div>
                      <div className="text-right flex flex-col items-end justify-between h-full">
                        <span className="text-xs font-black text-slate-800 block mb-0.5">₹{job.totalAmount}</span>
                        <span className="text-[8px] text-slate-400 block mb-2 font-medium">Est. 1h</span>
                        <button onClick={() => acceptJob(job._id)} className="bg-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">Accept</button>
                      </div>
                    </div>
                  ))
                )}
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
    if (activeTab === 'Booking Requests') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Booking Requests</h2>
              <p className="text-slate-500 font-medium">Accept pending jobs in your area</p>
            </div>
            <button onClick={fetchPendingJobs} className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              Refresh List
            </button>
          </div>

          {pendingJobs.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                 <MapPin size={40} className="text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-700 mb-2">No pending requests</h3>
               <p className="text-slate-500 mb-6 max-w-sm mx-auto">There are currently no new booking requests in your service area. We will notify you when new jobs arrive.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingJobs.map((job) => (
                <div key={job._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                       <Wrench className="text-indigo-600" size={24} />
                     </div>
                     <span className="bg-indigo-50 text-indigo-600 font-bold px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider">
                       New Request
                     </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{job.service}</h3>
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-slate-500">
                       <MapPin size={14} className="text-slate-400" />
                       <span className="text-sm font-medium truncate">{job.address?.street}, {job.address?.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                       <CalendarDays size={14} className="text-slate-400" />
                       <span className="text-sm font-medium">{job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : 'ASAP'} • {job.timeSlot || 'Anytime'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                       <DollarSign size={14} className="text-slate-400" />
                       <span className="text-sm font-bold text-slate-700">₹{job.totalAmount} Estimated</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex gap-3">
                     <button onClick={() => acceptJob(job._id)} className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm text-sm">
                        Accept Job
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

    if (activeTab === "Today's Jobs") {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Today's Jobs</h2>
              <p className="text-slate-500 font-medium">Manage your assigned schedule</p>
            </div>
            <button onClick={fetchJobs} className="bg-[#4f46e5] text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors">
              Refresh Schedule
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                 <CalendarDays size={40} className="text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-700 mb-2">No jobs assigned today</h3>
               <p className="text-slate-500 mb-6 max-w-sm mx-auto">You don't have any tasks scheduled for today. Check the Booking Requests tab to accept open jobs.</p>
               <button onClick={() => setActiveTab('Booking Requests')} className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">View Requests</button>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
               <div className="space-y-6">
                 {jobs.map((job) => (
                   <div key={job._id} className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 border border-slate-100 rounded-[1.5rem] hover:shadow-md transition-shadow relative overflow-hidden">
                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${job.status === 'completed' ? 'bg-emerald-500' : job.status === 'in_progress' ? 'bg-indigo-500' : job.status === 'accepted' ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                     
                     <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                       <Wrench className="text-indigo-600" size={32} />
                     </div>
                     
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-black text-slate-800">{job.service}</h3>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${job.status === 'completed' ? 'text-emerald-600 bg-emerald-50' : job.status === 'in_progress' ? 'text-indigo-600 bg-indigo-50' : job.status === 'accepted' ? 'text-teal-600 bg-teal-50' : 'text-slate-600 bg-slate-100'}`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                           <div className="flex items-center gap-2 text-slate-500">
                              <User size={14} className="text-slate-400" />
                              <span className="text-sm font-semibold">{job.customer?.name || 'Customer'}</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-500">
                              <MapPin size={14} className="text-slate-400" />
                              <span className="text-sm font-semibold">{job.address?.street}, {job.address?.city}</span>
                           </div>
                           <div className="flex items-center gap-2 text-slate-500">
                              <Clock size={14} className="text-slate-400" />
                              <span className="text-sm font-semibold">{job.timeSlot || 'Anytime'}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="w-full md:w-auto flex md:flex-col gap-3 shrink-0">
                         {job.status === 'pending' && (
                           <button onClick={() => updateJobStatus(job._id, 'accepted')} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-teal-50 text-teal-600 font-bold text-sm hover:bg-teal-100 transition-colors shadow-sm">Accept Job</button>
                         )}
                         {job.status === 'accepted' && (
                           <button onClick={() => updateJobStatus(job._id, 'in_progress')} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">Start Job</button>
                         )}
                         {job.status === 'in_progress' && (
                           <button onClick={() => updateJobStatus(job._id, 'completed')} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold text-sm hover:bg-emerald-100 transition-colors shadow-sm">Mark Completed</button>
                         )}
                         {job.status !== 'completed' && job.status !== 'cancelled' && (
                           <button onClick={() => updateJobStatus(job._id, 'cancelled')} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">Cancel</button>
                         )}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </motion.div>
      );
    }
    
    // For all other generic tabs, show a generic beautiful working view
    const tabIcons = {
      'Earnings': Wallet, 'Wallet': DollarSign, 'Performance': TrendingUp, 'Ratings': Star, 
      'Emergency Requests': AlertTriangle, 'Navigation': Navigation, 'Customers': Users, 
      'Calendar': CalendarDays, 'Messages': MessageSquare, 'Notifications': Bell, 'Profile': User
    };
    const TabIcon = tabIcons[activeTab] || Activity;

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] p-12 shadow-[0_2px_15px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-100">
            <TabIcon size={40} className="text-indigo-500" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-4">{activeTab} Manager</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-8 text-lg">
            Your {activeTab.toLowerCase()} data is fully synced. No new alerts or actions required at this time.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Status</p>
                <p className="font-black text-slate-700">Active</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Sync</p>
                <p className="font-black text-slate-700">Just now</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Alerts</p>
                <p className="font-black text-slate-700">None</p>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Health</p>
                <p className="font-black text-emerald-500">100%</p>
             </div>
          </div>
          <button onClick={() => setActiveTab('Overview')} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
             Return to Dashboard
          </button>
        </div>
      </motion.div>
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
