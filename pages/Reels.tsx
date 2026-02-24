
import React, { useRef, useEffect, useState } from 'react';
import { Reel } from '../types';
import { Volume2, VolumeX, MapPin, Music2 } from 'lucide-react';
import { videoAPI } from '../utils/api';

const Reels: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

const ReelItem: React.FC<{ reel: Reel; isActive: boolean }> = ({ reel, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative h-screen w-full snap-start overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="h-full w-full object-cover md:rounded-lg lg:max-w-[310px] lg:border-x lg:border-white/10"
        loop
        muted={isMuted}
        playsInline
        onError={(e) => {
          console.error('❌ [REELS] Video failed to load:', reel.videoUrl, e);
        }}
        onLoadedData={() => {
          console.log('✅ [REELS] Video loaded:', reel.title, reel.videoUrl);
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 md:my-5 md:rounded-lg bg-gradient-to-b from-black/20 via-transparent to-black/80 lg:max-w-[310px] lg:left-1/2 lg:-translate-x-1/2" />

      {/* Bottom Info */}
      <div className="absolute bottom-10 left-6 right-20 z-10 lg:max-w-[350px] lg:left-[calc(50%-140px)]">
        <div className="flex items-center gap-2 mb-2 text-white/80">
          <MapPin className="w-3 h-3 text-luxury" />
          <span className="text-[9px] uppercase tracking-widest">{reel.location}</span>
        </div>
        <h3 className="text-[15px] font-serif text-white mb-3 tracking-wide">{reel.title}</h3>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-lg w-fit backdrop-blur-sm">
          <Music2 className="w-3 h-3 text-luxury animate-pulse" />
          <span className="text-[8px] text-gray-400 uppercase tracking-widest">Original Audio • Shivaay Photography Studio</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="absolute bottom-10 right-6 z-20 lg:left-[calc(50%+110px)] lg:bottom-12">
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/60 border border-white/10 hover:bg-black hover:border-luxury/50 transition-all flex items-center justify-center group"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-luxury group-hover:scale-110 transition-transform" />
          ) : (
            <Volume2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const data = await videoAPI.getAll();
        console.log('📹 [REELS] Fetched videos:', data.length, data);
        const transformed = data.map((video: any) => ({
          id: video._id || video.id,
          title: video.title,
          category: video.category,
          videoUrl: video.videoUrl?.startsWith('http') ? video.videoUrl : `https://shivaay-backend.onrender.com${video.videoUrl}`,
          thumbnailUrl: video.thumbnailUrl?.startsWith('http') ? video.thumbnailUrl : `https://shivaay-backend.onrender.com${video.thumbnailUrl}`,
          location: video.location || 'Location'
        }));
        console.log('📹 [REELS] Transformed reels:', transformed.length, transformed);
        setReels(transformed);
      } catch (error) {
        console.error('❌ [REELS] Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollTop / windowHeight);
      setActiveIndex(index);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [reels]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-white">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden md:pl-24">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        data-lenis-prevent // Prevent Lenis from interfering with snap scroll
      >
        {reels.map((reel, index) => (
          <ReelItem 
            key={reel.id} 
            reel={reel} 
            isActive={activeIndex === index} 
          />
        ))}

        {/* Floating Indicator */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50 pointer-events-none hidden lg:flex">
          {reels.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 transition-all duration-500 ${activeIndex === i ? 'h-8 bg-luxury' : 'h-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Reels;
