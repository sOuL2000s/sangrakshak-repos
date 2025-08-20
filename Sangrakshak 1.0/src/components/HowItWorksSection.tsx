
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Settings, Shield, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: <Download className="w-8 h-8" />,
      title: "Quick Integration",
      description: "Install our plug-and-play security module with just one line of code. No complex setup required.",
      color: "cyber-blue"
    },
    {
      step: "02",
      icon: <Settings className="w-8 h-8" />,
      title: "AI Configuration",
      description: "Our AI automatically learns your website patterns and configures optimal security settings.",
      color: "cyber-blue"
    }

    ,
    {
      step: "03",
      icon: <Shield className="w-8 h-8" />,
      title: "Real-time Protection",
      description: "Start blocking threats immediately while accessing financial literacy modules.",
      color: "cyber-green"
    },
    {
      step: "04",
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Improve your cybersecurity knowledge and financial literacy through interactive courses.",
      color: "cyber-gold"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      'cyber-blue': 'text-cyber-blue border-cyber-blue/50',
      'cyber-purple': 'text-cyber-purple border-cyber-purple/50',
      'cyber-green': 'text-cyber-green border-cyber-green/50',
      'cyber-gold': 'text-cyber-gold border-cyber-gold/50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['cyber-blue'];
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 mb-4">
            Simple Process
          </Badge>

          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            How <span className="text-cyber-blue neon-text">Sangrakshak</span> Works
          </h2>

          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            Get started with enterprise-grade protection and financial education in just 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-cyber-blue to-cyber-purple opacity-50"></div>
              )}

              <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''} space-y-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full border-2 ${getColorClasses(step.color)} flex items-center justify-center font-orbitron font-bold text-lg animate-glow-pulse`}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-orbitron text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-rajdhani text-lg text-white/80 leading-relaxed pl-20">
                    {step.description}
                  </p>
                </div>

                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Card className="cyber-card group hover:shadow-cyber transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="scanning-line opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className={`w-20 h-20 mx-auto rounded-xl border-2 ${getColorClasses(step.color)} flex items-center justify-center mb-6 group-hover:animate-glow-pulse`}>
                        <div className={getColorClasses(step.color)}>
                          {step.icon}
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <div className="font-orbitron text-sm text-cyber-blue tracking-wider">
                          STEP {step.step}
                        </div>
                        <h4 className="font-orbitron text-xl font-semibold text-white">
                          {step.title}
                        </h4>
                        {/* Demo visualization based on step */}
                        {index === 0 && (
                          <div className="bg-cyber-gray/30 p-4 rounded-lg font-mono text-sm">
                            <span className="text-cyber-green">$</span> <span className="text-white">npm install sangrakshak</span>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/60">AI Learning Progress</span>
                              <span className="text-cyber-blue">87%</span>
                            </div>
                            <div className="w-full bg-cyber-gray rounded-full h-2">
                              <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple h-2 rounded-full animate-pulse" style={{ width: '87%' }}></div>
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="text-left space-y-1 text-xs font-mono">
                            <div className="text-cyber-green">✓ Bot blocked: 192.168.1.100</div>
                            <div className="text-cyber-blue">✓ XSS attempt prevented</div>
                            <div className="text-cyber-gold">✓ Fraud alert sent</div>
                          </div>
                        )}
                        {index === 3 && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-cyber-blue/20 p-2 rounded text-xs">
                              <div className="text-cyber-blue font-semibold">Cyber Score</div>
                              <div className="text-white font-bold">95/100</div>
                            </div>
                            <div className="bg-cyber-gold/20 p-2 rounded text-xs">
                              <div className="text-cyber-gold font-semibold">Finance IQ</div>
                              <div className="text-white font-bold">Level 7</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
