import React, { useState } from 'react';

const DigitalMarketingMastery = () => {
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

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name should contain only letters and spaces';
        }

        // Phone validation
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
                const response = await fetch('http://localhost:3000/api/digital-marketing-enrollment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        courseName: 'Digital Marketing Mastery',
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

    const modules = [
        {
            title: "Introduction to Digital Marketing",
            objective: "Gain a solid foundation in digital marketing concepts and tools.",
            topics: [
                "What is digital marketing?",
                "Importance of digital marketing in modern business",
                "Overview of digital marketing landscape",
                "Types of digital marketing channels"
            ]
        },
        {
            title: "Content Marketing Mastery",
            objective: "Learn how to create and distribute valuable content to attract and retain customers.",
            topics: [
                "Content strategy and planning",
                "Types of content (blogs, videos, infographics)",
                "SEO content optimization",
                "Content distribution across various platforms"
            ]
        },
        {
            title: "Social Media Marketing",
            objective: "Discover strategies to effectively use social media for brand building and lead generation.",
            topics: [
                "Social media platforms and trends",
                "Creating engaging social media content",
                "Social media advertising",
                "Tools for social media management"
            ]
        },
        {
            title: "Email Marketing",
            objective: "Learn how to design and execute effective email marketing campaigns.",
            topics: [
                "Email marketing strategy",
                "Creating email campaigns",
                "Email automation tools",
                "A/B testing for emails"
            ]
        },
        {
            title: "SEO Mastery",
            objective: "Understand how to optimize your website to rank higher on search engines.",
            topics: [
                "Basics of SEO",
                "On-page SEO factors",
                "Off-page SEO techniques",
                "Keyword research and optimization"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
            <header className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 md:mb-0 md:mr-10">
                            <span className="text-3xl font-bold">D</span>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">Digital Marketing Mastery</h1>
                            <p className="text-xl max-w-3xl">
                                Learn to drive brand awareness and increase sales with our comprehensive digital marketing program
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex-1">
                            <h3 className="font-bold text-lg mb-2">Duration</h3>
                            <p className="text-3xl font-bold mb-2">1 Month</p>
                            <ul className="space-y-1">
                                <li className="flex items-center">
                                    <span className="mr-2">•</span> 3 hours of daily practical sessions
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span> 16 live sessions
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span> 3 practical assignments
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span> 1 final project
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex-1">
                            <h3 className="font-bold text-lg mb-2">Fees</h3>
                            <div className="flex flex-col">
                                <div className="flex items-baseline mb-2">
                                    <span className="text-2xl font-bold mr-2">₹20,000 /-</span>
                                    <span className="text-gray-200">INR</span>
                                </div>
                               
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
                            Digital marketing is a powerful tool for businesses to connect with their target audience, drive brand awareness, and increase sales online. This course covers the essential techniques and tools needed to master digital marketing strategies, including SEO, content marketing, email marketing, and social media.
                        </p>
                        <p className="text-lg">
                            By the end of this course, you will have gained hands-on experience in creating and executing digital marketing campaigns across various platforms, helping you to drive real results for your business or clients.
                        </p>
                    </div>
                </section>

                {/* Prerequisites */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Pre-requisites</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-3 text-blue-700">Required</h3>
                            <p className="text-lg">Basic understanding of online platforms</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Helpful</h3>
                            <p className="text-lg">Interest in digital marketing</p>
                            <p className="text-lg mt-2">No prior experience required</p>
                        </div>
                    </div>
                </section>

                {/* Modules */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Course Modules</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Module Navigation */}
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
                                    <span>Proficiency in digital marketing strategies</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">✓</span>
                                    <span>Skills in content creation and distribution</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">✓</span>
                                    <span>Ability to manage social media campaigns</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">✓</span>
                                    <span>Expertise in SEO optimization</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-emerald-500 mr-2">✓</span>
                                    <span>Proficiency in email marketing tools</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-emerald-700">Career Opportunities</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Digital Marketing Specialist</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Social Media Manager</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>SEO Analyst</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Content Marketing Executive</span>
                                </li>
                            </ul>
                            <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-700">Entrepreneurial Opportunities</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Offer digital marketing services to small businesses</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Start a social media management agency</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Create content marketing strategies for brands</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>Build an email marketing consultancy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Certification */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">Certification</h2>
                    
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl p-8 shadow-xl">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold mb-4">Let Your Certificate Speak</h3>
                            <p className="text-xl mb-6">
                                Upon completion of the Digital Marketing Mastery course, you will receive a certificate validating your expertise in digital marketing.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                    <h4 className="font-bold text-lg mb-3">Your certification demonstrates:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2">★</span>
                                            <span>Showcase your ability to implement digital marketing strategies effectively</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2">★</span>
                                            <span>Demonstrate your proficiency in SEO, content marketing, and social media marketing</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                    <h4 className="font-bold text-lg mb-3">Bonus Perks:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2">★</span>
                                            <span>Golden Membership Card: 50% discount on future courses</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2">★</span>
                                            <span>Digital Tools Access: Exclusive templates and tools</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Start Your Digital Marketing Journey Today</h2>
                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                        Enroll now to begin mastering the digital marketing skills that drive business growth
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

            <footer className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
                                <span className="text-2xl font-bold">D</span>
                            </div>
                        </div>
                        <p className="text-lg">© 2025 settlo academy all rights reserved.</p>
                        <p className="mt-2 text-emerald-200">Powered by digital marketing expertise</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DigitalMarketingMastery;