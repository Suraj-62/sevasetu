import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 inline-block">
              <div className="flex items-center gap-3">
                <img src={logo} alt="SevaSetu Logo" className="h-8 w-8 rounded-lg shadow-sm" />
                <span className="text-2xl font-black text-gray-900 tracking-tight">SevaSetu</span>
              </div>
            </Link>
            <p className="text-gray-500 mb-8 leading-relaxed max-w-sm">Har Ghar Ka Bharosemand Saathi. Your one-stop solution for reliable, professional, and affordable home services.</p>
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-blue-400 hover:border-blue-100 hover:bg-blue-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-pink-600 hover:border-pink-100 hover:bg-pink-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-blue-800 hover:border-blue-100 hover:bg-blue-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Services</h3>
            <ul className="space-y-4">
              <li><Link to="/services/electrician" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Electrician</Link></li>
              <li><Link to="/services/plumbing" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Plumbing</Link></li>
              <li><Link to="/services/cleaning" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Cleaning</Link></li>
              <li><Link to="/services/ac-repair" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">AC Repair</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">© {new Date().getFullYear()} SevaSetu. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-gray-500 text-sm font-medium">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
