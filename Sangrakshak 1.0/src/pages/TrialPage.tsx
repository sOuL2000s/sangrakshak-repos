import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Bot, Eye, Lock, Zap, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TrialPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Bot,
      title: 'AI Bot Detection',
      description: 'Advanced machine learning algorithms detect and block malicious bots in real-time',
      included: true
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 surveillance of your digital assets with instant threat notifications',
      included: true
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'Military-grade encryption protects your sensitive information',
      included: true
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Automated threat response system neutralizes attacks within seconds',
      included: true
    },
    {
      icon: Shield,
      title: 'Fraud Prevention',
      description: 'Comprehensive protection against phishing, malware, and social engineering',
      included: true
    }
  ];

  const trialBenefits = [
    'Full access to all security features',
    'AI-powered threat detection',
    'Real-time alerts and notifications',
    'Comprehensive financial literacy modules',
    'Multi-language support',
    'Priority customer support',
    'No commitment required'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-dark/90 to-cyber-blue/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-cyber-blue hover:text-cyber-blue/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyber-blue/20 text-cyber-blue text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            FREE TRIAL
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-rajdhani">
            Experience the full power of Sangrakshak's AI-powered security suite for 14 days, completely free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-cyber-dark/50 border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyber-blue/20">
                    <feature.icon className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <CardTitle className="text-white font-orbitron">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 font-rajdhani">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trial Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-cyber-dark/50 border-cyber-blue/20">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">What's Included in Your Trial</CardTitle>
              <CardDescription className="text-white/70 font-rajdhani">
                Get full access to all premium features during your 14-day trial period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {trialBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/80 font-rajdhani">
                    <CheckCircle className="w-5 h-5 text-cyber-blue flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyber-blue/20 to-cyber-blue/10 border-cyber-blue/30">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Trial Details</CardTitle>
              <CardDescription className="text-white/70 font-rajdhani">
                Everything you need to know about your free trial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                <span className="text-white/70 font-rajdhani">Duration:</span>
                <span className="text-white font-medium">14 Days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                <span className="text-white/70 font-rajdhani">Cost:</span>
                <span className="text-cyber-blue font-medium">FREE</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                <span className="text-white/70 font-rajdhani">Support:</span>
                <span className="text-white font-medium">24/7 Priority</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/70 font-rajdhani">Cancellation:</span>
                <span className="text-white font-medium">Anytime</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-cyber-blue hover:bg-cyber-blue/90 text-white font-orbitron font-semibold px-8 py-6 text-lg"
          >
            Start Free Trial Now
          </Button>
          <p className="text-white/60 text-sm mt-4 font-rajdhani">
            No credit card required • Cancel anytime • Full feature access
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;