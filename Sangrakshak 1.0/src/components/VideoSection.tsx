
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useLanguage();

  const handlePlayPause = () => {
    const video = document.getElementById('fraud-awareness-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('fraud-awareness-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50 mb-4">
            🎯 Cyber Fraud Prevention
          </Badge>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
            {t('video.title')}
          </h2>
          <p className="font-rajdhani text-lg text-white/80 max-w-2xl mx-auto">
            {t('video.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="cyber-card overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="scanning-line opacity-30"></div>

              {/* Educational Info - Mobile: Above video, Desktop: Overlay */}
              <div className="md:hidden p-4">
                <div className="bg-cyber-dark/80 backdrop-blur-sm border border-cyber-blue/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                    <span className="font-orbitron text-cyber-green text-sm">EDUCATIONAL CONTENT</span>
                  </div>
                  <div className="text-white/80 text-sm font-rajdhani">
                    Learn to identify phishing attempts, secure your financial data, and protect yourself from cyber fraud.
                  </div>
                </div>
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-cyber-dark to-cyber-gray">
                <video
                  id="fraud-awareness-video"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23001122'/%3E%3Cg transform='translate(400,225)'%3E%3Ccircle r='50' fill='none' stroke='%2300E5FF' stroke-width='2' opacity='0.5'%3E%3Canimate attributeName='r' values='50;80;50' dur='2s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ctext x='0' y='8' text-anchor='middle' fill='%2300E5FF' font-family='monospace' font-size='16'%3ECyber Security%3C/text%3E%3Ctext x='0' y='28' text-anchor='middle' fill='%23FFD700' font-family='monospace' font-size='12'%3EEducational Content%3C/text%3E%3C/g%3E%3C/svg%3E"
                >
                  <source src="/gopal-uploads/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>


                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="w-12 h-12 bg-cyber-blue/20 backdrop-blur-sm border border-cyber-blue/50 rounded-full flex items-center justify-center hover:bg-cyber-blue/30 transition-all group"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-cyber-blue group-hover:scale-110 transition-transform" />
                        ) : (
                          <Play className="w-5 h-5 text-cyber-blue group-hover:scale-110 transition-transform ml-0.5" />
                        )}
                      </button>

                      <button
                        onClick={handleMuteToggle}
                        className="w-10 h-10 bg-cyber-purple/20 backdrop-blur-sm border border-cyber-purple/50 rounded-full flex items-center justify-center hover:bg-cyber-purple/30 transition-all group"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-cyber-purple group-hover:scale-110 transition-transform" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-cyber-purple group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-cyber-gold text-sm font-orbitron">LIVE DEMO</div>
                      <div className="text-white/60 text-xs font-rajdhani">Cyber Fraud Prevention</div>
                    </div>
                  </div>
                </div>

                {/* Educational Overlay - Desktop Only */}
                <div className="hidden md:block absolute top-4 left-4 right-4">
                  <div className="bg-cyber-dark/80 backdrop-blur-sm border border-cyber-blue/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                      <span className="font-orbitron text-cyber-green text-sm">EDUCATIONAL CONTENT</span>
                    </div>
                    <div className="text-white/80 text-sm font-rajdhani">
                      Learn to identify phishing attempts, secure your financial data, and protect yourself from cyber fraud.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="cyber-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyber-blue/20 border border-cyber-blue/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyber-blue text-xl">🎯</span>
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Real Scenarios</h3>
                <p className="font-rajdhani text-white/70 text-sm">Learn from actual fraud cases and prevention techniques</p>
              </CardContent>
            </Card>

            <Card className="cyber-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyber-green/20 border border-cyber-green/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyber-green text-xl">🛡️</span>
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Protection Tips</h3>
                <p className="font-rajdhani text-white/70 text-sm">Practical advice for securing your digital presence</p>
              </CardContent>
            </Card>

            <Card className="cyber-card text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-cyber-gold/20 border border-cyber-gold/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyber-gold text-xl">📚</span>
                </div>
                <h3 className="font-orbitron font-semibold text-white mb-2">Financial Literacy</h3>
                <p className="font-rajdhani text-white/70 text-sm">Master personal finance while staying secure</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

