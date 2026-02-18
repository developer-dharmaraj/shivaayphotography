
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Destination Wedding Locations in India 2025',
    slug: 'top-10-destination-wedding-india',
    excerpt: 'Explore the most breathtaking and luxurious venues from Udaipur to Goa for your dream wedding.',
    content: '',
    featuredImage: 'https://picsum.photos/1200/800?random=40',
    category: 'Guides',
    date: 'March 15, 2024',
    metaTitle: 'Best Wedding Locations India | Lumina Blog',
    metaDescription: 'Discover luxury destination wedding venues in India.'
  },
  {
    id: '2',
    title: 'How to Prepare for Your Pre-Wedding Photoshoot',
    slug: 'pre-wedding-photoshoot-tips',
    excerpt: 'Everything you need to know about outfits, lighting, and locations to make your pre-wedding shoot magical.',
    content: '',
    featuredImage: 'https://picsum.photos/1200/800?random=41',
    category: 'Photography Tips',
    date: 'February 28, 2024',
    metaTitle: 'Pre-Wedding Shoot Tips | Lumina Blog',
    metaDescription: 'Preparation tips for pre-wedding photography.'
  },
  {
    id: '3',
    title: 'The Rise of Cinematic Wedding Films',
    slug: 'cinematic-wedding-films-trend',
    excerpt: 'Why couples are choosing storytelling films over traditional videography in modern luxury weddings.',
    content: '',
    featuredImage: 'https://picsum.photos/1200/800?random=42',
    category: 'Trends',
    date: 'January 10, 2024',
    metaTitle: 'Wedding Cinema Trends | Lumina Blog',
    metaDescription: 'Latest trends in cinematic wedding videography.'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4 block">Insights & Inspiration</span>
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-8">The <span className="italic">Journal</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {mockBlogs.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-[16/10] overflow-hidden mb-6 relative bg-bone shadow-sm">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1 border border-luxury/30">
                    <span className="text-[10px] text-luxury uppercase tracking-widest font-bold">{post.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-bold">
                  <span>{post.date}</span>
                  <div className="w-8 h-[1px] bg-gray-200" />
                  <span>5 Min Read</span>
                </div>
                <h3 className="text-2xl font-serif text-charcoal group-hover:text-luxury transition-colors mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-graphite text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                  {post.excerpt}
                </p>
                <span className="text-luxury uppercase tracking-widest text-[10px] font-bold border-b-2 border-luxury/10 pb-1 group-hover:border-luxury transition-all">Read Entry</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
