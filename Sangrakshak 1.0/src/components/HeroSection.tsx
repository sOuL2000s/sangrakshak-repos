
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Play, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TrialModal from '@/components/TrialModal';
import { useState } from 'react';

interface HeroSectionProps {
  threatCount: number;
}

const HeroSection = ({ threatCount }: HeroSectionProps) => {
  const { t } = useLanguage();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const handleWatchDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryFree = () => {
    setIsTrialModalOpen(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-cyber-magenta/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Live Threat Counter */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-cyber-purple/20 text-cyber-gold border-cyber-gold/50 px-4 py-2 font-orbitron animate-glow-pulse rounded-full">
              🚨 {t('hero.liveThreats').replace('{count}', threatCount.toLocaleString())}
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white leading-tight">
            <span className="block">{t('hero.title')}</span>
            <span className="text-cyber-blue neon-text text-3xl md:text-4xl">
              {t('hero.subtitle')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-rajdhani text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
            <span className="text-cyber-gold"> {t('hero.highlight')}</span>
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-3 py-6">
            <div className="flex items-center space-x-2 bg-cyber-gray/30 backdrop-blur-sm px-4 py-2 rounded-full border border-cyber-blue/30 shadow-lg">
              <Shield className="w-4 h-4 text-cyber-blue" />
              <span className="font-rajdhani text-white text-sm">{t('hero.aiDetection')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-cyber-gray/30 backdrop-blur-sm px-4 py-2 rounded-full border border-cyber-green/30 shadow-lg">
              <Zap className="w-4 h-4 text-cyber-green" />
              <span className="font-rajdhani text-white text-sm">{t('hero.realTimeProtection')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-cyber-gray/30 backdrop-blur-sm px-4 py-2 rounded-full border border-cyber-gold/30 shadow-lg">
              <span className="text-cyber-gold text-sm">💰</span>
              <span className="font-rajdhani text-white text-sm">{t('hero.financialEducation')}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              onClick={handleTryFree}
              className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white font-rajdhani text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-cyber transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center">
                {t('hero.tryFree')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleWatchDemo}
              className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-rajdhani text-lg px-8 py-4 rounded-2xl group bg-transparent backdrop-blur-sm"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t('hero.watchDemo')}
            </Button>
          </div>
        </div>
      </div>

      {/* Trial Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen} 
        onClose={() => setIsTrialModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;
