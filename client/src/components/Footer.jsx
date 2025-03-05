import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook className="w-5 h-5" /> },
    { name: 'Instagram', url: '#', icon: <Instagram className="w-5 h-5" /> },
    { name: 'Twitter', url: '#', icon: <Twitter className="w-5 h-5" /> }
  ];

  return (
    <footer className="w-full mt-8 bg-black bg-opacity-80 text-white py-2 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Address & Contact Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">AP Tourism</h2>
          <p className="flex items-center mt-1 text-gray-600"><MapPin className="mr-2" /> Amaravati, Andhra Pradesh, India</p>
          <p className="flex items-center mt-1 text-gray-600"><Phone className="mr-2" /> +91 98765 43210</p>
          <p className="flex items-center mt-1 text-gray-00"><Mail className="mr-2" /> contact@aptourism.com</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-yellow-400 transition flex items-center space-x-2"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">&copy; 2025 AP Tourism. All rights reserved.</p>

      </div>
    </footer>
  );
}

export default Footer;
