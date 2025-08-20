import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Star, Plus, Trash2, TrendingUp } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  amount: number;
  achieved: boolean;
  badge: string;
}

const GoalPlanner = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 500000,
      currentAmount: 125000,
      targetDate: '2024-12-31',
      category: 'Safety',
      priority: 'high',
      milestones: [
        { id: '1', amount: 100000, achieved: true, badge: 'First Step' },
        { id: '2', amount: 250000, achieved: false, badge: 'Quarter Way' },
        { id: '3', amount: 375000, achieved: false, badge: 'Three Quarters' },
        { id: '4', amount: 500000, achieved: false, badge: 'Goal Achieved' }
      ]
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: 'Personal',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const [addingAmount, setAddingAmount] = useState<{ [key: string]: string }>({});

  const categories = ['Personal', 'Safety', 'Investment', 'Travel', 'Education', 'Home', 'Health'];
  const priorityColors = {
    low: 'cyber-blue',
    medium: 'cyber-gold',
    high: 'cyber-green'
  };

  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) return;

    const target = parseFloat(newGoal.targetAmount);
    const milestones: Milestone[] = [
      { id: '1', amount: target * 0.25, achieved: false, badge: 'First Quarter' },
      { id: '2', amount: target * 0.5, achieved: false, badge: 'Half Way' },
      { id: '3', amount: target * 0.75, achieved: false, badge: 'Three Quarters' },
      { id: '4', amount: target, achieved: false, badge: 'Goal Achieved' }
    ];

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: target,
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      priority: newGoal.priority,
      milestones
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      targetDate: '',
      category: 'Personal',
      priority: 'medium'
    });
  };

  const addAmountToGoal = (goalId: string) => {
    const amount = parseFloat(addingAmount[goalId] || '0');
    if (amount <= 0) return;

    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount;
        const updatedMilestones = goal.milestones.map(milestone => ({
          ...milestone,
          achieved: newAmount >= milestone.amount
        }));
        
        return {
          ...goal,
          currentAmount: Math.min(newAmount, goal.targetAmount),
          milestones: updatedMilestones
        };
      }
      return goal;
    }));

    setAddingAmount(prev => ({ ...prev, [goalId]: '' }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAchievedMilestones = (goal: Goal) => {
    return goal.milestones.filter(m => m.achieved).length;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Goals</p>
                <p className="text-cyber-blue font-orbitron font-bold text-xl">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 text-cyber-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Completed</p>
                <p className="text-cyber-green font-orbitron font-bold text-xl">
                  {goals.filter(g => g.currentAmount >= g.targetAmount).length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-cyber-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Saved</p>
                <p className="text-cyber-gold font-orbitron font-bold text-xl">
                  ₹{goals.reduce((sum, g) => sum + g.currentAmount, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyber-gold" />
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Milestones</p>
                <p className="text-cyber-purple font-orbitron font-bold text-xl">
                  {goals.reduce((sum, g) => sum + getAchievedMilestones(g), 0)}
                </p>
              </div>
              <Star className="w-8 h-8 text-cyber-purple" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Add New Goal */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-cyber-blue flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white/80">Goal Name</Label>
              <Input 
                value={newGoal.name}
                onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                placeholder="e.g., Emergency Fund"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Target Amount (₹)</Label>
                <Input 
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Target Date</Label>
                <Input 
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Category</Label>
                <select 
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full h-10 px-3 py-2 bg-cyber-gray/20 border border-cyber-blue/30 rounded-md text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-white/80">Priority</Label>
                <select 
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full h-10 px-3 py-2 bg-cyber-gray/20 border border-cyber-blue/30 rounded-md text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <Button onClick={addGoal} className="w-full bg-cyber-blue hover:bg-cyber-blue/80">
              Create Goal
            </Button>
          </CardContent>
        </Card>

        {/* Goal Progress Summary */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-white">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                No goals yet. Create your first financial goal!
              </div>
            ) : (
              goals.slice(0, 3).map(goal => {
                const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
                const daysLeft = getDaysRemaining(goal.targetDate);
                
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{goal.name}</span>
                      <Badge className={`bg-${priorityColors[goal.priority]}/20 text-${priorityColors[goal.priority]} border-${priorityColors[goal.priority]}/50`}>
                        {goal.priority}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-white/70">
                      <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <h3 className="text-xl font-rajdhani text-white">Your Goals</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {goals.map(goal => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysLeft = getDaysRemaining(goal.targetDate);
            const achievedMilestones = getAchievedMilestones(goal);
            
            return (
              <Card key={goal.id} className="cyber-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{goal.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50">
                          {goal.category}
                        </Badge>
                        <Badge className={`bg-${priorityColors[goal.priority]}/20 text-${priorityColors[goal.priority]} border-${priorityColors[goal.priority]}/50`}>
                          {goal.priority}
                        </Badge>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Progress: {progress.toFixed(1)}%</span>
                      <span className="text-white/70">{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="text-center">
                      <span className="text-cyber-blue font-orbitron font-bold">
                        ₹{goal.currentAmount.toLocaleString()}
                      </span>
                      <span className="text-white/70"> / </span>
                      <span className="text-white">
                        ₹{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Milestones ({achievedMilestones}/{goal.milestones.length})</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {goal.milestones.map(milestone => (
                        <div key={milestone.id} className={`p-2 rounded-lg border ${
                          milestone.achieved 
                            ? 'bg-cyber-green/20 border-cyber-green/50 text-cyber-green' 
                            : 'bg-cyber-gray/20 border-cyber-gray text-white/60'
                        }`}>
                          <div className="flex items-center text-xs">
                            {milestone.achieved && <Star className="w-3 h-3 mr-1" />}
                            <span>{milestone.badge}</span>
                          </div>
                          <div className="text-xs">₹{milestone.amount.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Amount */}
                  {goal.currentAmount < goal.targetAmount && (
                    <div className="flex gap-2">
                      <Input 
                        type="number"
                        placeholder="Add amount"
                        value={addingAmount[goal.id] || ''}
                        onChange={(e) => setAddingAmount(prev => ({ ...prev, [goal.id]: e.target.value }))}
                        className="bg-cyber-gray/20 border-cyber-blue/30 text-white"
                      />
                      <Button 
                        onClick={() => addAmountToGoal(goal.id)}
                        className="bg-cyber-green hover:bg-cyber-green/80"
                      >
                        Add
                      </Button>
                    </div>
                  )}

                  {goal.currentAmount >= goal.targetAmount && (
                    <div className="text-center p-3 bg-cyber-green/20 rounded-lg">
                      <Trophy className="w-6 h-6 text-cyber-green mx-auto mb-1" />
                      <span className="text-cyber-green font-bold">Goal Achieved!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoalPlanner;