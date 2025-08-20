import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, 
  AlertTriangle, 
  Shield,
  Gift,
  Users,
  ExternalLink,
  CheckCircle,
  X,
  MessageSquare,
  ThumbsUp
} from "lucide-react";

interface SocialMediaScamSimProps {
  onClose: () => void;
}

const socialMediaScenarios = [
  {
    id: 1,
    type: "fake-giveaway",
    title: "Social Media Giveaway",
    post: {
      account: "@fake_brand_official",
      followers: "2.3K followers",
      content: "🎉 MEGA GIVEAWAY! Win iPhone 15 Pro! To enter: 1) Like this post 2) Share 3) Comment your name 4) Send us your address and phone number in DM. Only 24 hours left! ⏰",
      engagement: "10K likes, 5K shares",
      comments: ["Is this real?", "Just sent my details!", "Seems too good to be true"]
    },
    isScam: true,
    redFlags: ["Requests personal info", "Unverified account", "High engagement vs low followers", "Urgency tactics"],
    explanation: "Fake giveaways collect personal data for identity theft and fraud."
  },
  {
    id: 2,
    type: "investment-scheme",
    title: "Investment Opportunity Post",
    post: {
      account: "CryptoMaster_2024",
      content: "💰 I made $50,000 in just 1 week trading crypto! My secret method is only available for 48 hours. Send $200 to learn my strategy. DM for details! 🚀📈 #GetRichQuick #CryptoSecrets",
      images: "Screenshots of fake profits",
      hashtags: "#GetRichQuick #EasyMoney #CryptoSecrets"
    },
    isScam: true,
    redFlags: ["Unrealistic returns", "Pay to learn secrets", "Get rich quick claims", "No credentials shown"],
    explanation: "Investment scams promise unrealistic returns and disappear after taking your money."
  },
  {
    id: 3,
    type: "legitimate-brand",
    title: "Official Brand Post",
    post: {
      account: "@nike ✓",
      followers: "146M followers",
      content: "Just Do It. New Air Max collection now available. Shop now with free shipping on orders over $50. Terms and conditions apply.",
      verification: "Blue check verified",
      website: "Official nike.com link"
    },
    isScam: false,
    positiveFlags: ["Verified account", "Official website", "Reasonable offer", "Clear terms"],
    explanation: "This is legitimate: verified account, realistic offers, official links."
  },
  {
    id: 4,
    type: "phishing-quiz",
    title: "Personality Quiz Scam",
    post: {
      content: "🧠 AMAZING! This quiz reveals your exact personality type! Click here to discover what your birth date says about you! Share your results! [Link to external site that asks for personal details]",
      permissions: "Requests access to: Profile info, Friend list, Email address"
    },
    isScam: true,
    redFlags: ["Requests extensive permissions", "External suspicious link", "Data harvesting quiz", "Too personal questions"],
    explanation: "Personality quizzes often harvest personal data for marketing or identity theft."
  }
];

export const SocialMediaScamSim = ({ onClose }: SocialMediaScamSimProps) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const currentScenario = socialMediaScenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === socialMediaScenarios.length - 1;

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
    return Math.round((correct / socialMediaScenarios.length) * 100);
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
      <VirtualPhone onClose={onClose} title="Social Media Fraud Detection">
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={socialMediaScenarios.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title="Social Media Fraud Detection">
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Post {currentScenarioIndex + 1} of {socialMediaScenarios.length}
          </span>
          <div className="flex gap-1">
            {socialMediaScenarios.map((_, index) => (
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

        {/* Social Media Post */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Share2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm flex items-center gap-1">
                  {currentScenario.post.account}
                  {currentScenario.post.verification && <CheckCircle className="h-3 w-3 text-blue-500" />}
                </p>
                {currentScenario.post.followers && (
                  <p className="text-xs text-muted-foreground">{currentScenario.post.followers}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm">{currentScenario.post.content}</p>

            {currentScenario.post.images && (
              <div className="bg-muted/50 p-3 rounded text-center">
                <p className="text-xs text-muted-foreground">[{currentScenario.post.images}]</p>
              </div>
            )}

            {currentScenario.post.hashtags && (
              <p className="text-sm text-blue-600">{currentScenario.post.hashtags}</p>
            )}

            {currentScenario.post.website && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{currentScenario.post.website}</span>
              </div>
            )}

            {currentScenario.post.permissions && (
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded border border-red-200">
                <p className="text-xs font-semibold text-red-600 mb-1">App Permissions:</p>
                <p className="text-xs text-red-600">{currentScenario.post.permissions}</p>
              </div>
            )}

            {/* Engagement indicators */}
            <div className="flex items-center gap-4 pt-2 border-t border-border/50">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span className="text-xs">Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="text-xs">Comment</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Share2 className="h-3 w-3 mr-1" />
                <span className="text-xs">Share</span>
              </Button>
            </div>

            {currentScenario.post.engagement && (
              <p className="text-xs text-muted-foreground">{currentScenario.post.engagement}</p>
            )}

            {currentScenario.post.comments && (
              <div className="space-y-1">
                <p className="text-xs font-semibold">Comments:</p>
                {currentScenario.post.comments.map((comment, index) => (
                  <p key={index} className="text-xs text-muted-foreground italic">• {comment}</p>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Question */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Is this post fraudulent or suspicious?</h3>
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