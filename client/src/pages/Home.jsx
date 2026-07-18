import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShieldCheck, Clock, CheckCircle, Star, 
  Droplets, Wrench, Wind, Bug, Paintbrush, Zap, 
  MapPin, Users, MoreHorizontal, ChevronDown, CheckSquare, Tag, Banknote
} from 'lucide-react';
import Navbar from '../components/Navbar';

// --- Data Objects ---
const QUICK_CATEGORIES = [
  { icon: Wind, name: 'AC Repair', color: 'text-[#0F766E]' },
  { icon: Droplets, name: 'Cleaning', color: 'text-[#0F766E]' },
  { icon: Wrench, name: 'Plumbing', color: 'text-[#0F766E]' },
  { icon: Zap, name: 'Electrician', color: 'text-[#0F766E]' },
  { icon: Paintbrush, name: 'Painting', color: 'text-[#0F766E]' },
  { icon: CheckSquare, name: 'Appliance Repair', color: 'text-[#0F766E]' },
  { icon: Bug, name: 'Pest Control', color: 'text-[#0F766E]' },
  { icon: MoreHorizontal, name: 'More', color: 'text-[#0F766E]' },
];

const POPULAR_SERVICES = [
  { 
    name: 'AC Repair', 
    rating: '4.7 (1.2k)', 
    price: '₹499', 
    img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Deep Cleaning', 
    rating: '4.6 (980)', 
    price: '₹799', 
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Plumbing', 
    rating: '4.7 (1.1k)', 
    price: '₹399', 
    img: 'https://images.unsplash.com/photo-1607472586893-edb57cbce4ea?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    name: 'Electrician', 
    rating: '4.8 (1.3k)', 
    price: '₹299', 
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' 
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#0F766E] selection:text-white pb-24">
      <Navbar />

      <main className="pt-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Text & Search */}
          <div className="pr-0 lg:pr-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-[#0F766E] font-semibold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse"></span> SevaSetu 2.0 is Live
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.15] tracking-tight mb-6">
              Quality Home Services, <br />
              <span className="text-[#0F766E]">You Can Trust.</span>
            </h1>
            
            <p className="text-lg text-[#475569] mb-10 max-w-lg">
              Book verified professionals for your home needs or shop genuine products – all in one place.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center bg-white p-2 rounded-2xl shadow-lg border border-[#E2E8F0] mb-10">
              <div className="flex-1 flex items-center px-4 w-full border-b sm:border-b-0 sm:border-r border-[#E2E8F0] py-2 sm:py-0">
                <Search className="text-slate-400 mr-3" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for services (e.g. AC Repair, Cleaning)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full focus:outline-none text-[#0F172A] placeholder-slate-400 bg-transparent"
                />
              </div>
              <div className="flex items-center gap-4 px-4 py-3 sm:py-0 w-full sm:w-auto justify-between">
                <div className="flex items-center gap-2 cursor-pointer text-[#0F172A] font-medium">
                  <MapPin size={18} className="text-[#0F766E]" />
                  <span>New Delhi</span>
                  <ChevronDown size={16} className="text-slate-400" />
                </div>
                <button type="submit" className="bg-[#0F766E] hover:bg-[#115E59] text-white px-6 py-3 rounded-xl font-bold transition-colors">
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-6 lg:gap-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-lg leading-tight">10K+</p>
                  <p className="text-sm text-[#64748B]">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <Star size={20} className="fill-[#0F766E]" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-lg leading-tight">4.8</p>
                  <p className="text-sm text-[#64748B]">Average Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#0F766E]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-lg leading-tight">Certified</p>
                  <p className="text-sm text-[#64748B]">Professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Categories */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E2E8F0]">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">What do you need today?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUICK_CATEGORIES.map((cat, i) => (
                <Link 
                  to="/services" 
                  key={i}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#0F766E] hover:shadow-md transition-all duration-300 group bg-[#F8FAFC] hover:bg-white"
                >
                  <cat.icon size={32} strokeWidth={1.5} className={`${cat.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-semibold text-[#0F172A] text-center">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* FEATURES BANNER */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-16 flex flex-col md:flex-row justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
          <div className="flex items-center gap-4 px-4 w-full md:w-auto justify-center md:justify-start">
            <ShieldCheck size={28} className="text-[#0F766E]" />
            <div>
              <p className="font-bold text-[#0F172A]">Verified Professionals</p>
              <p className="text-sm text-[#64748B]">Background checked</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 w-full md:w-auto justify-center md:justify-start pt-6 md:pt-0">
            <Banknote size={28} className="text-[#0F766E]" />
            <div>
              <p className="font-bold text-[#0F172A]">Upfront Pricing</p>
              <p className="text-sm text-[#64748B]">No hidden charges</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 w-full md:w-auto justify-center md:justify-start pt-6 md:pt-0">
            <Clock size={28} className="text-[#0F766E]" />
            <div>
              <p className="font-bold text-[#0F172A]">On-time Service</p>
              <p className="text-sm text-[#64748B]">Punctual & reliable</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-4 w-full md:w-auto justify-center md:justify-start pt-6 md:pt-0">
            <CheckCircle size={28} className="text-[#0F766E]" />
            <div>
              <p className="font-bold text-[#0F172A]">Warranty Assurance</p>
              <p className="text-sm text-[#64748B]">Peace of mind</p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Popular Services & Store Banner */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Popular Services */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A]">Popular Services</h2>
              <Link to="/services" className="px-4 py-2 rounded-full border border-[#E2E8F0] text-sm font-semibold hover:bg-slate-50 transition-colors">
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POPULAR_SERVICES.map((service, i) => (
                <Link to="/services" key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg transition-shadow group block">
                  <div className="h-36 overflow-hidden">
                    <img 
                      src={service.img} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#0F172A] mb-1">{service.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 mb-3">
                      <Star size={12} className="fill-amber-500" /> {service.rating}
                    </div>
                    <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 mt-auto">
                      <span className="text-xs font-medium text-[#64748B]">From <strong className="text-[#0F172A] text-sm">{service.price}</strong></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Quality Products Banner */}
          <div className="xl:col-span-1">
            <div className="bg-[#0F766E] rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden text-white shadow-xl">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-3">Shop Quality Products</h3>
                <p className="text-teal-50 mb-8 max-w-[200px]">
                  Appliances, spare parts & more from trusted sellers.
                </p>
                <Link to="/store" className="inline-block bg-white text-[#0F172A] px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                  Explore Marketplace
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-10 w-64 h-64 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=400&auto=format&fit=crop" 
                  alt="Washing Machine" 
                  className="w-full h-full object-contain drop-shadow-2xl brightness-110 mix-blend-screen"
                />
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Home;
