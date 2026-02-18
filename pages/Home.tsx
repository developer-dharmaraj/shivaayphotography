
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Camera, Heart, Users, Star, ArrowRight, Play, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial state via GSAP to avoid invisible content if JS fails
      gsap.set('.reveal-el', { opacity: 0, y: 40 });

      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        const elements = section.querySelectorAll('.reveal-el');
        if (elements.length > 0) {
          gsap.to(elements, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
          });
        }
      });

      // Recalculate ScrollTrigger positions
      ScrollTrigger.refresh();
    }, sectionsRef.current || undefined);
    
    return () => ctx.revert();
  }, []);

  const categories = [
    { title: 'Weddings', img: 'https://picsum.photos/800/1000?random=2', path: '/portfolio/Wedding' },
    { title: 'Pre-Wedding', img: 'https://picsum.photos/800/1000?random=3', path: '/portfolio/Pre-Wedding' },
    { title: 'Commercial', img: 'https://picsum.photos/800/1000?random=4', path: '/portfolio/Commercial' },
    { title: 'Events', img: 'https://picsum.photos/800/1000?random=5', path: '/portfolio/Events' },
  ];

  const featuredStories = [
    {
      title: "Royal Union at Udaipur",
      location: "City Palace, Rajasthan",
      img: "https://picsum.photos/1200/800?random=10",
      tag: "Wedding"
    },
    {
      title: "Sunset Serenade",
      location: "Lake Como, Italy",
      img: "https://picsum.photos/1200/800?random=11",
      tag: "Pre-Wedding"
    }
  ];

  return (
    <div ref={sectionsRef} className="bg-white">
      <Hero />

      {/* Featured Categories */}
      <section id="featured-galleries" className="reveal-section py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-el">
            <h3 className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4">Portfolios</h3>
            <h2 className="text-5xl md:text-6xl font-serif text-charcoal">Curated <span className="italic">Excellence</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link to={cat.path} key={cat.title} className="reveal-el group relative aspect-[3/4] overflow-hidden bg-bone">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-charcoal/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h4 className="text-xl font-serif text-white tracking-widest uppercase">{cat.title}</h4>
                  <div className="h-[1.5px] w-12 bg-luxury mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="reveal-section py-32 px-6 bg-bone/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-el">
            <div>
              <h3 className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4">Latest Work</h3>
              <h2 className="text-5xl font-serif text-charcoal">Featured <span className="italic">Stories</span></h2>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-luxury hover:text-charcoal transition-colors border-b border-luxury/30 pb-1">
              View Full Gallery <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredStories.map((story, idx) => (
              <div key={idx} className="reveal-el group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden mb-8 shadow-sm">
                  <img src={story.img} alt={story.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-luxury">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-widest font-medium">{story.location}</span>
                    </div>
                    <h4 className="text-3xl font-serif text-charcoal mb-4 group-hover:text-luxury transition-colors">{story.title}</h4>
                  </div>
                  <span className="text-[9px] border border-gray-200 px-3 py-1 uppercase tracking-widest text-gray-400 font-bold">{story.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Journals */}
      <section className="reveal-section py-32 bg-bone border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal-el">
            <h3 className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4">Cinematography</h3>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 text-charcoal leading-tight">Motion <span className="italic">Portraits</span></h2>
            <p className="text-graphite text-lg font-light leading-relaxed mb-12 max-w-lg">
              Beyond stills, we capture the rhythm and atmosphere of your day through high-end vertical cinematic journals.
            </p>
            <Link to="/reels" className="inline-flex items-center gap-6 text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold group">
              <span className="w-12 h-12 rounded-full border border-luxury flex items-center justify-center group-hover:bg-luxury group-hover:text-white transition-all">
                <Play className="w-4 h-4 fill-current" />
              </span>
              Watch Film Reels
            </Link>
          </div>
          <div className="reveal-el relative">
             <div className="aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/800/1000?random=88" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" loading="lazy" />
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 border-2 border-luxury/20 hidden md:block" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="reveal-section py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
              <div className="reveal-el text-center">
                <Camera className="w-8 h-8 text-luxury mx-auto mb-8" />
                <h4 className="text-2xl font-serif mb-4 text-charcoal">The Editorial Eye</h4>
                <p className="text-graphite text-sm font-light leading-relaxed">Focusing on composition, natural light, and the subtle nuances that define luxury.</p>
              </div>
              <div className="reveal-el text-center">
                <Heart className="w-8 h-8 text-luxury mx-auto mb-8" />
                <h4 className="text-2xl font-serif mb-4 text-charcoal">Pure Connection</h4>
                <p className="text-graphite text-sm font-light leading-relaxed">We foster a comfortable environment to capture the raw, unscripted emotions of your journey.</p>
              </div>
              <div className="reveal-el text-center">
                <Star className="w-8 h-8 text-luxury mx-auto mb-8" />
                <h4 className="text-2xl font-serif mb-4 text-charcoal">Bespoke Service</h4>
                <p className="text-graphite text-sm font-light leading-relaxed">Limiting our bookings annually to ensure every masterpiece receives undivided artistic focus.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal-section py-40 px-6 bg-charcoal text-white text-center relative overflow-hidden">
        <div className="reveal-el relative z-10">
           <h2 className="text-5xl md:text-7xl font-serif mb-10">Begin Your <span className="italic font-normal">Journal</span></h2>
           <p className="text-gray-400 max-w-xl mx-auto text-lg mb-14 font-light">Available worldwide for destination weddings and editorial sessions. Inquire for the 2025 season.</p>
           <Link to="/contact" className="inline-block border border-luxury/40 px-12 py-5 text-luxury hover:bg-luxury hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] font-bold">
             Consultation Inquiries
           </Link>
        </div>
        {/* Aesthetic background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury/5 rounded-full blur-[120px]" />
      </section>
    </div>
  );
};

export default Home;
