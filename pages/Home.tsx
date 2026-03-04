
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Camera, Heart, Users, Star, ArrowRight, Play, MapPin, Instagram, Linkedin, Award, Sparkles, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryAPI, teamAPI, pricingAPI } from '../utils/api';

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories with featured images
    const fetchCategories = async () => {
      try {
        const categoryList = ['Wedding', 'Pre-Wedding', 'Events', 'Commercial'];
        const categoryPromises = categoryList.map(async (category) => {
          try {
            // Get one featured item for each category
            const items = await galleryAPI.getAll(category, true);
            if (items && items.length > 0) {
              const item = items[0];
              let img = item.imageUrl;
              if (img && !img.startsWith('http')) {
                img = img.startsWith('/') ? `https://shivaay-backend.onrender.com${img}` : `https://shivaay-backend.onrender.com/${img}`;
              }
              return {
                title: category === 'Wedding' ? 'Weddings' : category,
                img: img || '',
                path: `/portfolio/${category}`
              };
            }
            // Fallback if no featured item found
            return {
              title: category === 'Wedding' ? 'Weddings' : category,
              img: '',
              path: `/portfolio/${category}`
            };
          } catch (err) {
            return {
              title: category === 'Wedding' ? 'Weddings' : category,
              img: '',
              path: `/portfolio/${category}`
            };
          }
        });
        
        const categoriesData = await Promise.all(categoryPromises);
        setCategories(categoriesData.filter(cat => cat.img)); // Only show categories with images
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch featured stories (different from categories)
    const fetchFeatured = async () => {
      try {
        const items = await galleryAPI.getAll(undefined, true); 
        
        if (items && items.length > 0) {
          const featured = items.slice(0, 2).map((item: any) => {
            let img = item.imageUrl;
            if (img && !img.startsWith('http')) {
              img = img.startsWith('/') ? `https://shivaay-backend.onrender.com${img}` : `https://shivaay-backend.onrender.com/${img}`;
            }
            return {
              title: item.title,
              location: item.location || 'Location',
              img: img || '',
              tag: item.category
            };
          }); 
          setFeaturedStories(featured);
        }  
      } catch (error) {
        console.error('Error fetching featured:', error);
      }
    };
    
    fetchCategories();
    fetchFeatured();
    
    // Fetch teams
    const fetchTeams = async () => {
      try {
        const data = await teamAPI.getAll();
        const normalizedData = data.map((item: any) => {
          let image = item.image;
          if (image && !image.startsWith('http')) {
            image = image.startsWith('/') ? `https://shivaay-backend.onrender.com${image}` : `https://shivaay-backend.onrender.com/${image}`;
          }
          return {
            ...item,
            image: image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop'
          };
        });
        setTeams(normalizedData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    
    // Fetch pricing
    const fetchPricing = async () => {
      try {
        const data = await pricingAPI.getAll();
        const normalizedData = data.map((item: any) => {
          let image = item.image;
          if (image && !image.startsWith('http')) {
            image = image.startsWith('/') ? `https://shivaay-backend.onrender.com${image}` : `https://shivaay-backend.onrender.com/${image}`;
          }
          return {
            ...item,
            image: image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop'
          };
        });
        setPricing(normalizedData);
      } catch (error) {
        console.error('Error fetching pricing:', error);
      }
    };
    
    fetchTeams();
    fetchPricing();
  }, []);

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
  }, [featuredStories]);

  // Video play on hover and viewport intersection
  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    // Intersection Observer for mobile/scroll detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible in viewport
            video.play().catch(() => {
              // Auto-play might be blocked, that's okay
            });
          } else {
            // Video is out of viewport
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% visible
      }
    );

    observer.observe(container);

    // Hover handlers for desktop
    const handleMouseEnter = () => {
      video.play().catch(() => {});
    };

    const handleMouseLeave = () => {
      // Only pause if not in viewport (for mobile)
      if (!container.getBoundingClientRect().top || container.getBoundingClientRect().top > window.innerHeight) {
        video.pause();
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
            {featuredStories.length > 0 ? (
              featuredStories.map((story, idx) => { 
                return (
                  <div key={idx} className="reveal-el group cursor-pointer">
                    <div className="aspect-[16/10] overflow-hidden mb-8 shadow-sm bg-gray-100">
                      <img 
                        src={story.img} 
                        alt={story.title} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                   
                      />
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
              );
            })
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-400">
                <p>No featured stories available</p>
                <p className="text-xs mt-2">Add featured items from admin dashboard</p>
              </div>
            )}
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
          <div ref={videoContainerRef} className="reveal-el relative group">
             <div className="aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl">
                <video 
                  ref={videoRef}
                  src="https://res.cloudinary.com/ddwqme2ef/video/upload/v1772625561/l_fyetek.mp4" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                  loop
                  muted
                  playsInline
                />
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

      {/* Teams Section */}
      <section className="reveal-section py-32 bg-bone/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 reveal-el">
            <h3 className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4">Our Team</h3>
            <h2 className="text-5xl md:text-6xl font-serif text-charcoal">Meet The <span className="italic">Team</span></h2>
            <p className="text-graphite text-lg font-light max-w-2xl mx-auto mt-8 leading-relaxed">
              A collective of passionate storytellers dedicated to capturing your most precious moments with artistic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teams.length > 0 ? teams.map((member, idx) => (
              <div key={idx} className="reveal-el group">
                <div className="relative overflow-hidden bg-white shadow-lg mb-6 aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex gap-4 mb-4">
                      {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-luxury/50 flex items-center justify-center hover:bg-luxury hover:border-luxury transition-colors">
                          <Instagram className="w-4 h-4 text-luxury hover:text-white" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-luxury/50 flex items-center justify-center hover:bg-luxury hover:border-luxury transition-colors">
                          <Linkedin className="w-4 h-4 text-luxury hover:text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-serif text-charcoal mb-2">{member.name}</h4>
                  <p className="text-luxury text-sm uppercase tracking-widest mb-4 font-medium">{member.role}</p>
                  <p className="text-graphite text-sm font-light leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.achievements.map((achievement, i) => (
                      <span key={i} className="text-[9px] border border-gray-200 px-3 py-1 uppercase tracking-widest text-gray-500 font-bold">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-graphite">No team members available</div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="reveal-section py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 reveal-el">
            <h3 className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4">Investment</h3>
            <h2 className="text-5xl md:text-6xl font-serif text-charcoal">Pricing <span className="italic">Collections</span></h2>
            <p className="text-graphite text-lg font-light max-w-2xl mx-auto mt-8 leading-relaxed">
              Tailored packages designed to preserve your most cherished moments with unparalleled artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.length > 0 ? pricing.map((plan, idx) => (
              <Link 
                to={`/pricing/${plan.slug || plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={idx} 
                className="reveal-el group relative"
              >
                <div className={`relative p-10 flex flex-col h-full border transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-luxury bg-bone shadow-2xl' 
                    : 'border-gray-200 bg-white hover:border-luxury'
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal text-white px-6 py-2 text-[10px] uppercase font-bold tracking-[0.3em] rounded-full flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-luxury tracking-[0.4em] uppercase text-[10px] font-bold mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-serif text-charcoal">{plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-graphite line-through">{plan.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-graphite text-sm font-light">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-luxury mt-0.5 shrink-0" />
                        <span className="text-graphite text-sm font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`w-full py-4 uppercase tracking-[0.4em] text-[10px] font-bold text-center transition-all ${
                    plan.popular 
                      ? 'bg-charcoal text-white group-hover:bg-luxury' 
                      : 'border border-gray-200 text-charcoal group-hover:border-luxury group-hover:text-luxury'
                  }`}>
                    View Details
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-3 text-center py-12 text-graphite">No pricing packages available</div>
            )}
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
