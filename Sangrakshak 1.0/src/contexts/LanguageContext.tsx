
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'english' | 'hindi' | 'punjabi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  english: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.demo': 'Demo',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    
    // Hero Section
    'hero.title': 'SANGRAKSHAK',
    'hero.subtitle': 'The Ultimate Security Shield',
    'hero.description': 'AI-powered web security tool with advanced bot detection + comprehensive financial literacy education.',
    'hero.highlight': 'Protect your digital life while mastering personal finance.',
    'hero.liveThreats': 'LIVE: {count} Threats Blocked Today',
    'hero.tryFree': 'Try for Free',
    'hero.watchDemo': 'Watch Demo',
    'hero.aiDetection': 'AI Bot Detection',
    'hero.realTimeProtection': 'Real-time Protection',
    'hero.financialEducation': 'Financial Education',
    'hero.scanning': 'SCANNING',
    'hero.protecting': 'PROTECTING',
    'hero.learning': 'LEARNING',
    
    // About Section
    'about.badge': 'AI-Powered Protection',
    'about.title': 'Meet Sangrakshak',
    'about.subtitle': 'Your Digital Guardian',
    'about.description': 'Developed by AstraGenX, Sangrakshak combines cutting-edge AI cybersecurity with comprehensive financial literacy education. Protect yourself from digital fraud while mastering personal finance in our interactive, multilingual platform.',
    'about.threatsBlocked': 'Threats Blocked',
    'about.usersProtected': 'Users Protected',
    'about.successRate': 'Success Rate',
    'about.securityStatus': 'Security Status',
    'about.active': 'ACTIVE',
    'about.botDetection': 'Bot Detection',
    'about.fraudPrevention': 'Fraud Prevention',
    
    // Contact Form
    'contact.title': 'Contact Our Security Experts',
    'contact.description': 'Ready to secure your digital presence? Get in touch with our cybersecurity specialists for personalized guidance',
    'contact.fullName': 'Full Name',
    'contact.email': 'Email Address',
    'contact.company': 'Company/Organization',
    'contact.language': 'Preferred Language',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendMessage': 'Send Message',
    'contact.emailSupport': 'Email Support',
    'contact.phoneSupport': 'Phone Support',
    'contact.liveChat': 'Live Chat',
    'contact.headquarters': 'Headquarters',
    'contact.aiAssistant': 'AI Assistant',
    'contact.startChat': 'Start Chat',
    'contact.successMessage': 'Thank you! Your message has been sent successfully.',
    'contact.errorMessage': 'Sorry, there was an error sending your message. Please try again.',
    
    // Video Section
    'video.title': 'Learn About Cyber Fraud Prevention',
    'video.description': 'Watch this educational video to understand common cyber threats and how to protect yourself',
  },
  hindi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'के बारे में',
    'nav.features': 'सुविधाएं',
    'nav.demo': 'डेमो',
    'nav.pricing': 'मूल्य निर्धारण',
    'nav.contact': 'संपर्क',
    'nav.login': 'लॉगिन',
    
    // Hero Section
    'hero.title': 'संगरक्षक',
    'hero.subtitle': 'परम सुरक्षा कवच',
    'hero.description': 'उन्नत बॉट डिटेक्शन + व्यापक वित्तीय साक्षरता शिक्षा के साथ AI-संचालित वेब सुरक्षा उपकरण।',
    'hero.highlight': 'व्यक्तिगत वित्त में महारत हासिल करते हुए अपने डिजिटल जीवन की सुरक्षा करें।',
    'hero.liveThreats': 'लाइव: आज तक {count} खतरे अवरुद्ध',
    'hero.tryFree': 'मुफ्त में आज़माएं',
    'hero.watchDemo': 'डेमो देखें',
    'hero.aiDetection': 'AI बॉट डिटेक्शन',
    'hero.realTimeProtection': 'रियल-टाइम सुरक्षा',
    'hero.financialEducation': 'वित्तीय शिक्षा',
    'hero.scanning': 'स्कैनिंग',
    'hero.protecting': 'सुरक्षा',
    'hero.learning': 'सीखना',
    
    // About Section
    'about.badge': 'AI-संचालित सुरक्षा',
    'about.title': 'संगरक्षक से मिलें',
    'about.subtitle': 'आपका डिजिटल अभिभावक',
    'about.description': 'AstraGenX द्वारा विकसित, संगरक्षक अत्याधुनिक AI साइबर सुरक्षा को व्यापक वित्तीय साक्षरता शिक्षा के साथ जोड़ता है। हमारे इंटरैक्टिव, बहुभाषी प्लेटफॉर्म में व्यक्तिगत वित्त में महारत हासिल करते हुए डिजिटल धोखाधड़ी से खुद को सुरक्षित रखें।',
    'about.threatsBlocked': 'खतरे अवरुद्ध',
    'about.usersProtected': 'उपयोगकर्ता सुरक्षित',
    'about.successRate': 'सफलता दर',
    'about.securityStatus': 'सुरक्षा स्थिति',
    'about.active': 'सक्रिय',
    'about.botDetection': 'बॉट डिटेक्शन',
    'about.fraudPrevention': 'धोखाधड़ी रोकथाम',
    
    // Contact Form
    'contact.title': 'हमारे सुरक्षा विशेषज्ञों से संपर्क करें',
    'contact.description': 'अपनी डिजिटल उपस्थिति को सुरक्षित करने के लिए तैयार हैं? व्यक्तिगत मार्गदर्शन के लिए हमारे साइबर सुरक्षा विशेषज्ञों से संपर्क करें',
    'contact.fullName': 'पूरा नाम',
    'contact.email': 'ईमेल पता',
    'contact.company': 'कंपनी/संगठन',
    'contact.language': 'पसंदीदा भाषा',
    'contact.subject': 'विषय',
    'contact.message': 'संदेश',
    'contact.sendMessage': 'संदेश भेजें',
    'contact.emailSupport': 'ईमेल सहायता',
    'contact.phoneSupport': 'फोन सहायता',
    'contact.liveChat': 'लाइव चैट',
    'contact.headquarters': 'मुख्यालय',
    'contact.aiAssistant': 'AI असिस्टेंट',
    'contact.startChat': 'चैट शुरू करें',
    'contact.successMessage': 'धन्यवाد! आपका संदेश सफलतापूर्वक भेजा गया है।',
    'contact.errorMessage': 'क्षमा करें, आपका संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।',
    
    // Video Section
    'video.title': 'साइबर धोखाधड़ी रोकथाम के बारे में जानें',
    'video.description': 'सामान्य साइबर खतरों को समझने और खुद को कैसे सुरक्षित रखना है, इसके लिए यह शैक्षिक वीडियो देखें',
  },
  punjabi: {
    // Navigation
    'nav.home': 'ਘਰ',
    'nav.about': 'ਬਾਰੇ',
    'nav.features': 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    'nav.demo': 'ਡੈਮੋ',
    'nav.pricing': 'ਕੀਮਤ',
    'nav.contact': 'ਸੰਪਰਕ',
    'nav.login': 'ਲਾਗਇਨ',
    
    // Hero Section
    'hero.title': 'ਸੰਗਰਕ੍ਸ਼ਕ',
    'hero.subtitle': 'ਅੰਤਿਮ ਸੁਰੱਖਿਆ ਢਾਲ',
    'hero.description': 'ਉੱਨਤ ਬੋਟ ਖੋਜ + ਵਿਆਪਕ ਵਿੱਤੀ ਸਾਖਰਤਾ ਸਿੱਖਿਆ ਦੇ ਨਾਲ ਏਆਈ-ਸੰਚਾਲਿਤ ਵੈਬ ਸੁਰੱਖਿਆ ਟੂਲ।',
    'hero.highlight': 'ਨਿਜੀ ਵਿੱਤ ਵਿੱਚ ਮੇਸਟਰੀ ਹਾਸਲ ਕਰਦੇ ਹੋਏ ਆਪਣੀ ਡਿਜੀਟਲ ਜ਼ਿੰਦਗੀ ਦੀ ਸੁਰੱਖਿਆ ਕਰੋ।',
    'hero.liveThreats': 'ਲਾਈਵ: ਅੱਜ ਤੱਕ {count} ਖਤਰੇ ਰੋਕੇ ਗਏ',
    'hero.tryFree': 'ਮੁਫਤ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    'hero.watchDemo': 'ਡੈਮੋ ਦੇਖੋ',
    'hero.aiDetection': 'ਏਆਈ ਬੋਟ ਖੋਜ',
    'hero.realTimeProtection': 'ਰੀਅਲ-ਟਾਈਮ ਸੁਰੱਖਿਆ',
    'hero.financialEducation': 'ਵਿੱਤੀ ਸਿੱਖਿਆ',
    'hero.scanning': 'ਸਕੈਨਿੰਗ',
    'hero.protecting': 'ਸੁਰੱਖਿਆ',
    'hero.learning': 'ਸਿੱਖਣਾ',
    
    // About Section
    'about.badge': 'ਏਆਈ-ਸੰਚਾਲਿਤ ਸੁਰੱਖਿਆ',
    'about.title': 'ਸੰਗਰਕ੍ਸ਼ਕ ਨਾਲ ਮਿਲੋ',
    'about.subtitle': 'ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਸਰਪ੍ਰਸਤ',
    'about.description': 'AstraGenX ਦੁਆਰਾ ਵਿਕਸਿਤ, ਸੰਗਰਕ੍ਸ਼ਕ ਅਤਿ-ਆਧੁਨਿਕ ਏਆਈ ਸਾਈਬਰ ਸੁਰੱਖਿਆ ਨੂੰ ਵਿਆਪਕ ਵਿੱਤੀ ਸਾਖਰਤਾ ਸਿੱਖਿਆ ਨਾਲ ਜੋੜਦਾ ਹੈ। ਸਾਡੇ ਇੰਟਰਐਕਟਿਵ, ਬਹੁ-ਭਾਸ਼ਾਈ ਪਲੇਟਫਾਰਮ ਵਿੱਚ ਨਿਜੀ ਵਿੱਤ ਵਿੱਚ ਮੇਸਟਰੀ ਹਾਸਲ ਕਰਦੇ ਹੋਏ ਡਿਜੀਟਲ ਧੋਖਾਧੜੀ ਤੋਂ ਆਪਣੇ ਆਪ ਨੂੰ ਸੁਰੱਖਿਤ ਰੱਖੋ।',
    'about.threatsBlocked': 'ਖਤਰੇ ਰੋਕੇ ਗਏ',
    'about.usersProtected': 'ਉਪਭੋਗਤਾ ਸੁਰੱਖਿਤ',
    'about.successRate': 'ਸਫਲਤਾ ਦਰ',
    'about.securityStatus': 'ਸੁਰੱਖਿਆ ਸਥਿਤੀ',
    'about.active': 'ਸਰਗਰਮ',
    'about.botDetection': 'ਬੋਟ ਖੋਜ',
    'about.fraudPrevention': 'ਧੋਖਾਧੜੀ ਰੋਕਥਾਮ',
    
    // Contact Form
    'contact.title': 'ਸਾਡੇ ਸੁਰੱਖਿਆ ਮਾਹਿਰਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    'contact.description': 'ਆਪਣੀ ਡਿਜੀਟਲ ਮੌਜੂਦਗੀ ਨੂੰ ਸੁਰੱਖਿਤ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ? ਨਿਜੀ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਸਾਡੇ ਸਾਈਬਰ ਸੁਰੱਖਿਆ ਮਾਹਿਰਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
    'contact.fullName': 'ਪੂਰਾ ਨਾਮ',
    'contact.email': 'ਈਮੇਲ ਪਤਾ',
    'contact.company': 'ਕੰਪਨੀ/ਸੰਗਠਨ',
    'contact.language': 'ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ',
    'contact.subject': 'ਵਿਸ਼ਾ',
    'contact.message': 'ਸੰਦੇਸ਼',
    'contact.sendMessage': 'ਸੰਦੇਸ਼ ਭੇਜੋ',
    'contact.emailSupport': 'ਈਮੇਲ ਸਹਾਇਤਾ',
    'contact.phoneSupport': 'ਫੋਨ ਸਹਾਇਤਾ',
    'contact.liveChat': 'ਲਾਈਵ ਚੈਟ',
    'contact.headquarters': 'ਮੁੱਖ ਦਫ਼ਤਰ',
    'contact.aiAssistant': 'ਏਆਈ ਸਹਾਇਕ',
    'contact.startChat': 'ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ',
    'contact.successMessage': 'ਧੰਨਵਾਦ! ਤੁਹਾਡਾ ਸੰਦੇਸ਼ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ ਹੈ।',
    'contact.errorMessage': 'ਮਾਫ਼ ਕਰੋ, ਤੁਹਾਡਾ ਸੰਦੇਸ਼ ਭੇਜਣ ਵਿੱਚ ਗਲਤੀ ਹੋਈ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    
    // Video Section
    'video.title': 'ਸਾਈਬਰ ਧੋਖਾਧੜੀ ਰੋਕਥਾਮ ਬਾਰੇ ਜਾਣੋ',
    'video.description': 'ਆਮ ਸਾਈਬਰ ਖਤਰਿਆਂ ਨੂੰ ਸਮਝਣ ਅਤੇ ਆਪਣੇ ਆਪ ਨੂੰ ਕਿਵੇਂ ਸੁਰੱਖਿਤ ਰੱਖਣਾ ਹੈ ਇਸ ਲਈ ਇਹ ਸਿੱਖਿਆਪ੍ਰਦ ਵੀਡੀਓ ਦੇਖੋ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage][key as keyof typeof translations.english];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
