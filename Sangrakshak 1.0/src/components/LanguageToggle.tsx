
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; nativeLabel: string }[] = [
    { code: 'english', label: 'English', nativeLabel: 'English' },
    { code: 'hindi', label: 'Hindi', nativeLabel: 'हिंदी' },
    { code: 'punjabi', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`font-rajdhani transition-colors px-3 py-1 rounded text-sm ${
            currentLanguage === lang.code
              ? 'text-cyber-blue border-b border-cyber-blue'
              : 'text-white/60 hover:text-cyber-blue'
          }`}
        >
          {lang.nativeLabel}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
