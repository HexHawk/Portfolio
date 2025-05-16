
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTags } from '../data/posts';

const TagCloud: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(() => {
    setTags(getAllTags());
  }, []);
  
  return (
    <div className="mb-8">
      <h2 className="text-cyber-yellow text-xl font-heading mb-4">Tags</h2>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link 
            key={tag}
            to={`/tags?tag=${encodeURIComponent(tag)}`}
            className="tag-button"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
