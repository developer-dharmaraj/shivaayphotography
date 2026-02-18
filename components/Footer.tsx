
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight, Camera } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bone border-t border-gray-100 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <Camera className="w-8 h-8 text-luxury transition-transform group-hover:rotate-12" />
              <div className="flex flex-col">
                <span className="text-3xl font-serif tracking-[0.2em] font-bold text-charcoal uppercase leading-tight">Lumina</span>
                <span className="text-[10px] tracking-[0.5em] text-luxury uppercase font-medium">Fine Art Studio</span>
              </div>
            </Link>
            <p className="text-graphite max-w-sm mb-10 font-light leading-relaxed text-sm">
              Archiving life's most exquisite celebrations with an eye for timeless editorial elegance. Available globally for the discerning couple.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-luxury transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold mb-10">The Studio</h4>
            <ul className="space-y-5">
              <li><Link to="/about" className="text-graphite hover:text-luxury transition-colors text-[11px] uppercase tracking-widest font-medium">Our Story</Link></li>
              <li><Link to="/portfolio" className="text-graphite hover:text-luxury transition-colors text-[11px] uppercase tracking-widest font-medium">Gallery</Link></li>
              <li><Link to="/reels" className="text-graphite hover:text-luxury transition-colors text-[11px] uppercase tracking-widest font-medium">Films</Link></li>
              <li><Link to="/pricing" className="text-graphite hover:text-luxury transition-colors text-[11px] uppercase tracking-widest font-medium">Experience</Link></li>
              <li><Link to="/contact" className="text-graphite hover:text-luxury transition-colors text-[11px] uppercase tracking-widest font-medium">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-charcoal uppercase tracking-[0.3em] text-[10px] font-bold mb-10">Connect</h4>
            <div className="space-y-5 text-sm text-graphite font-light">
              <p className="leading-relaxed">Empire Heights, Senapati Bapat Marg, Mumbai</p>
              <p className="tracking-widest">+91 99999 99999</p>
              <p className="border-b border-luxury/30 inline-block">hello@lumina-studio.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-medium">
            © 2024 Lumina Fine Art Photography. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            <Link to="/admin/login" className="text-gray-400 hover:text-charcoal text-[9px] uppercase tracking-widest">Access</Link>
            <span className="text-gray-400 text-[9px] uppercase tracking-widest cursor-pointer hover:text-charcoal">Privacy</span>
            <span className="text-gray-400 text-[9px] uppercase tracking-widest cursor-pointer hover:text-charcoal">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
