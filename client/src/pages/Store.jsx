import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Check, Sparkles, Plus, ChevronLeft, ChevronRight, Store as StoreIcon, ShieldCheck, Tag } from 'lucide-react';
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
    image: '/images/lg_ac.png',
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
    image: '/images/kent_ro.png',
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
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(`Added ${product.name} to cart`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      
      if (!token) {
         alert("Please login first to place an order");
         navigate('/login');
         return;
      }

      // Group cart by vendor? For simplicity, we just use the first item's vendor for the whole order in this demo
      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
      
      const orderItems = cart.map(item => ({
        product: item.name,
        quantity: 1,
        priceAtPurchase: item.price
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          vendor: cart[0].vendor,
          items: orderItems,
          shippingAddress: {
            street: "456 Shopping Avenue",
            city: "Ranchi",
            state: "Jharkhand",
            zipCode: "834002"
          },
          totalAmount: totalAmount + 99 // adding taxes/shipping
        })
      });

      if (!response.ok) throw new Error("Failed to place order");

      setCart([]);
      setShowCheckout(false);
      setToastMessage('Order placed successfully! Check Dashboard.');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2">
          <Check size={18} className="text-[#0F766E]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <StoreIcon className="text-[#0F766E]" size={28} />
              <span className="text-2xl font-black text-[#0F172A] tracking-tight">SevaStore</span>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search appliances, spare parts, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors font-medium"
            />
          </div>

          <div className="relative cursor-pointer" onClick={() => cart.length > 0 && setShowCheckout(true)}>
            <div className="w-12 h-12 rounded-full bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-colors">
              <ShoppingCart size={24} />
            </div>
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <h2 className="text-2xl font-black text-[#0F172A] mb-6">Checkout Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500">Qty: 1</p>
                  </div>
                  <span className="font-black text-[#0F766E]">₹{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-slate-800">₹{cart.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500">Shipping & Tax</span>
              <span className="font-bold text-slate-800">₹99</span>
            </div>
            <div className="flex justify-between items-center mb-8 border-t border-slate-200 pt-4">
              <span className="text-lg font-black text-slate-800">Total to Pay</span>
              <span className="text-xl font-black text-[#0F766E]">₹{(cart.reduce((s, i) => s + i.price, 0) + 99).toLocaleString()}</span>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setShowCheckout(false)} className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleCheckout} disabled={isProcessing} className="flex-1 py-3 px-4 rounded-xl bg-[#0F766E] text-white font-bold hover:bg-[#115E59] transition-colors disabled:opacity-50">
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Promotional Hero Banner */}
        <div className="bg-[#0F172A] rounded-3xl p-8 lg:p-12 mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-40 opacity-10 blur-3xl pointer-events-none">
            <div className="w-96 h-96 bg-[#0F766E] rounded-full"></div>
          </div>
          <div className="relative z-10 md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/20 text-teal-300 font-bold text-sm mb-6 border border-[#0F766E]/30">
              <Tag size={16} /> Big Savings Days
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Upgrade Your Home with <br /> Genuine Appliances.
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Get up to 50% off on top electronics, RO purifiers, and home essentials. Authentic products delivered directly from verified local vendors.
            </p>
            <button className="bg-[#0F766E] hover:bg-[#115E59] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2">
              Explore Deals <ChevronRight size={20} />
            </button>
          </div>
          <div className="relative z-10 hidden md:block w-1/3">
            <img src="https://images.unsplash.com/photo-1627986064973-2e069504c5dc?auto=format&fit=crop&q=80&w=400" alt="AC" className="w-full max-w-xs mx-auto drop-shadow-2xl rounded-2xl transform rotate-3" />
          </div>
        </div>

        {/* Top Vendors */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-[#0F172A] mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[#0F766E]" /> Trusted Local Sellers
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {TOP_SHOPS.map(shop => (
              <Link to={`/shop/${shop.id}`} key={shop.id} className="flex flex-col items-center group min-w-[100px]">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-3 group-hover:border-[#0F766E] transition-all duration-300 group-hover:scale-110">
                  <img src={shop.img} alt={shop.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] truncate w-24 text-center">{shop.name}</h3>
                <p className="text-xs font-semibold text-[#0F766E] flex items-center gap-1 mt-1">
                  <Star size={12} className="fill-[#0F766E]" /> {shop.rating}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-[#0F172A] text-white shadow-lg scale-105' 
                : 'bg-white text-[#475569] hover:bg-slate-50 border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0F172A] mb-6">
            {activeCategory === 'All' ? 'Recommended for You' : `${activeCategory} Products`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={product.id} 
                className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 bg-[#F8FAFC] p-4 flex items-center justify-center overflow-hidden">
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-[#0F172A] px-3 py-1 rounded-lg text-xs font-black tracking-wide border border-slate-100 shadow-sm">
                      {product.tag}
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500 mb-3">
                    <Star size={14} className="fill-amber-500" /> {product.rating} 
                    <span className="text-slate-400 font-medium ml-1">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#0F172A] leading-tight mb-2 flex-1">
                    {product.name}
                  </h3>
                  
                  <Link to={`/shop/${product.id}`} className="flex items-center gap-2 text-sm text-[#64748B] font-medium hover:text-[#0F766E] transition-colors mb-4">
                    <StoreIcon size={14} /> {product.vendor}
                  </Link>

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-400 font-medium line-through mb-1">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>
                      <p className="text-2xl font-black text-[#0F766E]">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-[#0F766E] text-[#0F172A] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#E2E8F0] hover:border-transparent"
                    >
                      <Plus size={20} className="font-bold" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">No products found</h3>
              <p className="text-[#64748B]">Try searching for something else or browse another category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
