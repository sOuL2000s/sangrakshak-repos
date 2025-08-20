import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LiveDemoSection from '@/components/LiveDemoSection';
import FraudSimulationSection from '@/components/FraudSimulationSection';
import CyberFraudPreventionSection from '@/components/CyberFraudPreventionSection';
import FinancialLiteracySection from '@/components/FinancialLiteracySection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import BottomNavigation from '@/components/BottomNavigation';
import FloatingLanguageToggle from '@/components/FloatingLanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserDropdown } from '@/components/UserDropdown';

const Index = () => {
  const [threatCount, setThreatCount] = useState(1847293);
  const [activeSection, setActiveSection] = useState('hero');
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'video', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark overflow-x-hidden">
      {/* Mobile App Header */}
      <header className="fixed top-0 w-full z-40 bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-blue/20">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img 
                src="/gopal-uploads/878b1e93-b32c-4111-a502-526cf9e07b1f.png" 
                alt="Sangrakshak Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <span className="font-orbitron font-bold text-lg text-white neon-text">
                {t('hero.title')}
              </span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-3">
              {user && (
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                >
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-rajdhani bg-transparent backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <span className="hidden xs:inline">Dashboard</span>
                    <span className="xs:hidden">Dash</span>
                  </Button>
                </Link>
              )}
              
              {user ? (
                <UserDropdown />
              ) : (
                <Link to="/login">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-rajdhani bg-transparent backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Floating Language Toggle */}
      <FloatingLanguageToggle />

      {/* Main Content with mobile app spacing */}
      <main className="pb-20">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection threatCount={threatCount} />
        </section>

        {/* About Section */}
        <section id="about" className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
                  {t('about.title')} <span className="text-cyber-blue neon-text">{t('hero.title')}</span>
                </h2>
                <p className="font-rajdhani text-lg text-white/80 max-w-3xl mx-auto">
                  {t('about.description')}
                </p>
              </div>
              
              {/* Mobile App Style Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-cyber-gray/30 backdrop-blur-sm rounded-2xl p-6 border border-cyber-blue/20 shadow-lg">
                  <div className="text-center">
                    <div className="threat-counter text-2xl">{threatCount.toLocaleString()}</div>
                    <div className="font-rajdhani text-cyber-blue text-sm">{t('about.threatsBlocked')}</div>
                  </div>
                </div>
                <div className="bg-cyber-gray/30 backdrop-blur-sm rounded-2xl p-6 border border-cyber-green/20 shadow-lg">
                  <div className="text-center">
                    <div className="threat-counter text-2xl">150K+</div>
                    <div className="font-rajdhani text-cyber-green text-sm">{t('about.usersProtected')}</div>
                  </div>
                </div>
                <div className="bg-cyber-gray/30 backdrop-blur-sm rounded-2xl p-6 border border-cyber-gold/20 shadow-lg">
                  <div className="text-center">
                    <div className="threat-counter text-2xl">99.9%</div>
                    <div className="font-rajdhani text-cyber-gold text-sm">{t('about.successRate')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section id="video">
          <VideoSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Other Sections */}
        <HowItWorksSection />
        <LiveDemoSection />
        <FraudSimulationSection />
        <CyberFraudPreventionSection />
        <FinancialLiteracySection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
    </div>
  );
};

export default Index;
