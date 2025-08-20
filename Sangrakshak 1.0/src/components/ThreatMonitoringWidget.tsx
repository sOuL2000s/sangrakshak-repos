import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export const ThreatMonitoringWidget: React.FC = () => {
  // Mock data for demonstration
  const threats = [
    { type: 'Malware', count: 23, trend: 'up', severity: 'high' },
    { type: 'Phishing', count: 12, trend: 'down', severity: 'medium' },
    { type: 'DDoS', count: 5, trend: 'up', severity: 'low' },
    { type: 'Data Breach', count: 2, trend: 'stable', severity: 'critical' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800/50 border-cyan-500/20 backdrop-blur-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-white">
          <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <span>Threat Monitor</span>
          <div className="ml-auto flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {threats.map((threat, index) => (
          <div 
            key={threat.type}
            className={`p-4 rounded-lg border ${getSeverityColor(threat.severity)} transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{threat.type}</span>
                  <span className="text-xs opacity-80">{threat.count} incidents</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(threat.trend)}
                <span className="text-2xl font-bold">
                  {threat.count}
                </span>
              </div>
            </div>
            
            {/* Animated progress bar */}
            <div className="mt-3 bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full ${
                  threat.severity === 'critical' ? 'bg-red-400' :
                  threat.severity === 'high' ? 'bg-orange-400' :
                  threat.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                } animate-pulse transition-all duration-1000`}
                style={{ width: `${Math.min(threat.count * 4, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}

        {/* Real-time activity indicator */}
        <div className="mt-6 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-cyan-300 text-sm font-medium">System Scanning...</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-100"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-200"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};