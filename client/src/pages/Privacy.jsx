import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#E2E8F0]"
        >
          <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last Updated: July 2026</p>
          
          <div className="space-y-6 text-slate-600">
            <p>At SevaSetu, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">1. Information We Collect</h3>
            <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us. This includes your name, email address, phone number, and physical address.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">2. How We Use Your Information</h3>
            <p>We use personal information collected via our platform for a variety of business purposes, primarily to facilitate account creation, fulfill and manage your service bookings and product orders, and to provide customer support.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">3. Location Data</h3>
            <p>If you use our live tracking features, we may collect and process information about your actual location. We use various technologies to determine location, including IP address, GPS, and other sensors.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">4. Data Security</h3>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
