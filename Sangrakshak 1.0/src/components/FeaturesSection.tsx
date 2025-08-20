
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Bot, Brain, Globe, TrendingUp, Users, Zap, Eye, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Bot Detection",
      description: "Advanced machine learning algorithms detect and block malicious bots in real-time",
      color: "cyber-blue",
      badge: "AI Powered"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Web Security Shield",
      description: "Comprehensive protection against XSS, CSRF, and injection attacks",
      color: "cyber-green",
      badge: "Real-time"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Fraud Simulation",
      description: "Interactive scenarios to learn about phishing, OTP scams, and financial frauds",
      color: "cyber-blue",
      badge: "Educational"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Analytics",
      description: "Track your financial health with AI-powered insights and recommendations",
      color: "cyber-gold",
      badge: "Analytics"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Support",
      description: "Available in English, Hindi, and Punjabi for broader accessibility",
      color: "cyber-magenta",
      badge: "Global"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Learning",
      description: "Learn from peers and experts in our cybersecurity and finance forums",
      color: "cyber-blue",
      badge: "Community"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "24/7 threat monitoring with instant alerts and automated responses",
      color: "cyber-green",
      badge: "24/7"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Threat Intelligence",
      description: "Global threat feeds and predictive analysis for proactive protection",
      color: "cyber-blue",
      badge: "Predictive"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Encryption",
      description: "Military-grade encryption for all your sensitive financial data",
      color: "cyber-gold",
      badge: "Secure"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      'cyber-blue': 'text-cyber-blue border-cyber-blue/50 shadow-neon-blue',
      'cyber-green': 'text-cyber-green border-cyber-green/50 shadow-neon-blue',
      'cyber-purple': 'text-cyber-blue border-cyber-blue/50 shadow-neon-blue',
      'cyber-gold': 'text-cyber-gold border-cyber-gold/50 shadow-neon-gold',
      'cyber-magenta': 'text-cyber-magenta border-cyber-magenta/50 shadow-neon-blue'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['cyber-blue'];
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 mb-4">
            Advanced Features
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Cutting-Edge <span className="text-cyber-blue neon-text">Protection</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            Experience next-generation cybersecurity combined with comprehensive financial education in one powerful platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="cyber-card group hover:shadow-cyber transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-6 space-y-4">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg border-2 ${getColorClasses(feature.color)} group-hover:animate-glow-pulse`}>
                    <div className={`${getColorClasses(feature.color)}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <Badge className="bg-cyber-gray/50 text-cyber-blue border-cyber-blue/30 text-xs">
                    {feature.badge}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-orbitron text-xl font-semibold text-white group-hover:text-cyber-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-rajdhani text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Scan Effect */}
                <div className="scanning-line opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="holographic p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              Ready to Experience <span className="text-cyber-blue">Ultimate Protection</span>?
            </h3>
            <p className="font-rajdhani text-white/80 mb-6">
              Join 150,000+ users who trust Sangrakshak for their digital security and financial education
            </p>
            <Link to="/trial">
              <button className="cyber-button">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
