import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Zap, Gift, Bell, Calendar, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'savings' | 'learning' | 'goals' | 'consistency';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  points: number;
  deadline: string;
  category: string;
}

const GamificationPanel = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [streak, setStreak] = useState(7);
  const [selectedTab, setSelectedTab] = useState('overview');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first financial calculation',
      icon: <Target className="w-6 h-6" />,
      points: 50,
      unlocked: true,
      unlockedAt: '2024-01-15',
      category: 'learning'
    },
    {
      id: '2',
      title: 'Savings Hero',
      description: 'Add ₹10,000 to your goals',
      icon: <Trophy className="w-6 h-6" />,
      points: 100,
      unlocked: true,
      unlockedAt: '2024-01-20',
      category: 'savings'
    },
    {
      id: '3',
      title: 'Goal Getter',
      description: 'Create your first savings goal',
      icon: <Star className="w-6 h-6" />,
      points: 75,
      unlocked: true,
      unlockedAt: '2024-01-18',
      category: 'goals'
    },
    {
      id: '4',
      title: 'Week Warrior',
      description: 'Track expenses for 7 consecutive days',
      icon: <Zap className="w-6 h-6" />,
      points: 150,
      unlocked: true,
      unlockedAt: '2024-01-25',
      category: 'consistency'
    },
    {
      id: '5',
      title: 'Investment Explorer',
      description: 'Complete 10 SIP calculations',
      icon: <TrendingUp className="w-6 h-6" />,
      points: 200,
      unlocked: false,
      category: 'learning'
    },
    {
      id: '6',
      title: 'Budget Master',
      description: 'Stay within budget for a month',
      icon: <Gift className="w-6 h-6" />,
      points: 300,
      unlocked: false,
      category: 'savings'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Expense Tracker',
      description: 'Log 20 expenses this month',
      target: 20,
      current: 14,
      points: 100,
      deadline: '2024-01-31',
      category: 'Daily Habits'
    },
    {
      id: '2',
      title: 'Goal Progress',
      description: 'Add ₹5,000 to any goal',
      target: 5000,
      current: 2500,
      points: 150,
      deadline: '2024-02-15',
      category: 'Savings'
    },
    {
      id: '3',
      title: 'Learning Streak',
      description: 'Use financial tools for 14 days',
      target: 14,
      current: 7,
      points: 200,
      deadline: '2024-02-10',
      category: 'Consistency'
    }
  ];

  const reminders = [
    { id: '1', title: 'Monthly SIP Due', description: 'Don\'t forget your ₹5,000 SIP investment', time: '3 hours' },
    { id: '2', title: 'Expense Review', description: 'Review this week\'s spending patterns', time: '1 day' },
    { id: '3', title: 'Goal Check-in', description: 'Update progress on Emergency Fund goal', time: '2 days' }
  ];

  const levelThresholds = [0, 100, 500, 1000, 2000, 3500, 5500, 8000];
  const currentLevelMin = levelThresholds[userLevel - 1];
  const nextLevelMin = levelThresholds[userLevel] || 10000;
  const levelProgress = ((userPoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;

  const getCategoryColor = (category: string) => {
    const colors = {
      savings: 'cyber-green',
      learning: 'cyber-blue',
      goals: 'cyber-purple',
      consistency: 'cyber-gold'
    };
    return colors[category as keyof typeof colors] || 'cyber-blue';
  };

  const getLevelTitle = (level: number) => {
    const titles = ['Beginner', 'Explorer', 'Saver', 'Investor', 'Planner', 'Expert', 'Master', 'Legend'];
    return titles[level - 1] || 'Financial Guru';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Trophy className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Star className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Target className="w-4 h-4" /> },
    { id: 'reminders', label: 'Reminders', icon: <Bell className="w-4 h-4" /> }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="cyber-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-orbitron font-bold text-cyber-gold mb-1">{userPoints}</div>
            <div className="text-white/70 text-sm">Total Points</div>
          </CardContent>
        </Card>
        <Card className="cyber-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-orbitron font-bold text-cyber-blue mb-1">{userLevel}</div>
            <div className="text-white/70 text-sm">Level</div>
          </CardContent>
        </Card>
        <Card className="cyber-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-orbitron font-bold text-cyber-green mb-1">{streak}</div>
            <div className="text-white/70 text-sm">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="cyber-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-orbitron font-bold text-cyber-purple mb-1">
              {achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-white/70 text-sm">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Level Progress</CardTitle>
            <Badge className="bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50">
              {getLevelTitle(userLevel)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white">Level {userLevel}</span>
            <span className="text-white/70">Next: Level {userLevel + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-3" />
          <div className="flex justify-between text-sm text-white/70">
            <span>{userPoints} pts</span>
            <span>{nextLevelMin} pts needed</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.filter(a => a.unlocked).slice(0, 3).map(achievement => (
              <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-cyber-gray/20 rounded-lg">
                <div className={`p-2 rounded-lg bg-${getCategoryColor(achievement.category)}/20 text-${getCategoryColor(achievement.category)}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{achievement.title}</h4>
                  <p className="text-white/70 text-sm">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-cyber-gold font-bold">+{achievement.points}</div>
                  <div className="text-white/60 text-xs">{achievement.unlockedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges Preview */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white">Active Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.slice(0, 2).map(challenge => (
              <div key={challenge.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{challenge.title}</span>
                  <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 text-xs">
                    {challenge.category}
                  </Badge>
                </div>
                <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-white/70">
                  <span>{challenge.current} / {challenge.target}</span>
                  <span>+{challenge.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {achievements.map(achievement => (
          <Card key={achievement.id} className={`cyber-card ${achievement.unlocked ? 'border-cyber-green/50' : 'border-cyber-gray/30'}`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  achievement.unlocked 
                    ? `bg-${getCategoryColor(achievement.category)}/20 text-${getCategoryColor(achievement.category)}` 
                    : 'bg-cyber-gray/20 text-white/50'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-rajdhani font-semibold ${achievement.unlocked ? 'text-white' : 'text-white/50'}`}>
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && (
                      <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/50">
                        <Trophy className="w-3 h-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-white/70' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-cyber-gold font-bold">+{achievement.points} points</div>
                    {achievement.unlockedAt && (
                      <div className="text-white/60 text-xs">Unlocked: {achievement.unlockedAt}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {challenges.map(challenge => {
          const progress = (challenge.current / challenge.target) * 100;
          const daysLeft = Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={challenge.id} className="cyber-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white">{challenge.title}</CardTitle>
                  <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50">
                    {challenge.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70">{challenge.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Progress: {progress.toFixed(1)}%</span>
                    <span className="text-white/70">{daysLeft} days left</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{challenge.current} / {challenge.target}</span>
                    <span className="text-cyber-gold font-bold">+{challenge.points} pts</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  progress >= 100 ? 'bg-cyber-green/20 border border-cyber-green/50' :
                  daysLeft <= 3 ? 'bg-red-500/20 border border-red-500/50' :
                  'bg-cyber-blue/10 border border-cyber-blue/30'
                }`}>
                  <span className={`text-sm font-medium ${
                    progress >= 100 ? 'text-cyber-green' :
                    daysLeft <= 3 ? 'text-red-400' :
                    'text-cyber-blue'
                  }`}>
                    {progress >= 100 ? '🎉 Challenge Complete!' :
                     daysLeft <= 3 ? '⚠️ Deadline Approaching' :
                     '💪 Keep Going!'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-4">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Upcoming Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reminders.map(reminder => (
              <div key={reminder.id} className="flex items-center justify-between p-4 bg-cyber-gray/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyber-blue/20 rounded-lg">
                    <Bell className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{reminder.title}</h4>
                    <p className="text-white/70 text-sm">{reminder.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyber-gold text-sm font-medium">In {reminder.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Habit Tracker */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Habit Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="text-center">
                  <div className="text-white/70 text-xs mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 ${
                    i < streak 
                      ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' 
                      : 'border-cyber-gray text-white/50'
                  } flex items-center justify-center text-xs font-bold`}>
                    {i < streak ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-cyber-green font-bold">{streak} day streak!</span>
              <span className="text-white/70 ml-2">Keep it up!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "outline"}
            onClick={() => setSelectedTab(tab.id)}
            className={`
              ${selectedTab === tab.id 
                ? 'bg-cyber-gold/20 text-cyber-gold border-cyber-gold/50' 
                : 'bg-cyber-gray/30 border-cyber-blue/30 text-white hover:bg-cyber-blue/10'
              }
              font-rajdhani font-semibold transition-all duration-300
            `}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'achievements' && renderAchievements()}
        {selectedTab === 'challenges' && renderChallenges()}
        {selectedTab === 'reminders' && renderReminders()}
      </div>
    </div>
  );
};

export default GamificationPanel;