
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GalleryItem } from '../types';
import { gsap } from 'gsap';
import { X, Maximize2, ZoomIn } from 'lucide-react';
import { galleryAPI } from '../utils/api';

const Portfolio: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [activeFilter, setActiveFilter] = useState<string>(category || 'All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'Wedding', 'Pre-Wedding', 'Events', 'Commercial', 'Portrait'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await galleryAPI.getAll(activeFilter === 'All' ? undefined : activeFilter);
        // Transform API data to match GalleryItem type
        const transformed = data.map((item: any) => {
          // Construct full image URL
          let imageUrl = item.imageUrl;
          if (imageUrl && !imageUrl.startsWith('http')) {
            // Ensure the URL starts with /uploads
            if (!imageUrl.startsWith('/')) {
              imageUrl = '/' + imageUrl;
            }
            imageUrl = `http://localhost:5000${imageUrl}`;
          }
          
          // Debug logging
          console.log('Gallery item:', {
            title: item.title,
            originalImageUrl: item.imageUrl,
            constructedImageUrl: imageUrl
          });
          
          return {
            id: item._id || item.id,
            title: item.title,
            category: item.category,
            imageUrl: imageUrl,
            featured: item.featured,
            aspectRatio: item.aspectRatio || 'portrait'
          };
        });
        setGalleryItems(transformed);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [activeFilter]);

  const filteredImages = galleryItems;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        clearProps: "all"
      });
    }, portfolioRef.current || undefined);
    
    return () => ctx.revert();
  }, [activeFilter]);

  // Lightbox Entrance Animation
  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      if (window.lenis) window.lenis.stop();
      gsap.fromTo(lightboxRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(".lightbox-content", 
        { scale: 0.9, y: 20 }, 
        { scale: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }
      );
    } else {
      if (window.lenis) window.lenis.start();
    }
  }, [selectedImage]);

  const closeLightbox = () => {
    gsap.to(lightboxRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedImage(null)
    });
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-10">The <span className="italic">Portfolio</span></h1>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b border-gray-100 pb-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] tracking-[0.4em] uppercase font-bold transition-all ${activeFilter === f ? 'text-luxury border-b-2 border-luxury pb-2' : 'text-gray-400 hover:text-charcoal'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading gallery...</div>
        ) : (
          <div ref={portfolioRef} className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filteredImages.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImage(img)}
              className="gallery-item group relative mb-6 overflow-hidden bg-bone break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-700 cursor-zoom-in"
            >
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', img.imageUrl);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show placeholder or error message
                  const parent = target.parentElement;
                  if (parent) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-sm';
                    errorDiv.textContent = 'Image not found';
                    parent.appendChild(errorDiv);
                  }
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', img.imageUrl);
                }}
              />
              
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-luxury text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">{img.category}</span>
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-xl font-serif tracking-widest uppercase">{img.title}</h3>
                  <ZoomIn className="text-white w-5 h-5 opacity-50" />
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Premium Lightbox Preview */}
      {selectedImage && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-white/95 backdrop-blur-xl overflow-hidden"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 z-[1010] p-4 bg-charcoal text-white rounded-full hover:bg-luxury transition-all active:scale-90 shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div 
            className="lightbox-content relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center group">
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title} 
                className="max-w-full max-h-full object-contain shadow-2xl border border-gray-100"
                onError={(e) => {
                  console.error('Lightbox image failed to load:', selectedImage.imageUrl);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'text-center text-gray-500 p-8';
                    errorDiv.innerHTML = '<p class="text-lg mb-2">Image not found</p><p class="text-sm">' + selectedImage.imageUrl + '</p>';
                    parent.appendChild(errorDiv);
                  }
                }}
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1 border border-luxury/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-luxury uppercase tracking-widest font-bold">Shivaay Photography Archive</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-2 block">{selectedImage.category}</span>
              <h2 className="text-3xl md:text-5xl font-serif text-charcoal">{selectedImage.title}</h2>
              <div className="w-12 h-[1.5px] bg-luxury/30 mx-auto mt-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
