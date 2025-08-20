import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  MessageSquare, 
  Phone, 
  Video, 
  MoreVertical, 
  Camera,
  Mic,
  Send
} from 'lucide-react';

interface WhatsAppSimulationProps {
  scenario: string | null;
  onComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface WhatsAppMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isScam: boolean;
  type: 'text' | 'link' | 'image' | 'contact';
  explanation: string;
}

export const WhatsAppSimulation = ({ scenario, onComplete, userLevel }: WhatsAppSimulationProps) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [userAction, setUserAction] = useState<string | null>(null);

  const whatsappScenarios: Record<string, WhatsAppMessage[]> = {
    'whatsapp-scam-1': [
      {
        id: '1',
        sender: 'Unknown',
        message: 'Hi! I am Priya from your college. I need urgent help. Can you send me ₹5000? I will return tomorrow. My number changed.',
        time: '2:15 PM',
        isScam: true,
        type: 'text',
        explanation: 'This is a social engineering scam. Unknown contacts asking for money claiming to be friends is a red flag. Always verify identity through known channels.'
      },
      {
        id: '2',
        sender: 'Unknown',
        message: 'Please send to GPay: 9876543210',
        time: '2:16 PM',
        isScam: true,
        type: 'text',
        explanation: 'Scammers often follow up with payment details. Never send money to unknown numbers.'
      }
    ]
  };

  useEffect(() => {
    if (scenario && whatsappScenarios[scenario]) {
      setMessages(whatsappScenarios[scenario]);
      setUserAction(null);
    }
  }, [scenario]);

  const handleAction = (action: string) => {
    setUserAction(action);
    
    const hasScamMessage = messages.some(m => m.isScam);
    let correct = false;
    let xpEarned = 0;

    if (hasScamMessage) {
      correct = ['block', 'report', 'ignore'].includes(action);
      xpEarned = correct ? 15 : 0;
    }

    setTimeout(() => {
      onComplete({
        correct,
        explanation: messages[0]?.explanation || 'Unknown scenario',
        xpEarned
      });
    }, 1000);
  };

  if (!scenario || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <MessageSquare className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
            WhatsApp Simulation Ready
          </h3>
          <p className="text-white/60 text-sm">
            Waiting for scenario to load...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* WhatsApp Header */}
      <div className="flex items-center p-4 bg-green-600 text-white">
        <Avatar className="w-10 h-10 mr-3">
          <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-xs">UN</span>
          </div>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">Unknown Contact</h3>
          <p className="text-xs text-green-100">+91-XXXX-XXX-210</p>
        </div>
        <div className="flex space-x-3">
          <Video className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={message.id} className="flex">
            <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
              <p className="text-gray-800 text-sm">{message.message}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {!userAction && (
        <div className="p-4 bg-black/50 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => handleAction('reply')}
            >
              Reply
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => handleAction('forward')}
            >
              Forward
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleAction('block')}
            >
              Block
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
              onClick={() => handleAction('report')}
            >
              Report
            </Button>
          </div>
          <p className="text-xs text-white/60 text-center">
            How should you respond to this message?
          </p>
        </div>
      )}
    </div>
  );
};