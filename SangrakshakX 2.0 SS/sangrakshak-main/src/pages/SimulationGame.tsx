import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Layout } from "@/components/layout/Layout";
import { EmailPhishingGame } from "@/components/simulation/EmailPhishingGame";
import { TechSupportScamSim } from "@/components/simulation/TechSupportScamSim";
import { RomanceScamSim } from "@/components/simulation/RomanceScamSim";
import { SocialMediaScamSim } from "@/components/simulation/SocialMediaScamSim";
import { CryptoScamSim } from "@/components/simulation/CryptoScamSim";
import { 
  Play, 
  RefreshCw, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  CreditCard,
  Trophy,
  Target,
  Heart,
  Users
} from "lucide-react";

const scenarios = [
  {
    id: 1,
    title: "Phishing Email Detection",
    description: "Learn to identify fake emails and protect your data",
    difficulty: "Beginner",
    category: "Email Security",
    duration: "5 min",
    completed: true,
    score: 95
  },
  {
    id: 2,
    title: "Fake Investment Schemes",
    description: "Spot fraudulent investment opportunities",
    difficulty: "Intermediate",
    category: "Financial Fraud",
    duration: "8 min",
    completed: true,
    score: 87
  },
  {
    id: 3,
    title: "Romance Scam Awareness",
    description: "Protect yourself from online dating scams",
    difficulty: "Intermediate",
    category: "Social Engineering",
    duration: "10 min",
    completed: false,
    score: null
  },
  {
    id: 4,
    title: "Tech Support Scams",
    description: "Identify fake technical support calls",
    difficulty: "Beginner",
    category: "Phone Scams",
    duration: "6 min",
    completed: false,
    score: null
  },
  {
    id: 5,
    title: "Social Media Fraud",
    description: "Recognize scams on social platforms",
    difficulty: "Intermediate",
    category: "Social Engineering",
    duration: "7 min",
    completed: false,
    score: null
  },
  {
    id: 6,
    title: "Cryptocurrency Scams",
    description: "Avoid crypto investment frauds",
    difficulty: "Advanced",
    category: "Financial Fraud",
    duration: "12 min",
    completed: false,
    score: null
  }
];

const SimulationGame = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [showEmailGame, setShowEmailGame] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-success";
      case "Intermediate": return "text-warning";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Email Security": return Mail;
      case "Financial Fraud": return CreditCard;
      case "Social Engineering": return Users;
      case "Phone Scams": return Phone;
      default: return AlertTriangle;
    }
  };

  const handleStartSimulation = (scenarioId: number) => {
    setSelectedScenario(scenarioId);
    if (scenarioId === 1) {
      setShowEmailGame(true);
    }
  };

  if (showEmailGame) {
    return <EmailPhishingGame onClose={() => setShowEmailGame(false)} />;
  }

  if (selectedScenario === 4) {
    return <TechSupportScamSim onClose={() => setSelectedScenario(null)} />;
  }

  if (selectedScenario === 3) {
    return <RomanceScamSim onClose={() => setSelectedScenario(null)} />;
  }

  if (selectedScenario === 5) {
    return <SocialMediaScamSim onClose={() => setSelectedScenario(null)} />;
  }

  if (selectedScenario === 6) {
    return <CryptoScamSim onClose={() => setSelectedScenario(null)} />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold font-orbitron text-gradient">
            Fraud Simulation Game
          </h1>
          <p className="text-muted-foreground">
            Practice identifying scams and frauds in a safe environment
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-orbitron">1,250</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-orbitron">91%</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-orbitron">2</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold font-orbitron">5</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert */}
        <Alert className="glass-card border-primary/30">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            These simulations are designed to educate you about common fraud tactics. 
            No real personal information is used or at risk during these exercises.
          </AlertDescription>
        </Alert>

        {/* Scenario Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {scenarios.map((scenario) => {
          const CategoryIcon = getCategoryIcon(scenario.category);
          return (
            <Card 
              key={scenario.id} 
              className={`glass-card hover-lift hover-glow cursor-pointer transition-all duration-300 ${
                selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="font-orbitron flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                      {scenario.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {scenario.description}
                    </p>
                  </div>
                  {scenario.completed && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline" className={getDifficultyColor(scenario.difficulty)}>
                    {scenario.difficulty}
                  </Badge>
                  <span className="text-muted-foreground">{scenario.category}</span>
                  <span className="text-muted-foreground">{scenario.duration}</span>
                </div>

                {scenario.score && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last Score:</span>
                    <Badge variant="secondary" className="text-success">
                      {scenario.score}%
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-auto">
                  {scenario.completed ? (
                    <Button 
                      className="btn-glow w-full text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartSimulation(scenario.id);
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Play Again
                    </Button>
                  ) : (
                    <Button 
                      className="btn-glow w-full text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartSimulation(scenario.id);
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Simulation
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
          })}
        </div>

        {/* Leaderboard */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-orbitron flex items-center gap-2 text-lg md:text-xl">
              <Trophy className="h-5 w-5 text-warning" />
              Top Performers This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { rank: 1, name: "Alex Chen", score: 2450, badge: "🥇" },
                { rank: 2, name: "Sarah Kumar", score: 2380, badge: "🥈" },
                { rank: 3, name: "Mike Johnson", score: 2310, badge: "🥉" },
                { rank: 4, name: "Lisa Wang", score: 2290, badge: "" },
                { rank: 5, name: "You", score: 1250, badge: "", highlight: true }
              ].map((player) => (
                <div 
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    player.highlight ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm md:text-lg">{player.badge || `#${player.rank}`}</span>
                    <span className={`font-medium text-sm md:text-base ${player.highlight ? 'text-primary' : ''}`}>
                      {player.name}
                    </span>
                  </div>
                  <span className="font-orbitron font-bold text-sm md:text-base">{player.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SimulationGame;