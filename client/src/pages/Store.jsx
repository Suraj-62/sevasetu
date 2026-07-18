import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Check, Sparkles, Plus, ChevronLeft, Store as StoreIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Air Conditioners', 'RO Purifiers', 'Televisions', 'Electrical Parts', 'Plumbing', 'Smart Home'];

const PRODUCTS = [
  {
    id: 1,
    name: 'LG 1.5 Ton 5 Star Dual Inverter Split AC',
    category: 'Air Conditioners',
    price: 45990,
    originalPrice: 75990,
    rating: 4.8,
    reviews: 342,
    vendor: 'Gupta Electronics',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Kent Supreme RO Water Purifier',
    category: 'RO Purifiers',
    price: 14500,
    originalPrice: 19500,
    rating: 4.6,
    reviews: 128,
    vendor: 'PureWater Solutions',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    tag: 'Free Installation'
  },
  {
    id: 3,
    name: 'Samsung 55" Crystal 4K Smart TV',
    category: 'Televisions',
    price: 43990,
    originalPrice: 65990,
    rating: 4.9,
    reviews: 512,
    vendor: 'Mega Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600',
    tag: ''
  },
  {
    id: 4,
    name: 'Luminous 150Ah Inverter Battery',
    category: 'Electrical Parts',
    price: 13500,
    originalPrice: 16500,
    rating: 4.7,
    reviews: 89,
    vendor: 'Sharma Electricals',
    image: 'https://images.unsplash.com/photo-1621501460596-f3ec839b25fc?auto=format&fit=crop&q=80&w=600',
    tag: 'Exchange Offer'
  },
  {
    id: 5,
    name: 'Hindware 3L Instant Water Heater',
    category: 'Electrical Parts',
    price: 2999,
    originalPrice: 4500,
    rating: 4.5,
    reviews: 215,
    vendor: 'Gupta Electronics',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    tag: 'Hot Deal'
  },
  {
    id: 6,
    name: 'Amazon Echo Dot (4th Gen)',
    category: 'Smart Home',
    price: 3499,
    originalPrice: 4499,
    rating: 4.7,
    reviews: 845,
    vendor: 'Tech Haven Shop',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=600',
    tag: ''
  }
];

const TOP_SHOPS = [
  { id: 1, name: 'Gupta Electronics', category: 'Appliances', rating: 4.8, img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=300' },
  { id: 2, name: 'PureWater', category: 'Plumbing', rating: 4.6, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=300' },
  { id: 3, name: 'Tech Haven', category: 'Smart Home', rating: 4.9, img: 'https://images.unsplash.com/photo-1531297172864-822d10118337?auto=format&fit=crop&q=80&w=300' },
  { id: 4, name: 'Sharma Electrics', category: 'Electrical', rating: 4.7, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=300' },
];

const Store = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 pt-32">
      
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 right-0 left-0 mx-auto w-fit z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700"
        >
          <div className="bg-emerald-500 rounded-full p-1"><Check size={14} className="text-white" /></div>
          <span className="font-bold text-sm pr-2">{toastMessage}</span>
          <div className="w-px h-4 bg-slate-700"></div>
          <button onClick={() => navigate('/cart')} className="text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors">
            View Cart ({cart.length})
          </button>
        </motion.div>
      )}

      {/* Modern Sticky Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-colors border border-gray-200">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-lg font-black text-gray-900 tracking-tight">Seva<span className="text-blue-600">Store</span></h1>
        <button className="relative w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-colors border border-gray-200">
          <ShoppingCart size={18} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6">
        
        {/* Modern Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden mb-8 shadow-xl shadow-indigo-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="relative z-10 sm:w-2/3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20 mb-4">
              <Sparkles size={12} className="text-blue-400" /> Premium Deals
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              Equip Your Home <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Like A Pro.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium mb-6 max-w-sm">
              Genuine appliances & spare parts directly from trusted local vendors.
            </p>
          </div>
          
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400" alt="Appliance" className="hidden sm:block absolute right-4 -bottom-12 w-48 h-64 object-cover rounded-2xl rotate-12 shadow-2xl border-4 border-white/10" />
        </div>

        {/* Global Search Bar (Native App Style) */}
        <div className="relative mb-8">
          <input 
            type="text" 
            placeholder="Search products, brands, parts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white shadow-sm text-gray-900 text-sm"
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        </div>

        {/* Categories (Horizontal Pills) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Explore Shops (Story Style) */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="mb-10">
            <h3 className="text-lg font-black text-gray-900 mb-4">Explore Local Shops</h3>
            <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {TOP_SHOPS.map(shop => (
                <Link to={`/shop/${shop.id}`} key={shop.id} className="flex flex-col items-center gap-2 group min-w-[72px]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-emerald-400 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <img src={shop.img} alt={shop.name} className="w-full h-full object-cover rounded-full border-2 border-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 text-center line-clamp-1 max-w-[80px]">{shop.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-black text-gray-900 mb-4">{activeCategory === 'All' ? 'Recommended for You' : activeCategory}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {filteredProducts.map(product => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col border border-gray-100"
              >
                <div className="h-36 sm:h-48 overflow-hidden relative bg-gray-50 p-3">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
                  {product.tag && (
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                      {product.tag}
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={10} />
                    <span className="text-[10px] font-black text-gray-900">{product.rating}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 leading-snug line-clamp-2 flex-1">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mt-2 mb-3">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium flex items-center gap-1 truncate pr-2">
                      <StoreIcon size={12} className="text-gray-400" /> {product.vendor}
                    </p>
                    <Link to="/shop/1" className="shrink-0 text-[9px] sm:text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
                      Visit
                    </Link>
                  </div>
                  
                  <div className="flex items-end justify-between mt-auto border-t border-gray-50 pt-3">
                    <div>
                      <p className="text-[10px] text-gray-400 line-through font-bold mb-0.5">₹{product.originalPrice.toLocaleString()}</p>
                      <p className="text-base sm:text-lg font-black text-gray-900 tracking-tight">₹{product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Plus strokeWidth={3} size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Store;
