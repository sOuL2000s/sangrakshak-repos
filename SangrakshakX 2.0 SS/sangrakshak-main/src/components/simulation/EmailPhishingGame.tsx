import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  AlertTriangle, 
  Shield,
  ExternalLink,
  Download,
  Calendar,
  Clock
} from "lucide-react";

interface EmailPhishingGameProps {
  onClose: () => void;
}

const phishingEmails = [
  {
    id: 1,
    from: "security@amazone.com",
    subject: "URGENT: Account Suspended - Verify Now!",
    body: "Your account has been suspended due to suspicious activity. Click here to verify immediately or your account will be permanently deleted within 24 hours.",
    isPhishing: true,
    redFlags: ["Suspicious domain (amazone.com vs amazon.com)", "Urgent language", "Threat of account deletion"],
    time: "2 min ago"
  },
  {
    id: 2,
    from: "notifications@yourbank.com",
    subject: "Monthly Statement Available",
    body: "Your monthly bank statement for March 2024 is now available in your online banking portal. Please log in to view your statement.",
    isPhishing: false,
    time: "1 hour ago"
  },
  {
    id: 3,
    from: "winner@lottery-prize.net",
    subject: "🎉 You've Won $50,000! Claim Now!",
    body: "Congratulations! You have been selected as our weekly lottery winner. To claim your prize, please provide your bank details and pay the processing fee of $500.",
    isPhishing: true,
    redFlags: ["Unknown sender", "Too good to be true", "Requests bank details", "Upfront fee required"],
    time: "3 hours ago"
  },
  {
    id: 4,
    from: "team@github.com",
    subject: "Security alert: New sign-in to your account",
    body: "A new sign-in to your GitHub account was detected from Chrome on Windows. If this was you, you can safely ignore this email.",
    isPhishing: false,
    time: "5 hours ago"
  }
];

export const EmailPhishingGame = ({ onClose }: EmailPhishingGameProps) => {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const currentEmail = phishingEmails[currentEmailIndex];
  const isLastEmail = currentEmailIndex === phishingEmails.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setWaitingForContinue(true);
  };

  const handleContinue = () => {
    const newAnswers = [...answers, selectedAnswer === currentEmail.isPhishing];
    setAnswers(newAnswers);
    
    if (isLastEmail) {
      setShowResult(true);
    } else {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setWaitingForContinue(false);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(Boolean).length;
    return Math.round((correct / phishingEmails.length) * 100);
  };

  const restart = () => {
    setCurrentEmailIndex(0);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const correct = answers.filter(Boolean).length;
    return (
      <VirtualPhone onClose={onClose} title="Email Security Test">
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={phishingEmails.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title="Email Security Test">
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Email {currentEmailIndex + 1} of {phishingEmails.length}
          </span>
          <div className="flex gap-1">
            {phishingEmails.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentEmailIndex ? 'bg-success' :
                  index === currentEmailIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Email Card */}
        <Card className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">{currentEmail.from}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {currentEmail.time}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">{currentEmail.subject}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentEmail.body}
            </p>
          </div>

          {currentEmail.isPhishing && (
            <div className="flex gap-2">
              <Button variant="destructive" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                Verify Account
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          )}
        </Card>

        {/* Question */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Is this email suspicious?</h3>
          <div className="space-y-3">
            <Button 
              onClick={() => handleAnswer(true)}
              variant={selectedAnswer === true ? "destructive" : "outline"}
              className="w-full justify-start"
              disabled={showFeedback}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Yes, this looks like phishing
            </Button>
            <Button 
              onClick={() => handleAnswer(false)}
              variant={selectedAnswer === false ? "default" : "outline"}
              className="w-full justify-start"
              disabled={showFeedback}
            >
              <Shield className="h-4 w-4 mr-2" />
              No, this seems legitimate
            </Button>
          </div>
        </Card>

        {/* Feedback */}
        {showFeedback && (
          <Card className={`p-4 border-2 ${
            selectedAnswer === currentEmail.isPhishing ? 'border-success' : 'border-destructive'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentEmail.isPhishing ? (
                  <>
                    <Shield className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Correct!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="font-semibold text-destructive">Incorrect</span>
                  </>
                )}
              </div>

              <p className="text-sm">
                This email is {currentEmail.isPhishing ? "a phishing attempt" : "legitimate"}.
              </p>

              {currentEmail.isPhishing && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Red flags:</p>
                  <div className="space-y-1">
                    {currentEmail.redFlags?.map((flag, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </VirtualPhone>
  );
};