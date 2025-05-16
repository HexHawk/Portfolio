
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center px-4">
        <h1 className="text-6xl font-heading text-cyber-yellow mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">Page not found in this dimension</p>
        <p className="text-gray-400 mb-8">The page you're looking for might have been moved, deleted, or never existed in the first place.</p>
        
        <Link to="/" className="inline-block px-6 py-3 bg-cyber-yellow text-cyber-dark font-medium rounded-sm hover:bg-cyber-yellow/90 transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
