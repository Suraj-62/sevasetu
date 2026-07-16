import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Clock, ArrowLeft } from 'lucide-react';

const VerificationPending = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Animated Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Premium Glass Card */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-700/50 p-1">
          <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-[2.25rem] relative overflow-hidden">
            
            {/* Header Section */}
            <div className="p-12 pb-8 text-center relative">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
                className="w-28 h-28 mx-auto flex items-center justify-center relative mb-8"
              >
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 to-violet-400 rounded-full flex items-center justify-center shadow-inner border border-indigo-300/30">
                  <ShieldCheck className="text-white" size={56} strokeWidth={1.5} />
                  <motion.div 
                     animate={{ rotate: 360 }} 
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-[-10px] border border-indigo-400/30 rounded-full border-dashed"
                  />
                </div>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-300 tracking-tight mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
                Your application has been received successfully. You're one step away from joining <span className="text-white font-bold">SevaSetu</span>.
              </p>
            </div>

            {/* Info Cards */}
            <div className="px-8 pb-12 space-y-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="group bg-slate-800/50 hover:bg-slate-800/80 p-6 rounded-3xl border border-slate-700/50 transition-all duration-300 flex items-start gap-5 hover:border-amber-500/30"
              >
                <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Clock size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide mb-1 flex items-center gap-2">
                    Verification Under Process
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Our Super Admin team is manually reviewing your application and documents. This secure process usually takes <strong className="text-amber-400/90 font-bold">up to 12 hours</strong>.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="group bg-slate-800/50 hover:bg-slate-800/80 p-6 rounded-3xl border border-slate-700/50 transition-all duration-300 flex items-start gap-5 hover:border-teal-500/30"
              >
                <div className="w-14 h-14 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Mail size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white tracking-wide mb-1">Check Your Email</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    We've sent a confirmation email to your registered address. You will receive a second email with your approval status and dashboard access.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Action Area */}
            <div className="p-8 border-t border-slate-700/50 bg-slate-900/50 flex justify-center">
              <Link to="/" className="group relative inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowLeft size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" /> 
                <span className="relative z-10 tracking-wide">Back to Home Page</span>
              </Link>
            </div>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPending;
