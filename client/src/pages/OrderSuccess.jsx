import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Package, Clock, Navigation } from 'lucide-react';
import { useEffect } from 'react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // If directly navigated without state, redirect to home
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location, navigate]);

  if (!location.state) return null;

  const { type, providerName, items, totalAmount, orderId } = location.state;

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center mt-20">
      <div className="max-w-4xl w-full">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header Success Section */}
          <div className="bg-[#0F766E] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle size={48} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Order Confirmed!</h1>
            <p className="text-teal-100 font-medium text-lg">Your {type === 'service' ? 'booking' : 'order'} #{orderId} has been successfully placed.</p>
          </div>

          {/* Body Content */}
          <div className="p-8 md:p-12">
            
            <div className="flex flex-col md:flex-row gap-12">
              {/* Order Details Left Side */}
              <div className="flex-1 space-y-8">
                
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Summary</h3>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0F766E]">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{type === 'service' ? 'Service Provider' : 'Shop Name'}</p>
                        <h4 className="text-lg font-black text-slate-800">{providerName}</h4>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-4">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-slate-600 font-medium">
                          <span>{item.name} {item.qty > 1 ? `x${item.qty}` : ''}</span>
                          <span className="font-bold text-slate-800">₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <span className="font-bold text-slate-800 text-lg">Total Paid</span>
                      <span className="font-black text-2xl text-[#0F766E]">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Live Tracking Right Side */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Live Tracking</h3>
                
                <div className="bg-slate-900 rounded-2xl p-1 relative overflow-hidden h-[300px] flex flex-col group">
                  {/* Fake Map Background */}
                  <div className="absolute inset-0 bg-[#0F172A]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                  
                  {/* Animated Path on Map */}
                  <svg className="absolute inset-0 w-full h-full stroke-emerald-500/50 stroke-[4] fill-transparent" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path d="M 20 80 Q 40 20, 80 20" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
                  </svg>

                  <div className="flex-1 relative z-10 flex items-center justify-center">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgb(0,0,0,0.4)]">
                       <MapPin size={32} className="text-[#0F766E]" />
                    </motion.div>
                  </div>

                  <div className="relative z-10 bg-white m-2 rounded-xl p-4 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                      <p className="text-sm font-bold text-slate-800 flex items-center gap-1"><Clock size={14} className="text-[#0F766E]" /> {type === 'service' ? 'Assigning Professional...' : 'Preparing Order...'}</p>
                    </div>
                    <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#0F766E] hover:text-white transition-colors text-slate-600">
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="mt-12 flex justify-center pt-8 border-t border-slate-100">
               <Link to="/dashboard/customer" className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                 Go to Dashboard
               </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
