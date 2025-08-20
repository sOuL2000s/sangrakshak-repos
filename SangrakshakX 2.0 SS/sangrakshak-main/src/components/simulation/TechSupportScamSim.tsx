import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  AlertTriangle, 
  Shield,
  Monitor,
  Download,
  CreditCard,
  CheckCircle,
  X
} from "lucide-react";

interface TechSupportScamSimProps {
  onClose: () => void;
}

const scamScenarios = [
  {
    id: 1,
    type: "call",
    title: "Suspicious Tech Support Call",
    content: {
      caller: "Microsoft Support",
      message: "Hello, this is John from Microsoft. We've detected viruses on your computer. Please allow us remote access to fix this immediately.",
      urgency: "URGENT",
      requestedAction: "Remote access + Payment"
    },
    isScam: true,
    redFlags: ["Unsolicited call", "Claims virus detection", "Requests remote access", "Pressure tactics"],
    correctResponse: "Hang up immediately. Microsoft doesn't make unsolicited calls."
  },
  {
    id: 2,
    type: "popup",
    title: "Computer Warning Popup",
    content: {
      title: "⚠️ CRITICAL SECURITY ALERT",
      message: "Your computer is infected with 5 viruses! Call +1-800-FAKE-NUM immediately. DO NOT close this window!",
      buttons: ["Call Now", "Download Fix", "Pay $99 for Removal"]
    },
    isScam: true,
    redFlags: ["Fake urgency", "Phone number provided", "Demands payment", "Prevents closing"],
    correctResponse: "Close the popup. Real antivirus doesn't use pop-ups with phone numbers."
  },
  {
    id: 3,
    type: "legitimate",
    title: "Genuine IT Support",
    content: {
      context: "You contacted your company's IT department about a login issue",
      response: "Hi, this is Sarah from IT. I see you submitted a ticket about password reset. I'll send you a secure link via your work email.",
      verification: "Employee ID and work email verification"
    },
    isScam: false,
    correctResponse: "This is legitimate since you initiated contact and they're using proper verification."
  }
];

export const TechSupportScamSim = ({ onClose }: TechSupportScamSimProps) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const currentScenario = scamScenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scamScenarios.length - 1;

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
    return Math.round((correct / scamScenarios.length) * 100);
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
      <VirtualPhone onClose={onClose} title="Tech Support Scam Test">
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={scamScenarios.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title="Tech Support Scam Test">
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Scenario {currentScenarioIndex + 1} of {scamScenarios.length}
          </span>
          <div className="flex gap-1">
            {scamScenarios.map((_, index) => (
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

        {/* Scenario Card */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{currentScenario.title}</h3>
          </div>

          {currentScenario.type === "call" && (
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                <p className="text-sm"><strong>Caller ID:</strong> {currentScenario.content.caller}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                <p className="text-sm italic">"{currentScenario.content.message}"</p>
              </div>
              {currentScenario.content.urgency && (
                <Badge variant="destructive" className="w-fit">
                  {currentScenario.content.urgency}
                </Badge>
              )}
            </div>
          )}

          {currentScenario.type === "popup" && (
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded border-2 border-red-500 text-center">
                <h4 className="font-bold text-red-600">{currentScenario.content.title}</h4>
                <p className="text-sm mt-2">{currentScenario.content.message}</p>
                <div className="mt-3 space-y-2">
                  {currentScenario.content.buttons?.map((button, index) => (
                    <Button key={index} variant="destructive" size="sm" className="w-full text-xs">
                      {button}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentScenario.type === "legitimate" && (
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                <p className="text-sm"><strong>Context:</strong> {currentScenario.content.context}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                <p className="text-sm italic">"{currentScenario.content.response}"</p>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">{currentScenario.content.verification}</span>
              </div>
            </div>
          )}
        </Card>

        {/* Question */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Is this a scam?</h3>
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

              <p className="text-sm">{currentScenario.correctResponse}</p>

              {currentScenario.isScam && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Red flags:</p>
                  <div className="space-y-1">
                    {currentScenario.redFlags?.map((flag, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
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