import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { ThreatAlerts } from "@/components/dashboard/ThreatAlerts";
import { 
  DollarSign, 
  Shield, 
  Users, 
  TrendingUp, 
  Activity,
  BookOpen,
  Target,
  Zap
} from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} />
      
      {/* Main Content */}
      <main 
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-orbitron text-gradient">
              Welcome to SangrakshakX v2.0 SS
            </h1>
            <p className="text-muted-foreground">
              Your comprehensive financial literacy and cybersecurity protection platform
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Savings"
              value="₹2,45,000"
              change="+12% from last month"
              trend="up"
              icon={DollarSign}
            />
            <StatsCard
              title="Threats Blocked"
              value="1,247"
              change="+5% this week"
              trend="up"
              icon={Shield}
            />
            <StatsCard
              title="Learning Progress"
              value="75%"
              change="3 modules completed"
              trend="up"
              icon={BookOpen}
            />
            <StatsCard
              title="Security Score"
              value="94/100"
              change="Excellent rating"
              trend="up"
              icon={Target}
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />
              
              {/* Recent Activity */}
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Completed "Investment Basics" lesson</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="h-8 w-8 bg-gradient-accent rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Blocked phishing attempt</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">AI Advisor generated new tips</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <ProgressOverview />
              <ThreatAlerts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
