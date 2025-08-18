// pages/services/GraphicDesign.jsx
import React, { useState } from 'react';
import { FaPalette, FaRocket, FaStar, FaLightbulb } from 'react-icons/fa';

const GraphicDesign = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const packages = [
    {
      name: "Basic Brand Pack",
      price: "₹2,999",
      period: "(one-time)",
      features: [
        "Custom logo design",
        "Business card design",
        "2 marketing banners",
        "2 free revisions included",
        "High-resolution files",
        "Basic brand guidelines",
        "Social media logo variants",
        "Free consultation call"
      ],
      goal: "Perfect starter visual identity for new businesses",
      popular: false,
      gradient: "from-pink-400 to-red-600",
      deliveryTime: "3-5 days",
      revisions: "2 Free reels",
      savings: null
    },
    {
      name: "Creative Suite",
      price: "₹6,999",
      period: "(one-time)",
      features: [
        "Complete branding kit (logo, letterhead, business cards)",
        "Social media templates (10 designs)",
        "5 marketing banners/posters",
        "2 free reels design templates",
        "Brand style guide",
        "Unlimited revisions",
        "Print-ready files",
        "Social media cover designs",
        "Email signature design"
      ],
      goal: "Consistent and stylish visuals across all platforms",
      popular: true,
      gradient: "from-purple-500 to-pink-600",
      deliveryTime: "7-10 days",
      revisions: "Unlimited",
      savings: "Best Value"
    },
    {
      name: "Premium Design Hub",
      price: "₹11,999",
      period: "(one-time)",
      features: [
        "Complete brand identity package",
        "15 marketing assets (brochures, flyers, posters)",
        "2 ad creatives per month for 3 months",
        "Brand guidelines document",
        "Packaging design concepts",
        "Website graphics package",
        "Social media content calendar designs",
        "Vector illustrations (5 custom)",
        "3D mockups and presentations",
        "Free reels templates (5 premium designs)"
      ],
      goal: "Professionally branded campaigns with ongoing support",
      popular: false,
      gradient: "from-indigo-500 to-purple-700",
      deliveryTime: "10-15 days",
      revisions: "Unlimited + 3 months support",
      savings: "Premium Plan"
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = 'Name should contain only letters and spaces';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a package';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:3000/api/form-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            message: formData.message,
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('Server response:', data);
          alert('Quote request submitted successfully! We will contact you soon.');
          setShowModal(false);
          setFormData({ fullName: '', phone: '', email: '', service: '', message: '' });
        } else {
          throw new Error(data.message || 'Failed to submit request');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      if (value === '' || /^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  function allowOnlyLetters(e) {
    const char = e.key;
    if (!/^[a-zA-Z\s]$/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
      e.preventDefault();
    }
  }

  const openModal = (packageName) => {
    setSelectedPackage(packageName);
    setFormData({ ...formData, service: packageName });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Graphic Design Services</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Create stunning visuals that make your brand unforgettable
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Packages Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Design Packages for Every Need</h2>
          <p className="text-xl text-gray-600 mb-4">From logo design to complete brand identity solutions</p>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full inline-block font-semibold text-lg shadow-lg">
            🎨 Customizable Pricing Available - Starting from ₹500/-
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'ring-4 ring-purple-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-6 py-2 rounded-bl-2xl font-bold">
                  Most Popular
                </div>
              )}

              {pkg.savings && (
                <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-2 rounded-br-2xl text-sm font-bold">
                  {pkg.savings}
                </div>
              )}

              <div className={`bg-gradient-to-r ${pkg.gradient} text-white p-8 text-center`}>
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold">{pkg.price}</span>
                  <span className="text-lg opacity-80 ml-2">{pkg.period}</span>
                </div>
                <p className="text-lg opacity-90 mb-4">{pkg.goal}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/20 rounded-lg p-2">
                    <span className="font-semibold">⏱️ {pkg.deliveryTime}</span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    <span className="font-semibold">🔄 {pkg.revisions}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-500 font-bold text-xl mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openModal(pkg.name)}
                  className={`w-full bg-gradient-to-r ${pkg.gradient} text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Pricing Notice */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center border border-pink-200">
          <div className="flex justify-center mb-4">
            <FaLightbulb className="text-4xl text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Design Solution?</h3>
          <p className="text-lg text-gray-600 mb-4">
            Our design packages are fully customizable to meet your specific brand needs. 
            We offer flexible pricing starting from just ₹500/- based on your requirements.
          </p>
          <button 
            onClick={() => openModal('Custom Package')}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Get Custom Quote
          </button>
        </div>

        {/* Design Process */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Design Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-gray-800 mb-2">1. Brief</h3>
              <p className="text-sm text-gray-600">Understanding your vision and requirements</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="font-bold text-gray-800 mb-2">2. Concept</h3>
              <p className="text-sm text-gray-600">Creating initial design concepts</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold text-gray-800 mb-2">3. Design</h3>
              <p className="text-sm text-gray-600">Developing the final designs</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-gray-800 mb-2">4. Deliver</h3>
              <p className="text-sm text-gray-600">Final files and brand guidelines</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Our Design Services?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaPalette className="text-5xl text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Creative Excellence</h3>
              <p className="text-gray-600">Award-winning designs that capture your brand essence perfectly</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaRocket className="text-5xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Fast Turnaround</h3>
              <p className="text-gray-600">Quick delivery without compromising on quality or attention to detail</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaStar className="text-5xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">High-resolution, print-ready designs with unlimited revisions</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Design Success Numbers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Designs Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-lg opacity-90">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">48Hr</div>
              <div className="text-lg opacity-90">Average Delivery</div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Get Free Quote</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onKeyDown={allowOnlyLetters}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Selected Package</label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
                    readOnly
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us about your design requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Updated Footer with Better Styling */}
      <footer className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <img src="../logoset.png" alt="Logo" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Settlo Academy
            </h3>
            <p className="text-lg text-gray-300 mb-2">© 2025 Settlo Academy. All rights reserved.</p>
            <p className="text-pink-400 font-medium text-xl">Creating visual experiences that inspire</p>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-semibold text-pink-300 mb-2">🎨 Design Excellence</h4>
                <p className="text-gray-300">Award-winning creative solutions</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-300 mb-2">🚀 Let's Create Together</h4>
                <p className="text-gray-300">Transform your brand identity</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">💡 Innovation</h4>
                <p className="text-gray-300">Cutting-edge design trends</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraphicDesign;
