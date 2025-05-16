
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © 2023-{currentYear} HexHawk
          </div>
          
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/" className="cyber-link text-sm">Home</Link>
            <Link to="/post" className="cyber-link text-sm">Post</Link>
            <Link to="/projects" className="cyber-link text-sm">Projects</Link>
            <Link to="/search" className="cyber-link text-sm">Search</Link>          
            <Link to="/tags" className="cyber-link text-sm">Tags</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
