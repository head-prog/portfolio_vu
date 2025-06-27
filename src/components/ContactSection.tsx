
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary-brown/5 to-secondary-brown/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
            Let's Create Something Beautiful
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
            Ready to transform your space? Let's discuss your vision and bring it to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h3 className="text-3xl font-playfair font-bold text-primary-brown mb-8">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-card-gradient rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-primary-brown/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-brown" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-primary-brown">Email</p>
                    <p className="text-text-dark font-inter">hello@sachasubois.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-card-gradient rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-primary-brown/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-brown" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-primary-brown">Phone</p>
                    <p className="text-text-dark font-inter">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-card-gradient rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-primary-brown/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-brown" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-primary-brown">Location</p>
                    <p className="text-text-dark font-inter">New York, NY</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-card-gradient rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-primary-brown/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-brown" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-primary-brown">Hours</p>
                    <p className="text-text-dark font-inter">Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-accent-gold/10 rounded-xl">
              <h4 className="font-poppins font-semibold text-primary-brown mb-2">Response Time</h4>
              <p className="text-text-dark font-inter">We typically respond within 24 hours during business days.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="office">Office</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-primary-brown font-poppins font-medium mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-primary-brown font-poppins font-medium mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-warm-beige rounded-lg focus:border-primary-brown focus:outline-none transition-colors font-inter resize-vertical"
                  placeholder="Tell us about your project, vision, and any specific requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-primary-brown to-secondary-brown text-white rounded-lg font-poppins font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              {isSuccess && (
                <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 font-poppins text-center animate-fade-in">
                  Thank you! Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
