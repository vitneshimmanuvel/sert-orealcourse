import React, { useState } from 'react';

const GraphicDesignMastery = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (only letters and spaces)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
    }
    
    // Phone validation (exactly 10 digits)
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Enrollment submitted successfully!');
      setShowModal(false);
      // Reset form
      setFormData({ name: '', phone: '', email: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numbers and limit to 10 digits
    if (name === 'phone') {
      if (value === '' || /^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // ... (your existing modules array and other JSX remains the same)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* ... (your existing header and main content) */}

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-fade-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Enroll Now</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md"
                  >
                    Submit Enrollment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ... (your existing content) */}

      {/* CTA Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-xl">
        {/* ... (other elements) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-full text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            Enroll Now 
          </button>
          {/* ... (download syllabus button) */}
        </div>
      </section>

      {/* ... (footer and rest of your code) */}
    </div>
  );
};

export default GraphicDesignMastery;
