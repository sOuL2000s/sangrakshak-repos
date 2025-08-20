import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  Globe, 
  Lock, 
  Shield, 
  AlertTriangle, 
  ArrowLeft,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

interface BrowserSimulationProps {
  scenario: string | null;
  onComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface Website {
  id: string;
  url: string;
  title: string;
  content: string;
  isLegitimate: boolean;
  flags: string[];
  explanation: string;
}

export const BrowserSimulation = ({ scenario, onComplete, userLevel }: BrowserSimulationProps) => {
  const [currentSite, setCurrentSite] = useState<Website | null>(null);
  const [userAction, setUserAction] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  const websites: Record<string, Website> = {
    'browser-fake-1': {
      id: '1',
      url: 'https://arnazon-deals.com/offers',
      title: 'Amazon - Great Deals',
      content: `
        <div style="background: #232f3e; color: white; padding: 20px;">
          <h1>Amazon Great Sale</h1>
          <p>iPhone 15 Pro Max - 90% OFF!</p>
          <p>Original Price: ₹1,59,900</p>
          <p style="color: red; font-size: 24px;">Sale Price: ₹15,990</p>
          <button style="background: orange; padding: 10px 20px; border: none; border-radius: 5px;">
            BUY NOW - LIMITED TIME!
          </button>
          <p style="color: yellow;">⚠️ Only 2 left in stock!</p>
          <p style="font-size: 12px;">Enter your card details to confirm order</p>
        </div>
      `,
      isLegitimate: false,
      flags: ['suspicious_domain', 'unrealistic_discount', 'urgency_tactics'],
      explanation: 'This is a fake shopping website. The domain "arnazon" mimics Amazon, the 90% discount is unrealistic, and it uses pressure tactics. Real Amazon URLs are amazon.in or amazon.com.'
    }
  };

  useEffect(() => {
    if (scenario && websites[scenario]) {
      const site = websites[scenario];
      setCurrentSite(site);
      setUrlInput(site.url);
      setUserAction(null);
    }
  }, [scenario]);

  const handleAction = (action: string) => {
    if (!currentSite) return;
    
    setUserAction(action);
    
    let correct = false;
    let xpEarned = 0;

    if (!currentSite.isLegitimate) {
      correct = ['close', 'report', 'back'].includes(action);
      xpEarned = correct ? 20 : 0;
    } else {
      correct = ['proceed', 'bookmark'].includes(action);
      xpEarned = correct ? 15 : 0;
    }

    setTimeout(() => {
      onComplete({
        correct,
        explanation: currentSite.explanation,
        xpEarned
      });
    }, 1000);
  };

  const getUrlSecurity = (url: string) => {
    if (url.startsWith('https://')) {
      return { icon: <Lock className="w-4 h-4 text-green-500" />, text: 'Secure' };
    }
    return { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, text: 'Not Secure' };
  };

  if (!scenario || !currentSite) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <Globe className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
          <h3 className="font-orbitron text-lg font-semibold text-white mb-2">
            Browser Simulation Ready
          </h3>
          <p className="text-white/60 text-sm">
            Waiting for scenario to load...
          </p>
        </div>
      </div>
    );
  }

  const security = getUrlSecurity(currentSite.url);

  return (
    <div className="h-full flex flex-col">
      {/* Browser Header */}
      <div className="p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center space-x-2">
          {security.icon}
          <Input 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 text-sm bg-gray-700 border-gray-600"
            readOnly
          />
          <Button variant="ghost" size="sm" className="p-1">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Website Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div 
          dangerouslySetInnerHTML={{ __html: currentSite.content }}
          className="h-full"
        />
      </div>

      {/* Security Analysis */}
      <div className="p-3 bg-black/50 border-t border-gray-700">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-white mb-2">Security Analysis:</h4>
          <div className="flex flex-wrap gap-1">
            {currentSite.flags.map((flag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded"
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                {flag.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {!userAction && (
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => handleAction('proceed')}
            >
              Continue Browsing
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => handleAction('bookmark')}
            >
              Bookmark Site
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => handleAction('close')}
            >
              Close Tab
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
              onClick={() => handleAction('report')}
            >
              Report Site
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};