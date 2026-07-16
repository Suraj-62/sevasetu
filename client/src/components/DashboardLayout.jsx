import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, Shield, LogOut, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      
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

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col overflow-y-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Shield className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">SevaSetu</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="mb-6 px-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{role} Portal</span>
          </div>

          <ul className="space-y-1.5 flex-1 pb-20">
            {navItems.map(item => (
              <li key={item.name}>
                {item.link ? (
                  <Link to={item.link} className="flex items-center px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white font-bold rounded-xl transition-all text-sm group">
                    <item.icon size={20} className="mr-3 group-hover:text-teal-400 transition-colors" /> {item.name}
                  </Link>
                ) : item.subItems ? (
                  <div>
                    <button 
                      onClick={() => setOpenMenus(prev => ({...prev, [item.name]: !prev[item.name]}))}
                      className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:bg-slate-900 hover:text-white font-bold rounded-xl transition-all text-sm group"
                    >
                      <div className="flex items-center">
                        <item.icon size={20} className="mr-3 group-hover:text-teal-400 transition-colors" /> {item.name}
                      </div>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openMenus[item.name] ? 'rotate-180' : ''}`} />
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
                                className={`w-full flex items-center px-3 py-2 text-sm font-bold rounded-lg transition-colors ${
                                  activeTab === sub.name ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
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
                    className={`w-full flex items-center px-4 py-3 font-bold rounded-xl transition-all text-sm group ${
                      activeTab === item.name 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} className={`mr-3 transition-colors ${activeTab === item.name ? 'text-white' : 'group-hover:text-teal-400'}`} /> {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button onClick={() => { localStorage.removeItem('userInfo'); window.location.href = '/login'; }} className="flex items-center px-4 py-3 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-bold rounded-xl transition-all text-sm group w-full text-left">
              <LogOut size={20} className="mr-3" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 px-4 sm:px-8 flex items-center justify-between shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100">
              <Menu size={24} />
            </button>
            
            {/* Search Bar (Hidden on small mobile) */}
            <div className="hidden md:flex relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-900" />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                  {userName.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-bold text-slate-900 leading-none">{userName}</p>
                  <p className="text-xs font-medium text-slate-500 mt-1">{role}</p>
                </div>
                <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
              </button>
              
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors">Profile Settings</button>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors">Support</button>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <Link to="/login" className="w-full text-left px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors block">Sign out</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
