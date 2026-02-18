
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-luxury/20 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <img src="https://picsum.photos/1000/1200?random=30" alt="Lead Photographer" className="w-full h-auto object-cover grayscale-[0.5]" />
          </div>
          
          <div>
            <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8">Crafting Memories with <span className="italic">Soul</span></h1>
            <div className="space-y-6 text-graphite text-lg font-light leading-relaxed">
              <p>
                Founded in 2012 by master photographer Aryan Malhotra, Lumina Studio was born from a singular vision: to elevate wedding photography into a fine art form. We don't just capture images; we archive emotions.
              </p>
              <p>
                Based in Mumbai but traveling the globe, our team specialized in luxury destination weddings and high-profile events. Our style is a blend of cinematic storytelling and editorial elegance, ensuring that your most intimate moments look like a spread in Vogue.
              </p>
              <p>
                Every celebration is unique, and we treat it as such. We limit our bookings each year to ensure that every couple receives our undivided artistic attention and the world-class service they deserve.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-10">
              <div>
                <h4 className="text-charcoal font-serif text-2xl mb-2">Artistic Eye</h4>
                <p className="text-gray-400 text-sm">Focusing on light, composition, and soul.</p>
              </div>
              <div>
                <h4 className="text-charcoal font-serif text-2xl mb-2">Global Vision</h4>
                <p className="text-gray-400 text-sm">Experienced in destination logistics worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
