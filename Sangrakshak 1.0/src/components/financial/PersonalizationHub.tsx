import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Lightbulb, TrendingUp, Target, BookOpen, Calculator } from 'lucide-react';

interface UserProfile {
  age: number;
  income: number;
  goals: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  experience: 'beginner' | 'intermediate' | 'advanced';
}

const PersonalizationHub = () => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    income: 600000,
    goals: ['emergency_fund'],
    riskTolerance: 'moderate',
    experience: 'beginner'
  });

  const [showRecommendations, setShowRecommendations] = useState(false);

  const goals = [
    { id: 'emergency_fund', label: 'Emergency Fund' },
    { id: 'home_purchase', label: 'Home Purchase' },
    { id: 'retirement', label: 'Retirement Planning' },
    { id: 'education', label: 'Education Fund' },
    { id: 'travel', label: 'Travel Fund' },
    { id: 'investment', label: 'Investment Growth' }
  ];

  const getPersonalizedTips = () => {
    const tips = [];
    
    // Age-based tips
    if (profile.age < 30) {
      tips.push({
        category: 'Age-Based Advice',
        icon: <User className="w-5 h-5 text-cyber-blue" />,
        title: 'Start Early, Benefit Forever',
        description: 'Your 20s are perfect for building wealth. Focus on SIPs and compound growth.',
        action: 'Start a SIP with ₹5,000/month'
      });
    } else if (profile.age < 40) {
      tips.push({
        category: 'Age-Based Advice', 
        icon: <User className="w-5 h-5 text-cyber-blue" />,
        title: 'Peak Earning Years',
        description: 'Maximize your savings rate and consider tax-saving investments.',
        action: 'Increase SIP by 15% annually'
      });
    } else {
      tips.push({
        category: 'Age-Based Advice',
        icon: <User className="w-5 h-5 text-cyber-blue" />,
        title: 'Focus on Stability',
        description: 'Shift towards debt instruments and secure your retirement.',
        action: 'Review portfolio allocation'
      });
    }

    // Income-based tips
    if (profile.income < 500000) {
      tips.push({
        category: 'Income Optimization',
        icon: <TrendingUp className="w-5 h-5 text-cyber-green" />,
        title: 'Smart Money Management',
        description: 'Focus on expense tracking and building emergency fund first.',
        action: 'Save 20% of income monthly'
      });
    } else if (profile.income < 1000000) {
      tips.push({
        category: 'Income Optimization',
        icon: <TrendingUp className="w-5 h-5 text-cyber-green" />,
        title: 'Investment Opportunities', 
        description: 'You can explore mutual funds and start building wealth.',
        action: 'Start SIP of ₹15,000/month'
      });
    } else {
      tips.push({
        category: 'Income Optimization',
        icon: <TrendingUp className="w-5 h-5 text-cyber-green" />,
        title: 'Wealth Creation Mode',
        description: 'Consider diversified portfolios and tax planning strategies.',
        action: 'Explore ELSS and equity funds'
      });
    }

    // Goal-based tips
    if (profile.goals.includes('emergency_fund')) {
      tips.push({
        category: 'Goal Planning',
        icon: <Target className="w-5 h-5 text-cyber-purple" />,
        title: 'Emergency Fund Priority',
        description: 'Build 6-12 months of expenses in liquid funds first.',
        action: `Target: ₹${(profile.income * 0.5).toLocaleString()}`
      });
    }

    if (profile.goals.includes('home_purchase')) {
      tips.push({
        category: 'Goal Planning',
        icon: <Target className="w-5 h-5 text-cyber-purple" />,
        title: 'Home Buying Strategy',
        description: 'Start systematic saving and consider pre-approved home loans.',
        action: 'Save 20% for down payment'
      });
    }

    return tips;
  };

  const getRecommendedTools = () => {
    const tools = [];

    if (profile.experience === 'beginner') {
      tools.push('EMI Calculator', 'SIP Calculator', 'Budget Tracker');
    } else if (profile.experience === 'intermediate') {
      tools.push('Tax Planner', 'Goal Tracker', 'Investment Calculator');
    } else {
      tools.push('Portfolio Analyzer', 'Risk Calculator', 'Retirement Planner');
    }

    return tools;
  };

  const updateProfile = () => {
    setShowRecommendations(true);
  };

  const toggleGoal = (goalId: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Setup */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-cyber-blue flex items-center">
              <User className="w-5 h-5 mr-2" />
              Your Financial Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Age</Label>
                <Input 
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Annual Income (₹)</Label>
                <Input 
                  type="number"
                  value={profile.income}
                  onChange={(e) => setProfile(prev => ({ ...prev, income: parseInt(e.target.value) || 0 }))}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/80">Risk Tolerance</Label>
              <Select value={profile.riskTolerance} onValueChange={(value: 'conservative' | 'moderate' | 'aggressive') => 
                setProfile(prev => ({ ...prev, riskTolerance: value }))}>
                <SelectTrigger className="bg-cyber-gray/20 border-cyber-blue/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Experience Level</Label>
              <Select value={profile.experience} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                setProfile(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger className="bg-cyber-gray/20 border-cyber-blue/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Financial Goals</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {goals.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-2 rounded-lg border text-xs transition-all ${
                      profile.goals.includes(goal.id)
                        ? 'bg-cyber-blue/20 border-cyber-blue/50 text-cyber-blue'
                        : 'bg-cyber-gray/20 border-cyber-gray text-white/60 hover:border-cyber-blue/30'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={updateProfile} className="w-full bg-cyber-blue hover:bg-cyber-blue/80">
              Get Personalized Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-white">Your Financial Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-cyber-blue/10 rounded-lg">
                <div className="text-2xl font-orbitron font-bold text-cyber-blue">
                  {profile.age < 30 ? '40+' : profile.age < 40 ? '30+' : '20+'}
                </div>
                <div className="text-white/70 text-sm">Years to Retirement</div>
              </div>
              <div className="text-center p-4 bg-cyber-green/10 rounded-lg">
                <div className="text-2xl font-orbitron font-bold text-cyber-green">
                  {Math.round(profile.income * 0.2 / 12 / 1000)}K
                </div>
                <div className="text-white/70 text-sm">Suggested Monthly SIP</div>
              </div>
              <div className="text-center p-4 bg-cyber-purple/10 rounded-lg">
                <div className="text-2xl font-orbitron font-bold text-cyber-purple">
                  {profile.goals.length}
                </div>
                <div className="text-white/70 text-sm">Active Goals</div>
              </div>
              <div className="text-center p-4 bg-cyber-gold/10 rounded-lg">
                <div className="text-2xl font-orbitron font-bold text-cyber-gold">
                  {profile.riskTolerance === 'aggressive' ? 'High' : 
                   profile.riskTolerance === 'moderate' ? 'Med' : 'Low'}
                </div>
                <div className="text-white/70 text-sm">Risk Profile</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Recommended Tools</h4>
              <div className="flex flex-wrap gap-2">
                {getRecommendedTools().map((tool, index) => (
                  <Badge key={index} className="bg-cyber-gray/30 text-cyber-blue border-cyber-blue/30">
                    <Calculator className="w-3 h-3 mr-1" />
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      {showRecommendations && (
        <div className="space-y-4">
          <h3 className="text-xl font-rajdhani text-white flex items-center">
            <Lightbulb className="w-6 h-6 text-cyber-gold mr-2" />
            Personalized Recommendations
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-4">
            {getPersonalizedTips().map((tip, index) => (
              <Card key={index} className="cyber-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-cyber-gray/30 rounded-lg">
                      {tip.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-rajdhani font-semibold text-white">{tip.title}</h4>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 text-xs">
                          {tip.category}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{tip.description}</p>
                      <div className="p-2 bg-cyber-green/10 rounded-lg">
                        <span className="text-cyber-green font-medium text-sm">Action: {tip.action}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Learning Resources */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Personalized Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {profile.experience === 'beginner' ? (
              <>
                <div className="p-4 bg-cyber-blue/10 rounded-lg">
                  <h4 className="text-cyber-blue font-medium mb-2">Week 1-2: Basics</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Understanding compound interest</li>
                    <li>• Emergency fund importance</li>
                    <li>• Basic budgeting</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-green/10 rounded-lg">
                  <h4 className="text-cyber-green font-medium mb-2">Week 3-4: Investment</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• SIP fundamentals</li>
                    <li>• Mutual fund basics</li>
                    <li>• Risk vs Return</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-purple/10 rounded-lg">
                  <h4 className="text-cyber-purple font-medium mb-2">Week 5-6: Planning</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Goal-based investing</li>
                    <li>• Tax planning basics</li>
                    <li>• Portfolio building</li>
                  </ul>
                </div>
              </>
            ) : profile.experience === 'intermediate' ? (
              <>
                <div className="p-4 bg-cyber-blue/10 rounded-lg">
                  <h4 className="text-cyber-blue font-medium mb-2">Advanced Strategies</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Asset allocation models</li>
                    <li>• Rebalancing strategies</li>
                    <li>• Sector rotation</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-green/10 rounded-lg">
                  <h4 className="text-cyber-green font-medium mb-2">Tax Optimization</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• ELSS vs PPF comparison</li>
                    <li>• Capital gains planning</li>
                    <li>• HRA optimization</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-purple/10 rounded-lg">
                  <h4 className="text-cyber-purple font-medium mb-2">Wealth Building</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Direct equity investing</li>
                    <li>• Alternative investments</li>
                    <li>• Real estate planning</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-cyber-blue/10 rounded-lg">
                  <h4 className="text-cyber-blue font-medium mb-2">Portfolio Management</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Multi-asset allocation</li>
                    <li>• International diversification</li>
                    <li>• Options strategies</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-green/10 rounded-lg">
                  <h4 className="text-cyber-green font-medium mb-2">Advanced Planning</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Estate planning</li>
                    <li>• Succession planning</li>
                    <li>• Trust structures</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyber-purple/10 rounded-lg">
                  <h4 className="text-cyber-purple font-medium mb-2">Alternative Investments</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• REITs and InvITs</li>
                    <li>• Commodities trading</li>
                    <li>• Cryptocurrency basics</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationHub;