import { motion } from 'framer-motion';

const Help = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#E2E8F0]"
        >
          <h1 className="text-4xl font-black mb-8 text-[#0F766E]">Help Center</h1>
          <p className="text-lg text-slate-600 mb-6">
            Welcome to the SevaSetu Help Center! Whether you are a customer looking for assistance with a booking, or a partner needing help with your dashboard, you are in the right place.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 mt-8">For Customers</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>How to book a service:</strong> Navigate to the Services page, select your required service, and click "Book Now". You must be logged in to complete a booking.</li>
            <li><strong>Tracking an order:</strong> Once booked, go to your Customer Dashboard to see real-time updates and live location of your assigned technician.</li>
            <li><strong>Payment issues:</strong> We use secure payment gateways. If your payment fails, please check your bank or contact our support team.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 mt-8">For Partners</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Account Verification:</strong> New technician and vendor accounts must be verified by the admin before you can accept bookings.</li>
            <li><strong>Accepting bookings:</strong> Check your Partner Dashboard for incoming requests. You can accept or decline based on your availability.</li>
          </ul>

          <p className="mt-10 text-slate-500 font-medium border-t pt-6">
            Can't find what you're looking for? Reach out to us via our Contact page.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
