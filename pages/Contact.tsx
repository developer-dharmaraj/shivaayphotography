
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setSubmitted(true);
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-luxury tracking-[0.5em] uppercase text-[10px] font-bold mb-4 block">Inquiries</span>
            <h1 className="text-5xl md:text-7xl font-serif text-charcoal mb-12">Connect <span className="italic">With Us</span></h1>
            
            <div className="space-y-10 mb-16">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bone border border-gray-100 flex items-center justify-center rounded-full shrink-0">
                  <Mail className="text-luxury w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-1">Email Us</h4>
                  <p className="text-graphite">hello@lumina-studio.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bone border border-gray-100 flex items-center justify-center rounded-full shrink-0">
                  <Phone className="text-luxury w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-1">Call Us</h4>
                  <p className="text-graphite">+91 99999 99999</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-bone border border-gray-100 flex items-center justify-center rounded-full shrink-0">
                  <MapPin className="text-luxury w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-charcoal uppercase tracking-widest text-[10px] font-bold mb-1">Visit Studio</h4>
                  <p className="text-graphite">Empire Heights, SB Marg, Mumbai</p>
                </div>
              </div>
            </div>

            <div className="w-full h-80 bg-bone border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.603348633718!2d72.8258215!3d18.9912196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce866a4f5f5f%3A0x60067645830953a7!2sSenapati%20Bapat%20Marg%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1641234567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="bg-bone border border-gray-100 p-10 md:p-16 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="bg-transparent border-b border-gray-200 py-3 text-charcoal focus:border-luxury outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="bg-transparent border-b border-gray-200 py-3 text-charcoal focus:border-luxury outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      className="bg-transparent border-b border-gray-200 py-3 text-charcoal focus:border-luxury outline-none transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Event Date</label>
                    <input 
                      type="date" 
                      className="bg-transparent border-b border-gray-200 py-3 text-charcoal focus:border-luxury outline-none transition-colors"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Share your vision with us..."
                    className="bg-transparent border-b border-gray-200 py-3 text-charcoal focus:border-luxury outline-none transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-charcoal text-white py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-luxury transition-all flex items-center justify-center gap-4">
                  Send Inquiry <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-luxury/10 border border-luxury flex items-center justify-center rounded-full mx-auto mb-10">
                  <Send className="text-luxury w-10 h-10" />
                </div>
                <h3 className="text-4xl font-serif text-charcoal mb-4">Received</h3>
                <p className="text-graphite mb-8 font-light">Thank you for reaching out. Our concierge team will be in touch within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-luxury border-b-2 border-luxury/10 pb-1 uppercase tracking-widest text-[10px] font-bold hover:text-charcoal transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
