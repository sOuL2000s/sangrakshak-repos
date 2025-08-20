import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

const progressData = [
  {
    title: "Financial Literacy",
    progress: 75,
    level: "Advanced",
    color: "primary",
    icon: TrendingUp
  },
  {
    title: "Fraud Awareness",
    progress: 60,
    level: "Intermediate", 
    color: "accent",
    icon: Target
  },
  {
    title: "Cybersecurity Knowledge",
    progress: 45,
    level: "Beginner",
    color: "success",
    icon: Award
  },
  {
    title: "Safe Habits",
    progress: 85,
    level: "Expert",
    color: "warning",
    icon: Clock
  }
];

export const ProgressOverview = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {progressData.map((item) => (
          <div key={item.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{item.title}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {item.level}
              </Badge>
            </div>
            <div className="space-y-1">
              <Progress value={item.progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {item.progress}% Complete
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};