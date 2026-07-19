import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock } from 'lucide-react';
import { useState } from 'react';

const mockServices = [
  { id: 1, name: 'Fan Repair', category: 'Electrician', price: '₹149', time: '30 mins', rating: 4.8 },
  { id: 2, name: 'Switchboard Installation', category: 'Electrician', price: '₹199', time: '45 mins', rating: 4.9 },
  { id: 3, name: 'AC Servicing', category: 'AC Repair', price: '₹499', time: '1 hr', rating: 4.7 },
  { id: 4, name: 'Tap Leakage Repair', category: 'Plumbing', price: '₹99', time: '30 mins', rating: 4.6 },
  { id: 5, name: 'Deep Home Cleaning', category: 'Cleaning', price: '₹2499', time: '4-5 hrs', rating: 4.9 },
];

const categories = ['All', 'Electrician', 'Plumbing', 'AC Repair', 'Cleaning', 'Pest Control', 'Appliance'];

const ServicesList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const handleBook = (e, service) => {
    e.preventDefault();
    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    if (!userInfo || !userInfo.token) {
      navigate('/login?redirect=/book', { state: { service } });
    } else {
      navigate('/book', { state: { service } });
    }
  };

  const filteredServices = activeCategory === 'All' 
    ? mockServices 
    : mockServices.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header & Search */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Services</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a service..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E] shadow-sm"
              />
            </div>
            {/* AI Smart Search Placeholder */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-teal-100 rounded-full px-6 py-3 flex items-center text-[#0F766E] shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <span className="text-sm font-medium">✨ Ask AI to find service</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-gray-800">
                <Filter size={20} />
                <h3 className="font-bold text-lg">Categories</h3>
              </div>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-teal-50 text-[#0F766E] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service List */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={service.id} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                      <span className="flex items-center text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded-md">
                        <Star size={14} className="mr-1 fill-current" /> {service.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{service.category}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{service.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                    <button onClick={(e) => handleBook(e, service)} className="bg-teal-50 text-[#0F766E] hover:bg-[#0F766E] hover:text-white px-6 py-2 rounded-full font-medium transition-colors">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredServices.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No services found in this category.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServicesList;
