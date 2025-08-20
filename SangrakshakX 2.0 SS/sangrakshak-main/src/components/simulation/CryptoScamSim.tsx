import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bitcoin, 
  AlertTriangle, 
  Shield,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  X,
  ExternalLink,
  Award
} from "lucide-react";

interface CryptoScamSimProps {
  onClose: () => void;
}

const cryptoScenarios = [
  {
    id: 1,
    type: "ponzi-scheme",
    title: "High-Yield Investment Program",
    offer: {
      platform: "CryptoGains Pro",
      promise: "Guaranteed 50% returns in 30 days",
      testimonials: "1000+ satisfied investors",
      minimumInvestment: "$500",
      features: ["AI-powered trading", "Risk-free guarantee", "Daily payouts"]
    },
    isScam: true,
    redFlags: ["Guaranteed high returns", "No risk claims", "Pressure to invest quickly", "Unlicensed platform"],
    explanation: "Ponzi schemes promise unrealistic returns and pay early investors with new investor money."
  },
  {
    id: 2,
    type: "fake-exchange",
    title: "New Crypto Exchange",
    platform: {
      name: "CoinTradeX",
      claims: "Lowest fees in the market - 0% trading fees!",
      promotion: "Limited time: Deposit $1000, get $200 bonus",
      website: "cointradex.net (looks professional)",
      regulation: "Claims to be 'fully regulated' with no specific licenses"
    },
    isScam: true,
    redFlags: ["No proper licensing", "Too good to be true fees", "Large deposit bonuses", "New unverified platform"],
    explanation: "Fake exchanges steal your crypto deposits. Always verify licensing and reputation."
  },
  {
    id: 3,
    type: "pump-and-dump",
    title: "Hot Crypto Tip",
    scenario: "You receive this message in a Telegram group:",
    message: "🚀🚀🚀 URGENT: ShitCoin (SHIT) is about to EXPLODE! My insider source says major announcement tomorrow. Buy NOW before it goes 100x! This is not financial advice 😉 But I'm putting my life savings in it! 💎🙌",
    groupInfo: "5000 members, multiple similar messages",
    isScam: true,
    redFlags: ["Pump and dump language", "Insider trading claims", "Pressure to buy immediately", "Unverified coin"],
    explanation: "Pump and dump schemes artificially inflate coin prices before selling, leaving buyers with worthless coins."
  },
  {
    id: 4,
    type: "legitimate-platform",
    title: "Established Exchange",
    platform: {
      name: "Coinbase",
      features: ["SEC regulated", "Insurance coverage", "Transparent fees", "Strong security record"],
      verification: "Publicly traded company",
      education: "Provides educational resources"
    },
    isScam: false,
    positiveFlags: ["Regulated by authorities", "Transparent operations", "Good security track record", "Educational resources"],
    explanation: "Legitimate exchanges are regulated, transparent about fees, and have good security practices."
  },
  {
    id: 5,
    type: "celebrity-scam",
    title: "Celebrity Crypto Giveaway",
    post: {
      account: "Appears to be from Elon Musk",
      content: "I'm giving away 1000 BTC to celebrate Tesla's success! Send 0.1 BTC to this address and I'll send back 2 BTC within 24 hours. Limited time offer!",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      engagement: "Thousands of likes and retweets"
    },
    isScam: true,
    redFlags: ["Fake celebrity account", "Send crypto to receive more", "Too good to be true", "Fake engagement"],
    explanation: "Celebrity crypto giveaway scams are always fake. No legitimate person asks you to send crypto first."
  }
];

export const CryptoScamSim = ({ onClose }: CryptoScamSimProps) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const currentScenario = cryptoScenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === cryptoScenarios.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setWaitingForContinue(true);
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswer === currentScenario.isScam;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isLastScenario) {
      setShowResult(true);
    } else {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setWaitingForContinue(false);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(Boolean).length;
    return Math.round((correct / cryptoScenarios.length) * 100);
  };

  const restart = () => {
    setCurrentScenarioIndex(0);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setWaitingForContinue(false);
  };

  if (showResult) {
    const correct = answers.filter(Boolean).length;
    return (
      <VirtualPhone onClose={onClose} title="Crypto Scam Detection">
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={cryptoScenarios.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title="Crypto Scam Detection">
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Scenario {currentScenarioIndex + 1} of {cryptoScenarios.length}
          </span>
          <div className="flex gap-1">
            {cryptoScenarios.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentScenarioIndex ? 'bg-success' :
                  index === currentScenarioIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scenario Content */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold">{currentScenario.title}</h3>
          </div>

          {currentScenario.type === "ponzi-scheme" && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 p-4 rounded border-2 border-orange-200">
                <h4 className="font-bold text-orange-700 dark:text-orange-300">{currentScenario.offer?.platform}</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-sm"><strong>Promise:</strong> {currentScenario.offer?.promise}</p>
                  <p className="text-sm"><strong>Testimonials:</strong> {currentScenario.offer?.testimonials}</p>
                  <p className="text-sm"><strong>Minimum Investment:</strong> {currentScenario.offer?.minimumInvestment}</p>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold">Features:</p>
                  <ul className="text-sm space-y-1">
                    {currentScenario.offer?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                  Invest Now - Limited Time!
                </Button>
              </div>
            </div>
          )}

          {currentScenario.type === "fake-exchange" && (
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200">
                <h4 className="font-bold text-blue-700 dark:text-blue-300">{currentScenario.platform?.name}</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-sm">{currentScenario.platform?.claims}</p>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded">
                    <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                      {currentScenario.platform?.promotion}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentScenario.platform?.website}</p>
                  <p className="text-xs text-muted-foreground">{currentScenario.platform?.regulation}</p>
                </div>
                <Button className="w-full mt-3">
                  Sign Up & Claim Bonus
                </Button>
              </div>
            </div>
          )}

          {currentScenario.type === "pump-and-dump" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{currentScenario.scenario}</p>
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded border-l-4 border-green-500">
                <p className="text-sm italic">{currentScenario.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{currentScenario.groupInfo}</span>
              </div>
            </div>
          )}

          {currentScenario.type === "legitimate-platform" && (
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded border border-green-200">
                <h4 className="font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {currentScenario.platform?.name}
                </h4>
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-semibold">Security Features:</p>
                  <ul className="text-sm space-y-1">
                    {currentScenario.platform?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm"><strong>Status:</strong> {currentScenario.platform?.verification}</p>
                  <p className="text-sm">{currentScenario.platform?.education}</p>
                </div>
              </div>
            </div>
          )}

          {currentScenario.type === "celebrity-scam" && (
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold">{currentScenario.post?.account}</span>
                </div>
                <p className="text-sm mb-3">{currentScenario.post?.content}</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-xs break-all">
                  {currentScenario.post?.address}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{currentScenario.post?.engagement}</p>
                <Button className="w-full mt-3 bg-blue-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Send Bitcoin Now
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Question */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Is this a cryptocurrency scam?</h3>
          <div className="space-y-3">
            <Button 
              onClick={() => handleAnswer(true)}
              variant={selectedAnswer === true ? "destructive" : "outline"}
              className="w-full justify-start"
              disabled={showFeedback}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Yes, this is a scam
            </Button>
            <Button 
              onClick={() => handleAnswer(false)}
              variant={selectedAnswer === false ? "default" : "outline"}
              className="w-full justify-start"
              disabled={showFeedback}
            >
              <Shield className="h-4 w-4 mr-2" />
              No, this is legitimate
            </Button>
          </div>
        </Card>

        {/* Feedback */}
        {showFeedback && (
          <Card className={`p-4 border-2 ${
            selectedAnswer === currentScenario.isScam ? 'border-success' : 'border-destructive'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentScenario.isScam ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-destructive" />
                    <span className="font-semibold text-destructive">Incorrect</span>
                  </>
                )}
              </div>

              <p className="text-sm">{currentScenario.explanation}</p>

              {currentScenario.isScam && currentScenario.redFlags && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Red flags:</p>
                  <div className="space-y-1">
                    {currentScenario.redFlags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!currentScenario.isScam && currentScenario.positiveFlags && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Positive indicators:</p>
                  <div className="space-y-1">
                    {currentScenario.positiveFlags.map((flag, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {waitingForContinue && (
                <Button onClick={handleContinue} className="w-full mt-4">
                  {isLastScenario ? "View Results" : "Continue"}
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </VirtualPhone>
  );
};