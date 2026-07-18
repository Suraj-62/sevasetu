import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicesList from './pages/ServicesList';
import BookingFlow from './pages/BookingFlow';
import CustomerDashboard from './pages/CustomerDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import VerificationPending from './pages/VerificationPending';

import Store from './pages/Store';
import ShopDetails from './pages/ShopDetails';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');
  const isStoreApp = location.pathname === '/store' || location.pathname.startsWith('/shop/');
  const isAuth = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/verification-pending';
  const isServices = location.pathname.startsWith('/services');
  const isNoFooterPage = ['/about', '/contact'].includes(location.pathname);
  const hideNav = isDashboard || isStoreApp || isAuth;
  const hideFooter = isDashboard || isStoreApp || isAuth || isServices || isNoFooterPage;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/store" element={<Store />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/technician" element={<TechnicianDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/vendor" element={<VendorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification-pending" element={<VerificationPending />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
