import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Shield className="text-white" size={22} />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">Seva<span className="text-blue-600">Setu</span></span>
            </Link>
            <p className="text-slate-500 font-medium mb-8 max-w-sm leading-relaxed text-sm">
              Har Ghar Ka Bharosemand Saathi. Your one-stop solution for reliable, professional, and affordable home services across India.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/suraj-kumar-mishra-30112527b" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/Suraj-62" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://instagram.com/mishra_suraj62" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services?q=ac" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">AC Repair</Link></li>
              <li><Link to="/services?q=cleaning" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Home Cleaning</Link></li>
              <li><Link to="/services?q=electrician" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Electrician</Link></li>
              <li><Link to="/services?q=plumber" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Plumbing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link to="/store" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Browse Shop</Link></li>
              <li><Link to="/warranty" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Warranty Info</Link></li>
              <li><Link to="/register-shop" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Sell with Us</Link></li>
              <li><Link to="/returns" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Legal & Help</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} SevaSetu Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link to="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
