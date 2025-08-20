import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';

interface CallSimulationProps {
  scenario: string | null;
  onComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface CallScenario {
  id: string;
  callerName: string;
  callerNumber: string;
  script: string[];
  isScam: boolean;
  explanation: string;
}

export const CallSimulation = ({ scenario, onComplete, userLevel }: CallSimulationProps) => {
  const [currentCall, setCurrentCall] = useState<CallScenario | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [userAction, setUserAction] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const callScenarios: Record<string, CallScenario> = {
    'call-fraud-1': {
      id: '1',
      callerName: 'Bank Executive',
      callerNumber: '+91-9876543210',
      script: [
        'Hello, this is Raj calling from State Bank of India security department.',
        'We have detected suspicious activity on your account ending with 1234.',
        'For your security, we need to verify your identity immediately.',
        'Can you please confirm your debit card number and CVV?',
        'If you don\'t verify now, your account will be blocked permanently.'
      ],
      isScam: true,
      explanation: 'This is a vishing (voice phishing) scam. Banks never call asking for card details or CVV. They already have your account information and don\'t need verification over phone.'
    }
  };

  useEffect(() => {
    if (scenario && callScenarios[scenario]) {
      setCurrentCall(callScenarios[scenario]);
      setCallActive(true);
      setCurrentLine(0);
      setUserAction(null);
      setCallDuration(0);
    }
  }, [scenario]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const handleCallAction = (action: string) => {
    setUserAction(action);
    setCallActive(false);
    
    if (!currentCall) return;
    
    let correct = false;
    let xpEarned = 0;

    if (currentCall.isScam) {
      correct = ['hang_up', 'report'].includes(action);
      xpEarned = correct ? 25 : 0;
    }

    setTimeout(() => {
      onComplete({
        correct,
        explanation: currentCall.explanation,
        xpEarned
      });
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!scenario || !currentCall) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <Phone className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
            Call Simulation Ready
          </h3>
          <p className="text-white/60 text-sm">
            Waiting for scenario to load...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-900 to-green-800">
      {/* Call Header */}
      <div className="p-6 text-center text-white">
        <p className="text-sm opacity-80">Incoming Call</p>
        <p className="text-xs opacity-60">{formatDuration(callDuration)}</p>
      </div>

      {/* Caller Info */}
      <div className="flex-1 flex flex-col items-center justify-center text-white p-6">
        <Avatar className="w-24 h-24 mb-4">
          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
            <Phone className="w-12 h-12 text-white" />
          </div>
        </Avatar>
        
        <h2 className="text-xl font-semibold mb-2">{currentCall.callerName}</h2>
        <p className="text-green-200 mb-6">{currentCall.callerNumber}</p>

        {/* Call Script */}
        {callActive && currentLine < currentCall.script.length && (
          <Card className="p-4 mb-6 bg-black/20 border-green-400/30 max-w-sm">
            <p className="text-sm text-green-100 text-center">
              "{currentCall.script[currentLine]}"
            </p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="mt-2 text-green-200 w-full"
              onClick={() => setCurrentLine(prev => Math.min(prev + 1, currentCall.script.length - 1))}
            >
              Continue Listening →
            </Button>
          </Card>
        )}

        {/* Warning Signs */}
        {callActive && (
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-400">Red Flags Detected</span>
            </div>
            <div className="text-xs text-center space-y-1">
              <p className="text-red-300">• Asking for sensitive information</p>
              <p className="text-red-300">• Creating urgency and fear</p>
              <p className="text-red-300">• Unknown number claiming to be bank</p>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      {callActive && !userAction && (
        <div className="p-6">
          <div className="flex justify-center space-x-8 mb-4">
            <Button 
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-gray-600/50 hover:bg-gray-600/70"
            >
              <MicOff className="w-6 h-6 text-white" />
            </Button>
            
            <Button 
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700"
              onClick={() => handleCallAction('hang_up')}
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </Button>
            
            <Button 
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-gray-600/50 hover:bg-gray-600/70"
            >
              <Volume2 className="w-6 h-6 text-white" />
            </Button>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline"
              className="w-full border-green-400 text-green-400 hover:bg-green-400/10"
              onClick={() => handleCallAction('provide_info')}
            >
              Provide Requested Information
            </Button>
            <Button 
              variant="outline"
              className="w-full border-orange-400 text-orange-400 hover:bg-orange-400/10"
              onClick={() => handleCallAction('report')}
            >
              Hang Up & Report
            </Button>
          </div>
        </div>
      )}

      {/* Call ended state */}
      {!callActive && userAction && (
        <div className="p-6 text-center">
          <PhoneOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white text-lg">Call Ended</p>
          <p className="text-green-200 text-sm">Duration: {formatDuration(callDuration)}</p>
        </div>
      )}
    </div>
  );
};