import React, { useState } from 'react';

const JuniorAppPro = () => {
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
            courseName: 'Junior AppPro – Mobile Application Development for Kids',
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

  function allowOnlyLetters(e) {
    const char = e.key;
    if (!/^[a-zA-Z\s]$/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
      e.preventDefault();
    }
  }

  const modules = [
    {
      title: "What are Mobile Apps?",
      objective: "Understand the basics of mobile applications and their role in our daily lives.",
      topics: [
        "Mobile Apps Around Us",
        "App vs Website",
      ],
      outcome: "Kids will understand the difference between apps and websites."
    },
    {
      title: "Designing App Interfaces",
      objective: "Learn to create app screens using Figma and understand basic UI elements.",
      topics: [
        "Using Figma to Create App Screens",
        "UI Elements: Buttons, Menus, Text Fields",
      ],
      outcome: "Kids will design app screens with basic UI elements."
    },
    {
      title: "Building Without Code",
      objective: "Use no-code tools to assemble app components and create user flows.",
      topics: [
        "Using App Builders like Thunkable / Glide",
        "Connecting Screens and User Flows",
      ],
      outcome: "Kids will assemble their first app using no-code tools."
    },
    {
      title: "Final App Project",
      objective: "Combine all learning to create and present a simple mobile app.",
      topics: [
        "Create a Simple App (e.g., To-do List or Game Launcher)",
        "Test and Present Your App",
      ],
      outcome: "Kids will complete and showcase their own app project."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <header className="text-black py-16 px-4">  
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-8">
              <img src="settlo-logogogogog-01-01.png" alt="Logo" className="mb-5 md:mb-0 md:mr-10 w-20 transform scale-[1.5]"  />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Junior AppPro – Mobile Application Development for Kids</h1>
              <p className="text-xl max-w-3xl">
                Learn to create mobile apps without writing code!
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-white">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Duration</h3>
              <p className="text-3xl font-bold mb-2">1 Month</p>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Weekly guided sessions
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Interactive projects
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Final app showcase
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-6 flex-1">
              <h3 className="font-bold text-lg mb-2">Fees</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold mr-2">₹999 /-</span>
               
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-1">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Course Introduction</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-lg mb-4">
              Junior AppPro introduces kids to the world of mobile app creation using Figma, Flutter, and no-code tools like Weebly. They’ll learn the basics of UI/UX design and build their very first interactive mobile apps — without writing code!
            </p>
            <p className="text-lg">
              This course provides a fun and engaging way for children to develop problem-solving skills, digital literacy, and creativity through mobile app design.
            </p>
          </div>
        </section>

        {/* Age Group */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Age Group</h2>
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Target Audience</h3>
            <p className="text-lg">10+ Years</p>
            <p className="text-lg mt-2">Basic computer usage skills</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Course Modules</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Module Overview</h3>
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
              <p className="mt-4 font-semibold text-gray-700">Outcome: {modules[activeModule].outcome}</p>
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
                  <span>Understand mobile app UI design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Build a simple app prototype</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  <span>Practice logical thinking and digital storytelling</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">End of Course Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Kids gain early exposure to app development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Confidence to try real-world tech tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Project to showcase to friends and family</span>
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
              <h3 className="text-2xl font-bold mb-4">Junior App Developer Certificate</h3>
              <p className="text-xl mb-6">
                Upon completion, kids will receive a Junior App Developer Certificate of Completion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">What You'll Get:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Junior App Developer Certificate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Golden Membership Card</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Mini online portfolio to showcase your app</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Bonus Perks:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>50% discount on future courses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Early access to new courses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Portfolio review by instructors</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Child's App Development Journey Today</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Enroll your child in Junior AppPro and watch them discover the exciting world of mobile app creation!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-full text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
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

      <footer className="bg-gray-300 text-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
                <img src="logo.png" alt="Logo" className=" md:mb-0 md:mr-10 w-20 transform scale-[3]" />
            </div>
            <p className="text-lg">© 2025 settlo academy all rights reserved.</p>
            <p className="mt-2 text-emerald-600">Designed with passion for creative education</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JuniorAppPro;