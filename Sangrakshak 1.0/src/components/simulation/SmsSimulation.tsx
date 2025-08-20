import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  MessageSquare, 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  Lock,
  Phone
} from 'lucide-react';

interface SmsSimulationProps {
  scenario: string | null;
  onComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface SmsMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isPhishing: boolean;
  flags: string[];
  explanation: string;
}

export const SmsSimulation = ({ scenario, onComplete, userLevel }: SmsSimulationProps) => {
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userAction, setUserAction] = useState<string | null>(null);

  const smsScenarios: Record<string, SmsMessage> = {
    'sms-phishing-1': {
      id: '1',
      sender: 'BANKOFIND',
      message: 'URGENT: Your account will be blocked in 2 hours. Click link to verify: http://bankofindia-verify.com/urgent. Share OTP: 847392',
      time: '2:30 PM',
      isPhishing: true,
      flags: ['urgent_language', 'suspicious_url', 'otp_sharing', 'fake_sender'],
      explanation: 'This is a phishing SMS. Real banks never ask for OTPs via SMS, use suspicious URLs, or create urgency. The URL is fake (real bank URLs don\'t have hyphens).'
    },
    'sms-phishing-2': {
      id: '2',
      sender: '+91-9876543210',
      message: 'Congratulations! You have won ₹50,000 in lucky draw. To claim, send CLAIM to 56789 with your bank details.',
      time: '11:15 AM',
      isPhishing: true,
      flags: ['lottery_scam', 'unknown_number', 'money_request'],
      explanation: 'This is a lottery scam. Legitimate contests don\'t ask for bank details via SMS or from unknown numbers.'
    },
    'sms-legitimate-1': {
      id: '3',
      sender: 'HDFCBK',
      message: 'Dear Customer, your HDFC account XXXX1234 has been debited by Rs.2,500 on 15-Dec-2024. Available balance: Rs.45,230. Call 18002586161 for queries.',
      time: '9:45 AM',
      isPhishing: false,
      flags: ['official_sender', 'no_links', 'transaction_info'],
      explanation: 'This is a legitimate transaction alert. It comes from official bank shortcode, contains masked account info, and provides official helpline number.'
    }
  };

  useEffect(() => {
    if (scenario && smsScenarios[scenario]) {
      const scenarioData = smsScenarios[scenario];
      setMessages([scenarioData]);
      setSelectedMessage(null);
      setUserAction(null);
      setOtpValue('');
      setShowOtpInput(false);
    }
  }, [scenario]);

  const handleMessageAction = (action: string, messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    setUserAction(action);
    
    let correct = false;
    let xpEarned = 0;
    let badgeEarned: string | undefined;

    if (message.isPhishing) {
      // For phishing messages, correct actions are: block, report, delete
      correct = ['block', 'report', 'delete'].includes(action);
      xpEarned = correct ? 15 : 0;
      
      if (correct && !localStorage.getItem('sms-expert-badge')) {
        badgeEarned = 'sms-expert';
        localStorage.setItem('sms-expert-badge', 'true');
      }
    } else {
      // For legitimate messages, correct actions are: read, save
      correct = ['read', 'save'].includes(action);
      xpEarned = correct ? 10 : 0;
    }

    // Bonus XP for first correct answer
    if (correct && !localStorage.getItem('first-correct-badge')) {
      xpEarned += 5;
      badgeEarned = 'first-correct';
      localStorage.setItem('first-correct-badge', 'true');
    }

    setTimeout(() => {
      onComplete({
        correct,
        explanation: message.explanation,
        xpEarned,
        badgeEarned
      });
    }, 1000);
  };

  const handleOtpShare = () => {
    const message = messages.find(m => m.id === selectedMessage);
    if (message && message.isPhishing) {
      // Sharing OTP for phishing is always wrong
      onComplete({
        correct: false,
        explanation: 'Never share OTPs! This was a phishing attempt. OTPs are for your authentication only and should never be shared with anyone, including banks.',
        xpEarned: 0
      });
    }
  };

  const getSenderIcon = (sender: string) => {
    if (sender.startsWith('+91') || sender.includes('unknown')) {
      return <Phone className="w-4 h-4 text-red-500" />;
    }
    return <Shield className="w-4 h-4 text-green-500" />;
  };

  const detectFlags = (message: SmsMessage) => {
    const flags = [];
    if (message.message.toLowerCase().includes('urgent') || message.message.toLowerCase().includes('immediate')) {
      flags.push('Urgent language');
    }
    if (message.message.includes('http://') || message.message.includes('bit.ly')) {
      flags.push('Suspicious link');
    }
    if (message.message.toLowerCase().includes('otp') || message.message.toLowerCase().includes('pin')) {
      flags.push('OTP request');
    }
    return flags;
  };

  if (!scenario || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <MessageSquare className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
            SMS Simulation Ready
          </h3>
          <p className="text-white/60 text-sm">
            Waiting for scenario to load...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* SMS Header */}
      <div className="p-4 bg-black/50 border-b border-gray-700">
        <h2 className="font-semibold text-white">Messages</h2>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <Card 
            key={message.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedMessage === message.id 
                ? 'border-cyber-blue bg-cyber-blue/10' 
                : 'border-gray-700 bg-cyber-gray/20 hover:border-gray-600'
            }`}
            onClick={() => setSelectedMessage(message.id)}
          >
            <div className="flex items-start space-x-3">
              {getSenderIcon(message.sender)}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-white text-sm">{message.sender}</p>
                  <span className="text-xs text-white/60">{message.time}</span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {message.message}
                </p>
                
                {/* Flags */}
                {selectedMessage === message.id && (
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {detectFlags(message).map((flag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedMessage && !userAction && (
        <div className="p-4 bg-black/50 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => handleMessageAction('read', selectedMessage)}
            >
              Mark as Read
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => handleMessageAction('save', selectedMessage)}
            >
              Save Message
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleMessageAction('block', selectedMessage)}
            >
              Block Sender
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
              onClick={() => handleMessageAction('report', selectedMessage)}
            >
              Report Spam
            </Button>
          </div>
          
          {/* OTP Input (if message contains OTP) */}
          {messages.find(m => m.id === selectedMessage)?.message.toLowerCase().includes('otp') && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Enter OTP if you want to share..."
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  size="sm"
                  variant="destructive"
                  onClick={handleOtpShare}
                  disabled={!otpValue}
                >
                  Share OTP
                </Button>
              </div>
              <p className="text-xs text-white/60">
                ⚠️ Think carefully: Should you share this OTP?
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};