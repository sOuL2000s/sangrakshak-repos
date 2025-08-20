
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const FloatingLanguageToggle = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; nativeLabel: string; flag: string }[] = [
    { code: 'english', label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
    { code: 'hindi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳' },
    { code: 'punjabi', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="fixed top-20 right-4 z-50">
      {/* Language Options */}
      {isOpen && (
        <div className="mb-2 space-y-2 animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 bg-cyber-dark/90 backdrop-blur-md border border-cyber-blue/30 rounded-full px-4 py-2 text-white hover:bg-cyber-blue/20 transition-all duration-200 shadow-lg hover:shadow-cyber"
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-rajdhani text-sm font-medium">{lang.nativeLabel}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-cyber-blue/20 backdrop-blur-md border border-cyber-blue/50 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyber transition-all duration-200 hover:scale-110 group"
      >
        <div className="flex items-center justify-center">
          <span className="text-lg mr-1">{currentLang.flag}</span>
          <Globe className="w-4 h-4 text-cyber-blue group-hover:rotate-12 transition-transform" />
        </div>
      </button>
    </div>
  );
};

export default FloatingLanguageToggle;
