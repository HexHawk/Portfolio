
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ 
  className = "", 
  placeholder = "Search..." 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative ${className}`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-10 bg-transparent border border-cyber-yellow/30 focus:border-cyber-yellow/70 
                   outline-none transition-colors duration-200 rounded-sm text-white placeholder:text-gray-500"
      />
      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
    </form>
  );
};

export default SearchBar;
