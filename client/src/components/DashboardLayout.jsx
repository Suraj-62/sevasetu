import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, Shield, LogOut, ChevronDown, MapPin, AlertTriangle, MessageSquare, Moon, Wallet } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const DashboardLayout = ({ role, userName = "User", navItems, activeTab, setActiveTab, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const handleNavClick = (onClickAction) => {
    if (onClickAction) {
      onClickAction();
    }
    setMobileMenuOpen(false); // Close mobile menu on navigate
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - White, 250px width */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[250px] bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 px-2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  <Shield className="text-white" size={20} />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">Seva<span className="text-blue-600">Setu</span></span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-700">
              <X size={22} />
            </button>
          </div>

          <div className="mb-4 px-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role} Portal</span>
          </div>

          <ul className="space-y-1.5 flex-1 pb-20 px-1">
            {navItems.map(item => {
              const isActive = activeTab === item.name;
              return (
                <li key={item.name}>
                  {item.link ? (
                    <Link to={item.link} className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-2xl transition-all text-[13px] group">
                      <item.icon size={18} className="mr-3 text-slate-400 group-hover:text-blue-600 transition-colors" /> {item.name}
                    </Link>
                  ) : item.subItems ? (
                    <div>
                      <button 
                        onClick={() => setOpenMenus(prev => ({...prev, [item.name]: !prev[item.name]}))}
                        className="w-full flex items-center justify-between px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-2xl transition-all text-[13px] group"
                      >
                        <div className="flex items-center">
                          <item.icon size={18} className="mr-3 text-slate-400 group-hover:text-blue-600 transition-colors" /> {item.name}
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${openMenus[item.name] ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openMenus[item.name] && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-11 pr-2 py-1 space-y-1 overflow-hidden"
                          >
                            {item.subItems.map(sub => (
                              <li key={sub.name}>
                                <button
                                  onClick={() => handleNavClick(sub.onClick)}
                                  className={`w-full flex items-center px-3 py-2 text-[13px] font-semibold rounded-xl transition-colors ${
                                    activeTab === sub.name ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                  }`}
                                >
                                  {sub.name}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleNavClick(item.onClick)}
                      className={`w-full flex items-center px-4 py-3 font-semibold rounded-2xl transition-all text-[13px] group ${
                        isActive 
                        ? 'bg-[#EFF6FF] text-[#0F766E]' 
                        : 'text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-900'
                      }`}
                    >
                      <item.icon size={18} className={`mr-3 transition-colors ${isActive ? 'text-[#0F766E]' : 'text-slate-400 group-hover:text-[#0F766E]'}`} /> {item.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-4 border-t border-slate-100 px-1">
            <button onClick={() => { localStorage.removeItem('userInfo'); window.location.href = '/login'; }} className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 font-semibold rounded-2xl transition-all text-[13px] group w-full text-left">
              <LogOut size={18} className="mr-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header - Redesigned */}
        <header className="bg-white border-b border-slate-200 h-[72px] px-4 sm:px-6 flex items-center justify-between shrink-0 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-6 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100">
              <Menu size={20} />
            </button>
            
            {/* Location & Search */}
            <div className="hidden md:flex items-center bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden h-10 shadow-sm hover:shadow-md transition-shadow max-w-lg w-full">
              <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors h-full">
                <MapPin size={15} className="text-slate-500" />
                <span className="text-[13px] font-semibold text-slate-700">Ranchi</span>
              </div>
              <div className="flex-1 flex items-center px-3 bg-white h-full">
                <Search size={15} className="text-slate-400 mr-2 shrink-0" />
                <input type="text" placeholder="Search..." className="w-full bg-transparent outline-none text-[13px] font-medium text-slate-800 placeholder:text-slate-400" />
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Emergency Button */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-[13px] transition-colors">
              <AlertTriangle size={15} /> Emergency
            </button>

            {/* Wallet */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[13px]">
              <Wallet size={15} /> ₹1,250
            </div>

            <div className="flex items-center gap-1">
              {/* Messages */}
              <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                <MessageSquare size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                <Bell size={19} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Dark Mode */}
              <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                <Moon size={19} />
              </button>
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0 ring-2 ring-white shadow-sm">
                  {userName.charAt(0)}
                </div>
              </button>
              
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="text-sm font-bold text-slate-900">{userName}</p>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase">{role}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">Profile Settings</button>
                    <button className="w-full text-left px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">Support</button>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <Link to="/login" onClick={() => localStorage.removeItem('userInfo')} className="w-full text-left px-4 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors block">Sign out</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
