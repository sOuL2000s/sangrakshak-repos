import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MobileFrame } from './simulation/MobileFrame';
import { GameProgress } from './simulation/GameProgress';
import { ScenarioFeedback } from './simulation/ScenarioFeedback';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Target, Shield, Zap } from 'lucide-react';

export interface UserProgress {
  level: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  badges: string[];
  completedScenarios: string[];
  streakDays: number;
}

export interface ScenarioResult {
  correct: boolean;
  explanation: string;
  xpEarned: number;
  badgeEarned?: string;
}

const FraudSimulationSection = () => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 'beginner',
    xp: 0,
    badges: [],
    completedScenarios: [],
    streakDays: 1
  });
  
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);
  const [scenarioResult, setScenarioResult] = useState<ScenarioResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStartSimulation = () => {
    setIsActive(true);
    setCurrentScenario('sms-phishing-1');
  };

  const handleScenarioComplete = (result: ScenarioResult) => {
    setScenarioResult(result);
    setShowFeedback(true);
    
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + result.xpEarned,
      badges: result.badgeEarned ? [...prev.badges, result.badgeEarned] : prev.badges,
      completedScenarios: [...prev.completedScenarios, currentScenario || '']
    }));
  };

  const handleNextScenario = () => {
    setShowFeedback(false);
    setScenarioResult(null);
    // Logic to determine next scenario based on user progress
    const nextScenarios = ['email-phishing-1', 'whatsapp-scam-1', 'call-fraud-1', 'browser-fake-1'];
    const randomNext = nextScenarios[Math.floor(Math.random() * nextScenarios.length)];
    setCurrentScenario(randomNext);
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setScenarioResult(null);
    // Keep the same scenario
  };

  const levelRequirements = {
    beginner: { min: 0, max: 100 },
    intermediate: { min: 100, max: 250 },
    advanced: { min: 250, max: 500 }
  };

  const currentLevelProgress = () => {
    const current = levelRequirements[userProgress.level];
    return ((userProgress.xp - current.min) / (current.max - current.min)) * 100;
  };

  if (!isActive) {
    return (
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-cyber-blue neon-text">Fraud Simulation</span> Center
            </h2>
            <p className="font-rajdhani text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Practice identifying and responding to cyber fraud in a safe, gamified environment. 
              Learn to spot phishing, OTP scams, fake UPI links, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="cyber-card p-6 text-center">
              <Shield className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
              <h3 className="font-orbitron font-semibold text-white mb-2">SMS Phishing</h3>
              <p className="text-sm text-white/70">Learn to identify suspicious SMS messages</p>
            </Card>
            <Card className="cyber-card p-6 text-center">
              <Trophy className="w-8 h-8 text-cyber-gold mx-auto mb-3" />
              <h3 className="font-orbitron font-semibold text-white mb-2">Email Scams</h3>
              <p className="text-sm text-white/70">Practice spotting fraudulent emails</p>
            </Card>
            <Card className="cyber-card p-6 text-center">
              <Target className="w-8 h-8 text-cyber-green mx-auto mb-3" />
              <h3 className="font-orbitron font-semibold text-white mb-2">Call Frauds</h3>
              <p className="text-sm text-white/70">Handle suspicious phone calls safely</p>
            </Card>
            <Card className="cyber-card p-6 text-center">
              <Zap className="w-8 h-8 text-cyber-magenta mx-auto mb-3" />
              <h3 className="font-orbitron font-semibold text-white mb-2">Fake Websites</h3>
              <p className="text-sm text-white/70">Recognize malicious websites and links</p>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleStartSimulation}
              className="cyber-button text-white text-lg px-8 py-4"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Fraud Simulation
            </Button>
            <p className="text-sm text-white/60 mt-4">
              No registration required • Safe learning environment
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 relative min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <GameProgress 
              userProgress={userProgress}
              currentLevelProgress={currentLevelProgress()}
              onBack={() => setIsActive(false)}
            />
          </div>

          {/* Mobile Simulation Frame */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <MobileFrame 
              currentScenario={currentScenario}
              onScenarioComplete={handleScenarioComplete}
              userLevel={userProgress.level}
            />
          </div>

          {/* Feedback Panel */}
          <div className="lg:col-span-1">
            {showFeedback && scenarioResult ? (
              <ScenarioFeedback 
                result={scenarioResult}
                onNext={handleNextScenario}
                onRetry={handleRetry}
                userProgress={userProgress}
              />
            ) : (
              <Card className="cyber-card p-6">
                <h3 className="font-orbitron font-semibold text-white mb-4">Instructions</h3>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="border-cyber-blue text-cyber-blue">1</Badge>
                    <p>Analyze incoming messages, calls, or emails</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="border-cyber-green text-cyber-green">2</Badge>
                    <p>Choose the appropriate response action</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="border-cyber-gold text-cyber-gold">3</Badge>
                    <p>Learn from instant feedback and explanations</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="border-cyber-magenta text-cyber-magenta">4</Badge>
                    <p>Earn XP and badges for correct responses</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FraudSimulationSection;
