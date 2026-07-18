import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar as CalendarIcon, Clock, CreditCard, CheckCircle } from 'lucide-react';

const BookingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockService = {
    name: "AC Servicing",
    price: 499,
    time: "1 hr"
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock Razorpay flow
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success step
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#0F766E] z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold ${step >= s ? 'bg-[#0F766E] text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {s === 4 ? <CheckCircle size={16} /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>Address</span>
            <span>Schedule</span>
            <span>Payment</span>
            <span>Done</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="text-[#0F766E]" /> Service Address
              </h2>
              <div className="space-y-4">
                <input type="text" placeholder="House/Flat No, Building Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                <input type="text" placeholder="Street Address / Landmark" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                  <input type="text" placeholder="Pincode" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => setStep(2)} className="bg-[#0F766E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#115E59] transition-colors">
                  Continue to Schedule
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CalendarIcon className="text-[#0F766E]" /> Date & Time
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'].map((time, idx) => (
                    <button key={idx} className="border border-gray-200 rounded-lg py-3 text-gray-700 hover:border-blue-500 hover:bg-teal-50 transition-all focus:bg-[#0F766E] focus:text-white focus:border-blue-600 outline-none">
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="text-gray-600 px-6 py-3 font-medium hover:text-gray-900">Back</button>
                <button onClick={() => setStep(3)} className="bg-[#0F766E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#115E59] transition-colors">
                  Proceed to Pay
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="text-[#0F766E]" /> Payment Summary
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{mockService.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14} /> Estimated {mockService.time}</p>
                  </div>
                  <span className="font-bold text-lg text-gray-900">₹{mockService.price}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Taxes & Fees</span>
                  <span>₹49</span>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold text-lg text-gray-900">Total to Pay</span>
                  <span className="font-bold text-xl text-[#0F766E]">₹{mockService.price + 49}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button onClick={() => setStep(2)} disabled={isProcessing} className="text-gray-600 px-6 py-3 font-medium hover:text-gray-900">Back</button>
                <button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-8">Your booking ID is #BKG-{Math.floor(100000 + Math.random() * 900000)}. You can track your technician on your dashboard.</p>
              
              <Link to="/dashboard" className="bg-[#0F766E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#115E59] transition-colors inline-block shadow-md">
                Go to Dashboard
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
