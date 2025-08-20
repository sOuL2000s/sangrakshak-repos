
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Crown, Rocket } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { useState, useEffect } from 'react';

const PricingSection = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activePlan, setActivePlan] = useState<any>(null);

  // Load active plan from localStorage on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('activePlan');
    if (savedPlan) {
      setActivePlan(JSON.parse(savedPlan));
    }
  }, []);

  const plans = [
    {
      name: "Basic Shield",
      price: "Free",
      period: "Forever",
      icon: <Zap className="w-6 h-6" />,
      color: "cyber-blue",
      features: [
        "Basic bot detection",
        "Essential security scanning",
        "Financial literacy basics",
        "Community forum access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro Guardian",
      price: "₹999",
      period: "per month",
      icon: <Crown className="w-6 h-6" />,
      color: "cyber-gold",
      features: [
        "Advanced AI threat detection",
        "Real-time security monitoring",
        "Complete financial courses",
        "Fraud simulation training",
        "Priority support",
        "Custom security rules",
        "Advanced analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise Fortress",
      price: "₹4,999",
      period: "per month",
      icon: <Rocket className="w-6 h-6" />,
      color: "cyber-purple",
      features: [
        "Everything in Pro Guardian",
        "Multi-site protection",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support",
        "Advanced threat intelligence",
        "Compliance reporting"
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (plan: any) => {
    if (plan.price === 'Free') {
      // Handle free plan activation immediately
      setActivePlan(plan);
      localStorage.setItem('activePlan', JSON.stringify(plan));
      return;
    }

    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (plan: any) => {
    setActivePlan(plan);
    localStorage.setItem('activePlan', JSON.stringify(plan));
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      'cyber-blue': 'text-cyber-blue border-cyber-blue/50 shadow-neon-blue',
      'cyber-gold': 'text-cyber-gold border-cyber-gold/50 shadow-neon-gold',
      'cyber-purple': 'text-cyber-blue border-cyber-blue/50 shadow-neon-purple'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['cyber-blue'];
  };

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50 mb-4">
            Flexible Pricing
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-cyber-gold neon-text">Protection Level</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            From basic protection to enterprise-grade security, find the perfect plan for your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`cyber-card relative group hover:shadow-cyber transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-cyber-gold/50' : ''
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-cyber-gold text-cyber-dark font-orbitron font-bold px-4 py-1 shadow-lg whitespace-nowrap">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              {activePlan?.name === plan.name && (
                <div className="absolute -top-3 -right-3 z-10">
                  <Badge className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white font-orbitron font-bold px-3 py-1 shadow-lg">
                    ACTIVE
                  </Badge>
                </div>
              )}

              <CardContent className="p-8 space-y-6">
                <div className="scanning-line opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Plan Header */}
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-xl border-2 ${getColorClasses(plan.color)} flex items-center justify-center group-hover:animate-glow-pulse`}>
                    <div className={getColorClasses(plan.color)}>
                      {plan.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="space-y-1">
                      <div className="font-orbitron text-3xl font-black text-white">
                        {plan.price}
                      </div>
                      <div className="font-rajdhani text-white/60">
                        {plan.period}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0" />
                      <span className="font-rajdhani text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full cyber-button ${plan.popular ? 'bg-gradient-to-r from-cyber-gold to-cyber-blue' : ''
                    } ${activePlan?.name === plan.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={activePlan?.name === plan.name}
                >
                  {activePlan?.name === plan.name
                    ? 'Current Plan'
                    : (plan.price === 'Free' ? 'Get Started Free' : 'Choose Plan')
                  }
                </Button>

                {/* Additional Info */}
                <div className="text-center">
                  <p className="font-rajdhani text-xs text-white/60">
                    {plan.price === 'Free' ? 'No credit card required' : '30-day money-back guarantee'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Contact */}
        <div className="text-center mt-16">
          <div className="holographic p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              Need <span className="text-cyber-blue">Custom Enterprise</span> Solution?
            </h3>
            <p className="font-rajdhani text-white/80 mb-6">
              Contact our team for tailored cybersecurity solutions for large organizations
            </p>
            <Button variant="outline" className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10">
              Contact Sales Team
            </Button>
          </div>
        </div>

        {/* Premium Status Display */}
        {activePlan && activePlan.price !== 'Free' && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyber-gold/20 to-cyber-purple/20 border border-cyber-gold/30 rounded-lg px-6 py-3">
              <Crown className="w-5 h-5 text-cyber-gold" />
              <div className="text-left">
                <div className="font-orbitron font-bold text-white">Premium User</div>
                <div className="font-rajdhani text-white/70 text-sm">Active Plan: {activePlan.name}</div>
              </div>
              <CheckCircle className="w-5 h-5 text-cyber-green" />
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </section>
  );
};

export default PricingSection;
