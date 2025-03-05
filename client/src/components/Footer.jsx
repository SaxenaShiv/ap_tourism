import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook className="w-6 h-6" /> },
    { name: 'Instagram', url: '#', icon: <Instagram className="w-6 h-6" /> },
    { name: 'Twitter', url: '#', icon: <Twitter className="w-6 h-6" /> }
  ];

  const quickLinks = [
    { name: 'Home', url: '#' },
    { name: 'Destinations', url: '#destinations' },
    { name: 'About', url: '#about' },
    { name: 'Contact', url: '#contact' }
  ];

  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">AP Tourism</h3>
          <div className="space-y-3">
            <p className="flex items-center text-gray-300">
              <MapPin className="mr-3 text-yellow-500" /> 
              Amaravati, Andhra Pradesh, India
            </p>
            <p className="flex items-center text-gray-300">
              <Phone className="mr-3 text-yellow-500" /> 
              +91 98765 43210
            </p>
            <p className="flex items-center text-gray-300">
              <Mail className="mr-3 text-yellow-500" /> 
              contact@aptourism.com
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">Connect With Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-6">
            <p className="text-gray-300 mb-2">Subscribe to our Newsletter</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button 
                className="bg-yellow-500 text-black px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-full text-center border-t border-gray-700 pt-6 mt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AP Tourism. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;