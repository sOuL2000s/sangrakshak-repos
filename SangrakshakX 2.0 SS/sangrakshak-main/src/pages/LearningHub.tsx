import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Star,
  Award
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Financial Basics",
    description: "Learn the fundamentals of personal finance",
    lessons: 12,
    duration: "2 hours",
    difficulty: "Beginner",
    progress: 100,
    rating: 4.8
  },
  {
    id: 2,
    title: "Investment Strategies",
    description: "Master different investment approaches",
    lessons: 15,
    duration: "3 hours", 
    difficulty: "Intermediate",
    progress: 60,
    rating: 4.9
  },
  {
    id: 3,
    title: "Tax Planning",
    description: "Optimize your tax savings effectively",
    lessons: 8,
    duration: "1.5 hours",
    difficulty: "Intermediate", 
    progress: 0,
    rating: 4.7
  },
  {
    id: 4,
    title: "Retirement Planning",
    description: "Plan for a secure financial future",
    lessons: 20,
    duration: "4 hours",
    difficulty: "Advanced",
    progress: 25,
    rating: 4.9
  }
];

const LearningHub = () => {
  return (
    <Layout>
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-gradient">
          Learning Hub
        </h1>
        <p className="text-muted-foreground">
          Enhance your financial literacy with our comprehensive courses
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">12</p>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">48h</p>
                <p className="text-sm text-muted-foreground">Learning Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">8</p>
                <p className="text-sm text-muted-foreground">Certificates Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="glass-card hover-lift hover-glow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="font-orbitron">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {course.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning" />
                  {course.rating}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="flex items-center gap-2">
                {course.progress === 100 ? (
                  <Button className="btn-glow flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </Button>
                ) : course.progress > 0 ? (
                  <Button className="btn-glow flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                ) : (
                  <Button className="btn-glow flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Course
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default LearningHub;