
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Instagram, Facebook } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-luxury hover:text-charcoal transition-colors uppercase tracking-widest text-[10px] font-bold mb-12 border-b border-luxury/20 pb-1">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-[10px] text-luxury uppercase tracking-[0.4em] font-bold mb-6">
            <span>Photography Tips</span>
            <div className="w-8 h-[1px] bg-luxury/30" />
            <span>March 15, 2024</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-8 leading-tight">
            How to Capture the Soul of Your Luxury Destination Wedding
          </h1>
          <p className="text-xl text-graphite font-light italic leading-relaxed">
            "Photography is not just looking, it's feeling. If you can't feel what you're looking at, then you're never going to get others to feel anything when they look at your pictures."
          </p>
        </header>

        <div className="aspect-[16/9] w-full overflow-hidden mb-16 relative bg-bone shadow-sm">
          <img src="https://picsum.photos/1600/900?random=100" className="w-full h-full object-cover" alt="Post Hero" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-16">
          <div className="prose max-w-none text-graphite font-light leading-loose space-y-8">
            <p>
              Destination weddings represent a unique intersection of travel, luxury, and intimacy. Capturing these events requires a specialized eye that understands the environment as much as the emotions. 
            </p>
            <h2 className="text-3xl font-serif text-charcoal mt-12 mb-6 uppercase tracking-wider">The Golden Hour in Exotic Locales</h2>
            <p>
              Whether you're in the rolling hills of Tuscany or the majestic palaces of Rajasthan, lighting is your primary tool. We always recommend scheduling your main portrait sessions during the 45 minutes before sunset. This "Golden Hour" provides a soft, warm glow that flatters skin tones and adds a cinematic texture to every frame.
            </p>
            <div className="grid grid-cols-2 gap-4 my-12">
              <img src="https://picsum.photos/600/800?random=101" className="w-full h-auto shadow-lg" alt="Gallery 1" />
              <img src="https://picsum.photos/600/800?random=102" className="w-full h-auto mt-12 shadow-lg" alt="Gallery 2" />
            </div>
            <p>
              Intimacy is often found in the "in-between" moments. The way the groom adjusts his cufflink, the brief glance of the bride's father before she enters the aisle, or the laughter shared over champagne in the bridal suite. These are the moments that truly tell the story of the day.
            </p>
            <blockquote className="border-l-4 border-luxury pl-8 my-12 italic text-2xl font-serif text-charcoal">
              "Great photography is about being in the moment, not just capturing it."
            </blockquote>
            <p>
              In luxury destination weddings, the venue is a character in your story. We use wide-angle perspectives to establish the grandeur of the location, balanced with tight macros of the decor—the hand-lettered place cards, the exotic floral arrangements, and the architectural details that make your chosen venue special.
            </p>
          </div>

          <aside className="space-y-12">
            <div>
              <h4 className="text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold mb-6 border-b border-gray-100 pb-2">Share</h4>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-bone hover:bg-luxury hover:text-white transition-all flex items-center justify-center rounded-full"><Instagram className="w-4 h-4" /></button>
                <button className="w-10 h-10 bg-bone hover:bg-luxury hover:text-white transition-all flex items-center justify-center rounded-full"><Facebook className="w-4 h-4" /></button>
                <button className="w-10 h-10 bg-bone hover:bg-luxury hover:text-white transition-all flex items-center justify-center rounded-full"><Share2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div>
              <h4 className="text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold mb-6 border-b border-gray-100 pb-2">Category</h4>
              <span className="text-luxury text-[10px] uppercase tracking-widest font-bold">Photography Guides</span>
            </div>

            <div>
              <h4 className="text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold mb-6 border-b border-gray-100 pb-2">Author</h4>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                  <img src="https://picsum.photos/100/100?random=150" alt="Aryan" />
                </div>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Aryan Malhotra</span>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Recommended Posts */}
      <section className="max-w-7xl mx-auto px-6 mt-32 pt-24 border-t border-gray-100">
        <h3 className="text-3xl font-serif mb-12 text-charcoal">Recommended <span className="italic">Readings</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map(i => (
            <Link key={i} to="/blog/pre-wedding-photoshoot-tips" className="group">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-bone shadow-sm">
                <img src={`https://picsum.photos/600/450?random=${i+200}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Rec" />
              </div>
              <h4 className="text-xl font-serif text-charcoal group-hover:text-luxury transition-colors">The Art of the Pre-Wedding Shoot</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
