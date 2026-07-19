import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#E2E8F0]"
        >
          <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-8">Last Updated: July 2026</p>
          
          <div className="space-y-6 text-slate-600">
            <p>Welcome to SevaSetu. By accessing our platform, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">1. User Accounts</h3>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">2. Partner Verification</h3>
            <p>Technicians and Vendors must undergo our mandatory verification process. SevaSetu reserves the right to approve, reject, or revoke partner access at any time at its sole discretion if quality or safety standards are not met.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">3. Payments & Fees</h3>
            <p>All payments for services and products must be made through our official secure payment gateways. SevaSetu holds the payments in escrow and releases them to the partners only after the successful completion of the service or delivery of the product.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6">4. Dispute Resolution</h3>
            <p>In the event of a dispute between a customer and a partner, SevaSetu will act as an impartial mediator. However, SevaSetu is a platform connecting users and is not directly liable for the actions of independent contractors or third-party vendors.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
