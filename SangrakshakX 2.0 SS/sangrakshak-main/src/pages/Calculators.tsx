import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { 
  Calculator, 
  Home, 
  TrendingUp, 
  PiggyBank,
  CreditCard,
  Target,
  DollarSign
} from "lucide-react";

const Calculators = () => {
  const [emiInputs, setEmiInputs] = useState({
    principal: "",
    rate: "",
    tenure: ""
  });

  const [sipInputs, setSipInputs] = useState({
    amount: "",
    rate: "",
    years: ""
  });

  const [emiResult, setEmiResult] = useState<number | null>(null);
  const [sipResult, setSipResult] = useState<{maturityAmount: number, totalInvestment: number} | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(emiInputs.principal);
    const r = parseFloat(emiInputs.rate) / 12 / 100;
    const n = parseFloat(emiInputs.tenure) * 12;
    
    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmiResult(Math.round(emi));
    }
  };

  const calculateSIP = () => {
    const P = parseFloat(sipInputs.amount);
    const r = parseFloat(sipInputs.rate) / 12 / 100;
    const n = parseFloat(sipInputs.years) * 12;
    
    if (P && r && n) {
      const maturityAmount = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      setSipResult({
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: Math.round(totalInvestment)
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-gradient">
          Financial Calculators
        </h1>
        <p className="text-muted-foreground">
          Plan your finances with our comprehensive calculation tools
        </p>
      </div>

      <Tabs defaultValue="emi" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit glass-card">
          <TabsTrigger value="emi" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            EMI
          </TabsTrigger>
          <TabsTrigger value="sip" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            SIP
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Savings
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Tax
          </TabsTrigger>
        </TabsList>

        {/* EMI Calculator */}
        <TabsContent value="emi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  EMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="principal">Loan Amount (₹)</Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="Enter loan amount"
                    value={emiInputs.principal}
                    onChange={(e) => setEmiInputs({...emiInputs, principal: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                  <Input
                    id="rate"
                    type="number"
                    placeholder="Enter interest rate"
                    value={emiInputs.rate}
                    onChange={(e) => setEmiInputs({...emiInputs, rate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="Enter loan tenure"
                    value={emiInputs.tenure}
                    onChange={(e) => setEmiInputs({...emiInputs, tenure: e.target.value})}
                  />
                </div>
                <Button onClick={calculateEMI} className="w-full btn-glow">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            {emiResult && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-orbitron">EMI Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-3xl font-bold font-orbitron text-primary">
                      ₹{emiResult.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="font-semibold">₹{parseFloat(emiInputs.principal).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="font-semibold">₹{((emiResult * parseFloat(emiInputs.tenure) * 12) - parseFloat(emiInputs.principal)).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* SIP Calculator */}
        <TabsContent value="sip">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  SIP Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                  <Input
                    id="sipAmount"
                    type="number"
                    placeholder="Enter monthly SIP amount"
                    value={sipInputs.amount}
                    onChange={(e) => setSipInputs({...sipInputs, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sipRate">Expected Annual Return (%)</Label>
                  <Input
                    id="sipRate"
                    type="number"
                    placeholder="Enter expected return"
                    value={sipInputs.rate}
                    onChange={(e) => setSipInputs({...sipInputs, rate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sipYears">Investment Period (Years)</Label>
                  <Input
                    id="sipYears"
                    type="number"
                    placeholder="Enter investment period"
                    value={sipInputs.years}
                    onChange={(e) => setSipInputs({...sipInputs, years: e.target.value})}
                  />
                </div>
                <Button onClick={calculateSIP} className="w-full btn-glow">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Calculate SIP
                </Button>
              </CardContent>
            </Card>

            {sipResult && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-orbitron">SIP Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Maturity Amount</p>
                    <p className="text-3xl font-bold font-orbitron text-primary">
                      ₹{sipResult.maturityAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                      <p className="font-semibold">₹{sipResult.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Gains</p>
                      <p className="font-semibold text-success">₹{(sipResult.maturityAmount - sipResult.totalInvestment).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Savings Calculator */}
        <TabsContent value="savings">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                Savings Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <PiggyBank className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Coming Soon</p>
                <p className="text-sm text-muted-foreground">Advanced savings calculator with inflation adjustment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Calculator */}
        <TabsContent value="tax">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Tax Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Coming Soon</p>
                <p className="text-sm text-muted-foreground">Income tax calculator with latest tax slabs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card hover-lift hover-glow cursor-pointer">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-orbitron font-semibold mb-2">Credit Score</h3>
            <p className="text-sm text-muted-foreground">Check your credit score and improve it</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift hover-glow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-orbitron font-semibold mb-2">Goal Planner</h3>
            <p className="text-sm text-muted-foreground">Plan and track your financial goals</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift hover-glow cursor-pointer">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-orbitron font-semibold mb-2">Expense Tracker</h3>
            <p className="text-sm text-muted-foreground">Monitor and categorize your expenses</p>
          </CardContent>
        </Card>
      </div>
      </div>
    </Layout>
  );
};

export default Calculators;