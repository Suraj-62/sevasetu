import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShieldCheck, Clock, Navigation, CheckCircle, Star, 
  Smartphone, Droplets, Wrench, Wind, Bug, Sofa, ArrowRight, 
  CreditCard, ChevronRight, Users, CalendarCheck, Hammer, Paintbrush, Plus, Minus, MapPin, ShoppingBag
} from 'lucide-react';
import Navbar from '../components/Navbar';

// --- Data Objects ---

const popularSearches = ['AC Repair', 'Cleaning', 'Electrician', 'RO Service', 'Painting'];

const categories = [
  { icon: Wind, name: 'AC', desc: 'Repair & Service', color: 'text-blue-500', bg: 'bg-blue-50' },
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
import { Zap, Sparkles } from 'lucide-react';

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
  { name: 'LG 1.5 Ton 5 Star AI Dual Inverter Split AC', price: '₹39,999', rating: '4.9', img: 'https://images.unsplash.com/photo-1627986064973-2e069504c5dc?q=80&w=400' },
  { name: 'Dyson V12 Detect Slim Absolute Vacuum', price: '₹55,900', rating: '4.8', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400' },
  { name: 'Kent Supreme RO Water Purifier', price: '₹14,500', rating: '4.7', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=400' },
  { name: 'Philips Hue Smart Bulb Starter Kit', price: '₹8,999', rating: '4.9', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400' },
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

// --- Main Component ---

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-10">
        
        {/* 1. Hero Section */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-20 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> SevaSetu 2.0 is Live
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#0F172A] leading-[1.1] tracking-tight mb-6">
                Trusted Home Services,<br/>
                <span className="text-[#0F766E]">Delivered at Your Doorstep.</span>
              </h1>
              <p className="text-xl text-[#64748B] font-medium mb-10 max-w-lg leading-relaxed">
                Book verified professionals, buy home products, track technicians live, and manage warranties, all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="bg-[#0F766E] hover:bg-[#115E59] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                  Book Service <ArrowRight size={20} />
                </Link>
                <Link to="/store" className="bg-white hover:bg-slate-50 text-[#0F172A] border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1">
                  Explore Marketplace
                </Link>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 gap-4 h-full p-4">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600" alt="Home Cleaning" className="w-full h-full object-cover rounded-3xl shadow-lg" />
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600" alt="Electrician" className="w-full h-full object-cover rounded-3xl shadow-lg mt-8" />
                <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600" alt="Plumbing" className="w-full h-full object-cover rounded-3xl shadow-lg -mt-8" />
                <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600" alt="AC Repair" className="w-full h-full object-cover rounded-3xl shadow-lg" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent"></div>
              
              {/* Floating Elements on Image */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle size={24} /></div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">AC Repaired</p>
                  <p className="text-xs font-semibold text-[#64748B]">Just now</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Search Section */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 text-center">
            <h2 className="text-2xl font-black text-[#0F172A] mb-6 flex items-center justify-center gap-3">
              <Search className="text-[#0F766E]" size={28} /> What service do you need today?
            </h2>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for AC Repair, Cleaning, Plumber..." 
                className="w-full pl-6 pr-32 py-5 bg-[#F8FAFC] border-2 border-slate-100 rounded-2xl text-lg font-semibold focus:outline-none focus:border-[#0F766E] transition-colors"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#0F766E] text-white px-8 rounded-xl font-bold hover:bg-[#115E59] transition-colors">
                Search
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
              <span className="text-[#64748B]">Popular:</span>
              {popularSearches.map(term => (
                <button key={term} onClick={() => setSearchQuery(term)} className="px-4 py-1.5 bg-slate-50 border border-slate-200 text-[#0F172A] rounded-full hover:bg-slate-100 transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

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
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0F766E] flex items-center justify-center shrink-0">
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
                { count: '4.9★', label: 'Average Rating' },
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
                <div className="font-black text-[#64748B]">— {rev.author}</div>
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
                  <span className="text-blue-600 bg-blue-50 p-1 rounded-full">{openFaq === i ? <Minus size={20} /> : <Plus size={20} />}</span>
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
