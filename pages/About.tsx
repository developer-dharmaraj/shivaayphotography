
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
            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-8">Capturing Love,<span className="italic"> One Frame at a Time Soul</span></h1>
            <span className ="italic">Some moments pass in seconds. But the right photograph makes them last forever.</span>
            <div className="space-y-6 text-graphite text-lg font-light leading-relaxed">
              <p>
              Shivaay Photography came from a deep love for real emotions. The nervous laugh before the vows, the tear that falls when no one is watching, the first look that says everything without a single word—these moments matter to us. We don’t just show up with a camera; we show up with our whole heart. 
              </p>
              <p>
                 Founded on a simple belief that every love story deserves to be told beautifully, Shivaay Photography has become a trusted name for couples when it matters most. It’s not about having the fanciest equipment; it’s about caring deeply about getting it right.
              </p>
              <p>
                 We are based in India, but love has taken us everywhere. From small backyard ceremonies to grand destination weddings, every celebration we have attended has impacted us as much as we have touched you. 
              </p>
               <p>
                Our style? Honest, cinematic, and deeply personal. We don’t create moments; we discover them, feel them, and capture them just as they are—raw, real, and full of life. 
              </p>
              <p>
                Each year, we take a limited number of bookings because you are not a project to us, You are a story we are honored to share.  
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
