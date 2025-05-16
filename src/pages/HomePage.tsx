import React from 'react';
import { posts } from '../data/posts';
import PostItem from '../components/PostItem';

const HomePage = () => {
  // Sort posts by date, descending
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get latest posts
  const latestPosts = sortedPosts.slice(0, 5);
  
  // Group latest posts by year
  const postsByYear = latestPosts.reduce<Record<string, typeof posts>>((acc, post) => {
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
      <section className="mb-12 max-w-3xl">
        <h2 className="sr-only">About Me</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">
          You know that person who's always poking around their own network, breaking things just to see if they can fix them? Yeah, that's me. Somewhere between "accidental hacker" and "professional troublemaker," I've worn enough hats to fill a closet-tech fixer, security skeptic, digital detective, and relentless tinkerer. I’m not currently tied down to any job, but that just means more time to dive deep into technology, security quirks, and the occasional rant about why passwords are still a thing.

          This is my little corner of the internet, where curiosity meets caffeine-fueled deep dives and honest, sometimes messy insights from someone who’s been in the trenches and still loves the game.
            
          I’ve launched projects that thrived, some that flopped spectacularly, and a few that quietly disappeared (time is a ruthless editor). Here, you’ll find tutorials, stories from the trenches, and random thoughts on the ever-changing world of technology.
            
          Stick around, poke around, maybe learn something new-or at least have a laugh. Comments are welcome, but only if you’re ready for a little friendly banter.
            
          </p>
          
          <div className="text-gray-300 mt-6">
            <p className="mb-2">Find me on</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a href="https://github.com/HexHawk" className="social-icon-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a href="https://linkedin.com/in/adish2k6" className="social-icon-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="https://www.hackerrank.com/profile/adishkspuram" className="social-icon-link" aria-label="HackerRank" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-hackerrank fa-lg"></i>
              </a>
              <a href="mailto:adishkspuram@gmail.com" className="social-icon-link" aria-label="Email" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope fa-lg"></i>
              </a>
              <a href="/pgp.txt" className="social-icon-link" aria-label="PGP Key" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-shield-halved fa-lg"></i>
              </a>
              <a href="https://drive.google.com/file/d/15pR3MdMM5_N60MrklphHzBwPNmJbIR6V/" className="social-icon-link" aria-label="Resume" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-file-pdf fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* <section className="mb-12">
        <h2 className="text-cyber-yellow text-2xl font-heading mb-6">Latest posts</h2>
        
        {years.map(year => (
          <div key={year} className="mb-8">
            <div className="year-header">
              <i className="far fa-calendar-days fa-lg"></i>
              <h3>{year}</h3>
            </div>
            
            <div className="space-y-6">
              {postsByYear[year].map(post => (
                <PostItem key={post.id} post={post} showExcerpt={true} />
              ))}
            </div>
          </div>
        ))}
      </section> */}
      
      <section className="mb-12">
        <h2 className="text-cyber-yellow text-2xl font-heading mb-6">Latest updates</h2>
        <div className="space-y-4">
          {sortedPosts.slice(0, 5).map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
