import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { PaymentSecuritySim } from "@/components/simulation/PaymentSecuritySim";
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Smartphone,
  Globe,
  Lock,
  Eye,
  TrendingUp
} from "lucide-react";

const paymentMethods = [
  {
    id: 1,
    name: "UPI Payments",
    description: "Secure instant payments via UPI",
    icon: Smartphone,
    security: "High",
    status: "verified"
  },
  {
    id: 2,
    name: "Credit Cards",
    description: "Protected card transactions",
    icon: CreditCard,
    security: "High",
    status: "verified"
  },
  {
    id: 3,
    name: "Digital Wallets",
    description: "E-wallet security analysis",
    icon: Globe,
    security: "Medium",
    status: "warning"
  },
  {
    id: 4,
    name: "Net Banking",
    description: "Secure online banking",
    icon: Lock,
    security: "High",
    status: "verified"
  }
];

const securityTips = [
  "Always verify merchant credentials before making payments",
  "Use secure networks for online transactions",
  "Enable two-factor authentication on all payment apps",
  "Regularly check bank statements for unauthorized transactions",
  "Never share OTP or PIN with anyone",
  "Use official apps downloaded from verified app stores"
];

const SafePayments = () => {
  const [activeSim, setActiveSim] = useState<"phishing" | "otp" | "card" | null>(null);

  if (activeSim) {
    return <PaymentSecuritySim type={activeSim} onClose={() => setActiveSim(null)} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold font-orbitron text-gradient">
            Safe Payments Lab
          </h1>
          <p className="text-muted-foreground">
            Learn and practice secure payment methods to protect your finances
          </p>
        </div>

        {/* Security Alert */}
        <Alert className="glass-card border-warning/30">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Notice:</strong> This is a safe testing environment. 
            No real money or payment information is processed here.
          </AlertDescription>
        </Alert>

        {/* Payment Security Score */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-orbitron">94/100</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Security Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">248</p>
                <p className="text-sm text-muted-foreground">Safe Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">12</p>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">98.5%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList className="glass-card">
          <TabsTrigger value="methods" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Tests
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Safety Tips
          </TabsTrigger>
        </TabsList>

        {/* Payment Methods */}
        <TabsContent value="methods">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="glass-card hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="font-orbitron flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    {method.name}
                    {method.status === 'verified' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Security Level:</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        method.security === 'High' ? 'text-success' : 
                        method.security === 'Medium' ? 'text-warning' : 'text-destructive'
                      }`}
                    >
                      {method.security}
                    </Badge>
                  </div>

                  <Button 
                    className="w-full btn-glow text-sm"
                    onClick={() => setActiveSim("card")}
                  >
                    Test Security
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Simulation */}
        <TabsContent value="simulation">
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Payment Security Simulation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <Card 
                    className="border-2 border-dashed border-muted hover:border-primary transition-colors cursor-pointer hover-lift"
                    onClick={() => setActiveSim("phishing")}
                  >
                    <CardContent className="p-4 md:p-6 text-center">
                      <Shield className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 text-sm md:text-base">Phishing Detection</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Identify fake payment pages</p>
                      <Button className="mt-4 w-full" size="sm">Start Test</Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="border-2 border-dashed border-muted hover:border-primary transition-colors cursor-pointer hover-lift"
                    onClick={() => setActiveSim("otp")}
                  >
                    <CardContent className="p-4 md:p-6 text-center">
                      <Lock className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 text-sm md:text-base">OTP Security</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Learn OTP best practices</p>
                      <Button className="mt-4 w-full" size="sm">Start Test</Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="border-2 border-dashed border-muted hover:border-primary transition-colors cursor-pointer hover-lift"
                    onClick={() => setActiveSim("card")}
                  >
                    <CardContent className="p-4 md:p-6 text-center">
                      <CreditCard className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2 text-sm md:text-base">Card Safety</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Secure card usage tips</p>
                      <Button className="mt-4 w-full" size="sm">Start Test</Button>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="glass-card border-primary/30">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    These simulations use realistic scenarios but no actual financial data. 
                    Practice safely to improve your payment security awareness.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Safety Tips */}
        <TabsContent value="tips">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Essential Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Red Flags to Watch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Urgent payment requests via SMS/email",
                    "Requests for banking credentials",
                    "Unsecured payment pages (no HTTPS)",
                    "Too-good-to-be-true offers",
                    "Pressure to complete transactions quickly",
                    "Requests to download unknown apps"
                  ].map((flag, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{flag}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  );
};

export default SafePayments;