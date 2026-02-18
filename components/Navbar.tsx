
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Camera, Play, Home, User, Image as ImageIcon, CreditCard, BookOpen, Mail, ArrowLeft, ChevronLeft, ChevronsLeft } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isReelsPage = location.pathname === '/reels';
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.lenis) {
      if (isOpen) window.lenis.stop();
      else window.lenis.start();
    }

    if (isOpen && linksRef.current) {
      // Animate links
      gsap.fromTo(
        linksRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.3 }
      );
      
      // Animate Close Button in Menu
      gsap.fromTo(".menu-close-btn", 
        { scale: 0.5, opacity: 0, rotate: -90 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <User className="w-5 h-5" /> },
    { name: 'Portfolio', path: '/portfolio', icon: <ImageIcon className="w-5 h-5" /> },
    { name: 'Reels', path: '/reels', icon: <Play className="w-5 h-5" /> },
    { name: 'Pricing', path: '/pricing', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-5 h-5" /> },
  ];

  const desktopNavClasses = isReelsPage 
    ? 'hidden md:flex md:w-24 h-screen left-0 top-0 flex-col border-r border-gray-100 bg-white/80 backdrop-blur-xl py-8 justify-start' 
    : `w-full top-0 left-0 px-6 md:px-12 justify-between ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-8'}`;

  return (
    <>
      {/* Mobile Back Button for Reels */}
      {isReelsPage && (
        <Link to="/" 
          className="md:hidden fixed top-6 left-6 z-[120] flex items-center gap-2 group active:scale-95 transition-all">
          <ChevronsLeft className="w-6 h-6 text-white" />
        </Link>
      )}

      <nav className={`fixed z-[100] transition-all duration-500 ease-in-out flex items-center ${desktopNavClasses}`}>
        <Link to="/" 
          className={`group flex items-center transition-all duration-500 ${isReelsPage ? 'flex-col mb-12 gap-2' : 'gap-3'}`}>
          <Camera className={`${isReelsPage ? 'w-6 h-6' : 'w-8 h-8'} text-luxury transition-transform group-hover:rotate-12`} />
          <div className={`flex flex-col transition-all ${isReelsPage ? 'items-center' : ''}`}>
            <span className={`font-semibold text-charcoal uppercase leading-tight transition-all ${isReelsPage ? 'text-[8px] md:text-[10px]' : 'text-xl'}`}>
              Shivaay Photography
            </span>
            {!isReelsPage && (
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-luxury uppercase font-medium">Fine Art Studio</span>
            )}
          </div>
        </Link>

        {/* Desktop Links */}
        <div className={`flex transition-all duration-500 ${isReelsPage ? 'flex-col gap-8 md:gap-10 mt-4' : 'hidden md:flex items-center gap-10 ml-auto'}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-all hover:text-luxury flex items-center group relative ${
                location.pathname === link.path ? 'text-luxury' : 'text-graphite'
              } ${isReelsPage ? 'flex-col gap-1' : 'text-[10px] tracking-[0.3em] uppercase font-bold'}`}>
              <div className={`${isReelsPage ? 'p-2 rounded-full bg-gray-50 group-hover:bg-luxury/10 transition-colors' : 'hidden'}`}>
                {link.icon}
              </div>
              <span className={`${isReelsPage ? 'text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold md:[writing-mode:vertical-lr] md:rotate-180 md:mt-4' : 'relative z-10'}`}>
                {link.name}
              </span>
              {!isReelsPage && (
                <span className={`absolute bottom-[-10px] left-0 h-[1.5px] bg-luxury transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Socials */}
        <div className={`hidden md:flex items-center transition-all ${isReelsPage ? 'flex-col gap-6 mt-auto' : 'gap-4 ml-8 border-l border-gray-100 pl-8'}`}>
          <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Facebook className="w-4 h-4" /></a>
        </div>

        {/* Hamburger Button - Outside for triggering, hide when open if using internal close button */}
        {!isReelsPage && (
          <button 
            className={`md:hidden relative z-[130] p-2 text-charcoal transition-all active:scale-90 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu">
            <Menu className="w-8 h-8" />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {!isReelsPage && (
        <div 
          ref={menuRef}
          className={`fixed inset-0 bg-white/98 backdrop-blur-3xl z-[125] flex flex-col transition-all duration-700 cubic-bezier(0.85, 0, 0.15, 1) ${
            isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
          }`}>
          {/* Internal Menu Header with Close Button */}
          <div className="w-full flex items-center justify-between px-6 py-8">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-luxury" />
              <span className="font-serif tracking-[0.2em] font-bold text-charcoal uppercase text-sm">Lumina</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="menu-close-btn flex items-center gap-2 group active:scale-95 transition-transform">
              <div className="w-10 h-10 bg-charcoal text-white rounded-full flex items-center justify-center group-hover:bg-luxury transition-colors">
                <X className="w-5 h-5" />
              </div>
            </button>
          </div>

          <div ref={linksRef} className="flex-grow flex flex-col items-center justify-center gap-8 text-center px-6 w-full pb-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-medium uppercase transition-all duration-300 ${
                  location.pathname === link.path ? 'text-luxury  scale-110' : 'text-charcoal hover:text-luxury'
                }`}>
                {link.name}
              </Link>
            ))}
            
            <div className="mt-8 flex gap-12 border-t border-gray-100 pt-8 w-1/2 justify-center">
               <a href="#" className="text-charcoal/30 hover:text-luxury transition-colors"><Instagram className="w-6 h-6" /></a>
               <a href="#" className="text-charcoal/30 hover:text-luxury transition-colors"><Facebook className="w-6 h-6" /></a>
            </div>

            <div className="mt-8 text-[9px] tracking-[0.6em] text-luxury uppercase font-bold opacity-60">
              Lumina Fine Art Studio
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
