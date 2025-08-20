import { useState } from "react";
import { VirtualPhone, SimulationResult } from "./VirtualPhone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Shield, 
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface PaymentSecuritySimProps {
  onClose: () => void;
  type: "phishing" | "otp" | "card";
}

export const PaymentSecuritySim = ({ onClose, type }: PaymentSecuritySimProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

  const getSimulationData = () => {
    switch (type) {
      case "phishing":
        return {
          title: "Phishing Detection",
          scenarios: [
            {
              type: "payment-page",
              question: "Is this payment page secure?",
              content: (
                <Card className="p-4 border-2 border-red-500">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">http://amazone-pay.secure-checkout.net</span>
                    </div>
                    <h3 className="font-bold">Complete Your Purchase</h3>
                    <p className="text-sm">Enter your card details to continue</p>
                    <Input placeholder="Card Number" />
                    <Input placeholder="CVV" type="password" />
                    <Button className="w-full bg-red-600">Pay Now - Limited Time!</Button>
                  </div>
                </Card>
              ),
              isSecure: false,
              explanation: "Red flags: HTTP (not HTTPS), suspicious URL, pressure tactics"
            },
            {
              type: "payment-page",
              question: "Is this payment page secure?",
              content: (
                <Card className="p-4 border-2 border-green-500">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-500" />
                      <span className="text-sm">https://checkout.amazon.com</span>
                    </div>
                    <h3 className="font-bold">Amazon Checkout</h3>
                    <p className="text-sm">Review your order</p>
                    <div className="bg-muted p-3 rounded">
                      <p className="text-sm">Order Total: $29.99</p>
                    </div>
                    <Button className="w-full">Place Your Order</Button>
                  </div>
                </Card>
              ),
              isSecure: true,
              explanation: "Secure: HTTPS connection, legitimate domain, no pressure tactics"
            }
          ]
        };
      case "otp":
        return {
          title: "OTP Security",
          scenarios: [
            {
              type: "otp-request",
              question: "Should you share this OTP?",
              content: (
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="text-sm"><strong>SMS from Bank:</strong> Your OTP is 123456. Valid for 5 minutes.</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm"><strong>Caller:</strong> "Hello, I'm calling from your bank. For security verification, please share the OTP you just received."</p>
                    </div>
                    <Button variant="destructive" className="w-full">Share OTP: 123456</Button>
                  </div>
                </Card>
              ),
              isSecure: false,
              explanation: "Never share OTP with anyone! Banks never ask for OTP over phone calls."
            },
            {
              type: "otp-usage",
              question: "Is this OTP usage appropriate?",
              content: (
                <Card className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold">You initiated a payment on your banking app</p>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                      <p className="text-sm"><strong>SMS:</strong> OTP for payment to Amazon: 789012</p>
                    </div>
                    <Input placeholder="Enter OTP" value="789012" readOnly />
                    <Button className="w-full">Confirm Payment</Button>
                  </div>
                </Card>
              ),
              isSecure: true,
              explanation: "Correct! You initiated the transaction yourself and are entering OTP on the official app."
            }
          ]
        };
      case "card":
        return {
          title: "Card Safety",
          scenarios: [
            {
              type: "card-sharing",
              question: "Is it safe to share these card details?",
              content: (
                <Card className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm"><strong>Friend:</strong> "Can you lend me ₹5000? Just share your card details on WhatsApp, I'll pay you back tomorrow!"</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-sm">Card: 1234 5678 9012 3456</p>
                      <p className="text-sm">CVV: 123</p>
                      <p className="text-sm">Exp: 12/25</p>
                    </div>
                    <Button variant="destructive" className="w-full">Send Card Details</Button>
                  </div>
                </Card>
              ),
              isSecure: false,
              explanation: "Never share card details via messages! Use secure bank transfers instead."
            },
            {
              type: "secure-payment",
              question: "Is this payment method secure?",
              content: (
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">UPI Payment</span>
                    </div>
                    <p className="text-sm">Pay to: friend@upi</p>
                    <p className="text-sm">Amount: ₹5000</p>
                    <Input placeholder="Enter UPI PIN" type="password" />
                    <Button className="w-full">Pay Securely</Button>
                  </div>
                </Card>
              ),
              isSecure: true,
              explanation: "Secure! UPI doesn't expose card details and uses encrypted transactions."
            }
          ]
        };
      default:
        return { title: "", scenarios: [] };
    }
  };

  const simulationData = getSimulationData();
  const currentScenario = simulationData.scenarios[currentStep];
  const isLastStep = currentStep === simulationData.scenarios.length - 1;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setWaitingForContinue(true);
  };

  const handleContinue = () => {
    const isCorrect = selectedAnswer === currentScenario.isSecure;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isLastStep) {
      setShowResult(true);
    } else {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setWaitingForContinue(false);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(Boolean).length;
    return Math.round((correct / simulationData.scenarios.length) * 100);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setUserInput("");
  };

  if (showResult) {
    const correct = answers.filter(Boolean).length;
    return (
      <VirtualPhone onClose={onClose} title={simulationData.title}>
        <SimulationResult 
          score={calculateScore()}
          correct={correct}
          total={simulationData.scenarios.length}
          onRestart={restart}
        />
      </VirtualPhone>
    );
  }

  return (
    <VirtualPhone onClose={onClose} title={simulationData.title}>
      <div className="p-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {simulationData.scenarios.length}
          </span>
          <div className="flex gap-1">
            {simulationData.scenarios.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-success' :
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scenario */}
        <div className="space-y-4">
          <h3 className="font-semibold">{currentScenario.question}</h3>
          {currentScenario.content}
        </div>

        {/* Answer Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => handleAnswer(true)}
            variant="default"
            className="w-full justify-start"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Yes, this is secure
          </Button>
          <Button 
            onClick={() => handleAnswer(false)}
            variant="destructive"
            className="w-full justify-start"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            No, this is not secure
          </Button>
        </div>

        {/* Show explanation after answer */}
        {answers[currentStep] !== undefined && (
          <Card className={`p-4 border-2 ${
            answers[currentStep] ? 'border-success' : 'border-destructive'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {answers[currentStep] ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Correct!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="font-semibold text-destructive">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-sm">{currentScenario.explanation}</p>
            </div>
          </Card>
        )}
      </div>
    </VirtualPhone>
  );
};