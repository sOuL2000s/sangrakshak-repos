import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmsSimulation } from './SmsSimulation';
import { EmailSimulation } from './EmailSimulation';
import { WhatsAppSimulation } from './WhatsAppSimulation';
import { BrowserSimulation } from './BrowserSimulation';
import { CallSimulation } from './CallSimulation';
import { ScenarioResult } from '../FraudSimulationSection';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Globe, 
  Signal, 
  Wifi, 
  Battery 
} from 'lucide-react';

interface MobileFrameProps {
  currentScenario: string | null;
  onScenarioComplete: (result: ScenarioResult) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
}

export const MobileFrame = ({ currentScenario, onScenarioComplete, userLevel }: MobileFrameProps) => {
  const [activeTab, setActiveTab] = useState('sms');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentScenario) {
      // Auto-switch to appropriate tab based on scenario
      if (currentScenario.includes('sms')) setActiveTab('sms');
      else if (currentScenario.includes('email')) setActiveTab('email');
      else if (currentScenario.includes('whatsapp')) setActiveTab('whatsapp');
      else if (currentScenario.includes('call')) setActiveTab('call');
      else if (currentScenario.includes('browser')) setActiveTab('browser');
    }
  }, [currentScenario]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="relative">
      {/* Mobile Frame */}
      <div className="w-[360px] h-[640px] bg-black rounded-[2.5rem] p-2 shadow-2xl border border-gray-800">
        {/* Screen */}
        <div className="w-full h-full bg-cyber-dark rounded-[2rem] overflow-hidden relative border border-gray-700">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-2 bg-black/50 backdrop-blur-sm text-white text-xs">
            <div className="flex items-center space-x-1">
              <Signal className="w-3 h-3" />
              <span>Vodafone</span>
            </div>
            <div className="font-mono font-semibold">
              {formatTime(currentTime)}
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-3" />
              <span>85%</span>
            </div>
          </div>

          {/* App Interface */}
          <div className="h-full pb-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              {/* Tab Content */}
              <TabsContent value="sms" className="h-full m-0">
                <SmsSimulation 
                  scenario={currentScenario?.includes('sms') ? currentScenario : null}
                  onComplete={onScenarioComplete}
                  userLevel={userLevel}
                />
              </TabsContent>
              
              <TabsContent value="email" className="h-full m-0">
                <EmailSimulation 
                  scenario={currentScenario?.includes('email') ? currentScenario : null}
                  onComplete={onScenarioComplete}
                  userLevel={userLevel}
                />
              </TabsContent>
              
              <TabsContent value="whatsapp" className="h-full m-0">
                <WhatsAppSimulation 
                  scenario={currentScenario?.includes('whatsapp') ? currentScenario : null}
                  onComplete={onScenarioComplete}
                  userLevel={userLevel}
                />
              </TabsContent>
              
              <TabsContent value="browser" className="h-full m-0">
                <BrowserSimulation 
                  scenario={currentScenario?.includes('browser') ? currentScenario : null}
                  onComplete={onScenarioComplete}
                  userLevel={userLevel}
                />
              </TabsContent>
              
              <TabsContent value="call" className="h-full m-0">
                <CallSimulation 
                  scenario={currentScenario?.includes('call') ? currentScenario : null}
                  onComplete={onScenarioComplete}
                  userLevel={userLevel}
                />
              </TabsContent>

              {/* Bottom Tab Bar */}
              <TabsList className="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-sm border-t border-gray-700 rounded-none">
                <TabsTrigger 
                  value="sms" 
                  className="flex-1 flex-col h-full data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                >
                  <MessageSquare className="w-5 h-5 mb-1" />
                  <span className="text-xs">SMS</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="email" 
                  className="flex-1 flex-col h-full data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                >
                  <Mail className="w-5 h-5 mb-1" />
                  <span className="text-xs">Email</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="whatsapp" 
                  className="flex-1 flex-col h-full data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                >
                  <MessageSquare className="w-5 h-5 mb-1" />
                  <span className="text-xs">WhatsApp</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="browser" 
                  className="flex-1 flex-col h-full data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                >
                  <Globe className="w-5 h-5 mb-1" />
                  <span className="text-xs">Browser</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="call" 
                  className="flex-1 flex-col h-full data-[state=active]:bg-cyber-blue/20 data-[state=active]:text-cyber-blue"
                >
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Calls</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Glowing effect around phone */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-[2.5rem] blur-xl"></div>
    </div>
  );
};