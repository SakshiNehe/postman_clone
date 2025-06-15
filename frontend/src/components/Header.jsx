import React from "react";
import { Link } from 'react-router-dom';
import TemplatesDropdown from './TemplatesDropdown';

const Header = () => {
  return (
    <nav className="bg-primary-dark text-black p-4 flex items-center justify-between shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        {/* Dummy Logo Placeholder */}
        <img src="/dummy-logo.png" alt="VEAV AI Logo" className="h-10" />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-accent-blue transition-colors duration-300">Home</Link>
        <Link to="/api-tester" className="hover:text-accent-blue transition-colors duration-300">API Tester</Link>
        <TemplatesDropdown />
        <Link to="/about" className="hover:text-accent-blue transition-colors duration-300">About</Link>
        <Link to="/contact" className="hover:text-accent-blue transition-colors duration-300">Contact</Link>
      </div>

      {/* Icons Section */}
      <div className="flex space-x-4">
        {/* Placeholder for Heart Icon */}
        <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center text-white text-xl">
          ♥
        </div>
        {/* Placeholder for another icon, e.g., User Icon */}
        <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center text-white text-xl">
          👤
        </div>
      </div>
    </nav>
  );
};

export default Header;
