import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProgress } from '../FraudSimulationSection';
import {
  ArrowLeft,
  Trophy,
  Target,
  Shield,
  Star,
  Award,
  Flame
} from 'lucide-react';

interface GameProgressProps {
  userProgress: UserProgress;
  currentLevelProgress: number;
  onBack: () => void;
}

export const GameProgress = ({ userProgress, currentLevelProgress, onBack }: GameProgressProps) => {
  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'first-correct': return <Target className="w-4 h-4" />;
      case 'sms-expert': return <Shield className="w-4 h-4" />;
      case 'email-guardian': return <Trophy className="w-4 h-4" />;
      case 'streak-3': return <Flame className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-cyber-green';
      case 'intermediate': return 'text-cyber-gold';
      case 'advanced': return 'text-cyber-magenta';
      default: return 'text-white';
    }
  };

  const getNextLevelXP = () => {
    switch (userProgress.level) {
      case 'beginner': return 100;
      case 'intermediate': return 250;
      case 'advanced': return 500;
      default: return 100;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="w-full border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Menu
      </Button>

      {/* User Level & XP */}
      <Card className="cyber-card p-6">
        <div className="text-center mb-4">
          <Badge
            variant="outline"
            className={`border-current ${getLevelColor(userProgress.level)} mb-2 text-lg px-3 py-1`}
          >
            {userProgress.level.toUpperCase()}
          </Badge>
          <p className="text-2xl font-orbitron font-bold text-white">
            {userProgress.xp} XP
          </p>
          <p className="text-sm text-white/60">
            Next level: {getNextLevelXP()} XP
          </p>
        </div>

        <Progress
          value={currentLevelProgress}
          className="h-2 bg-cyber-gray"
        />
        <p className="text-xs text-white/60 mt-2 text-center">
          {Math.round(currentLevelProgress)}% to next level
        </p>
      </Card>

      {/* Streak Counter */}
      <Card className="cyber-card p-4">
        <div className="flex items-center justify-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-white">
            {userProgress.streakDays} Day Streak
          </span>
        </div>
      </Card>

      {/* Badges */}
      <Card className="cyber-card p-6">
        <h3 className="font-orbitron font-semibold text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-cyber-gold" />
          Badges Earned
        </h3>

        {userProgress.badges.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {userProgress.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-cyber-gray/50 rounded-lg"
              >
                {getBadgeIcon(badge)}
                <span className="text-xs text-white/80 capitalize">
                  {badge.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/60 text-center py-4">
            Complete scenarios to earn badges!
          </p>
        )}
      </Card>

      {/* Statistics */}
      <Card className="cyber-card p-6">
        <h3 className="font-orbitron font-semibold text-white mb-4">Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/80">Scenarios Completed</span>
            <span className="text-cyber-blue font-semibold">
              {userProgress.completedScenarios.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Success Rate</span>
            <span className="text-cyber-green font-semibold">
              {userProgress.completedScenarios.length > 0 ? '85%' : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Badges Earned</span>
            <span className="text-cyber-gold font-semibold">
              {userProgress.badges.length}
            </span>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="cyber-card p-4">
        <h4 className="font-semibold text-white mb-2 flex items-center">
          <Star className="w-4 h-4 mr-2 text-cyber-gold" />
          Pro Tip
        </h4>
        <p className="text-xs text-white/70">
          Always check sender details, URLs, and request urgency before taking action on suspicious messages.
        </p>
      </Card>
    </div>
  );
};