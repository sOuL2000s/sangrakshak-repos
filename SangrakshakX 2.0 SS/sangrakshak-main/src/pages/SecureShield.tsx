import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Zap, 
  Globe, 
  Check, 
  Star, 
  ArrowRight,
  Users,
  BarChart3,
  Lock,
  Eye,
  Clock,
  TrendingUp,
  Server,
  Brain,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/month",
    description: "Perfect for small websites and blogs",
    features: [
      "Basic threat detection",
      "5,000 requests/month", 
      "Email support",
      "Basic analytics",
      "Community forum access"
    ],
    popular: false,
    cta: "Get Started Free",
    color: "from-muted to-muted/50"
  },
  {
    name: "Professional",
    price: "₹999",
    period: "/month", 
    description: "Ideal for growing businesses and e-commerce",
    features: [
      "Advanced AI protection",
      "50,000 requests/month",
      "Priority support",
      "Advanced analytics dashboard",
      "Custom rules engine",
      "API integration",
      "99.9% uptime SLA"
    ],
    popular: true,
    cta: "Start Free Trial",
    color: "from-primary to-primary-glow"
  },
  {
    name: "Enterprise",
    price: "₹2,999",
    period: "/month",
    description: "For large organizations with complex needs",
    features: [
      "Enterprise-grade protection",
      "Unlimited requests",
      "24/7 dedicated support",
      "Custom integrations",
      "White-label solution",
      "Advanced threat intelligence",
      "Custom ML models",
      "SSO integration"
    ],
    popular: false,
    cta: "Contact Sales",
    color: "from-accent to-accent-glow"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms detect sophisticated threats in real-time"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-100ms response times ensure seamless user experience"
  },
  {
    icon: Shield,
    title: "99.9% Accuracy",
    description: "Industry-leading accuracy with minimal false positives"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Distributed infrastructure across 50+ regions worldwide"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "GDPR compliant with zero data retention policies"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights and threat intelligence reports"
  }
];

const stats = [
  { label: "Threats Blocked", value: "2.4M+", icon: Shield },
  { label: "Active Users", value: "15K+", icon: Users },
  { label: "Uptime", value: "99.99%", icon: TrendingUp },
  { label: "Response Time", value: "<50ms", icon: Clock }
];

const SecureShield = () => {
  const [selectedPlan, setSelectedPlan] = useState("Professional");

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge className="mb-4 btn-glow">
              <Shield className="h-3 w-3 mr-1" />
              Next-Gen Security Platform
            </Badge>
            <h1 className="text-5xl font-bold font-orbitron text-gradient">
              SecureShield
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Replace traditional CAPTCHAs with intelligent threat detection. 
              Protect your users while maintaining a seamless experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card">
              Watch Demo
              <Eye className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center hover-lift">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold font-orbitron text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-orbitron mb-4">
              Why Choose SecureShield?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge technology provides unmatched protection while maintaining user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="glass-card hover-lift">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="font-orbitron">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-orbitron mb-4">
              Choose Your Protection Level
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing that scales with your business needs
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card 
                    key={plan.name} 
                    className={`glass-card hover-lift transition-all duration-300 cursor-pointer ${
                      plan.popular 
                        ? 'ring-2 ring-primary shadow-2xl scale-105' 
                        : selectedPlan === plan.name 
                          ? 'ring-1 ring-primary/50' 
                          : ''
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <CardHeader className="text-center space-y-4">
                      {plan.popular && (
                        <Badge className="mb-2 btn-glow">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      <div>
                        <CardTitle className="font-orbitron text-2xl mb-2">
                          {plan.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold font-orbitron">
                          {plan.price}
                          <span className="text-sm text-muted-foreground font-normal">
                            {plan.period}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={`w-full ${plan.popular ? 'btn-glow' : 'glass-card'}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="annual" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card 
                    key={plan.name} 
                    className={`glass-card hover-lift transition-all duration-300 cursor-pointer ${
                      plan.popular 
                        ? 'ring-2 ring-primary shadow-2xl scale-105' 
                        : selectedPlan === plan.name 
                          ? 'ring-1 ring-primary/50' 
                          : ''
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <CardHeader className="text-center space-y-4">
                      {plan.popular && (
                        <Badge className="mb-2 btn-glow">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      <div>
                        <CardTitle className="font-orbitron text-2xl mb-2">
                          {plan.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold font-orbitron">
                          {plan.name === "Starter" ? "₹0" : 
                           plan.name === "Professional" ? "₹799" : "₹2,399"}
                          <span className="text-sm text-muted-foreground font-normal">
                            {plan.period}
                          </span>
                        </div>
                        {plan.name !== "Starter" && (
                          <div className="text-sm text-success">
                            Save ₹{plan.name === "Professional" ? "2,400" : "7,200"}/year
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={`w-full ${plan.popular ? 'btn-glow' : 'glass-card'}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trust Section */}
        <div className="glass-card p-8 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-orbitron">
              Trusted by 15,000+ Businesses Worldwide
            </h3>
            <p className="text-muted-foreground">
              Join thousands of companies protecting their users with SecureShield
            </p>
            <div className="flex justify-center items-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-success" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-success" />
                <span className="text-sm">99.99% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-12 glass-card">
          <h2 className="text-3xl font-bold font-orbitron text-gradient">
            Ready to Secure Your Platform?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with SecureShield today and protect your users from threats while maintaining a seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecureShield;