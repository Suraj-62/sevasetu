import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar as CalendarIcon, Clock, CreditCard, CheckCircle } from 'lucide-react';

const BookingFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipCode: ''
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleNextStep1 = () => {
    if (!address.street || !address.city || !address.zipCode) {
      alert("Please fill in all address fields");
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!date || !time) {
      alert("Please select a date and time");
      return;
    }
    setStep(3);
  };

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    let hasToken = false;
    if (userInfoString) {
      try {
        const parsed = JSON.parse(userInfoString);
        if (parsed?.token) hasToken = true;
      } catch (e) {}
    }
    if (!hasToken) {
      navigate('/login?redirect=/book', { state: location.state });
    }
  }, [navigate, location.state]);

  // Try to get service from state, fallback to default if accessed directly
  const selectedService = location.state?.service || {
    name: "AC Servicing",
    price: 499,
    time: "1 hr"
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      
      if (!token) {
         alert("Please login first to book a service");
         navigate('/login');
         return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          service: selectedService.name,
          address: {
            street: address.street,
            city: address.city,
            state: "Jharkhand", // Default
            zipCode: address.zipCode
          },
          scheduledDate: date || new Date(),
          timeSlot: time || "11:00 AM",
          totalAmount: parseInt(selectedService.price.toString().replace(/[^0-9]/g, '')) + 49,
          notes: "Please call before coming."
        })
      });

      if (!response.ok) {
        throw new Error("Failed to book service");
      }

      const data = await response.json();
      console.log("Booking created:", data);
      
      setIsProcessing(false);
      
      // Navigate to order success screen
      navigate('/order-success', { 
        state: { 
          type: 'service',
          providerName: 'SevaSetu Pro',
          items: [{ name: selectedService.name, price: parseInt(selectedService.price.toString().replace(/[^0-9]/g, '')) }],
          totalAmount: parseInt(selectedService.price.toString().replace(/[^0-9]/g, '')) + 49,
          orderId: data._id || Math.floor(100000 + Math.random() * 900000),
          address: address
        } 
      });
    } catch (error) {
      console.error(error);
      alert("Error booking service");
      setIsProcessing(false);
    }
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
            
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-bold ${step >= s ? 'bg-[#0F766E] text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {s}
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
                <input type="text" placeholder="Street Address / Landmark" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                  <input type="text" placeholder="Pincode" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={handleNextStep1} className="bg-[#0F766E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#115E59] transition-colors">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none" />
                  <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F766E] outline-none bg-white">
                    <option value="">Select Time</option>
                    <option>09:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="text-gray-500 font-medium hover:text-gray-700">Back</button>
                <button onClick={handleNextStep2} className="bg-[#0F766E] text-white px-8 py-3 rounded-full font-medium hover:bg-[#115E59] transition-colors">
                  Proceed to Payment
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
                    <h3 className="font-bold text-lg text-gray-900">{selectedService.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14} /> Estimated {selectedService.time}</p>
                  </div>
                  <span className="font-bold text-lg text-gray-900">₹{parseInt(selectedService.price.toString().replace(/[^0-9]/g, ''))}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Taxes & Fees</span>
                  <span>₹49</span>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold text-lg text-gray-900">Total to Pay</span>
                  <span className="font-bold text-xl text-[#0F766E]">₹{parseInt(selectedService.price.toString().replace(/[^0-9]/g, '')) + 49}</span>
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

        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
