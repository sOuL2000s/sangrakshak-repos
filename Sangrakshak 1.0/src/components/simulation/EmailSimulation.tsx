import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  Mail, 
  Star, 
  Paperclip, 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  Archive,
  Trash2
} from 'lucide-react';

interface EmailSimulationProps {
  scenario: string | null;
  onComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  time: string;
  isPhishing: boolean;
  hasAttachment: boolean;
  flags: string[];
  explanation: string;
}

export const EmailSimulation = ({ scenario, onComplete, userLevel }: EmailSimulationProps) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [userAction, setUserAction] = useState<string | null>(null);

  const emailScenarios: Record<string, Email> = {
    'email-phishing-1': {
      id: '1',
      sender: 'PayPal Security',
      senderEmail: 'security@paypaI-verify.com',
      subject: 'Urgent: Verify Your PayPal Account Within 24 Hours',
      body: `Dear Valued Customer,

We have detected unusual activity on your PayPal account. To ensure your account security, please verify your identity immediately.

Click here to verify: http://paypal-security-verify.com/login

If you don't verify within 24 hours, your account will be permanently suspended.

Best regards,
PayPal Security Team

Note: This email contains important security information. Please do not ignore.`,
      time: '1:45 PM',
      isPhishing: true,
      hasAttachment: false,
      flags: ['urgent_language', 'suspicious_domain', 'fake_sender', 'threat_language'],
      explanation: 'This is a phishing email. Notice the suspicious domain (paypaI with capital i instead of l), urgent language, and threats. Real PayPal uses official domains and doesn\'t threaten account suspension via email.'
    },
    'email-phishing-2': {
      id: '2',
      sender: 'IT Support',
      senderEmail: 'itsupport@yourcompany.net',
      subject: 'Mandatory Email System Update - Action Required',
      body: `Hello,

Due to system maintenance, all employees must update their email credentials.

Download the update tool: attachment.exe

Enter your username and password when prompted.

This must be completed by end of day.

Thanks,
IT Support Team`,
      time: '10:30 AM',
      isPhishing: true,
      hasAttachment: true,
      flags: ['malicious_attachment', 'credential_request', 'internal_impersonation'],
      explanation: 'This is a spear-phishing email impersonating internal IT. Real IT departments don\'t ask for credentials via email or use .exe attachments for updates. Always verify with IT directly.'
    },
    'email-legitimate-1': {
      id: '3',
      sender: 'Amazon.in',
      senderEmail: 'order-update@amazon.in',
      subject: 'Your order has been shipped - Order #171-8234567-1234567',
      body: `Hello,

Your order has been shipped and is on its way to you.

Order Details:
- Order Number: 171-8234567-1234567
- Shipped to: [Your Address]
- Tracking ID: 1Z999AA1234567890

Track your package: [Track Package Button]

Estimated delivery: December 18, 2024

Thanks for shopping with us!
Amazon Customer Service`,
      time: '9:15 AM',
      isPhishing: false,
      hasAttachment: false,
      flags: ['official_domain', 'order_details', 'no_credential_request'],
      explanation: 'This is a legitimate shipping notification. It comes from official Amazon domain, contains specific order details, and doesn\'t ask for any sensitive information.'
    }
  };

  useEffect(() => {
    if (scenario && emailScenarios[scenario]) {
      const scenarioData = emailScenarios[scenario];
      setEmails([scenarioData]);
      setSelectedEmail(null);
      setUserAction(null);
    }
  }, [scenario]);

  const handleEmailAction = (action: string, emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;

    setUserAction(action);
    
    let correct = false;
    let xpEarned = 0;
    let badgeEarned: string | undefined;

    if (email.isPhishing) {
      // For phishing emails, correct actions are: report, delete, mark as spam
      correct = ['report', 'delete', 'spam'].includes(action);
      xpEarned = correct ? 20 : 0;
      
      if (correct && !localStorage.getItem('email-guardian-badge')) {
        badgeEarned = 'email-guardian';
        localStorage.setItem('email-guardian-badge', 'true');
      }
    } else {
      // For legitimate emails, correct actions are: read, archive, star
      correct = ['read', 'archive', 'star'].includes(action);
      xpEarned = correct ? 15 : 0;
    }

    setTimeout(() => {
      onComplete({
        correct,
        explanation: email.explanation,
        xpEarned,
        badgeEarned
      });
    }, 1000);
  };

  const getSenderBadge = (email: Email) => {
    if (email.senderEmail.includes('amazon.in') || email.senderEmail.includes('paypal.com')) {
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          <Shield className="w-3 h-3 mr-1" />
          Official
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-red-500 text-red-500">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Unverified
      </Badge>
    );
  };

  const detectSuspiciousElements = (email: Email) => {
    const suspicious = [];
    
    // Check domain spoofing
    if (email.senderEmail.includes('paypaI') || email.senderEmail.includes('arnazon')) {
      suspicious.push('Suspicious domain');
    }
    
    // Check urgent language
    if (email.subject.toLowerCase().includes('urgent') || email.body.toLowerCase().includes('immediate')) {
      suspicious.push('Urgent language');
    }
    
    // Check for credential requests
    if (email.body.toLowerCase().includes('password') || email.body.toLowerCase().includes('username')) {
      suspicious.push('Credential request');
    }
    
    // Check for attachments
    if (email.hasAttachment && email.isPhishing) {
      suspicious.push('Suspicious attachment');
    }
    
    return suspicious;
  };

  if (!scenario || emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <Mail className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
            Email Simulation Ready
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
      {/* Email Header */}
      <div className="p-4 bg-black/50 border-b border-gray-700">
        <h2 className="font-semibold text-white">Inbox</h2>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {!selectedEmail ? (
          <div className="p-4 space-y-2">
            {emails.map((email) => (
              <Card 
                key={email.id}
                className="p-4 cursor-pointer hover:border-cyber-blue/50 transition-all duration-200 border-gray-700 bg-cyber-gray/20"
                onClick={() => setSelectedEmail(email.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-white text-sm">{email.sender}</p>
                        {getSenderBadge(email)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {email.hasAttachment && <Paperclip className="w-4 h-4 text-white/60" />}
                        <span className="text-xs text-white/60">{email.time}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-xs mb-1">{email.senderEmail}</p>
                    <p className="font-medium text-white text-sm mb-1">{email.subject}</p>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {email.body.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-4">
            {emails.filter(e => e.id === selectedEmail).map((email) => (
              <div key={email.id} className="space-y-4">
                {/* Email Header */}
                <div className="border-b border-gray-700 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{email.sender}</h3>
                      {getSenderBadge(email)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedEmail(null)}
                      className="text-white/60"
                    >
                      ← Back
                    </Button>
                  </div>
                  <p className="text-white/70 text-sm">{email.senderEmail}</p>
                  <p className="text-white/60 text-xs">{email.time}</p>
                </div>

                {/* Subject */}
                <div>
                  <h2 className="font-semibold text-white text-lg mb-2">{email.subject}</h2>
                  {email.hasAttachment && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Paperclip className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60">
                        {email.id === '2' ? 'attachment.exe (2.1 MB)' : 'invoice.pdf (245 KB)'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email Body */}
                <div className="bg-cyber-gray/20 p-4 rounded-lg">
                  <pre className="text-white/90 text-sm whitespace-pre-wrap font-sans">
                    {email.body}
                  </pre>
                </div>

                {/* Suspicious Elements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">Security Analysis:</h4>
                  <div className="flex flex-wrap gap-2">
                    {detectSuspiciousElements(email).map((element, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="border-red-500 text-red-400"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedEmail && !userAction && (
        <div className="p-4 bg-black/50 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => handleEmailAction('read', selectedEmail)}
            >
              <Mail className="w-4 h-4 mr-1" />
              Mark Read
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => handleEmailAction('star', selectedEmail)}
            >
              <Star className="w-4 h-4 mr-1" />
              Star
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
              onClick={() => handleEmailAction('report', selectedEmail)}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Report
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleEmailAction('delete', selectedEmail)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};