import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.message === 'Account pending admin approval') {
          navigate('/verification-pending');
          return;
        }
        throw new Error(data.message || 'Invalid email or password');
      }
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (redirect) {
        navigate(redirect);
      } else {
        if (data.role === 'admin') navigate('/dashboard/admin');
        else if (data.role === 'technician') navigate('/dashboard/technician');
        else if (data.role === 'vendor') navigate('/dashboard/vendor');
        else navigate('/dashboard/customer');
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Split: Image/Brand Section */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80" 
            alt="Premium Service" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl text-white tracking-tight">SevaSetu</span>
            </Link>
          </div>
          
          <div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-white mb-6 leading-tight"
            >
              Your trusted partner for a perfectly running home.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg font-medium mb-8"
            >
              Join thousands of happy customers who rely on our verified professionals every single day.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 text-sm font-bold text-slate-400"
            >
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-400"/> Vetted Pros</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-400"/> Instant Booking</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Split: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          {/* Mobile Logo (hidden on desktop) */}
          <div className="lg:hidden mb-12 flex justify-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">SevaSetu</span>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500 font-medium mb-8">Please enter your details to sign in.</p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold flex items-center gap-3">
                <ShieldCheck size={20} className="shrink-0" /> 
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all flex justify-center items-center gap-2 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing In...' : (
                  <>Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-slate-500 font-medium">
                Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 ml-1">Sign up for free</Link>
              </p>
            </div>
            

            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
