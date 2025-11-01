import React, { useState } from 'react';

const PythonNetworkingCourse = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [activeModule, setActiveModule] = useState(0);

  // Course Data
  const courseData = {
    title: "Python & Networking Mastery",
    subtitle: "Master Python programming from basics to advanced concepts with hands-on networking applications",
    duration: {
      total: "30 Days",
      details: [
        "4 weeks of intensive learning",
        "Daily 3-4 hours commitment",
        "4 weekly assessments",
        "1 capstone project"
      ]
    },
    fees: {
      amount: "25,000",
      currency: "INR"
    }
  };

  const modules = [
    {
      title: "Python Foundations",
      week: "Week 1 (Days 1-7)",
      objective: "Build a solid foundation in Python programming covering syntax, data structures, and control flow.",
      topics: [
        "Python syntax, variables, and data types",
        "Control structures (if/else, loops)",
        "Functions and modules",
        "Lists, tuples, dictionaries, and sets",
        "File I/O operations",
        "Error handling basics",
        "String manipulation and formatting"
      ]
    },
    {
      title: "Intermediate Concepts & Networking Basics",
      week: "Week 2 (Days 8-14)",
      objective: "Advance your Python skills with OOP concepts and dive into networking fundamentals.",
      topics: [
        "Object-Oriented Programming (Classes and Objects)",
        "Inheritance and polymorphism",
        "List comprehensions and generators",
        "Lambda functions and decorators",
        "Introduction to socket programming",
        "TCP/IP fundamentals",
        "Basic client-server architecture"
      ]
    },
    {
      title: "Advanced Concepts & Networking Applications",
      week: "Week 3 (Days 15-21)",
      objective: "Master advanced Python features and build real-world networking applications.",
      topics: [
        "Multi-threading and concurrency",
        "Context managers and custom exceptions",
        "Advanced OOP patterns",
        "Multi-client server applications",
        "Network protocols implementation",
        "Data persistence and storage",
        "Logging and debugging techniques"
      ]
    },
    {
      title: "Advanced Integration & Capstone Project",
      week: "Week 4 (Days 22-30)",
      objective: "Apply all learned concepts to build production-ready networking applications.",
      topics: [
        "Scalable network architecture design",
        "Production-ready error handling",
        "Security best practices",
        "Testing with pytest",
        "Code quality (black, pylint)",
        "Git version control and documentation",
        "Complete capstone project implementation"
      ]
    }
  ];

  const prerequisites = {
    required: "Basic programming knowledge (any language)",
    helpful: "Full-stack development experience and familiarity with terminal/command line"
  };

  const learningOutcomes = [
    "Master Python syntax from basics to advanced OOP concepts",
    "Understand socket programming and network communication",
    "Build multi-client server applications with persistent data",
    "Create production-ready networking applications",
    "Design scalable network architectures",
    "Write clean, documented, production-quality code"
  ];

  const careerOpportunities = [
    "Backend Python Developer",
    "Network Automation Engineer",
    "DevOps Engineer",
    "Systems Programmer",
    "Full-Stack Developer with Python"
  ];

  const entrepreneurialOpportunities = [
    "Build custom networking solutions for businesses",
    "Develop network monitoring and automation tools",
    "Offer freelance Python development services",
    "Create SaaS products with Python backend",
    "Build IoT and network-connected applications"
  ];

  const certificationBenefits = [
    "Expertise in Python programming and networking",
    "Ability to build scalable server applications",
    "Proficiency in production-ready code practices"
  ];

  const bonusPerks = [
    "Golden Membership Card for 50% discount on future courses",
    "Early access to new courses and enrollment benefits",
    "Portfolio review by industry experts",
    "Access to private GitHub repository with resources"
  ];

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://settlo-forms-notlead.onrender.com/api/course-enrollment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            courseName: 'Python & Networking Mastery',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <img 
              src="settlo logogogogog-01-01.png" 
              alt="Settlo Academy Logo" 
              className="mb-5 md:mb-0 md:mr-10 w-20 transform scale-[1.5]" 
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {courseData.title}
              </h1>
              <p className="text-xl max-w-3xl">
                {courseData.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-white">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Duration</h3>
              <p className="text-3xl font-bold mb-2">{courseData.duration.total}</p>
              <ul className="space-y-1">
                {courseData.duration.details.map((detail, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Fees</h3>
              <div className="flex flex-col">
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold mr-2">
                    ₹{courseData.fees.amount} /-
                  </span>
                  <span className="text-gray-200">{courseData.fees.currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-1">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Course Introduction
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-lg mb-4">
              This comprehensive 30-day self-learning curriculum combines Python programming (basic to advanced) with networking fundamentals and practical applications. Designed specifically for full-stack developers with existing programming experience, this course takes you from Python basics to building production-ready networking applications.
            </p>
            <p className="text-lg">
              Through hands-on projects and daily coding exercises, you'll master socket programming, multi-client server applications, and scalable network architectures while maintaining industry best practices for code quality and documentation.
            </p>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Pre-requisites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Required</h3>
              <p className="text-lg">{prerequisites.required}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-purple-700">Helpful</h3>
              <p className="text-lg">{prerequisites.helpful}</p>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Course Modules
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module Navigation */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Module Overview</h3>
              <ul className="space-y-2">
                {modules.map((module, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => setActiveModule(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeModule === index 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium text-sm mb-1">{module.week}</div>
                      <div className="text-sm">{module.title}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Module Details */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {modules[activeModule].week}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {modules[activeModule].title}
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Objective
                </span>
              </div>
              <p className="text-lg mb-6">{modules[activeModule].objective}</p>
              
              <h4 className="text-xl font-semibold mb-4 text-gray-700">Topics Covered</h4>
              <ul className="space-y-3">
                {modules[activeModule].topics.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mt-1.5 w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></span>
                    <span className="text-lg">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Daily Schedule */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Daily Study Schedule
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
            <p className="text-lg font-semibold mb-4">Daily Time Commitment: 3-4 hours minimum</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <h4 className="font-bold text-blue-700 mb-2">1 Hour</h4>
                <p>Theory and concept learning</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <h4 className="font-bold text-purple-700 mb-2">1.5-2 Hours</h4>
                <p>Hands-on coding practice</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <h4 className="font-bold text-indigo-700 mb-2">30-45 Minutes</h4>
                <p>Experimentation and debugging</p>
              </div>
            </div>
            <p className="text-lg mt-4 font-medium text-gray-700">
              Weekly Checkpoint: Allocate 1 additional hour for review and consolidation
            </p>
          </div>
        </section>

        {/* Resources & Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Resources & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Essential Tools</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Python 3.10+</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>VS Code / PyCharm</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Git & GitHub</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Terminal / Command Line</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Recommended Packages</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>requests</span>
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>flask</span>
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>pytest</span>
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>black & pylint</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Learning Outcomes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Course Outcomes</h3>
              <ul className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Career Opportunities</h3>
              <ul className="space-y-3">
                {careerOpportunities.map((career, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-600">Entrepreneurial Opportunities</h3>
              <ul className="space-y-3">
                {entrepreneurialOpportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Certification */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-blue-500 pl-4">
            Certification
          </h2>
          
          <div className="bg-gradient-to-r from-blue-900 to-purple-800 text-white rounded-xl p-8 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Globally Recognized Certification</h3>
              <p className="text-xl mb-6">
                Upon completing this course, you'll receive a certificate validating your expertise in Python programming and networking applications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Your certification demonstrates:</h4>
                  <ul className="space-y-2">
                    {certificationBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">★</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Bonus Perks:</h4>
                  <ul className="space-y-2">
                    {bonusPerks.map((perk, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">★</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Python & Networking Journey Today
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Master Python programming and build production-ready networking applications in just 30 days
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Enroll Now
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="logo.png" alt="Logo" className="w-20 transform scale-[1.5]" />
            </div>
            <p className="text-lg">© 2025 Settlo Academy. All rights reserved.</p>
            <p className="mt-2 text-blue-400">Master Python and build powerful networking applications</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PythonNetworkingCourse;
