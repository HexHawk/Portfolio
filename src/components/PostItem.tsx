
import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../data/posts';

interface PostItemProps {
  post: Post;
  showExcerpt?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ post, showExcerpt = false }) => {
  const formattedDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
        <span className="text-gray-500 text-sm">{formattedDate}</span>
        <Link 
          to={`/post/${post.slug}`}
          className="cyber-link text-base font-medium"
        >
          {post.title}
        </Link>
      </div>
      
      {showExcerpt && (
        <p className="text-gray-300 text-sm mt-1">{post.excerpt}</p>
      )}
      
      {post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link 
              key={tag} 
              to={`/tags?tag=${encodeURIComponent(tag)}`}
              className="tag-button"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostItem;
