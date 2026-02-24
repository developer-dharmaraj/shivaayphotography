import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bannerAPI } from '../utils/api';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banners = await bannerAPI.getAll();
        if (banners.length > 0) {
          const activeBanner = banners[0];
          setBanner({
            ...activeBanner,
            imageUrl: activeBanner.imageUrl?.startsWith('http') ? activeBanner.imageUrl : `http://localhost:5000${activeBanner.imageUrl}`,
            videoUrl: activeBanner.videoUrl?.startsWith('http') ? activeBanner.videoUrl : activeBanner.videoUrl ? `http://localhost:5000${activeBanner.videoUrl}` : null
          });
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-bg-container", {
        scale: 1.1,
        duration: 3,
        ease: "power2.out"
      })
        .from(".hero-line", {
          scaleX: 0,
          duration: 1.5,
          ease: "power4.inOut"
        }, "-=2")
        .from(".hero-title", {
          y: 60,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out"
        }, "-=1.2")
        .from(".hero-btn", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.8");

      if (heroRef.current) {
        gsap.to(".hero-bg-container", {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          y: 150,
          ease: "none"
        });
      }
    }, heroRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative  h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Cinematic Video Background */}
      <div className="hero-bg-container absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/30 z-10" />
        {banner?.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale-[0.2] brightness-110">
            <source src={banner.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : banner?.imageUrl ? (
          <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover grayscale-[0.2] brightness-110" />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale-[0.2] brightness-110">
            <source src="https://res.cloudinary.com/dppcmxdhi/video/upload/v1771392399/WhatsApp_Video_2026-02-16_at_13.06.54_nnybeo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="relative z-20 text-center px-6">
        <div className="hero-line w-20 h-[1.5px] bg-luxury mx-auto mb-8" />
        <h2 className="hero-title text-luxury tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 font-sans font-bold">{banner?.subtitle || 'Fine Art Photographer'}</h2>
        <h1 className="hero-title text-6xl md:text-8xl lg:text-[10rem] font-serif text-charcoal tracking-tight mb-8 leading-[0.9]">
          {banner?.title || 'Pure'} <span className="italic font-normal">{banner?.title ? '' : 'Moments'}</span>
        </h1>
        <p className="hero-title text-graphite max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
          {banner?.description || 'Documenting the essence of your journey with timeless editorial elegance.'}
        </p>
        <div className="hero-btn flex flex-col md:flex-row gap-8 justify-center items-center">
          <Link to="/portfolio" className="group relative px-12 py-5 overflow-hidden bg-charcoal">
            <span className="relative z-10 text-white uppercase tracking-[0.3em] text-[10px] font-bold">Explore Gallery</span>
            <div className="absolute inset-0 bg-luxury -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
          </Link>
          <Link to="/contact" className="text-charcoal hover:text-luxury transition-colors uppercase tracking-[0.4em] text-[10px] font-bold border-b-2 border-charcoal/10 pb-1">Book Your Story</Link>
        </div>
      </div>

      <div onClick={() => window.lenis?.scrollTo('#featured-galleries')}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-30 group">
        <ChevronDown className="text-luxury w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;