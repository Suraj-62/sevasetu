import { motion } from 'framer-motion';
import { Search, Zap, ShieldCheck, Clock, Navigation, CheckCircle, Star, Smartphone, Droplets, Wrench, Wind, Bug, Sofa, ArrowRight, Play, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: <Zap size={28} strokeWidth={1.5} />, name: 'Electrician', desc: 'Wiring & Repairs' },
  { icon: <Droplets size={28} strokeWidth={1.5} />, name: 'Plumbing', desc: 'Pipes & Leaks' },
  { icon: <Wind size={28} strokeWidth={1.5} />, name: 'AC Repair', desc: 'Cooling & Service' },
  { icon: <Sofa size={28} strokeWidth={1.5} />, name: 'Cleaning', desc: 'Deep Home Clean' },
  { icon: <Wrench size={28} strokeWidth={1.5} />, name: 'Appliance', desc: 'Washing & Fridge' },
  { icon: <Bug size={28} strokeWidth={1.5} />, name: 'Pest Control', desc: 'Termite & Insects' },
];

const featuredCards = [
  { title: "Deep Home Cleaning", price: "From ₹999", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80", tag: "Bestseller" },
  { title: "AC Service & Repair", price: "From ₹499", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80", tag: "Summer Special" },
  { title: "Professional Painting", price: "From ₹2999", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80", tag: "Premium" },
  { title: "Smart Home Setup", price: "From ₹1499", img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80", tag: "Trending" },
];

const categorySections = [
  {
    title: "Cleaning Essentials",
    subtitle: "Monthly cleaning essential services",
    items: [
      { title: "Intense cleaning (2 bathrooms)", rating: "4.80 (6.3M)", price: "₹858", oldPrice: "₹898", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" },
      { title: "Intense cleaning (3 bathrooms)", rating: "4.80 (6.3M)", price: "₹1,227", oldPrice: "₹1,347", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" },
      { title: "Pest control (includes utensil removal)", rating: "4.79 (163K)", price: "₹1,249", img: "https://images.unsplash.com/photo-1540968221243-29f5d70440f3?w=400&q=80" },
      { title: "Fridge cleaning", rating: "4.83 (158K)", price: "₹399", img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&q=80" },
    ]
  },
  {
    title: "Appliance repair & service",
    subtitle: "",
    items: [
      { title: "Foam-jet AC service", rating: "4.75 (2.8M)", price: "₹599", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80" },
      { title: "AC repair", rating: "4.73 (842K)", price: "₹299", img: "https://images.unsplash.com/photo-1558404987-a22a319f05a9?w=400&q=80" },
      { title: "Foam-jet service (2 ACs)", rating: "4.75 (2.8M)", price: "₹1,098", oldPrice: "₹1,198", img: "https://images.unsplash.com/photo-1621905252507-b35492d90cb4?w=400&q=80" },
      { title: "TV check-up", rating: "4.77 (174K)", price: "₹249", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80" },
    ]
  },
  {
    title: "Home repair & installation",
    subtitle: "",
    items: [
      { title: "Fan repair", rating: "4.80 (166K)", price: "₹149", img: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=400&q=80" },
      { title: "Decor installation", rating: "4.84 (149K)", price: "₹79", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80" },
      { title: "Electrician consultation", rating: "4.74 (150K)", price: "₹49", img: "https://images.unsplash.com/photo-1588698114006-03c00eddf9a7?w=400&q=80" },
      { title: "Plumber consultation", rating: "4.74 (182K)", price: "₹49", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
    ]
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION (Dynamic, Premium) */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-indigo-100 rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-40 left-0 -translate-x-1/3 w-[600px] h-[600px] bg-teal-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 shadow-lg shadow-indigo-500/20 mb-8 border border-slate-800"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                </span>
                <span className="text-sm font-bold text-white tracking-wide uppercase">SevaSetu 2.0 is Live</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-slate-900"
              >
                Expert services, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">delivered home.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl font-medium leading-relaxed"
              >
                Book trusted, background-verified professionals for your home. From deep cleaning to smart appliance repairs, experience premium service without the hassle.
              </motion.p>
              
              {/* Glassmorphic Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl p-3 flex flex-col sm:flex-row items-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 rounded-2xl sm:rounded-full gap-3 relative z-20"
              >
                <div className="flex-grow flex items-center w-full px-4 py-2">
                  <Search className="text-slate-400 mr-3" size={24} />
                  <input 
                    type="text" 
                    placeholder="What do you need help with today?" 
                    className="w-full py-2 outline-none bg-transparent text-slate-900 placeholder-slate-400 font-medium text-lg"
                  />
                </div>
                <Link to="/services" className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl sm:rounded-full font-bold transition-all shadow-md flex items-center justify-center gap-2">
                  Explore <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center gap-6 text-sm font-bold text-slate-500"
              >
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-500"/> Verified Techs</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-500"/> Instant Booking</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-teal-500"/> Secure Pay</div>
              </motion.div>
            </div>

            {/* Right Hero Images - Premium Composition */}
            <div className="lg:w-1/2 w-full relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative z-10"
              >
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" alt="Plumber" className="rounded-[2rem] shadow-2xl w-full h-[500px] object-cover border-8 border-white" />
                
                {/* Floating Rating Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-10 -left-10 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 text-white flex items-center justify-center rounded-2xl shadow-inner"><Star size={28} className="fill-current"/></div>
                  <div>
                    <p className="font-black text-2xl text-slate-900">4.9/5</p>
                    <p className="text-sm font-bold text-slate-500">Customer Rating</p>
                  </div>
                </motion.div>
                
                {/* Floating Video Play Button */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/40 transition-all border border-white/50 shadow-xl"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 text-indigo-600 shadow-md">
                    <Play size={24} className="fill-current" />
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK CATEGORIES (Interactive Grid) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">What do you need help with?</h2>
            <p className="text-slate-500 font-medium text-lg">Instant booking for your everyday home needs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, idx) => (
              <Link to="/services" key={idx}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-6 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all border border-slate-100 group h-full"
                >
                  <div className={`w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 text-center mb-1">{service.name}</h3>
                  <p className="text-xs font-medium text-slate-500 text-center">{service.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING SERVICES (Premium Apple-style Cards) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Trending Services</h2>
              <p className="text-slate-500 font-medium text-lg max-w-xl">Discover our most highly-rated and frequently booked premium services tailored for your modern home.</p>
            </div>
            <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200 hover:border-slate-900 text-slate-900 font-bold rounded-full transition-colors whitespace-nowrap">
              View All Services <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCards.map((card, idx) => (
              <Link to="/services" key={idx}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group rounded-[2rem] overflow-hidden bg-slate-100 cursor-pointer relative h-[420px] flex flex-col justify-end"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                  
                  <div className="absolute top-5 left-5 z-20">
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      {card.tag}
                    </span>
                  </div>

                  <div className="relative z-20 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">{card.title}</h3>
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-teal-400 font-bold text-lg">{card.price}</p>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (Dark Mode, High Contrast) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
        {/* Neon Accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
                Premium standards.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Zero compromises.</span>
              </h2>
              <p className="text-slate-400 font-medium mb-12 text-lg lg:text-xl leading-relaxed">
                We guarantee the highest quality of service with our thoroughly vetted professionals, state-of-the-art tools, and transparent pricing structure.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Verified Professionals", desc: "Every technician undergoes strict background checks and skill assessments before joining." },
                  { icon: Zap, title: "Instant Booking & Tracking", desc: "Book in seconds. Track your technician live on the map as they arrive at your doorstep." },
                  { icon: ShieldCheck, title: "30-Day Service Guarantee", desc: "If you're not satisfied, we'll fix it for free. Your peace of mind is our priority." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="mt-1 bg-slate-900 border border-slate-800 p-3 rounded-2xl text-teal-400 mr-6 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-colors shadow-lg">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white group-hover:text-teal-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
               <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl p-2 bg-slate-900/50 backdrop-blur-sm">
                 <img src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1000&q=80" alt="Professional Service" className="rounded-[2rem] object-cover h-[600px] w-full" />
                 
                 {/* Glass overlay stats */}
                 <div className="absolute bottom-8 left-8 right-8 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 flex justify-between items-center shadow-2xl">
                    <div className="text-center">
                      <p className="text-3xl font-black text-white">50k+</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">Happy Homes</p>
                    </div>
                    <div className="w-px h-12 bg-slate-800"></div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-white">4.8</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">Average Rating</p>
                    </div>
                    <div className="w-px h-12 bg-slate-800"></div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-teal-400">100%</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">Satisfaction</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.1, 4.2, 4.3 DYNAMIC CATEGORY SECTIONS */}
      {categorySections.map((section, idx) => (
        <section key={idx} className={`pt-12 ${idx === categorySections.length - 1 ? 'pb-24' : 'pb-6'} px-4 sm:px-6 lg:px-8 bg-white`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{section.title}</h2>
                {section.subtitle && <p className="text-slate-500 font-medium mt-1">{section.subtitle}</p>}
              </div>
              <Link to="/services" className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors border border-slate-200">
                See all
              </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="min-w-[260px] md:min-w-[280px] snap-start group cursor-pointer">
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <div className="flex items-center text-slate-500 text-sm font-medium mb-2">
                    <Star size={14} className="fill-current text-slate-700 mr-1" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.price}</span>
                    {item.oldPrice && <span className="text-slate-400 line-through text-sm">{item.oldPrice}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 4.5 HOW IT WORKS (Step by Step) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">How SevaSetu Works</h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Your home maintenance solved in three simple steps. We've designed the most frictionless experience possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-teal-200 via-indigo-200 to-teal-200 z-0"></div>

            {[
              { 
                step: "01", 
                title: "Book your service", 
                desc: "Choose from our wide range of services, select your preferred time slot, and get an upfront price estimate.",
                icon: <Search className="text-indigo-600" size={32} />
              },
              { 
                step: "02", 
                title: "Pro arrives", 
                desc: "A background-verified, highly rated technician arrives at your doorstep fully equipped for the job.",
                icon: <Navigation className="text-teal-500" size={32} />
              },
              { 
                step: "03", 
                title: "Relax & review", 
                desc: "Pay securely after the job is done. Rate your experience to help us maintain our premium standards.",
                icon: <Star className="text-amber-500" size={32} />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 border border-slate-100 group-hover:-translate-y-2 transition-transform duration-300 relative">
                  {item.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.7 TESTIMONIALS (Social Proof) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 transform origin-top pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Loved by<br/>thousands.</h2>
              <p className="text-slate-500 font-medium text-lg mb-8">Don't just take our word for it. See what our customers have to say about their SevaSetu experience.</p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400"><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/><Star size={16} className="fill-current"/></div>
                  <p className="text-sm font-bold text-slate-900 mt-1">4.9/5 from 10k+ reviews</p>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Priya Sharma", loc: "Mumbai", text: "The AC repair technician was incredibly professional. Arrived exactly on time, diagnosed the issue in 5 minutes, and left the place spotless.", rating: 5 },
                { name: "Rahul Verma", loc: "Delhi", text: "I've tried other apps, but SevaSetu's interface is unmatched. Booked a deep cleaning service and the team did a phenomenal job.", rating: 5 },
                { name: "Anita Desai", loc: "Bangalore", text: "As a working professional, I value my weekends. SevaSetu's instant plumbing service saved my Sunday. Highly recommended!", rating: 5 },
                { name: "Vikram Singh", loc: "Pune", text: "Transparent pricing is what won me over. No hidden charges, just honest, premium service from verified experts.", rating: 5 }
              ].map((review, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed mb-6">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{review.loc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.8 FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Got questions? We've got answers. Here's everything you need to know about our services.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Are the service professionals verified?",
                a: "Yes, absolutely. Every service professional on SevaSetu undergoes a strict background check, identity verification, and a rigorous skill assessment before they are onboarded."
              },
              {
                q: "What if I am not satisfied with the service?",
                a: "We offer a 30-Day Service Guarantee. If you face any issues with the service provided, we will arrange a rework completely free of charge. Your satisfaction is our top priority."
              },
              {
                q: "How is the pricing determined?",
                a: "Our pricing is standardized and completely transparent. You will see an upfront estimate before booking. The final price depends on the specific repair or materials required, with no hidden fees."
              },
              {
                q: "Can I reschedule or cancel my booking?",
                a: "Yes, you can easily reschedule or cancel your booking through the app or website up to 2 hours before the scheduled time without any cancellation fees."
              },
              {
                q: "Is there any warranty on spare parts?",
                a: "Yes, any spare parts provided by our technicians come with a minimum 90-day warranty. We only use genuine parts sourced directly from authorized vendors."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg text-slate-900 select-none">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 5. APP DOWNLOAD (Sleek 3D styling) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white rounded-full filter blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Your home's health,<br/>in your pocket.</h2>
            <p className="text-indigo-200 text-lg md:text-xl mb-10 max-w-lg font-medium leading-relaxed">
              Book services instantly, track technicians live on a map, and manage all your warranties and AMCs from our award-winning mobile app.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl flex items-center gap-3 w-full sm:w-auto justify-center">
                <Smartphone size={24} /> Download for iOS
              </button>
              <button className="bg-white hover:bg-gray-50 text-indigo-900 px-8 py-4 rounded-full font-bold transition-all shadow-xl flex items-center gap-3 w-full sm:w-auto justify-center">
                <Smartphone size={24} /> Download for Android
              </button>
            </div>
          </div>
          
          {/* 3D App Mockup */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
             <motion.div 
               whileHover={{ scale: 1.05, rotate: -2 }}
               className="w-[300px] h-[600px] bg-slate-900 border-[8px] border-slate-800 rounded-[3rem] p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative transform rotate-6 transition-all duration-500"
             >
                <div className="w-full h-full bg-slate-50 rounded-3xl flex flex-col overflow-hidden relative border border-slate-700">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-20"></div>
                  
                  {/* Mock App UI */}
                  <div className="bg-indigo-600 p-6 pt-12 text-white pb-8 rounded-b-3xl shadow-lg relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-sm font-medium text-indigo-200">Current Location</p>
                        <p className="font-bold flex items-center gap-1">New Delhi, India <ArrowRight size={14} className="rotate-90" /></p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"><ShieldCheck size={20} /></div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 border border-white/30">
                      <Search size={18} className="text-white" />
                      <span className="text-sm font-medium">Search for "AC Repair"...</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50 flex-1 relative z-0">
                    <h4 className="font-black text-slate-900 mb-4">Categories</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2"><Zap size={24} className="text-indigo-600" /><span className="text-xs font-bold">Electrician</span></div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2"><Droplets size={24} className="text-teal-500" /><span className="text-xs font-bold">Plumbing</span></div>
                    </div>
                    
                    <h4 className="font-black text-slate-900 mb-4">Active Booking</h4>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                       <div className="flex justify-between items-center mb-3">
                         <span className="font-bold text-sm">AC Service</span>
                         <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">On the way</span>
                       </div>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full mb-2 overflow-hidden">
                         <div className="bg-green-500 h-full w-[60%]"></div>
                       </div>
                       <p className="text-xs font-medium text-slate-500">Arriving in 15 mins</p>
                    </div>
                  </div>

                  {/* Mock Bottom Nav */}
                  <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 flex justify-around items-center">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full"></div>
                    <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                    <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                    <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
