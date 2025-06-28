import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { EditableField } from './EditableField';

interface ContactSectionProps {
  isEditMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isEditMode }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: '+1 (555) 123-4567',
    email: 'vaishnavi@upadhyaydesign.com',
    address: '123 Design Street, Creative District, NY 10001',
    hours: 'Mon - Fri: 9:00 AM - 6:00 PM'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const updateContactInfo = (field: keyof typeof contactInfo, value: string) => {
    if (!isEditMode) return;
    
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-warm-beige to-cream-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary-brown mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto font-inter">
            Ready to transform your space? Let's discuss your vision and bring it to life.
          </p>
        </div>

        {isEditMode && (
          <div className="flex items-center justify-center mb-8">
            <div className="px-4 py-2 bg-primary-brown/10 text-primary-brown rounded-lg font-poppins">
              Edit Mode Active - Contact information can be edited
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-left">
            <Card className="bg-card-gradient border-0 shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-primary-brown flex items-center gap-3">
                  <Phone className="text-accent-gold" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditableField
                  value={contactInfo.phone}
                  onSave={(value) => updateContactInfo('phone', value)}
                  className="text-lg text-text-dark font-inter"
                  isEditMode={isEditMode}
                  placeholder="Phone Number"
                />
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-0 shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-primary-brown flex items-center gap-3">
                  <Mail className="text-accent-gold" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditableField
                  value={contactInfo.email}
                  onSave={(value) => updateContactInfo('email', value)}
                  className="text-lg text-text-dark font-inter"
                  isEditMode={isEditMode}
                  placeholder="Email Address"
                />
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-0 shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-primary-brown flex items-center gap-3">
                  <MapPin className="text-accent-gold" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditableField
                  value={contactInfo.address}
                  onSave={(value) => updateContactInfo('address', value)}
                  className="text-lg text-text-dark font-inter"
                  isEditMode={isEditMode}
                  multiline
                  placeholder="Business Address"
                />
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-0 shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-primary-brown flex items-center gap-3">
                  <Clock className="text-accent-gold" />
                  Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditableField
                  value={contactInfo.hours}
                  onSave={(value) => updateContactInfo('hours', value)}
                  className="text-lg text-text-dark font-inter"
                  isEditMode={isEditMode}
                  placeholder="Business Hours"
                />
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-right">
            <Card className="bg-card-gradient border-0 shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-3xl font-playfair text-primary-brown text-center">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/70 border-primary-brown/20 focus:border-primary-brown text-lg py-3"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/70 border-primary-brown/20 focus:border-primary-brown text-lg py-3"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/70 border-primary-brown/20 focus:border-primary-brown text-lg py-3"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-white/70 border-primary-brown/20 focus:border-primary-brown text-lg min-h-[120px] resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-brown to-secondary-brown hover:scale-105 transition-all duration-300 font-poppins text-lg py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-accent-gold/20 rounded-full animate-floating-slow"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-primary-brown/10 rounded-full animate-floating-medium"></div>
      </div>
    </section>
  );
};
