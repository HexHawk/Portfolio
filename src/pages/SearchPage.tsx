
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { posts } from '../data/posts';
import { projects } from '../data/projects';
import PostItem from '../components/PostItem';
import ProjectItem from '../components/ProjectItem';

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    posts: typeof posts,
    projects: typeof projects
  }>({
    posts: [],
    projects: []
  });
  
  // Get search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    } else {
      setSearchResults({ posts: [], projects: [] });
    }
  }, [location.search]);
  
  const performSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase();
    
    const matchedPosts = posts.filter(post => 
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.content.toLowerCase().includes(normalizedQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
    
    const matchedProjects = projects.filter(project => 
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery)
    );
    
    setSearchResults({
      posts: matchedPosts,
      projects: matchedProjects
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-cyber-yellow font-heading mb-8">Search</h1>
      
      <div className="max-w-3xl mb-8">
        <SearchBar 
          className="w-full" 
          placeholder="Search posts, projects, and tags..."
        />
      </div>
      
      {searchQuery && (
        <div className="max-w-3xl">
          <p className="text-gray-400 mb-6">
            {searchResults.posts.length + searchResults.projects.length === 0 
              ? `No results found for "${searchQuery}"`
              : `Found ${searchResults.posts.length + searchResults.projects.length} results for "${searchQuery}"`
            }
          </p>
          
          {searchResults.posts.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl text-cyber-yellow font-heading mb-4">Posts</h2>
              <div className="space-y-6">
                {searchResults.posts.map(post => (
                  <PostItem key={post.id} post={post} showExcerpt={true} />
                ))}
              </div>
            </section>
          )}
          
          {searchResults.projects.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl text-cyber-yellow font-heading mb-4">Projects</h2>
              <div className="space-y-4">
                {searchResults.projects.map(project => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      
      {!searchQuery && (
        <div className="max-w-3xl">
          <p className="text-gray-300">Enter a search term above to find posts, projects, and tags.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
