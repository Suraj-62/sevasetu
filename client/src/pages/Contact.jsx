import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6"
          >
            Get in <span className="text-[#0F766E]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#475569]"
          >
            Have a question or need help? We're here for you. Reach out to our support team and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-[#E2E8F0]"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <Mail className="text-[#0F766E]" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Email Us</h4>
                <p className="text-[#475569] mb-2">Our friendly team is here to help.</p>
                <a href="mailto:mishrasuraj6299@gmail.com" className="text-[#0F766E] font-medium hover:underline">mishrasuraj6299@gmail.com</a>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-[#E2E8F0]"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <Phone className="text-[#0F766E]" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Call Us</h4>
                <p className="text-[#475569] mb-2">Mon-Fri from 9am to 6pm.</p>
                <a href="tel:+916299323274" className="text-[#0F766E] font-medium hover:underline">+91 62993 23274</a>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-[#E2E8F0]"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <MapPin className="text-[#0F766E]" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Office</h4>
                <p className="text-[#475569]">
                  123 Tech Park, Sector 45<br />
                  Gurugram, Haryana 122003<br />
                  India
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-[#E2E8F0]">
              <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] mb-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your first name" 
                      className="w-full px-5 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#475569] mb-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your last name" 
                      className="w-full px-5 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-5 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?" 
                    className="w-full px-5 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0F766E] transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0F766E] hover:bg-[#115E59] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
