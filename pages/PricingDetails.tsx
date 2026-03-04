
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Camera, Video, Image, Album, Sparkles, Users, Calendar } from 'lucide-react';
import { pricingAPI } from '../utils/api';

const PricingDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [packageData, setPackageData] = useState<any>(null);
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currentPackage, allPkgs] = await Promise.all([
          pricingAPI.getBySlug(slug || ''),
          pricingAPI.getAll()
        ]);
        let packageImage = currentPackage.image;
        if (packageImage && !packageImage.startsWith('http')) {
          packageImage = packageImage.startsWith('/') 
            ? `https://shivaay-backend.onrender.com${packageImage}` 
            : `https://shivaay-backend.onrender.com/${packageImage}`;
        }
        
        setPackageData({
          ...currentPackage,
          image: packageImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop'
        });
        
        setAllPackages(allPkgs.map((pkg: any) => {
          let image = pkg.image;
          if (image && !image.startsWith('http')) {
            image = image.startsWith('/') 
              ? `https://shivaay-backend.onrender.com${image}` 
              : `https://shivaay-backend.onrender.com/${image}`;
          }
          return {
            ...pkg,
            image: image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop'
          };
        }));
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div className="pt-40 pb-24 min-h-screen bg-white text-center">Loading...</div>;
  }

  if (!packageData) {
    return <div className="pt-40 pb-24 min-h-screen bg-white text-center">Pricing package not found</div>;
  }

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <article className="max-w-5xl mx-auto px-6">
        <Link to="/#pricing" className="inline-flex items-center gap-2 text-luxury hover:text-charcoal transition-colors uppercase tracking-widest text-[10px] font-bold mb-12 border-b border-luxury/20 pb-1">
          <ArrowLeft className="w-4 h-4" /> Back to Pricing
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-[10px] text-luxury uppercase tracking-[0.4em] font-bold mb-6">
            {packageData.popular && (
              <>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </span>
                <div className="w-8 h-[1px] bg-luxury/30" />
              </>
            )}
            <span>Pricing Package</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-6 leading-tight">
                {packageData.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl font-serif text-charcoal">{packageData.price}</span>
                {packageData.originalPrice && (
                  <span className="text-2xl text-graphite line-through">{packageData.originalPrice}</span>
                )}
              </div>
              <p className="text-xl text-graphite font-light italic leading-relaxed max-w-2xl">
                {packageData.description}
              </p>
            </div>
            <Link 
              to="/contact" 
              className="inline-block border border-luxury px-10 py-5 text-luxury hover:bg-luxury hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] font-bold whitespace-nowrap"
            >
              Book This Package
            </Link>
          </div>
        </header>

        <div className="aspect-[16/9] w-full overflow-hidden mb-16 relative bg-bone shadow-lg">
          <img src={packageData.image} className="w-full h-full object-cover" alt={packageData.name} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div className="space-y-16">
            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-serif text-charcoal mb-8">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {packageData.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-luxury mt-1 shrink-0" />
                    <span className="text-graphite text-base font-light leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Includes */}
            <section>
              <h2 className="text-3xl font-serif text-charcoal mb-8">Detailed Inclusions</h2>
              <div className="space-y-4">
                {packageData.includes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-luxury mt-2 shrink-0" />
                    <span className="text-graphite text-base font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Ideal For */}
            <section>
              <h2 className="text-3xl font-serif text-charcoal mb-8">Ideal For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageData.idealFor.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-bone/50">
                    <Check className="w-4 h-4 text-luxury shrink-0" />
                    <span className="text-graphite text-sm font-light">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="sticky top-32">
              <div className="border border-gray-200 p-8 bg-bone/30">
                <h3 className="text-2xl font-serif text-charcoal mb-6">Package Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-luxury" />
                    <span className="text-graphite text-sm font-light">
                      {packageData.features.filter((f: string) => f.includes('Photographer')).length} Photographer{packageData.features.filter((f: string) => f.includes('Photographer')).length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {packageData.features.some((f: string) => f.includes('Cinematographer') || f.includes('Video')) && (
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-luxury" />
                      <span className="text-graphite text-sm font-light">Videography Included</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-luxury" />
                    <span className="text-graphite text-sm font-light">
                      {packageData.features.find((f: string) => f.includes('Hours')) || 'Full Day Coverage'}
                    </span>
                  </div>
                  
                  {packageData.features.some((f: string) => f.includes('Album')) && (
                    <div className="flex items-center gap-3">
                      <Album className="w-5 h-5 text-luxury" />
                      <span className="text-graphite text-sm font-light">Physical Album Included</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="text-4xl font-serif text-charcoal mb-2">{packageData.price}</div>
                  {packageData.originalPrice && (
                    <div className="text-sm text-graphite line-through mb-4">{packageData.originalPrice}</div>
                  )}
                  <Link 
                    to="/contact" 
                    className="block w-full text-center border border-luxury px-6 py-4 text-luxury hover:bg-luxury hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] font-bold"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>

              <div className="mt-8 p-6 bg-charcoal text-white">
                <h4 className="text-lg font-serif mb-4">Have Questions?</h4>
                <p className="text-gray-300 text-sm font-light mb-6">
                  Our team is here to help you choose the perfect package for your special day.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block w-full text-center border border-luxury px-6 py-3 text-luxury hover:bg-luxury hover:text-white transition-all uppercase tracking-[0.3em] text-[10px] font-bold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Other Packages */}
      <section className="max-w-7xl mx-auto px-6 mt-32 pt-24 border-t border-gray-100">
        <h3 className="text-3xl font-serif mb-12 text-charcoal text-center">Explore Other <span className="italic">Packages</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allPackages
            .filter((pkg) => pkg.slug !== slug)
            .slice(0, 2)
            .map((pkg) => (
              <Link key={pkg.slug || pkg._id} to={`/pricing/${pkg.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-bone shadow-sm">
                  <img src={pkg.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={pkg.name} />
                </div>
                <h4 className="text-xl font-serif text-charcoal group-hover:text-luxury transition-colors mb-2">{pkg.name}</h4>
                <p className="text-luxury text-lg font-serif mb-2">{pkg.price}</p>
                <p className="text-graphite text-sm font-light">{pkg.description?.substring(0, 100)}...</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PricingDetails;
