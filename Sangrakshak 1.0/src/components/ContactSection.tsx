
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    language: currentLanguage
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);

      toast({
        title: "Success!",
        description: t('contact.successMessage') || "Your message has been sent successfully!",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        language: currentLanguage
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: t('contact.errorMessage') || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-cyber-purple/20 text-cyber-blue border-cyber-purple/50 mb-4">
            Get In Touch
          </Badge>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-6">
            {t('contact.title') || 'Contact Us'}
          </h2>
          <p className="font-rajdhani text-lg text-white/80 max-w-2xl mx-auto">
            {t('contact.description') || 'Get in touch with our cybersecurity experts for personalized protection solutions.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Form - Mobile App Style */}
          <Card className="bg-cyber-gray/20 backdrop-blur-sm border border-cyber-blue/30 rounded-3xl shadow-xl">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                      {t('contact.fullName') || 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                      {t('contact.email') || 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                      {t('contact.company') || 'Company'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                      {t('contact.language') || 'Preferred Language'}
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all"
                    >
                      <option value="english">English</option>
                      <option value="hindi">हिंदी (Hindi)</option>
                      <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                    {t('contact.subject') || 'Subject'} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all"
                    placeholder="What can we help you with?"
                    required
                  />
                </div>

                <div>
                  <label className="block font-rajdhani text-white/90 mb-2 text-sm font-medium">
                    {t('contact.message') || 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-cyber-gray/40 border border-cyber-blue/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:border-cyber-blue focus:outline-none focus:ring-2 focus:ring-cyber-blue/30 transition-all resize-none"
                    placeholder="Tell us about your cybersecurity needs..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white font-rajdhani text-lg py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-cyber disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      {t('contact.sendMessage') || 'Send Message'}
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods - Mobile App Style Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-cyber-gray/20 backdrop-blur-sm border border-cyber-blue/30 rounded-3xl shadow-lg hover:shadow-cyber transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cyber-blue/20 border border-cyber-blue/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow-pulse">
                  <Mail className="w-8 h-8 text-cyber-blue" />
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Email Support</h3>
                <p className="font-rajdhani text-cyber-blue font-medium">sangrakshak@gmail.com</p>
                <p className="font-rajdhani text-white/60 text-sm">24/7 Response</p>
              </CardContent>
            </Card>

            <Card className="bg-cyber-gray/20 backdrop-blur-sm border border-cyber-green/30 rounded-3xl shadow-lg hover:shadow-cyber transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cyber-green/20 border border-cyber-green/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow-pulse">
                  <Phone className="w-8 h-8 text-cyber-green" />
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Phone Support</h3>
                <p className="font-rajdhani text-cyber-green font-medium">+91-8000-SECURE</p>
                <p className="font-rajdhani text-white/60 text-sm">Mon-Fri, 9 AM - 6 PM</p>
              </CardContent>
            </Card>

            <Card className="bg-cyber-gray/20 backdrop-blur-sm border border-cyber-blue/30 rounded-3xl shadow-lg hover:shadow-cyber transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cyber-blue/20 border border-cyber-blue/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow-pulse">
                  <MessageCircle className="w-8 h-8 text-cyber-blue" />
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Live Chat</h3>
                <p className="font-rajdhani text-cyber-blue font-medium">AI Assistant</p>
                <p className="font-rajdhani text-white/60 text-sm">Instant Responses</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
