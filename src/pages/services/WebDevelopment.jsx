// pages/services/WebDevelopment.jsx
import React, { useState } from 'react';

const WebDevelopment = () => {
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
      name: "Basic Presence",
      price: "₹12,000",
      period: "(one-time)",
      features: [
        "3-page static website",
        "Mobile responsive design",
        "1 month free maintenance",
        "Basic SEO setup",
        "Contact form integration",
        "Social media links",
        "Google Analytics setup"
      ],
      goal: "Perfect for simple online presence",
      popular: false,
      gradient: "from-blue-400 to-indigo-600",
      deliveryTime: "5-7 days"
    },
    {
      name: "Professional Site",
      price: "₹30,000",
      period: "(one-time)",
      features: [
        "6–8 dynamic pages + CMS",
        "Blog setup with admin panel",
        "Advanced contact forms",
        "3 months free maintenance",
        "Advanced SEO optimization",
        "Analytics & performance tracking",
        "Social media integration",
        "Email marketing setup"
      ],
      goal: "A polished, functional brand hub",
      popular: true,
      gradient: "from-green-400 to-blue-600",
      deliveryTime: "10-14 days"
    },
    {
      name: "E-Commerce Pro",
      price: "₹65,000",
      period: "(one-time)",
      features: [
        "Full e-commerce store",
        "Payment gateway integration",
        "Product management system",
        "6 months free maintenance",
        "Inventory management",
        "Order tracking system",
        "Customer accounts & wishlists",
        "Multi-currency support",
        "Shipping calculator"
      ],
      goal: "Sell products/services online effortlessly",
      popular: false,
      gradient: "from-purple-400 to-pink-600",
      deliveryTime: "15-21 days"
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
        const response = await fetch('https://settlo-forms-notlead.onrender.com/api/form-submit', {
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
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Website Development & Maintenance</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Professional websites that convert visitors into customers
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Packages Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Choose Your Website Package</h2>
          <p className="text-xl text-gray-600">From simple presence to powerful e-commerce solutions</p>
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
                  Best Value
                </div>
              )}

              <div className={`bg-gradient-to-r ${pkg.gradient} text-white p-8 text-center`}>
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold">{pkg.price}</span>
                  <span className="text-lg opacity-80 ml-2">{pkg.period}</span>
                </div>
                <p className="text-lg opacity-90 mb-2">{pkg.goal}</p>
                <div className="bg-white/20 rounded-lg p-2">
                  <span className="text-sm font-semibold">⏱️ Delivery: {pkg.deliveryTime}</span>
                </div>
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

        {/* Technology Stack */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Technology Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="font-bold text-gray-800">React</h3>
              <p className="text-sm text-gray-600">Modern UI</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🟢</div>
              <h3 className="font-bold text-gray-800">Node.js</h3>
              <p className="text-sm text-gray-600">Backend</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="font-bold text-gray-800">MongoDB</h3>
              <p className="text-sm text-gray-600">Database</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="font-bold text-gray-800">AWS</h3>
              <p className="text-sm text-gray-600">Hosting</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Mobile Responsive</h3>
              <p className="text-gray-600">Perfect display on all devices and screen sizes</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed and performance</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Secure & Safe</h3>
              <p className="text-gray-600">SSL certificates and security best practices</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal - Same as Digital Marketing */}
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
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}


      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img src="../logoset.png" alt="Logo" className="w-20 transform scale-150" />
          </div>
          <p className="text-lg">© 2025 Settlo Academy. All rights reserved.</p>
          <p className="mt-2 text-green-400">Building digital experiences that matter</p>
        </div>
      </footer>
    </div>
  );
};

export default WebDevelopment;
