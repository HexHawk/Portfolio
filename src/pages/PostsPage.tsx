import React from 'react';
import { posts } from '../data/posts';
import PostItem from '../components/PostItem';

const PostsPage = () => {
  // Sort posts by date, descending
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group posts by year
  const postsByYear = sortedPosts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Get years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div>
      <h1 className="text-3xl text-cyber-yellow font-heading mb-8">Posts</h1>
      
      <div className="max-w-3xl">
        {years.map(year => (
          <div key={year} className="mb-10">
            <div className="year-header">
              <i className="far fa-calendar-days fa-lg"></i>
              <h2>{year}</h2>
            </div>
            
            <div className="space-y-6">
              {postsByYear[year].map(post => (
                <PostItem key={post.id} post={post} showExcerpt={true} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
