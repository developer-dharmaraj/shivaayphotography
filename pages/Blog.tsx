
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { blogAPI } from '../utils/api';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        const transformed = data.map((post: any) => ({
          id: post._id || post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage?.startsWith('http') ? post.featuredImage : `http://localhost:5000${post.featuredImage}`,
          category: post.category,
          date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription
        }));
        setBlogs(transformed);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4 block">Insights & Inspiration</span>
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-8">The <span className="italic">Journal</span></h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading blogs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((post) => (
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
        )}
      </div>
    </div>
  );
};

export default Blog;
