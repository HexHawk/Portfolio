
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostBySlug } from '../data/posts';
import CodeBlock from '../components/CodeBlock';
import { ScrollArea } from '../components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate('/not-found');
      }
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const formattedDate = new Date(post.date).toISOString().split('T')[0];

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl text-cyber-yellow font-heading mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-gray-400">{formattedDate}</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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
      </header>

      <ScrollArea className="prose prose-invert max-w-none">
        <div className="px-1 markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                  />
                );
              },
              img({ node, ...props }) {
                return (
                  <figure className="blog-post-image">
                    <img src={props.src} alt={props.alt || "Blog post image"} />
                    {props.alt && <figcaption>{props.alt}</figcaption>}
                  </figure>
                );
              },
              // Customize heading styles to match our design
              h1: ({ children }) => <h1 className="text-3xl text-cyber-yellow mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl text-cyber-yellow mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl text-cyber-yellow mt-6 mb-3">{children}</h3>,
              h4: ({ children }) => <h4 className="text-lg text-cyber-yellow mt-5 mb-2">{children}</h4>,
              h5: ({ children }) => <h5 className="text-base text-cyber-yellow mt-4 mb-1">{children}</h5>,
              h6: ({ children }) => <h6 className="text-sm text-cyber-yellow mt-4 mb-1">{children}</h6>,
              p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
              a: ({ href, children }) => <a href={href} className="cyber-link">{children}</a>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyber-yellow pl-4 italic my-4 text-gray-400">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-700 border border-gray-700">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-cyber-dark-accent">{children}</thead>,
              tbody: ({ children }) => <tbody className="divide-y divide-gray-700">{children}</tbody>,
              tr: ({ children }) => <tr>{children}</tr>,
              th: ({ children }) => <th className="px-4 py-2 text-left text-cyber-yellow">{children}</th>,
              td: ({ children }) => <td className="px-4 py-2 border-t border-gray-700">{children}</td>,
              hr: () => <hr className="my-4 border-gray-700" />,
              del: ({ children }) => <del className="line-through">{children}</del>,
              strong: ({ children }) => <strong className="font-bold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </article>
  );
};

export default PostPage;
