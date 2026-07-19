import { motion } from 'framer-motion';

const Faq = () => {
  const faqs = [
    {
      q: "What is SevaSetu?",
      a: "SevaSetu is an all-in-one platform connecting customers with verified home service professionals and trusted local appliance vendors."
    },
    {
      q: "How do I trust the technicians?",
      a: "Every technician and vendor on our platform undergoes a strict background check and verification process by our admin team before their account is activated."
    },
    {
      q: "Is there a warranty on services and products?",
      a: "Yes, services come with a standard 30-day service guarantee. Products purchased from the SevaStore come with the manufacturer's original warranty."
    },
    {
      q: "How do I cancel a booking?",
      a: "You can cancel your booking directly from your Customer Dashboard up to 2 hours before the scheduled time without any penalty."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans text-[#0F172A]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-10 text-center">Frequently Asked <span className="text-[#0F766E]">Questions</span></h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0]"
              >
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
