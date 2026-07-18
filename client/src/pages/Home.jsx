import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Clock, CheckCircle, Star, Droplets, Wrench, Wind, Bug, Paintbrush, Zap, MapPin, Users, MoreHorizontal, ChevronDown, CheckSquare, Tag, Banknote, Navigation, Smartphone, Sofa, ArrowRight, CreditCard, ChevronRight, CalendarCheck, Hammer, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
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
    img: '/images/ac_repair.png' 
  },
  { 
    name: 'Deep Cleaning', 
    rating: '4.6 (980)', 
    price: '₹799', 
    img: '/images/deep_cleaning.png' 
  },
  { 
    name: 'Plumbing', 
    rating: '4.7 (1.1k)', 
    price: '₹399', 
    img: '/images/plumbing.png' 
  },
  { 
    name: 'Electrician', 
    rating: '4.8 (1.3k)', 
    price: '₹299', 
    img: '/images/electrician.png' 
  }
];


const popularSearches = ['AC Repair', 'Cleaning', 'Electrician', 'RO Service', 'Painting'];

const categories = [
  { icon: Wind, name: 'AC', desc: 'Repair & Service', color: 'text-blue-500', bg: 'bg-teal-50' },
  { icon: Sofa, name: 'Cleaning', desc: 'Deep Home Clean', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Zap, name: 'Electrician', desc: 'Wiring & Fixes', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Droplets, name: 'Plumbing', desc: 'Pipes & Leaks', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { icon: Paintbrush, name: 'Painting', desc: 'Walls & Texture', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Hammer, name: 'Carpenter', desc: 'Wood & Furniture', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Sparkles, name: 'Salon', desc: 'Home Grooming', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Bug, name: 'Pest Control', desc: 'Termite & Insects', color: 'text-rose-500', bg: 'bg-rose-50' },
];
// Need to add Sparkles and Zap to lucide-react imports! Wait, I will just use existing icons if they aren't imported or add them to import.
// Let's redefine with exact imported icons.


const usps = [
  { icon: ShieldCheck, title: 'Verified Professionals', desc: 'Every technician is background checked.' },
  { icon: CreditCard, title: 'Transparent Pricing', desc: 'No hidden charges, ever.' },
  { icon: Clock, title: 'Fast Booking', desc: 'Book a service in under 60 seconds.' },
  { icon: MapPin, title: 'Live Tracking', desc: 'Track your pro arriving in real-time.' },
  { icon: CheckCircle, title: 'Secure Payment', desc: '100% safe and secure gateways.' },
  { icon: Wrench, title: 'Warranty Support', desc: '30-day service guarantee on all jobs.' },
];

const timeline = [
  { step: '1', title: 'Search', desc: 'Find the service' },
  { step: '2', title: 'Book', desc: 'Pick a time' },
  { step: '3', title: 'Assigned', desc: 'Pro confirmed' },
  { step: '4', title: 'Track', desc: 'Live ETA map' },
  { step: '5', title: 'Complete', desc: 'Job done perfectly' },
  { step: '6', title: 'Review', desc: 'Rate your pro' },
];

const products = [
  { name: 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC', price: '₹39,999', rating: '4.9', img: '/images/lg_ac.png' },
  { name: 'Dyson V12 Detect Slim Absolute Vacuum', price: '₹55,900', rating: '4.8', img: '/images/dyson_vacuum.png' },
  { name: 'Kent Supreme RO Water Purifier', price: '₹14,500', rating: '4.7', img: '/images/kent_ro.png' },
  { name: 'Philips Hue Smart Bulb Starter Kit', price: '₹8,999', rating: '4.9', img: '/images/philips_hue.png' },
];

const reviews = [
  { text: "Excellent service. The AC technician arrived exactly on time and fixed the cooling issue within 30 minutes. Very professional.", author: "Rahul M." },
  { text: "Quick installation of my new RO system. Transparent pricing and the live tracking feature is super helpful!", author: "Priya S." },
  { text: "Best home cleaning service I've ever used. They brought all their own equipment and the house is sparkling.", author: "Amit P." },
];

const faqs = [
  { q: "How do I book a service?", a: "Simply search for your required service, select a date and time, and confirm your booking. A verified technician will be assigned instantly." },
  { q: "How does payment work?", a: "You can pay securely online via UPI, Credit/Debit card, or Net Banking after the service is completed to your satisfaction." },
  { q: "What is the cancellation policy?", a: "You can cancel for free up to 2 hours before the scheduled service time." },
  { q: "Do you offer warranty on repairs?", a: "Yes, all our repair services come with a standard 30-day warranty on parts and labor." },
];


const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [locationName, setLocationName] = useState('New Delhi');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.state_district || 'Your Location';
          setLocationName(city);
        } catch (error) {
          console.error("Error fetching location details:", error);
          setLocationName("Location Found");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert('Please allow location access in your browser settings.');
        setIsFetchingLocation(false);
      }
    );
  };


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
                <div onClick={fetchLocation} className="flex items-center gap-2 cursor-pointer text-[#0F172A] font-medium hover:text-[#0F766E] transition-colors">
                  <MapPin size={18} className="text-[#0F766E]" />
                  <span className="whitespace-nowrap max-w-[100px] truncate" title={locationName}>
                    {isFetchingLocation ? 'Fetching...' : locationName}
                  </span>
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

      
        {/* 3. Categories Grid */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24">
          <h2 className="text-3xl font-black text-[#0F172A] mb-10 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/services')}
                className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-black text-[#0F172A] mb-1">{cat.name}</h3>
                <p className="text-sm font-semibold text-[#64748B]">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Why Choose Us */}
        <section className="bg-white py-24 border-y border-slate-100 mb-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#0F172A] mb-4">Why Choose SevaSetu</h2>
              <p className="text-lg text-[#64748B] font-semibold max-w-2xl mx-auto">We provide the most reliable, secure, and transparent home services platform in India.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {usps.map((usp, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
                    <usp.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">{usp.title}</h3>
                    <p className="text-[15px] font-medium text-[#64748B] leading-relaxed">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How It Works */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24 overflow-hidden">
          <h2 className="text-4xl font-black text-[#0F172A] mb-16 text-center">How It Works</h2>
          <div className="relative">
             <div className="hidden lg:block absolute top-10 left-10 right-10 h-1.5 bg-slate-100 z-0 rounded-full"></div>
             
             <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
               {timeline.map((step, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center text-2xl font-black text-[#0F766E] mb-6 ring-8 ring-[#F8FAFC]">
                     {step.step}
                   </div>
                   <h3 className="text-lg font-black text-[#0F172A] mb-1">{step.title}</h3>
                   <p className="text-sm font-semibold text-[#64748B]">{step.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 6. Featured Products */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-black text-[#0F172A] mb-2">Featured Products</h2>
              <p className="text-lg text-[#64748B] font-semibold">Buy genuine spare parts and appliances directly from us.</p>
            </div>
            <Link to="/store" className="hidden md:flex items-center gap-2 text-[#0F766E] font-bold hover:text-[#115E59] transition-colors">
              View Marketplace <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                <div className="w-full h-48 rounded-2xl bg-slate-50 mb-4 overflow-hidden relative">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-2 line-clamp-2 leading-snug">{prod.name}</h3>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="fill-amber-400 text-amber-400" size={16} />
                      <span className="text-sm font-bold text-[#64748B]">{prod.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-[#0F766E]">{prod.price}</span>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">Buy Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. Trusted Statistics */}
        <section className="bg-[#0F766E] text-white py-20 mb-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { count: '50K+', label: 'Happy Customers' },
                { count: '1200+', label: 'Professionals' },
                { count: '15K+', label: 'Bookings' },
                { count: '4.9Γÿà', label: 'Average Rating' },
              ].map((stat, i) => (
                <div key={i}>
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="text-5xl font-black mb-2">{stat.count}</motion.div>
                  <div className="text-blue-200 font-bold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Customer Reviews */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24 overflow-hidden">
          <h2 className="text-4xl font-black text-[#0F172A] mb-10 text-center">What Customers Say</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {reviews.map((rev, i) => (
              <div key={i} className="min-w-[350px] md:min-w-[400px] bg-white rounded-3xl p-8 shadow-sm border border-slate-100 snap-center">
                <div className="flex gap-1 mb-4 text-amber-400">
                  <Star className="fill-amber-400" size={20} /><Star className="fill-amber-400" size={20} /><Star className="fill-amber-400" size={20} /><Star className="fill-amber-400" size={20} /><Star className="fill-amber-400" size={20} />
                </div>
                <p className="text-lg text-[#0F172A] font-semibold leading-relaxed mb-6">"{rev.text}"</p>
                <div className="font-black text-[#64748B]">ΓÇö {rev.author}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Become a Partner */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0F172A] rounded-3xl p-10 lg:p-12 text-white relative overflow-hidden group">
              <div className="absolute right-[-20%] bottom-[-20%] opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Wrench size={300} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Earn More as a Technician</h3>
                <p className="text-slate-400 font-medium mb-8 max-w-sm text-lg">Join our fleet of verified professionals, get flexible hours, and multiply your earnings.</p>
                <button className="bg-[#0F766E] hover:bg-[#115E59] text-white px-8 py-4 rounded-xl font-bold transition-colors">Join as Technician</button>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-3xl p-10 lg:p-12 relative overflow-hidden group">
              <div className="absolute right-[-20%] bottom-[-20%] opacity-10 group-hover:scale-110 transition-transform duration-700 text-emerald-600">
                <ShoppingBag size={300} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-[#0F172A] mb-4">Grow Your Shop</h3>
                <p className="text-slate-600 font-medium mb-8 max-w-sm text-lg">Register your store on our marketplace and sell spare parts to thousands of customers.</p>
                <button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-bold transition-colors">Register Your Shop</button>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Mobile App */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-24">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 lg:p-16 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="md:w-1/2 relative z-10 mb-10 md:mb-0">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full font-bold text-sm mb-6 border border-white/30">Coming Soon</div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Book services on the go.</h2>
              <p className="text-blue-100 font-medium text-lg mb-8 max-w-md">Our mobile app for iOS and Android is launching soon with exclusive app-only features and lightning fast booking.</p>
              <div className="flex gap-4">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg flex items-center gap-2 text-white/50 cursor-not-allowed">App Store</div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg flex items-center gap-2 text-white/50 cursor-not-allowed">Google Play</div>
              </div>
            </div>
            
            {/* Mockup Placeholder */}
            <div className="md:w-1/2 relative z-10 flex justify-center lg:justify-end">
              <div className="w-64 h-[500px] bg-white rounded-[3rem] border-8 border-slate-900 shadow-2xl relative overflow-hidden transform rotate-12 translate-y-12 translate-x-12 hidden md:block">
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-3xl mx-16 z-20"></div>
                <div className="w-full h-full bg-[#F8FAFC] p-4 pt-10">
                  <div className="w-full h-32 bg-blue-100 rounded-2xl mb-4"></div>
                  <div className="grid grid-cols-2 gap-2"><div className="h-20 bg-white rounded-xl shadow-sm"></div><div className="h-20 bg-white rounded-xl shadow-sm"></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="max-w-3xl mx-auto px-6 mb-24">
          <h2 className="text-4xl font-black text-[#0F172A] mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-bold text-lg text-[#0F172A]"
                >
                  {faq.q}
                  <span className="text-[#0F766E] bg-teal-50 p-1 rounded-full">{openFaq === i ? <Minus size={20} /> : <Plus size={20} />}</span>
                </button>
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: openFaq === i ? 'auto' : 0 }} 
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[#64748B] font-medium leading-relaxed">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Final CTA */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
          <div className="bg-[#0F172A] rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">Ready to simplify <br/>your home services?</h2>
              <p className="text-xl text-slate-400 font-semibold mb-10 max-w-2xl mx-auto">Join thousands of happy customers who rely on our verified professionals every single day.</p>
              <Link to="/login" className="bg-[#0F766E] hover:bg-[#115E59] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

      
      </main>
    </div>
  );
};

export default Home;
