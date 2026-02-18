
import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Essential Journal',
      price: 'From ₹2.5L',
      description: 'Elegant coverage for intimate weddings and portraits.',
      features: [
        '1 Lead Photographer',
        '8 Hours Curated Coverage',
        'Private Cloud Gallery',
        '250 High-End Retouched Frames',
        'Editorial Mini Lookbook'
      ]
    },
    {
      name: 'Grand Editorial',
      price: 'From ₹5.5L',
      description: 'Our signature full-scale luxury wedding experience.',
      features: [
        '2 Lead Photographers + 2 Cinematographers',
        'Full 3-Day Wedding Journaling',
        'Pre-Wedding Concept Shoot',
        'Handcrafted Heirloom Masterpiece Album',
        'Cinematic Trailer & Feature Film',
        'Same-Day Premiere Edit'
      ],
      featured: true
    },
    {
      name: 'Bespoke Global',
      price: 'Custom',
      description: 'Exclusive destination coverage for the discerning traveler.',
      features: [
        'Creative Director Aryan Malhotra',
        'Unlimited Destination Coverage',
        'Global Travel Logistics Included',
        'Multi-Volume Coffee Table Series',
        'Full Length Documentary Cinema',
        'Bespoke Fine Art Printing'
      ]
    }
  ];

  return (
    <div className="pt-40 pb-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4 block">Invest in Art</span>
          <h1 className="text-6xl md:text-8xl font-serif text-charcoal mb-10">Collections <span className="italic">& Investment</span></h1>
          <p className="text-graphite max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Preserving your legacy through world-class cinematography and editorial photography.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-12 flex flex-col border ${plan.featured ? 'border-luxury bg-bone shadow-2xl' : 'border-gray-100 bg-white'} group transition-all duration-500 hover:-translate-y-2`}>
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal text-white px-6 py-2 text-[10px] uppercase font-bold tracking-[0.3em] rounded-full">Preferred</div>
              )}
              <h3 className="text-luxury tracking-[0.4em] uppercase text-[10px] font-bold mb-6">{plan.name}</h3>
              <div className="text-4xl font-serif text-charcoal mb-6">{plan.price}</div>
              <p className="text-graphite text-sm mb-12 font-light">{plan.description}</p>
              
              <div className="space-y-5 mb-16 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <Check className="w-4 h-4 text-luxury mt-0.5 shrink-0" />
                    <span className="text-graphite text-sm font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className={`w-full py-5 uppercase tracking-[0.4em] text-[10px] font-bold text-center transition-all ${plan.featured ? 'bg-charcoal text-white hover:bg-luxury' : 'border border-gray-200 text-charcoal hover:border-luxury hover:text-luxury'}`}>
                Check Availability
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
