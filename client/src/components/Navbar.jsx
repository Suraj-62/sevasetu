import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, MapPin, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const SEARCH_PLACEHOLDERS = [
  "Search for 'AC Repair'",
  "Search for 'Cleaning'",
  "Search for 'Plumbing'",
  "Search for 'Electrician'",
  "Search for 'Painting'"
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [locationName, setLocationName] = useState('New Delhi');
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.state_district || 'Current Location';
            setLocationName(city);
          } catch (error) {
            setLocationName('Location Found');
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          alert("Could not get your location. Please ensure location access is allowed.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4 lg:gap-8">
          
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#2563EB] to-blue-800 rounded-xl shadow-lg shadow-blue-200/50 group-hover:scale-105 transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10L12 3L21 10V21H3V10Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12H15V21" fill="white"/>
                </svg>
              </div>
              <span className="text-3xl font-black tracking-tight text-[#111827] hidden sm:block">Seva<span className="text-[#2563EB]">Setu</span></span>
            </Link>
          </div>

          {/* Global Search Bar (Urban Company Style) */}
          <div className="hidden md:flex flex-1 max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden h-11">
            <div onClick={handleLocationClick} className="flex items-center px-3 bg-gray-50 border-r border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors shrink-0" title="Click to get current location">
              {isLocating ? (
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-1.5" />
              ) : (
                <MapPin size={16} className="text-gray-500 mr-1.5" />
              )}
              <span className="text-xs font-bold text-gray-700 truncate max-w-[80px]">{locationName}</span>
              <ChevronDown size={14} className="text-gray-400 ml-1" />
            </div>
            <form onSubmit={handleSearch} className="flex-1 flex items-center px-3 bg-white">
              <Search size={16} className="text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]} 
                className="w-full bg-transparent outline-none text-xs font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-6 shrink-0">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Services</Link>
            <Link to="/store" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">Store</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">About Us</Link>
            <div className="w-px h-5 bg-gray-200"></div>
            <Link to="/store" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-bold transition-colors text-sm">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md text-sm">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/store" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-xl absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Home</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Services</Link>
            <Link to="/store" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">About Us</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
