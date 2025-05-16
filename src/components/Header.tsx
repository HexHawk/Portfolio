
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="py-5 px-4 md:px-8 relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="0ut3r Space Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-heading text-cyber-yellow">HexHawk</h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-cyber-yellow focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <i className="fas fa-times fa-lg"></i>
          ) : (
            <i className="fas fa-bars fa-lg"></i>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 backdropped p-4 animate-in slide-in-from-top">
          <div className="flex flex-col space-y-4">
            <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ mobile, onClick }: NavLinksProps) => {
  const linkClass = mobile 
    ? "cyber-link block py-2" 
    : "cyber-link";

  return (
    <>
      <Link to="/" className={linkClass} onClick={onClick}>Home</Link>
      <Link to="/post" className={linkClass} onClick={onClick}>Post</Link>
      <Link to="/projects" className={linkClass} onClick={onClick}>Projects</Link>
      <Link to="/search" className={linkClass} onClick={onClick}>Search</Link>
      <Link to="/tags" className={linkClass} onClick={onClick}>Tags</Link>
    </>
  );
};

export default Header;
