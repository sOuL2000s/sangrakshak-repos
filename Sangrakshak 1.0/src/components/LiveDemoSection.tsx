
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Play, Zap, Volume2, VolumeX, Pause } from 'lucide-react';
import { getFraudTopicByTitle, type FraudTopic } from '@/data/fraudTopics';
import FraudLearningModal from '@/components/FraudLearningModal';

const LiveDemoSection = () => {
  const [activeDemo, setActiveDemo] = useState('security');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<FraudTopic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const runSecurityScan = () => {
    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      setScanResults({
        threats: 7,
        blocked: 7,
        vulnerabilities: 2,
        score: 94
      });
      setIsScanning(false);
    }, 3000);
  };

  const handleVideoPlayPause = () => {
    const video = document.getElementById('demo-fraud-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoMuteToggle = () => {
    const video = document.getElementById('demo-fraud-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleLearnMore = (scenarioType: string) => {
    const topic = getFraudTopicByTitle(scenarioType);
    if (topic) {
      setSelectedTopic(topic);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
  };

  const fraudScenarios = [
    {
      type: "Phishing Email",
      description: "Fake bank email asking for login credentials",
      danger: "high",
      learned: false
    },
    {
      type: "OTP Scam",
      description: "Caller requesting OTP for 'verification'",
      danger: "critical",
      learned: true
    },
    {
      type: "Fake Investment",
      description: "Too-good-to-be-true returns promise",
      danger: "medium",
      learned: false
    }
  ];

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/50 mb-4">
            Live Demo
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Experience <span className="text-cyber-green neon-text">Real-time Protection</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            Try our interactive demos to see how Sangrakshak protects against cyber threats and teaches financial security
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-cyber-gray/30 p-2 rounded-lg border border-cyber-blue/30">
            <button
              onClick={() => setActiveDemo('security')}
              className={`px-6 py-3 rounded-lg font-rajdhani font-semibold transition-all ${activeDemo === 'security'
                ? 'bg-cyber-blue text-white shadow-neon-blue'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Web Security Test
            </button>
            <button
              onClick={() => setActiveDemo('fraud')}
              className={`px-6 py-3 rounded-lg font-rajdhani font-semibold transition-all ${activeDemo === 'fraud'
                ? 'bg-cyber-gold text-cyber-dark shadow-neon-gold'
                : 'text-white/60 hover:text-white'
                }`}
            >
              Learn About Cyber Fraud Prevention
            </button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-4xl mx-auto">
          {activeDemo === 'security' && (
            <Card className="cyber-card">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Control Panel */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-cyber-blue" />
                      <h3 className="font-orbitron text-xl font-semibold text-white">
                        Security Scanner
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-cyber-gray/50 p-4 rounded-lg">
                        <label className="block font-rajdhani text-white/80 mb-2">Target URL</label>
                        <input
                          type="url"
                          placeholder="https://example.com"
                          className="w-full bg-cyber-dark border border-cyber-blue/30 rounded px-3 py-2 text-white focus:border-cyber-blue outline-none"
                        />
                      </div>

                      <Button
                        onClick={runSecurityScan}
                        disabled={isScanning}
                        className="w-full cyber-button"
                      >
                        {isScanning ? (
                          <>
                            <Zap className="w-4 h-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Security Scan
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse"></div>
                      <h3 className="font-orbitron text-xl font-semibold text-white">
                        Live Results
                      </h3>
                    </div>

                    <div className="holographic p-6 rounded-lg relative overflow-hidden">
                      {isScanning && <div className="scanning-line"></div>}

                      {!scanResults && !isScanning && (
                        <div className="text-center py-8">
                          <Shield className="w-16 h-16 text-cyber-blue/50 mx-auto mb-4" />
                          <p className="font-rajdhani text-white/60">
                            Click "Start Security Scan" to begin analysis
                          </p>
                        </div>
                      )}

                      {isScanning && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                            <span className="font-rajdhani text-white/80">Analyzing website structure...</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <span className="font-rajdhani text-white/80">Checking for vulnerabilities...</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyber-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <span className="font-rajdhani text-white/80">Testing bot detection...</span>
                          </div>
                        </div>
                      )}

                      {scanResults && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-orbitron font-bold text-cyber-green">
                                {scanResults.blocked}
                              </div>
                              <div className="text-xs font-rajdhani text-white/60">
                                Threats Blocked
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-orbitron font-bold text-cyber-blue">
                                {scanResults.score}%
                              </div>
                              <div className="text-xs font-rajdhani text-white/60">
                                Security Score
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-rajdhani text-white/80 text-sm">Overall Security</span>
                              <CheckCircle className="w-4 h-4 text-cyber-green" />
                            </div>
                            <div className="w-full bg-cyber-gray rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full animate-pulse"
                                style={{ width: `${scanResults.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeDemo === 'fraud' && (
            <Card className="cyber-card">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-cyber-gold" />
                    <h3 className="font-orbitron text-xl font-semibold text-white">
                      Learn About Cyber Fraud Prevention
                    </h3>
                  </div>

                  {/* Educational Video Section */}
                  <div className="max-w-3xl mx-auto">
                    <div className="relative bg-cyber-gray/20 backdrop-blur-sm rounded-3xl p-4 border border-cyber-blue/30 shadow-xl">
                      {/* Educational Info - Mobile: Above video, Desktop: Overlay */}
                      <div className="md:hidden mb-4">
                        <div className="bg-cyber-dark/80 backdrop-blur-sm border border-cyber-blue/30 rounded-xl p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                            <span className="font-orbitron text-cyber-green text-xs">LIVE DEMO</span>
                          </div>
                          <div className="text-white/80 text-xs font-rajdhani">
                            Learn to identify OTP scams, phishing attempts, and secure your financial data
                          </div>
                        </div>
                      </div>

                      <div className="relative aspect-video bg-gradient-to-br from-cyber-dark to-cyber-gray rounded-2xl overflow-hidden">
                        <video
                          id="demo-fraud-video"
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23001122'/%3E%3Cg transform='translate(400,225)'%3E%3Ccircle r='50' fill='none' stroke='%2300E5FF' stroke-width='2' opacity='0.5'%3E%3Canimate attributeName='r' values='50;80;50' dur='2s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ctext x='0' y='8' text-anchor='middle' fill='%2300E5FF' font-family='monospace' font-size='16'%3ECyber Fraud Prevention%3C/text%3E%3Ctext x='0' y='28' text-anchor='middle' fill='%23FFD700' font-family='monospace' font-size='12'%3EEducational Content%3C/text%3E%3C/g%3E%3C/svg%3E"
                        >
                          <source src="/gopal-uploads/Pishing video.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>


                        {/* Video Controls */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={handleVideoPlayPause}
                                className="w-10 h-10 bg-cyber-blue/20 backdrop-blur-sm border border-cyber-blue/50 rounded-full flex items-center justify-center hover:bg-cyber-blue/30 transition-all"
                              >
                                {isVideoPlaying ? (
                                  <Pause className="w-4 h-4 text-cyber-blue" />
                                ) : (
                                  <Play className="w-4 h-4 text-cyber-blue ml-0.5" />
                                )}
                              </button>

                              <button
                                onClick={handleVideoMuteToggle}
                                className="w-8 h-8 bg-cyber-purple/20 backdrop-blur-sm border border-cyber-purple/50 rounded-full flex items-center justify-center hover:bg-cyber-purple/30 transition-all"
                              >
                                {isVideoMuted ? (
                                  <VolumeX className="w-3 h-3 text-cyber-purple" />
                                ) : (
                                  <Volume2 className="w-3 h-3 text-cyber-purple" />
                                )}
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-cyber-gold text-xs font-orbitron">FRAUD AWARENESS</div>
                              <div className="text-white/60 text-xs font-rajdhani">Educational Video</div>
                            </div>
                          </div>
                        </div>

                        {/* Educational Overlay - Desktop Only */}
                        <div className="hidden md:block absolute top-3 left-3 right-3">
                          <div className="bg-cyber-dark/80 backdrop-blur-sm border border-cyber-blue/30 rounded-xl p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                              <span className="font-orbitron text-cyber-green text-xs">LIVE DEMO</span>
                            </div>
                            <div className="text-white/80 text-xs font-rajdhani">
                              Learn to identify OTP scams, phishing attempts, and secure your financial data
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="font-rajdhani text-white/80 text-center">
                    Learn to identify common financial frauds through interactive scenarios and educational content
                  </p>

                  <div className="space-y-4">
                    {fraudScenarios.map((scenario, index) => (
                      <div key={index} className="holographic p-4 rounded-lg group hover:shadow-cyber transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${scenario.danger === 'critical' ? 'bg-red-500' :
                              scenario.danger === 'high' ? 'bg-orange-500' :
                                'bg-yellow-500'
                              }`}></div>
                            <div>
                              <h4 className="font-orbitron font-semibold text-white">
                                {scenario.type}
                              </h4>
                              <p className="font-rajdhani text-white/60 text-sm">
                                {scenario.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {scenario.learned ? (
                              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/50">
                                ✓ Completed
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                className="cyber-button text-xs px-3 py-1"
                                onClick={() => handleLearnMore(scenario.type)}
                              >
                                Learn
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
                    <h4 className="font-orbitron font-semibold text-cyber-blue mb-2">
                      💡 Pro Tip
                    </h4>
                    <p className="font-rajdhani text-white/80 text-sm">
                      Banks and legitimate organizations will never ask for your OTP, PIN, or password over phone or email. Always verify through official channels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Fraud Learning Modal */}
      <FraudLearningModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        topic={selectedTopic}
      />
    </section>
  );
};

export default LiveDemoSection;
