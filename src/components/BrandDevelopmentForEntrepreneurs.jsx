import React, { useState } from 'react';

const BrandDevelopmentForEntrepreneurs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [activeModule, setActiveModule] = useState(0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true); // Set loading state
      try {
        const response = await fetch('http://localhost:3000/api/course-enrollment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            courseName: 'Brand Development for Entrepreneurs'
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('Server response:', data);
          alert('Enrollment submitted successfully!');
          setShowModal(false);
          setFormData({ name: '', phone: '', email: '' });
        } else {
          throw new Error(data.message || 'Failed to submit enrollment');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit enrollment. Please try again.');
      } finally {
        setIsSubmitting(false); // Clear loading state
      }
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

  const allowOnlyLetters = (e) => {
    const char = e.key;
    if (!/^[a-zA-Z\s]$/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
      e.preventDefault();
    }
  };

  const allowOnlyNumbers = (e) => {
    const char = e.key;
    if (!/^\d$/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
      e.preventDefault();
    }
  };

  const modules = [
    {
      title: "Introduction to Brand Development",
      objective: "Understand the fundamentals of brand development and its importance for business success.",
      topics: [
        "What is brand development?",
        "The role of branding in business growth",
        "Types of brands and their strategies",
        "Overview of brand identity, positioning, and values"
      ]
    },
    {
      title: "Defining Your Brand Identity",
      objective: "Learn how to create a compelling brand identity that reflects your business values.",
      topics: [
        "Core elements of brand identity (logo, color, fonts)",
        "Crafting your brand message",
        "Creating a brand story",
        "Brand voice and tone"
      ]
    },
    {
      title: "Understanding Your Target Audience",
      objective: "Discover how to effectively define and connect with your target audience.",
      topics: [
        "Audience research and segmentation",
        "Creating customer personas",
        "Mapping the customer journey",
        "How to gather customer insights"
      ]
    },
    {
      title: "Brand Positioning and Market Research",
      objective: "Learn how to position your brand uniquely in the market through effective market research.",
      topics: [
        "Competitive analysis and SWOT",
        "Understanding market trends",
        "Defining your unique selling proposition (USP)",
        "Brand positioning strategies"
      ]
    },
    {
      title: "Building Your Brand Communication",
      objective: "Discover effective ways to communicate your brand message to the audience.",
      topics: [
        "Creating a brand communication plan",
        "Developing marketing messages",
        "Content marketing for brand awareness",
        "Leveraging social media for brand communication"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <header className=" to-blue-600 text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 md:mb-0 md:mr-10">
              <span className="text-3xl font-bold">BD</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Brand Development for Entrepreneurs</h1>
              <p className="text-xl max-w-3xl">
                Build a powerful brand from scratch and establish a memorable market presence
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-white">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-sm rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Duration</h3>
              <p className="text-3xl font-bold mb-2">20 Days</p>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="mr-2">•</span> 2 hours daily
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> 10 live sessions
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> 2 practical exercises
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> 1 final brand pitch
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-sm rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Fees</h3>
              <div className="flex flex-col">
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold mr-2">₹5,000 /-</span>
                  <span className="text-gray-200">INR</span>
                </div>
                
              </div>
              <div className="mt-4 p-3 bg-emerald-800/30 rounded-lg">
                <p className="font-medium">Includes FREE access to:</p>
                <p className="font-bold text-emerald-200">Basic Brand Pro Course</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Course Introduction</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-lg mb-4">
              Brand development is essential for entrepreneurs aiming to create a lasting and memorable impression in the market. This course empowers entrepreneurs to build a brand from scratch, focusing on core elements like identity, positioning, and audience engagement.
            </p>
            <p className="text-lg">
              Learn strategies to define your brand vision and establish a unique market presence. You'll walk away with the skills needed to craft a compelling brand narrative and establish a powerful market presence.
            </p>
          </div>
        </section>

        {/* Modules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Course Modules</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module Navigation */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Module Overview</h3>
              <div className="mb-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="font-medium text-emerald-800">FREE with enrollment:</p>
                <p className="font-bold text-emerald-900">Basic Brand Pro Course</p>
              </div>
              <ul className="space-y-2">
                {modules.map((module, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setActiveModule(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeModule === index 
                          ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="font-medium">Module {index + 1}:</span> {module.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Module Details */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                Module {activeModule + 1}: {modules[activeModule].title}
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  Objective
                </span>
              </div>
              <p className="text-lg mb-6">{modules[activeModule].objective}</p>
              
              <h4 className="text-xl font-semibold mb-4 text-gray-700">Topics Covered</h4>
              <ul className="space-y-3">
                {modules[activeModule].topics.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mt-1.5 w-5 h-5 rounded-full bg-emerald-500 mr-3 flex-shrink-0"></span>
                    <span className="text-lg">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Learning Outcomes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Course Outcomes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Ability to create a strong brand identity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Expertise in brand positioning and market research</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Skills in brand communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Proficiency in creating a brand story and message</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Understanding of digital and offline brand strategies</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Career Opportunities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Brand Manager</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Marketing Strategist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Digital Brand Specialist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Product Brand Developer</span>
                </li>
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-700">Entrepreneurial Opportunities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Offer brand consultancy to startups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Create brand identity packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Develop your own personal brand</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Lead brand development workshops</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certification */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Certification</h2>
          
          <div className="bg-gradient-to-r from-blue-900 to-emerald-800 text-white rounded-xl p-8 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Globally Recognized Certification</h3>
              <p className="text-xl mb-6">
                Upon completing this Brand Development course, you will receive a certification validating your expertise in brand development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Your certification demonstrates:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Capability to create and manage a brand for success</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Skills in brand positioning, identity, and communication</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Expertise in developing brand strategies</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Bonus Perks:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Golden Membership Card for 50% discount on future courses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Access to customizable brand templates and guides</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span>Portfolio review by branding experts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Build Your Brand Today</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Transform your business with a powerful brand identity in just 20 days
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-full text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Enroll Now 
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all">
              Download Syllabus
            </button>
          </div>
        </section>
      </main>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
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
                    onKeyDown={allowOnlyLetters}
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
                    onKeyDown={allowOnlyNumbers}
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
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                            <span className="flex items-center">
                                Loading...
                            </span>
                            ) : (
                            'Submit Enrollment'
                            )}
                        </button>
                        </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold">BD</span>
              </div>
            </div>
            <p className="text-lg">© 2025 settlo academy all rights reserved.</p>
            <p className="mt-2 text-emerald-200">Designed with passion for creative education</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrandDevelopmentForEntrepreneurs;