import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Briefcase, Store, CheckCircle, ChevronLeft, MapPin, Phone, FileText, Upload, CreditCard, Activity, Package, Star, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const InputField = ({ label, type = 'text', icon: Icon, placeholder, required = false, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const currentType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700">{label} {required && <span className="text-rose-500">*</span>}</label>
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon size={20} />
          </div>
        )}
        <input 
          type={currentType} 
          name={name}
          {...(onChange ? { value: value || '', onChange } : {})}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} ${isPasswordField ? 'pr-12' : 'pr-4'} py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400`}
          placeholder={placeholder}
          required={required}
        />
        {isPasswordField && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

const SelectField = ({ label, options, required = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label} {required && <span className="text-rose-500">*</span>}</label>
    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-900 cursor-pointer" required={required}>
      <option value="">Select an option</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Map UI role string to backend enum
    let role = 'customer';
    if (selectedRole === 'Service Provider') role = 'technician';
    else if (selectedRole === 'Shop / Vendor') role = 'vendor';

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || formData.shopName || formData.fullName,
          email: formData.email,
          password: formData.password,
          role
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (data.status === 'pending') {
        navigate('/verification-pending');
      } else if (data.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (data.role === 'technician') {
        navigate('/dashboard/technician');
      } else if (data.role === 'vendor') {
        navigate('/dashboard/vendor');
      } else {
        navigate('/dashboard/customer');
      }
    } catch (err) {
      setError(err.message);
      // Optional: Could display error in UI here
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => {
    if (currentStep === 1) {
      setSelectedRole(null);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderRoleSelection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
      <h1 className="text-3xl font-black text-slate-900 mb-2 text-center lg:text-left">Join SevaSetu</h1>
      <p className="text-slate-500 font-medium mb-8 text-center lg:text-left">How would you like to use our platform?</p>
      
      <div className="space-y-4">
        {[
          { name: 'Customer', icon: User, desc: 'Book verified home services easily.' },
          { name: 'Service Provider', icon: Briefcase, desc: 'Earn by providing professional services.' },
          { name: 'Shop / Vendor', icon: Store, desc: 'Sell products & grow your business locally.' }
        ].map(r => (
          <button
            key={r.name}
            onClick={() => { setSelectedRole(r.name); setCurrentStep(1); }}
            className="w-full flex items-center p-6 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left"
          >
            <div className="w-14 h-14 bg-slate-50 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white rounded-xl flex items-center justify-center transition-colors shrink-0 mr-4">
              <r.icon size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-900">{r.name}</h3>
              <p className="text-sm font-medium text-slate-500 group-hover:text-indigo-700">{r.desc}</p>
            </div>
            <ArrowRight size={20} className="ml-auto text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
          </button>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-slate-500 font-medium">
          Already have an account? <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 ml-1">Sign in instead</Link>
        </p>
      </div>
    </motion.div>
  );

  const renderCustomerForm = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Basic Information</h2><p className="text-sm text-slate-500 font-medium">Step 1 of 3</p></div>
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={(e) => updateForm('fullName', e.target.value)} icon={User} placeholder="John Doe" required />
            <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} icon={Mail} placeholder="john@example.com" required />
            <InputField label="Mobile Number" type="tel" icon={Phone} placeholder="+91 XXXXX XXXXX" required />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} icon={Lock} placeholder="Create a password" required />
            <InputField label="Confirm Password" type="password" icon={Lock} placeholder="Confirm your password" required />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all">Next Step</button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Address Details</h2><p className="text-sm text-slate-500 font-medium">Step 2 of 3</p></div>
            <InputField label="House/Flat No." placeholder="e.g. 402, Block A" />
            <InputField label="Street / Locality" placeholder="e.g. Main Street" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="City" required />
              <InputField label="State" required />
            </div>
            <InputField label="Pincode" type="number" required />
            <button type="button" className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-bold py-3.5 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors"><MapPin size={20}/> Fetch Current Location (GPS)</button>
            <SelectField label="Address Type" options={['Home', 'Office', 'Other']} />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all">Next Step</button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Profile Completion</h2><p className="text-sm text-slate-500 font-medium">Step 3 of 3</p></div>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer block">
              <Upload size={32} className="mb-2 text-slate-400 mx-auto" />
              <p className="font-bold text-sm text-center">Upload Profile Picture (Optional)</p>
              <input type="file" className="hidden" accept="image/*" />
            </label>
            <SelectField label="Preferred Language" options={['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada', 'Bengali']} />
            <InputField label="Emergency Contact (Optional)" type="tel" icon={Phone} placeholder="Contact number" />
            <button type="button" onClick={handleRegister} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex justify-center items-center gap-2">Complete Registration <CheckCircle size={20}/></button>
          </motion.div>
        );
      default: return null;
    }
  };

  const renderServiceProviderForm = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Personal Details</h2><p className="text-sm text-slate-500 font-medium">Step 1 of 6</p></div>
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={(e) => updateForm('fullName', e.target.value)} icon={User} required />
            <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} icon={Mail} required />
            <InputField label="Mobile Number" type="tel" icon={Phone} required />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} icon={Lock} required />
            <InputField label="Confirm Password" type="password" icon={Lock} required />
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-slate-50 block">
              <Upload size={24} className="mb-2 text-slate-400 mx-auto" /><p className="font-bold text-sm text-slate-500 text-center">Upload Profile Photo *</p>
              <input type="file" className="hidden" accept="image/*" required />
            </label>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Professional Details</h2><p className="text-sm text-slate-500 font-medium">Step 2 of 6</p></div>
            <SelectField label="Profession" options={['Electrician', 'Plumber', 'Carpenter', 'AC Technician', 'Cleaner', 'Painter', 'Appliance Repair']} required />
            <InputField label="Years of Experience" type="number" required />
            <SelectField label="Skill Level" options={['Beginner', 'Intermediate', 'Expert']} required />
            <InputField label="Working Radius (in km)" type="number" required />
            <InputField label="Languages Known (comma separated)" required />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Address</h2><p className="text-sm text-slate-500 font-medium">Step 3 of 6</p></div>
            <InputField label="Complete Address" required />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="City" required />
              <InputField label="State" required />
            </div>
            <InputField label="Pincode" type="number" required />
            <button type="button" className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-bold py-3.5 rounded-xl border border-indigo-200 hover:bg-indigo-100"><MapPin size={20}/> Fetch Current Location (Required)</button>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Identity Verification</h2><p className="text-sm text-slate-500 font-medium">Step 4 of 6</p></div>
            <InputField label="Aadhaar Card Number" required />
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Aadhaar (Front & Back) *</p>
              <input type="file" className="hidden" accept="image/*,.pdf" multiple required />
            </label>
            <InputField label="PAN Card Number" required />
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload PAN Card *</p>
              <input type="file" className="hidden" accept="image/*,.pdf" required />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Live Selfie *</p>
              <input type="file" className="hidden" accept="image/*" required />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Police Verification Document (Optional)</p>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Trade Certificate (Optional)</p>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Bank Details</h2><p className="text-sm text-slate-500 font-medium">Step 5 of 6</p></div>
            <InputField label="Bank Name" required />
            <InputField label="Account Holder Name" required />
            <InputField label="Account Number" required />
            <InputField label="IFSC Code" required />
            <InputField label="UPI ID (Optional)" />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Availability & Verification</h2><p className="text-sm text-slate-500 font-medium">Step 6 of 6</p></div>
            <SelectField label="Working Days" options={['Monday - Friday', 'Monday - Saturday', 'All Days', 'Weekends Only']} required />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Start Time (e.g. 09:00 AM)" required />
              <InputField label="End Time (e.g. 06:00 PM)" required />
            </div>
            <SelectField label="Emergency Service Available?" options={['Yes', 'No']} required />
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mt-8">
              <p className="font-bold text-amber-800 flex items-center gap-2"><ShieldCheck size={20}/> Verification Required</p>
              <p className="text-sm text-amber-700 mt-1">An Email and Phone OTP will be sent. Admin approval is required before you can accept jobs.</p>
            </div>
            <button type="button" onClick={handleRegister} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center gap-2 mt-4">Submit for Verification <CheckCircle size={20}/></button>
          </motion.div>
        );
      default: return null;
    }
  };

  const renderVendorForm = () => {
    // 8 steps: Business Info, Contact, Shop Address, Categories, Shop Images, Documents, Bank Details, Services/Verification
    switch(currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Business Information</h2><p className="text-sm text-slate-500 font-medium">Step 1 of 8</p></div>
            <InputField label="Shop / Business Name" name="shopName" value={formData.shopName} onChange={(e) => updateForm('shopName', e.target.value)} icon={Store} required />
            <InputField label="Owner Name" icon={User} required />
            <SelectField label="Business Type" options={['Sole Proprietorship', 'Partnership', 'Private Limited', 'LLP']} required />
            <InputField label="GST Number" required />
            <InputField label="PAN Number" required />
            <InputField label="Business Registration Number (Optional)" />
            <InputField label="Year Established" type="number" />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Contact Information</h2><p className="text-sm text-slate-500 font-medium">Step 2 of 8</p></div>
            <InputField label="Business Email Address" type="email" name="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} icon={Mail} required />
            <InputField label="Business Phone Number" type="tel" icon={Phone} required />
            <InputField label="Alternate Phone Number (Optional)" type="tel" icon={Phone} />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} icon={Lock} required />
            <InputField label="Confirm Password" type="password" icon={Lock} required />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Shop Address</h2><p className="text-sm text-slate-500 font-medium">Step 3 of 8</p></div>
            <InputField label="Shop Address" required />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="City" required />
              <InputField label="State" required />
            </div>
            <InputField label="Pincode" type="number" required />
            <button type="button" className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-bold py-3.5 rounded-xl border border-indigo-200"><MapPin size={20}/> Fetch Current Google Map Location *</button>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Categories</h2><p className="text-sm text-slate-500 font-medium">Step 4 of 8</p></div>
            <p className="text-sm font-bold text-slate-700 mb-2">Select the categories you sell (Multiple Selection):</p>
            <div className="grid grid-cols-2 gap-3">
              {['Electronics', 'Furniture', 'RO', 'Electrical', 'Solar', 'Kitchen Appliances', 'Hardware', 'Smart Home', 'Home Decor'].map(cat => (
                <label key={cat} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-sm font-medium text-slate-700">{cat}</span>
                </label>
              ))}
            </div>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-6">Next Step</button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Shop Images</h2><p className="text-sm text-slate-500 font-medium">Step 5 of 8</p></div>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Shop Logo *</p>
              <input type="file" className="hidden" accept="image/*" required />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Shop Banner *</p>
              <input type="file" className="hidden" accept="image/*" required />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Shop Interior/Exterior Photos *</p>
              <input type="file" className="hidden" accept="image/*" multiple required />
            </label>
            <label className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50 block">
              <p className="font-bold text-sm text-slate-500">Upload Owner Photo (Optional)</p>
              <input type="file" className="hidden" accept="image/*" />
            </label>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Documents</h2><p className="text-sm text-slate-500 font-medium">Step 6 of 8</p></div>
            <div className="space-y-3">
              {['GST Certificate *', 'Business License *', 'PAN Card *', 'Owner Aadhaar *', 'Cancelled Cheque *', 'Shop Verification Photos *'].map(doc => (
                <label key={doc} className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer block">
                  <span className="font-bold text-sm text-slate-700">{doc}</span>
                  <Upload size={18} className="text-slate-400" />
                  <input type="file" className="hidden" accept="image/*,.pdf" required />
                </label>
              ))}
            </div>
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 7:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Bank Details</h2><p className="text-sm text-slate-500 font-medium">Step 7 of 8</p></div>
            <InputField label="Bank Name" required />
            <InputField label="Account Holder Name" required />
            <InputField label="Account Number" required />
            <InputField label="IFSC Code" required />
            <InputField label="UPI ID (Optional)" />
            <button type="button" onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Next Step</button>
          </motion.div>
        );
      case 8:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div><h2 className="text-2xl font-black text-slate-900">Services & Verification</h2><p className="text-sm text-slate-500 font-medium">Step 8 of 8</p></div>
            <p className="text-sm font-bold text-slate-700 mb-2">Select Services Offered:</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {['Home Delivery', 'Installation', 'Repair', 'Warranty Service', 'AMC', 'Emergency Service'].map(svc => (
                <label key={svc} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-sm font-medium text-slate-700">{svc}</span>
                </label>
              ))}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <p className="font-bold text-amber-800 flex items-center gap-2"><ShieldCheck size={20}/> Final Verification</p>
              <p className="text-sm text-amber-700 mt-1">Email and Phone OTP required. Admin approval needed before your shop goes live.</p>
            </div>
            <button type="button" onClick={handleRegister} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex justify-center items-center gap-2 mt-4">Complete Registration <CheckCircle size={20}/></button>
          </motion.div>
        );
      default: return null;
    }
  };

  const renderActiveForm = () => {
    if (!selectedRole) return renderRoleSelection();
    
    return (
      <div className="w-full">
        {/* Navigation Bar */}
        <div className="flex items-center mb-8">
          <button onClick={handleBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors mr-4">
            <ChevronLeft size={20} />
          </button>
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedRole} Registration</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedRole === 'Customer' && renderCustomerForm()}
          {selectedRole === 'Service Provider' && renderServiceProviderForm()}
          {selectedRole === 'Shop / Vendor' && renderVendorForm()}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Split: Image/Brand Section */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden sticky top-0 min-h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1000&q=80" 
            alt="Join SevaSetu" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl text-white tracking-tight">SevaSetu</span>
            </Link>
          </div>
          
          <div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-white mb-6 leading-tight"
            >
              Start your journey with us today.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 text-lg font-medium mb-8"
            >
              Whether you're looking for premium home services or want to grow your business, SevaSetu is the perfect platform.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30"><CheckCircle size={16}/></div>
                Get instant access to top-tier services
              </div>
              <div className="flex items-center gap-4 text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30"><Briefcase size={16}/></div>
                Earn more by joining our professional fleet
              </div>
              <div className="flex items-center gap-4 text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30"><Store size={16}/></div>
                Expand your shop's reach locally
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Split: Register Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center p-6 sm:p-12 lg:p-24 bg-white relative overflow-y-auto custom-scrollbar h-auto lg:h-[calc(100vh-80px)]">
        <div className="w-full max-w-md my-auto pb-12">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 flex justify-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="font-black text-2xl text-slate-900 tracking-tight">SevaSetu</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {renderActiveForm()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Register;
