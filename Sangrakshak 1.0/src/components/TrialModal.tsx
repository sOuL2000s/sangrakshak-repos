import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bot, Eye, Lock, Zap, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const features = [
    {
      icon: Bot,
      title: 'AI Bot Detection',
      description: 'Advanced machine learning algorithms detect and block malicious bots in real-time'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 surveillance of your digital assets with instant threat notifications'
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'Military-grade encryption protects your sensitive information'
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Automated threat response system neutralizes attacks within seconds'
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-cyber-dark border-cyber-blue/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyber-blue" />
              <DialogTitle className="text-white font-orbitron text-xl">Start Your Free Trial</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-white/70 font-rajdhani">
            Experience the full power of Sangrakshak's AI-powered security suite for 14 days, completely free.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-cyber-dark/50 border border-cyber-blue/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyber-blue/20 flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-orbitron text-sm font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/70 font-rajdhani text-xs">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trial Benefits */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-cyber-dark/50 border-cyber-blue/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white font-orbitron text-base">What's Included</CardTitle>
                <CardDescription className="text-white/70 font-rajdhani text-sm">
                  Get full access to all premium features during your 14-day trial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {trialBenefits.slice(0, 4).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/80 font-rajdhani text-sm">
                      <CheckCircle className="w-4 h-4 text-cyber-blue flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyber-blue/20 to-cyber-blue/10 border-cyber-blue/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-white font-orbitron text-base">Trial Details</CardTitle>
                <CardDescription className="text-white/70 font-rajdhani text-sm">
                  Everything you need to know about your free trial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/20">
                  <span className="text-white/70 font-rajdhani text-sm">Duration:</span>
                  <span className="text-white font-medium text-sm">14 Days</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/20">
                  <span className="text-white/70 font-rajdhani text-sm">Cost:</span>
                  <span className="text-cyber-blue font-medium text-sm">FREE</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-cyber-blue/20">
                  <span className="text-white/70 font-rajdhani text-sm">Support:</span>
                  <span className="text-white font-medium text-sm">24/7 Priority</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/70 font-rajdhani text-sm">Cancellation:</span>
                  <span className="text-white font-medium text-sm">Anytime</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-4 border-t border-cyber-blue/20">
            <Link to="/login" onClick={onClose}>
              <Button 
                size="lg" 
                className="bg-cyber-blue hover:bg-cyber-blue/90 text-white font-orbitron font-semibold px-8 py-4 text-base mb-3"
              >
                Start Free Trial Now
              </Button>
            </Link>
            <p className="text-white/60 text-xs font-rajdhani">
              No credit card required • Cancel anytime • Full feature access
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrialModal;