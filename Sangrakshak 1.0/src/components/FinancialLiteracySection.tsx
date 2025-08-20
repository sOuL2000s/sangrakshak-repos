import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Target, PiggyBank, Award, Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CalculatorSection from './financial/CalculatorSection';
import ExpenseTracker from './financial/ExpenseTracker';
import GoalPlanner from './financial/GoalPlanner';
import PersonalizationHub from './financial/PersonalizationHub';
import GamificationPanel from './financial/GamificationPanel';

const FinancialLiteracySection = () => {
  const [activeTab, setActiveTab] = useState('calculators');
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'calculators',
      label: 'Smart Calculators',
      icon: <Calculator className="w-5 h-5" />,
      color: 'cyber-blue'
    },
    {
      id: 'expenses',
      label: 'Expense Tracker',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'cyber-green'
    },
    {
      id: 'goals',
      label: 'Goal Planner',
      icon: <Target className="w-5 h-5" />,
      color: 'cyber-purple'
    },
    {
      id: 'personalization',
      label: 'Personal Hub',
      icon: <PiggyBank className="w-5 h-5" />,
      color: 'cyber-gold'
    },
    {
      id: 'gamification',
      label: 'Achievements',
      icon: <Award className="w-5 h-5" />,
      color: 'cyber-magenta'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      'cyber-blue': 'text-cyber-blue border-cyber-blue/50 bg-cyber-blue/10',
      'cyber-green': 'text-cyber-green border-cyber-green/50 bg-cyber-green/10',
      'cyber-purple': 'text-cyber-purple border-cyber-purple/50 bg-cyber-purple/10',
      'cyber-gold': 'text-cyber-gold border-cyber-gold/50 bg-cyber-gold/10',
      'cyber-magenta': 'text-cyber-magenta border-cyber-magenta/50 bg-cyber-magenta/10'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['cyber-blue'];
  };

  // Keep all components mounted to prevent chart re-rendering
  const tabComponents = [
    { id: 'calculators', component: <CalculatorSection /> },
    { id: 'expenses', component: <ExpenseTracker /> },
    { id: 'goals', component: <GoalPlanner /> },
    { id: 'personalization', component: <PersonalizationHub /> },
    { id: 'gamification', component: <GamificationPanel /> }
  ];

  return (
    <section id="financial-literacy" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50 mb-4">
            <Gamepad2 className="w-4 h-4 mr-2" />
            Financial Literacy & Personal Finance
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Master Your <span className="text-cyber-gold neon-text">Financial Future</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-4xl mx-auto">
            Comprehensive financial tools with gamification, personalized insights, and real-time tracking
            to build smart money habits and achieve your financial goals
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`
                ${activeTab === tab.id
                  ? `${getColorClasses(tab.color)} border-2`
                  : 'bg-cyber-gray/30 border-cyber-blue/30 text-white hover:bg-cyber-blue/10'
                }
                font-rajdhani font-semibold transition-all duration-300 hover:shadow-neon-blue
              `}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* All Section Content - Keep mounted for chart persistence */}
        <div className="min-h-[600px] relative">
          {tabComponents.map(({ id, component }) => (
            <div
              key={id}
              className={`w-full transition-opacity duration-300 ${activeTab === id
                  ? 'opacity-100 relative z-10'
                  : 'opacity-0 absolute inset-0 pointer-events-none z-0'
                }`}
            >
              {component}
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <Card className="cyber-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-orbitron font-bold text-cyber-blue mb-2">50K+</div>
              <div className="font-rajdhani text-white/70">Users Learning</div>
            </CardContent>
          </Card>
          <Card className="cyber-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-orbitron font-bold text-cyber-green mb-2">₹10L+</div>
              <div className="font-rajdhani text-white/70">Money Saved</div>
            </CardContent>
          </Card>
          <Card className="cyber-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-orbitron font-bold text-cyber-blue mb-2">95%</div>
              <div className="font-rajdhani text-white/70">Goal Achievement</div>
            </CardContent>
          </Card>
          <Card className="cyber-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-orbitron font-bold text-cyber-gold mb-2">4.9★</div>
              <div className="font-rajdhani text-white/70">User Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinancialLiteracySection;