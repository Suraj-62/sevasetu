import { motion } from 'framer-motion';
import { 
  ShieldCheck, Wrench, ShoppingBag, ScrollText, 
  CalendarCheck, MapPin, Target, Lightbulb 
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* 1. Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8"
          >
            Building the Future of <br className="hidden md:block"/>
            <span className="text-[#0F766E]">Home Services in India</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#475569] leading-relaxed mb-10"
          >
            SevaSetu is a modern home-service and marketplace platform that connects customers with trusted professionals and verified local businesses. Whether you need an electrician, plumber, AC technician, home cleaning, appliance installation, or quality home products, SevaSetu brings everything together in one seamless experience.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-medium text-[#0F766E]"
          >
            Our goal is to make home maintenance simple, transparent, and stress-free through technology, trusted professionals, and exceptional customer service.
          </motion.p>
        </section>

        {/* 2. Our Story Section */}
        <section className="mb-24">
          <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-12 items-center border border-[#E2E8F0]">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">Our Story</h2>
              <div className="h-2 w-20 bg-[#0F766E] rounded-full"></div>
            </div>
            <div className="lg:w-2/3 space-y-6 text-[#475569] text-lg leading-relaxed">
              <p>
                Finding reliable home service professionals is often difficult. Customers struggle with unverified technicians, unclear pricing, delayed services, and lack of post-service support.
              </p>
              <p>
                SevaSetu was created to solve these everyday challenges by building a trusted digital platform where customers, service professionals, and local businesses can connect safely and efficiently.
              </p>
              <p className="font-semibold text-[#0F172A]">
                With verified providers, transparent pricing, live booking updates, warranty management, and a growing marketplace, SevaSetu is redefining the way people manage their homes.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0F766E] text-white p-10 lg:p-14 rounded-3xl shadow-lg relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 opacity-10">
              <Target size={200} />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg leading-relaxed text-teal-50">
              To simplify home services by providing a trusted digital platform that delivers quality services, genuine products, and seamless customer experiences.
            </p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#E2E8F0] relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Lightbulb size={200} className="text-[#0F766E]" />
            </div>
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8">
              <Lightbulb size={32} className="text-[#0F766E]" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-[#0F172A]">Our Vision</h3>
            <p className="text-lg leading-relaxed text-[#475569]">
              To become India's most trusted home ecosystem by connecting millions of households with verified professionals, smart technology, and reliable local businesses.
            </p>
          </motion.div>
        </section>

        {/* 4. What We Offer */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">What We Offer</h2>
            <p className="text-lg text-[#475569]">Everything you need for your home, in one place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Professionals",
                desc: "Every service provider is verified to ensure quality and trust.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              },
              {
                icon: Wrench,
                title: "Wide Range of Services",
                desc: "From plumbing and electrical work to appliance repair and deep cleaning.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              },
              {
                icon: ShoppingBag,
                title: "Marketplace",
                desc: "Purchase home appliances, spare parts, and maintenance products from trusted sellers.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              },
              {
                icon: ScrollText,
                title: "Warranty Management",
                desc: "Store and manage warranties digitally in one place.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              },
              {
                icon: CalendarCheck,
                title: "AMC Plans",
                desc: "Never miss your regular maintenance schedule with Annual Maintenance Contracts.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              },
              {
                icon: MapPin,
                title: "Live Tracking",
                desc: "Track technicians and service progress in real time.",
                color: "text-[#0F766E]",
                bg: "bg-teal-50"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl shadow-slate-200/50 border border-[#E2E8F0] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#0F172A]">{feature.title}</h4>
                <p className="text-[#475569] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
