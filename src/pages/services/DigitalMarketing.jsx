// pages/services/DigitalMarketing.jsx
import React, { useState } from 'react';

const DigitalMarketing = () => {
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
      name: "Starter Buzz",
      price: "₹8,000",
      period: "/month",
      features: [
        "8 social media posts per month",
        "2 ad campaigns (₹2,000 ad budget included)",
        "Basic monthly analytics report",
        "Email support",
        "1 competitor analysis",
        "Basic SEO audit"
      ],
      goal: "Build brand awareness cost-effectively",
      popular: false,
      gradient: "from-blue-500 to-purple-600",
      savings: null
    },
    {
      name: "Growth Mode",
      price: "₹15,000",
      period: "/month",
      features: [
        "15 posts + 5 reels per month",
        "4 ad campaigns (₹5,000 ad budget included)",
        "Competitor analysis + SEO basics",
        "Weekly performance reports",
        "Priority support",
        "Content calendar planning",
        "2 landing page optimizations"
      ],
      goal: "Increase leads & engagement significantly",
      popular: true,
      gradient: "from-green-500 to-teal-600",
      savings: "Save ₹3,000"
    },
    {
      name: "Market Dominator",
      price: "₹30,000",
      period: "/month",
      features: [
        "30 posts + 8 reels + influencer collaboration",
        "8 ad campaigns (₹10,000 ad budget included)",
        "Advanced SEO, content calendar",
        "In-depth analytics & insights",
        "24/7 dedicated support",
        "Monthly strategy calls",
        "A/B testing for ads",
        "Conversion rate optimization"
      ],
      goal: "Dominate your niche visibility completely",
      popular: false,
      gradient: "from-purple-500 to-pink-600",
      savings: "Save ₹8,000"
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
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
          
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Digital Marketing Packages</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Boost your online presence with our comprehensive digital marketing solutions
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Packages Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Choose Your Perfect Plan</h2>
          <p className="text-xl text-gray-600">Scale your digital presence with our tailored packages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                pkg.popular ? 'ring-4 ring-green-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-2 rounded-bl-2xl font-bold">
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
                  <span className="text-lg opacity-80">{pkg.period}</span>
                </div>
                <p className="text-lg opacity-90">{pkg.goal}</p>
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 font-bold text-xl mr-3">✓</span>
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

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Our Digital Marketing?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Data-Driven Results</h3>
              <p className="text-gray-600">Every campaign is optimized based on real performance data and analytics</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Targeted Campaigns</h3>
              <p className="text-gray-600">Reach your ideal customers with precision targeting and personalized content</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Growth Focused</h3>
              <p className="text-gray-600">Strategies designed to scale your business effectively and sustainably</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Success Numbers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Campaigns Launched</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">250%</div>
              <div className="text-lg opacity-90">Average ROI Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Support Available</div>
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img src="../logoset.png" alt="Logo" className="w-20 transform scale-150" />
          </div>
          <p className="text-lg">© 2025 Settlo Academy. All rights reserved.</p>
          <p className="mt-2 text-blue-400">Designed with passion for digital growth</p>
        </div>
      </footer>
    </div>
  );
};

export default DigitalMarketing;
