import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScenarioResult, UserProgress } from '../FraudSimulationSection';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Star,
  Trophy,
  BookOpen
} from 'lucide-react';

interface ScenarioFeedbackProps {
  result: ScenarioResult;
  onNext: () => void;
  onRetry: () => void;
  userProgress: UserProgress;
}

export const ScenarioFeedback = ({ result, onNext, onRetry, userProgress }: ScenarioFeedbackProps) => {
  return (
    <Card className="cyber-card p-6 space-y-6">
      {/* Result Header */}
      <div className="text-center">
        {result.correct ? (
          <div className="space-y-2">
            <CheckCircle className="w-12 h-12 text-cyber-green mx-auto" />
            <h3 className="font-orbitron text-xl font-bold text-cyber-green">
              Excellent!
            </h3>
            <p className="text-sm text-white/80">You made the right choice</p>
          </div>
        ) : (
          <div className="space-y-2">
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="font-orbitron text-xl font-bold text-red-500">
              Not Quite Right
            </h3>
            <p className="text-sm text-white/80">Let's learn from this</p>
          </div>
        )}
      </div>

      {/* XP and Badge Earned */}
      {result.correct && (
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-cyber-gold" />
            <span className="font-semibold text-cyber-gold">
              +{result.xpEarned} XP Earned
            </span>
          </div>
          
          {result.badgeEarned && (
            <div className="text-center">
              <Badge variant="outline" className="border-cyber-gold text-cyber-gold">
                <Trophy className="w-3 h-3 mr-1" />
                New Badge: {result.badgeEarned}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          What You Should Know
        </h4>
        <div className="p-4 bg-cyber-gray/30 rounded-lg">
          <p className="text-sm text-white/90 leading-relaxed">
            {result.explanation}
          </p>
        </div>
      </div>

      {/* Learning Points */}
      <div className="space-y-2">
        <h5 className="font-semibold text-white text-sm">Key Learning Points:</h5>
        <ul className="space-y-1 text-xs text-white/80">
          <li className="flex items-start space-x-2">
            <span className="text-cyber-blue">•</span>
            <span>Always verify sender authenticity</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-cyber-blue">•</span>
            <span>Check URLs before clicking</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-cyber-blue">•</span>
            <span>Never share OTPs or passwords</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-cyber-blue">•</span>
            <span>Report suspicious activities</span>
          </li>
        </ul>
      </div>

      {/* Current Progress */}
      <div className="p-4 bg-cyber-blue/10 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-white/60">Total XP</p>
            <p className="font-semibold text-cyber-blue">{userProgress.xp}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Scenarios</p>
            <p className="font-semibold text-cyber-green">{userProgress.completedScenarios.length}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onNext}
          className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-white"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Next Scenario
        </Button>
        
        {!result.correct && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="w-full border-cyber-gold text-cyber-gold hover:bg-cyber-gold/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>

      {/* Motivational Message */}
      <div className="text-center">
        <p className="text-xs text-white/60">
          {result.correct 
            ? "Keep up the great work! Stay vigilant against cyber threats." 
            : "Every mistake is a learning opportunity. You're getting stronger!"
          }
        </p>
      </div>
    </Card>
  );
};