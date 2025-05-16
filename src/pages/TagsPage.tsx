
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { posts, getAllTags } from '../data/posts';
import PostItem from '../components/PostItem';

const TagsPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const allTags = getAllTags();
  
  // Get selected tag from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get('tag');
    setSelectedTag(tag);
    
    if (tag) {
      const postsWithTag = posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      setFilteredPosts(postsWithTag);
    } else {
      setFilteredPosts([]);
    }
  }, [location.search]);

  return (
    <div>
      <h1 className="text-3xl text-cyber-yellow font-heading mb-8">Tags</h1>
      
      <div className="max-w-3xl mb-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {allTags.map(tag => (
            <Link
              key={tag}
              to={`/tags?tag=${encodeURIComponent(tag)}`}
              className={`tag-button ${selectedTag === tag ? 'bg-cyber-yellow/20' : ''}`}
            >
              {tag}
            </Link>
          ))}
        </div>
        
        {selectedTag ? (
          <>
            <h2 className="text-xl text-cyber-yellow font-heading mb-4">
              Posts tagged with "{selectedTag}"
            </h2>
            
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <PostItem key={post.id} post={post} showExcerpt={true} />
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No posts found with this tag.</p>
            )}
          </>
        ) : (
          <p className="text-gray-300">Select a tag to view related posts.</p>
        )}
      </div>
    </div>
  );
};

export default TagsPage;
