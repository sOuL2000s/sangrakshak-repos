import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, PieChart, TrendingUp, Banknote } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell } from 'recharts';

const CalculatorSection = () => {
  const [activeCalculator, setActiveCalculator] = useState('emi');
  const [results, setResults] = useState<any>(null);

  const calculators = [
    { id: 'emi', name: 'EMI Calculator', icon: <DollarSign className="w-4 h-4" />, color: 'cyber-blue' },
    { id: 'sip', name: 'SIP Calculator', icon: <TrendingUp className="w-4 h-4" />, color: 'cyber-green' },
    { id: 'budget', name: 'Budget Split', icon: <PieChart className="w-4 h-4" />, color: 'cyber-purple' },
    { id: 'tax', name: 'Tax Estimator', icon: <Calculator className="w-4 h-4" />, color: 'cyber-gold' },
    { id: 'retirement', name: 'Retirement Planner', icon: <Banknote className="w-4 h-4" />, color: 'cyber-magenta' }
  ];

  const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState('1000000');
    const [interestRate, setInterestRate] = useState('8.5');
    const [tenure, setTenure] = useState('20');

    const calculateEMI = () => {
      const P = parseFloat(loanAmount);
      const R = parseFloat(interestRate) / 12 / 100;
      const N = parseFloat(tenure) * 12;
      
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmount = emi * N;
      const totalInterest = totalAmount - P;

      // Generate chart data
      const chartData = [];
      let balance = P;
      for (let i = 1; i <= Math.min(N, 240); i++) {
        const interestPayment = balance * R;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;
        
        if (i % 12 === 0) {
          chartData.push({
            year: i / 12,
            remainingBalance: Math.max(0, balance),
            totalPaid: emi * i,
            principal: P - balance
          });
        }
      }

      setResults({
        emi: emi.toFixed(0),
        totalAmount: totalAmount.toFixed(0),
        totalInterest: totalInterest.toFixed(0),
        chartData
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-cyber-blue font-rajdhani">Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white/80">Loan Amount (₹)</Label>
                <Input 
                  type="number" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Interest Rate (%)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Tenure (Years)</Label>
                <Input 
                  type="number" 
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
              <Button onClick={calculateEMI} className="w-full bg-cyber-blue hover:bg-cyber-blue/80">
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-cyber-green font-rajdhani">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-cyber-blue/10 rounded-lg">
                    <span className="text-white/80">Monthly EMI</span>
                    <span className="font-orbitron text-cyber-blue font-bold">₹{parseInt(results.emi).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyber-green/10 rounded-lg">
                    <span className="text-white/80">Total Amount</span>
                    <span className="font-orbitron text-cyber-green font-bold">₹{parseInt(results.totalAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyber-gold/10 rounded-lg">
                    <span className="text-white/80">Total Interest</span>
                    <span className="font-orbitron text-cyber-gold font-bold">₹{parseInt(results.totalInterest).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {results && (
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-white font-rajdhani">Payment Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #00E5FF',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="remainingBalance" stroke="#00E5FF" strokeWidth={2} />
                    <Line type="monotone" dataKey="principal" stroke="#00FF88" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const SIPCalculator = () => {
    const [monthlyAmount, setMonthlyAmount] = useState('5000');
    const [expectedReturn, setExpectedReturn] = useState('12');
    const [timePeriod, setTimePeriod] = useState('15');

    const calculateSIP = () => {
      const P = parseFloat(monthlyAmount);
      const r = parseFloat(expectedReturn) / 12 / 100;
      const n = parseFloat(timePeriod) * 12;
      
      const maturityValue = P * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      const totalReturns = maturityValue - totalInvestment;

      // Generate chart data
      const chartData = [];
      for (let year = 1; year <= parseInt(timePeriod); year++) {
        const months = year * 12;
        const value = P * (((Math.pow(1 + r, months)) - 1) / r) * (1 + r);
        const invested = P * months;
        chartData.push({
          year,
          maturityValue: value,
          totalInvestment: invested,
          returns: value - invested
        });
      }

      setResults({
        maturityValue: maturityValue.toFixed(0),
        totalInvestment: totalInvestment.toFixed(0),
        totalReturns: totalReturns.toFixed(0),
        chartData
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-cyber-green font-rajdhani">SIP Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white/80">Monthly Amount (₹)</Label>
                <Input 
                  type="number" 
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-green/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Expected Return (%)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-green/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Time Period (Years)</Label>
                <Input 
                  type="number" 
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="bg-cyber-gray/20 border-cyber-green/30 text-white"
                />
              </div>
              <Button onClick={calculateSIP} className="w-full bg-cyber-green hover:bg-cyber-green/80">
                Calculate SIP
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-cyber-green font-rajdhani">Projected Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-cyber-green/10 rounded-lg">
                    <span className="text-white/80">Maturity Value</span>
                    <span className="font-orbitron text-cyber-green font-bold">₹{parseInt(results.maturityValue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyber-blue/10 rounded-lg">
                    <span className="text-white/80">Total Investment</span>
                    <span className="font-orbitron text-cyber-blue font-bold">₹{parseInt(results.totalInvestment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyber-gold/10 rounded-lg">
                    <span className="text-white/80">Total Returns</span>
                    <span className="font-orbitron text-cyber-gold font-bold">₹{parseInt(results.totalReturns).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {results && (
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-white font-rajdhani">Investment Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1A1A', 
                        border: '1px solid #00FF88',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="maturityValue" stroke="#00FF88" strokeWidth={2} />
                    <Line type="monotone" dataKey="totalInvestment" stroke="#00E5FF" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'emi':
        return <EMICalculator />;
      case 'sip':
        return <SIPCalculator />;
      case 'budget':
        return (
          <Card className="cyber-card">
            <CardContent className="p-8 text-center">
              <PieChart className="w-16 h-16 text-cyber-purple mx-auto mb-4" />
              <h3 className="text-xl font-rajdhani text-white mb-2">Budget Split Calculator</h3>
              <p className="text-white/70">Coming Soon - Split your budget across categories</p>
            </CardContent>
          </Card>
        );
      case 'tax':
        return (
          <Card className="cyber-card">
            <CardContent className="p-8 text-center">
              <Calculator className="w-16 h-16 text-cyber-gold mx-auto mb-4" />
              <h3 className="text-xl font-rajdhani text-white mb-2">Tax Estimator</h3>
              <p className="text-white/70">Coming Soon - Calculate your tax liability</p>
            </CardContent>
          </Card>
        );
      case 'retirement':
        return (
          <Card className="cyber-card">
            <CardContent className="p-8 text-center">
              <Banknote className="w-16 h-16 text-cyber-magenta mx-auto mb-4" />
              <h3 className="text-xl font-rajdhani text-white mb-2">Retirement Planner</h3>
              <p className="text-white/70">Coming Soon - Plan your retirement goals</p>
            </CardContent>
          </Card>
        );
      default:
        return <EMICalculator />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Calculator Tabs */}
      <div className="flex flex-wrap gap-3 justify-center">
        {calculators.map((calc) => (
          <Button
            key={calc.id}
            variant={activeCalculator === calc.id ? "default" : "outline"}
            onClick={() => setActiveCalculator(calc.id)}
            className={`
              ${activeCalculator === calc.id 
                ? `bg-${calc.color}/20 text-${calc.color} border-${calc.color}/50` 
                : 'bg-cyber-gray/20 border-cyber-blue/30 text-white hover:bg-cyber-blue/10'
              }
              font-rajdhani transition-all duration-300
            `}
          >
            {calc.icon}
            <span className="ml-2">{calc.name}</span>
          </Button>
        ))}
      </div>

      {/* Active Calculator */}
      {renderCalculator()}
    </div>
  );
};

export default CalculatorSection;