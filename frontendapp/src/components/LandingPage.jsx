import React, { useState, useEffect } from 'react';
import API_BASE_URL from "../config"; 
import { Mail, Send, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactForm, setContactForm] = useState({
    fullName: '', email: '', mobile: '', city: ''
  });
  const [newsletter, setNewsletter] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        alert('Contact form submitted successfully!');
        setContactForm({ fullName: '', email: '', mobile: '', city: '' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter })
      });
      if (response.ok) {
        alert('Successfully subscribed to newsletter!');
        setNewsletter('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('Error subscribing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">MyCompany</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 transition">Projects</a>
            <a href="#clients" className="text-gray-700 hover:text-blue-600 transition">Clients</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </nav>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t">
            <a href="#home" className="block px-4 py-3 hover:bg-gray-100 transition">Home</a>
            <a href="#projects" className="block px-4 py-3 hover:bg-gray-100 transition">Projects</a>
            <a href="#clients" className="block px-4 py-3 hover:bg-gray-100 transition">Clients</a>
            <a href="#contact" className="block px-4 py-3 hover:bg-gray-100 transition">Contact</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to Our Company</h2>
          <p className="text-xl mb-8">We create amazing digital experiences</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Our Projects Section */}
      <section id="projects" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Projects</h2>
          {projects.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No projects available yet. Add some from the admin panel!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                  <img 
                    src={project.imageUrl || 'https://via.placeholder.com/400x300'} 
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Happy Clients Section */}
      <section id="clients" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Happy Clients</h2>
          {clients.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No client testimonials yet. Add some from the admin panel!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client) => (
                <div key={client.id} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1">
                  <img 
                    src={client.imageUrl || 'https://via.placeholder.com/150'} 
                    alt={client.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                  />
                  <p className="text-gray-600 italic mb-4">"{client.description}"</p>
                  <h4 className="text-lg font-semibold text-gray-800">{client.name}</h4>
                  <p className="text-blue-600 font-medium">{client.designation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={contactForm.fullName}
                onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
              <input
                type="tel"
                value={contactForm.mobile}
                onChange={(e) => setContactForm({...contactForm, mobile: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                type="text"
                value={contactForm.city}
                onChange={(e) => setContactForm({...contactForm, city: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your city"
                required
              />
            </div>
            <button
              onClick={handleContactSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <Mail size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-lg">Get the latest updates and news delivered to your inbox</p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              onClick={handleNewsletterSubmit}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <Send size={20} />
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 MyCompany. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Built with Spring Boot & React</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;