import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SystemAnalytics } from '@/components/SystemAnalytics';
import { UserManagementTable } from '@/components/UserManagementTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Database,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  Home,
  Menu
} from 'lucide-react';

const AdminDashboardHome: React.FC = () => {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', trend: 'up', icon: Users },
    { label: 'Active Threats', value: '23', change: '-8%', trend: 'down', icon: AlertCircle },
    { label: 'System Load', value: '67%', change: '+3%', trend: 'up', icon: Activity },
    { label: 'Uptime', value: '99.9%', change: '0%', trend: 'stable', icon: CheckCircle }
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: 34, max: 100, color: 'cyan', status: 'good' },
    { name: 'Memory Usage', value: 67, max: 100, color: 'blue', status: 'moderate' },
    { name: 'Disk Usage', value: 45, max: 100, color: 'purple', status: 'good' },
    { name: 'Network I/O', value: 23, max: 100, color: 'green', status: 'good' }
  ];

  const recentLogs = [
    { type: 'error', message: 'Failed login attempt from IP 192.168.1.100', time: '2 min ago', user: 'Unknown' },
    { type: 'warning', message: 'High CPU usage detected on server-01', time: '5 min ago', user: 'System' },
    { type: 'info', message: 'User john.doe@example.com logged in successfully', time: '12 min ago', user: 'john.doe' },
    { type: 'error', message: 'Database connection timeout', time: '18 min ago', user: 'System' },
    { type: 'info', message: 'Backup completed successfully', time: '1 hour ago', user: 'System' },
    { type: 'warning', message: 'SSL certificate expires in 30 days', time: '2 hours ago', user: 'System' }
  ];

  const activeUsers = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', lastActive: '5 min ago', status: 'online' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', lastActive: '12 min ago', status: 'online' },
    { name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Moderator', lastActive: '1 hour ago', status: 'away' },
    { name: 'Sarah Wilson', email: 'sarah.w@example.com', role: 'User', lastActive: '2 hours ago', status: 'offline' },
    { name: 'Alex Brown', email: 'alex.brown@example.com', role: 'User', lastActive: '3 hours ago', status: 'offline' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Admin Welcome */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-pink-500/20 border border-cyan-400/30 rounded-2xl p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/5 to-pink-400/10"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">
            Admin Control Center
          </h1>
          <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed max-w-2xl">
            Welcome back, {user?.name}. Complete system oversight at your fingertips.
          </p>
          <div className="flex items-center space-x-3 mt-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">All Systems Operational</span>
            <div className="h-4 w-px bg-gray-600 mx-2"></div>
            <span className="text-gray-400 text-sm">Last updated: just now</span>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="group bg-black/40 hover:bg-black/60 border-cyan-400/20 hover:border-cyan-400/40 backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-300' : 
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Metrics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base font-semibold flex items-center justify-between">
                <span>{metric.name}</span>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  metric.status === 'good' ? 'bg-green-500/20 text-green-300' :
                  metric.status === 'moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {metric.status}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2 mb-3">
                <span className="text-2xl font-bold text-white">{metric.value}%</span>
                <span className="text-sm text-gray-400 mb-1">of {metric.max}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-700 ${
                    metric.color === 'cyan' ? 'bg-gradient-to-r from-cyan-400 to-cyan-500' :
                    metric.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    metric.color === 'purple' ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                    'bg-gradient-to-r from-green-400 to-green-500'
                  }`} 
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* System Analytics - Takes 2 columns */}
        <div className="xl:col-span-2">
          <SystemAnalytics />
        </div>

        {/* Recent System Logs */}
        <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-white text-lg">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span>System Logs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  log.type === 'error' ? 'bg-red-400 animate-pulse' :
                  log.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-relaxed">{log.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-gray-400 text-xs">{log.time}</p>
                    <span className="text-gray-500">•</span>
                    <p className="text-gray-400 text-xs">by {log.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Active Users Section */}
      <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white text-xl">
            <Users className="h-6 w-6 text-cyan-400" />
            <span>Active Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {activeUsers.map((activeUser, index) => (
              <div key={index} className="group p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {activeUser.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                      activeUser.status === 'online' ? 'bg-green-400' :
                      activeUser.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm truncate">{activeUser.name}</h4>
                    <p className="text-gray-400 text-xs truncate">{activeUser.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Role</span>
                    <span className="text-xs text-white font-medium">{activeUser.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Last Active</span>
                    <span className="text-xs text-white font-medium">{activeUser.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AnalyticsPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">System Analytics</h1>
    <SystemAnalytics />
  </div>
);

const UsersPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
    <UserManagementTable />
  </div>
);

const MonitorPage: React.FC = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold text-white mb-6">System Monitor</h1>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="bg-black/60 border-green-400/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>CPU Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-400 mb-2">23%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '23%' }}></div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/60 border-blue-400/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Database className="h-5 w-5 text-blue-400" />
            <span>Memory Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-400 mb-2">67%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/60 border-yellow-400/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <span>Disk Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-400 mb-2">45%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ActivityPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">Login Activity</h1>
    <p className="text-gray-300">Login activity monitoring coming soon...</p>
  </div>
);

const HealthPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">System Health</h1>
    <p className="text-gray-300">System health monitoring coming soon...</p>
  </div>
);

const AdminSettingsPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">Admin Settings</h1>
    <p className="text-gray-300">Admin settings coming soon...</p>
  </div>
);

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Fixed Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-black/95 backdrop-blur-lg border-r border-cyan-400/30">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-screen overflow-y-auto w-full scrollbar-thin scrollbar-track-cyber-dark scrollbar-thumb-cyber-blue/50 hover:scrollbar-thumb-cyber-blue/70 transition-colors duration-300">
          {/* Enhanced Header with Mobile Menu */}
          <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-cyan-400/20 px-4 sm:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Mobile menu button + Title */}
              <div className="flex items-center space-x-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="lg:hidden text-cyan-400 hover:bg-cyan-400/10 p-2"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                
                <div className="flex items-center space-x-2">
                  <img 
                    src="/gopal-uploads/878b1e93-b32c-4111-a502-526cf9e07b1f.png" 
                    alt="Sangrakshak Logo" 
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:hidden"
                  />
                  <div>
                    <h1 className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Sangrakshak Cybersecurity Platform
                    </h1>
                    <p className="text-xs text-gray-400 hidden sm:block lg:hidden">Admin Portal</p>
                  </div>
                </div>
              </div>

              {/* Right side - Back to Home button */}
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 font-medium bg-transparent backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                >
                  <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Back to Home</span>
                  <span className="xs:hidden">Home</span>
                </Button>
              </Link>
            </div>
          </header>
          
          <Routes>
            <Route path="/" element={<AdminDashboardHome />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/settings" element={<AdminSettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}