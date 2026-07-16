import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, ShieldCheck, ChevronLeft, ShoppingCart, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock DB (usually fetched via API based on id)
const SHOPS = {
  1: {
    name: 'Gupta Electronics',
    category: 'Electronics & Appliances',
    rating: 4.8,
    reviews: 1245,
    location: 'Lajpat Nagar, New Delhi',
    phone: '+91 98765 43210',
    cover: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1200&q=80',
    avatar: 'G',
    verified: true,
    products: [
      { id: 101, name: 'LG 1.5 Ton 5 Star Split AC', price: 45990, oldPrice: 75990, img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80', tag: 'Bestseller' },
      { id: 102, name: 'Hindware 3L Water Heater', price: 2999, oldPrice: 4500, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80', tag: 'Hot Deal' },
      { id: 103, name: 'Havells Ceiling Fan 1200mm', price: 2199, oldPrice: 3200, img: 'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=400&q=80' }
    ]
  },
  2: {
    name: 'PureWater Solutions',
    category: 'Water Purifiers & Plumbing',
    rating: 4.6,
    reviews: 890,
    location: 'Andheri West, Mumbai',
    phone: '+91 91234 56789',
    cover: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=1200&q=80',
    avatar: 'P',
    verified: true,
    products: [
      { id: 201, name: 'Kent Supreme RO Purifier', price: 14500, oldPrice: 19500, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80', tag: 'Free Install' },
      { id: 202, name: 'Aquaguard Aura RO+UV', price: 16500, oldPrice: 22000, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80' }
    ]
  }
};

const ShopDetails = () => {
  const { id } = useParams();
  const shop = SHOPS[id] || SHOPS[1]; // Fallback to shop 1 for demo
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <div className="bg-emerald-500 rounded-full p-1"><Check size={16} className="text-white" /></div>
          <span className="font-bold text-sm">{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="ml-4 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">View Cart ({cart.length})</button>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative h-[300px] lg:h-[400px] bg-slate-900">
        <img src={shop.cover} alt={shop.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-10">
          <Link to="/store" className="w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronLeft size={24} />
          </Link>
        </div>
      </div>

      {/* Shop Info Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
          
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl sm:text-5xl font-black shadow-lg shadow-indigo-200 shrink-0 border-4 border-white -mt-16 md:mt-0">
            {shop.avatar}
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
                {shop.name}
                {shop.verified && <ShieldCheck className="text-emerald-500" size={28} />}
              </h1>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100 shrink-0">
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
                <span className="font-black text-slate-900">{shop.rating}</span>
                <span className="text-sm font-medium text-slate-500">({shop.reviews})</span>
              </div>
            </div>
            
            <p className="text-indigo-600 font-bold mb-4">{shop.category}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-slate-600 font-medium text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-slate-400" /> {shop.location}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-slate-400" /> {shop.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Shop Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
            Available at this shop
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shop.products.map(product => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={product.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                      {product.tag}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 mb-2 leading-snug line-clamp-2 flex-1">{product.name}</h3>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      {product.oldPrice && <p className="text-xs text-slate-400 line-through font-bold mb-0.5">₹{product.oldPrice.toLocaleString()}</p>}
                      <p className="text-xl font-black text-slate-900 tracking-tight">₹{product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-slate-900 hover:bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-md"
                    >
                      <Plus strokeWidth={3} size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDetails;
