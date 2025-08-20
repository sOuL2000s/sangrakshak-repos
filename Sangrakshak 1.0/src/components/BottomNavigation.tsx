
import { Home, Info, Play, Shield, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const BottomNavigation = ({ activeSection, onNavigate }: BottomNavigationProps) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'hero', label: t('nav.home') || 'Home', icon: Home },
    { id: 'about', label: t('nav.about') || 'About', icon: Info },
    { id: 'video', label: t('nav.demo') || 'Video', icon: Play },
    { id: 'features', label: t('nav.features') || 'Features', icon: Shield },
    { id: 'contact', label: t('nav.contact') || 'Contact', icon: MessageCircle },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-cyber-dark/95 backdrop-blur-md border-t border-cyber-blue/20">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                isActive 
                  ? 'text-cyber-blue' 
                  : 'text-white/60 hover:text-cyber-blue'
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
              <span className="text-xs font-rajdhani font-medium">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-cyber-blue rounded-b-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
