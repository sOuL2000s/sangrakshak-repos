import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  AlertTriangle, 
  Shield,
  MessageCircle,
  DollarSign,
  Plane,
  CheckCircle,
  X,
  Camera
} from "lucide-react";

interface RomanceScamSimProps {
  onClose: () => void;
}

const romanceScenarios = [
  {
    id: 1,
    type: "dating-profile",
    title: "Dating App Profile",
    profile: {
      name: "Dr. Michael Johnson",
      age: "45",
      profession: "Army Doctor deployed overseas",
      photos: "Professional photos, too perfect",
      bio: "Widowed, looking for true love. Currently stationed in Syria."
    },
    messages: [
      "Hello beautiful, you have captured my heart ❤️",
      "I feel such a strong connection with you",
      "I'm deployed overseas but will be back soon"
    ],
    isScam: true,
    redFlags: ["Too perfect photos", "Claims military deployment", "Professes love quickly", "Grammar inconsistencies"],
    warning: "Common romance scam tactics: fake military profile, quick emotional attachment"
  },
  {
    id: 2,
    type: "emergency-request",
    title: "Emergency Money Request",
    scenario: "After 2 weeks of chatting, your online match sends this message:",
    message: "My darling, I'm in trouble. My wallet was stolen and I need $500 to get home. I'll pay you back as soon as I return. Please help me, I have no one else to turn to. Send money via Western Union to: [Address]",
    context: "You've never met in person, only chatted online",
    isScam: true,
    redFlags: ["Money request", "Emergency situation", "Western Union (untraceable)", "Never met in person"],
    warning: "NEVER send money to someone you haven't met in person!"
  },
  {
    id: 3,
    type: "genuine-connection",
    title: "Genuine Dating Scenario",
    scenario: "You've been chatting with someone from a dating app:",
    interaction: {
      timeline: "3 weeks of chatting",
      meetings: "Met for coffee twice",
      communication: "Video calls, normal conversations",
      request: "Would like to meet for dinner this weekend"
    },
    isScam: false,
    positiveFlags: ["Met in person", "Video calls", "Reasonable timeline", "Local meetings"],
    guidance: "This appears genuine: in-person meetings, reasonable progression, no money requests"
  }
];

export const RomanceScamSim = ({ onClose }: RomanceScamSimProps) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const currentScenario = romanceScenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === romanceScenarios.length - 1;

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
    return Math.round((correct / romanceScenarios.length) * 100);
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
      <VirtualPhone onClose={onClose} title="Romance Scam Awareness">
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={romanceScenarios.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title="Romance Scam Awareness">
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Scenario {currentScenarioIndex + 1} of {romanceScenarios.length}
          </span>
          <div className="flex gap-1">
            {romanceScenarios.map((_, index) => (
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
            <Heart className="h-5 w-5 text-pink-500" />
            <h3 className="font-semibold">{currentScenario.title}</h3>
          </div>

          {currentScenario.type === "dating-profile" && (
            <div className="space-y-3">
              <div className="bg-pink-50 dark:bg-pink-950 p-3 rounded">
                <div className="space-y-2">
                  <p className="text-sm"><strong>Name:</strong> {currentScenario.profile?.name}</p>
                  <p className="text-sm"><strong>Age:</strong> {currentScenario.profile?.age}</p>
                  <p className="text-sm"><strong>Profession:</strong> {currentScenario.profile?.profession}</p>
                  <p className="text-sm"><strong>Photos:</strong> {currentScenario.profile?.photos}</p>
                  <p className="text-sm"><strong>Bio:</strong> {currentScenario.profile?.bio}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold">Recent Messages:</p>
                {currentScenario.messages?.map((message, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
                    <p className="text-sm italic">"{message}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentScenario.type === "emergency-request" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{currentScenario.scenario}</p>
              <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-4 border-red-500">
                <p className="text-sm italic">"{currentScenario.message}"</p>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm text-muted-foreground">{currentScenario.context}</span>
              </div>
            </div>
          )}

          {currentScenario.type === "genuine-connection" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{currentScenario.scenario}</p>
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                <div className="space-y-2">
                  <p className="text-sm"><strong>Timeline:</strong> {currentScenario.interaction?.timeline}</p>
                  <p className="text-sm"><strong>Meetings:</strong> {currentScenario.interaction?.meetings}</p>
                  <p className="text-sm"><strong>Communication:</strong> {currentScenario.interaction?.communication}</p>
                  <p className="text-sm"><strong>Current Request:</strong> {currentScenario.interaction?.request}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Question */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Is this a romance scam?</h3>
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
              <Heart className="h-4 w-4 mr-2" />
              No, this seems genuine
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

              <p className="text-sm font-medium">
                {currentScenario.warning || currentScenario.guidance}
              </p>

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