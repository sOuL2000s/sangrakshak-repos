import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  ArrowLeft, 
  Battery, 
  Wifi, 
  Signal,
  MoreHorizontal,
  X,
  Check,
  AlertTriangle
} from "lucide-react";

interface VirtualPhoneProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  showStatusBar?: boolean;
}

export const VirtualPhone = ({ children, onClose, title = "Simulation", showStatusBar = true }: VirtualPhoneProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Phone Frame */}
        <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
          <div className="bg-black rounded-[2rem] overflow-hidden w-[320px] h-[640px] relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
            
            {/* Screen */}
            <div className="bg-background h-full w-full flex flex-col">
              {/* Status Bar */}
              {showStatusBar && (
                <div className="flex items-center justify-between px-6 py-2 text-xs text-muted-foreground bg-background/95 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-mono">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3 w-3" />
                    <span className="text-xs">100%</span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-semibold">{title}</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>

              {/* Home Indicator */}
              <div className="flex justify-center py-2">
                <div className="w-32 h-1 bg-muted-foreground/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SimulationResultProps {
  score: number;
  correct: number;
  total: number;
  onRestart: () => void;
  onNext?: () => void;
}

export const SimulationResult = ({ score, correct, total, onRestart, onNext }: SimulationResultProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Check className="h-8 w-8 text-success" />;
    if (score >= 60) return <AlertTriangle className="h-8 w-8 text-warning" />;
    return <X className="h-8 w-8 text-destructive" />;
  };

  return (
    <div className="p-6 text-center space-y-6">
      <div className="space-y-4">
        {getScoreIcon(score)}
        <div>
          <h3 className="text-2xl font-bold font-orbitron">Simulation Complete!</h3>
          <p className="text-muted-foreground">Here's how you performed</p>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Score:</span>
            <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
          </div>
          <div className="flex justify-between">
            <span>Correct Answers:</span>
            <span className="font-semibold">{correct}/{total}</span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-destructive'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button onClick={onRestart} className="w-full">
          Try Again
        </Button>
        {onNext && (
          <Button onClick={onNext} variant="outline" className="w-full">
            Next Simulation
          </Button>
        )}
      </div>
    </div>
  );
};