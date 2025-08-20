import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserSidebar } from '@/components/UserSidebar';
import { ThreatMonitoringWidget } from '@/components/ThreatMonitoringWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Shield, 
  Calendar, 
  Mail, 
  User, 
  Key, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Home,
  Menu
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  // Mock API keys data
  const apiKeys = [
    { name: 'VirusTotal API', status: 'active', lastUsed: '2 hours ago', requests: '1,247', limit: '5,000' },
    { name: 'Shodan API', status: 'active', lastUsed: '1 day ago', requests: '873', limit: '2,500' },
    { name: 'AbuseIPDB', status: 'inactive', lastUsed: '5 days ago', requests: '0', limit: '1,000' },
    { name: 'IPGeolocation', status: 'active', lastUsed: '3 hours ago', requests: '456', limit: '2,000' },
    { name: 'URLVoid API', status: 'active', lastUsed: '6 hours ago', requests: '234', limit: '1,500' },
    { name: 'IBM X-Force', status: 'maintenance', lastUsed: '2 days ago', requests: '0', limit: '500' }
  ];

  const securityTools = [
    { name: 'Network Scanner', status: 'online', description: 'Monitors network traffic', alerts: 3, uptime: '99.8%' },
    { name: 'Malware Detector', status: 'online', description: 'Real-time malware scanning', alerts: 12, uptime: '99.9%' },
    { name: 'Firewall Monitor', status: 'maintenance', description: 'Firewall status tracking', alerts: 0, uptime: '97.2%' },
    { name: 'Intrusion Detection', status: 'online', description: 'Advanced threat detection', alerts: 7, uptime: '99.5%' },
    { name: 'Data Loss Prevention', status: 'online', description: 'Prevents data breaches', alerts: 1, uptime: '99.7%' },
    { name: 'Email Security', status: 'offline', description: 'Email threat protection', alerts: 0, uptime: '95.3%' }
  ];

  const recentActivities = [
    { type: 'threat', message: 'Suspicious IP blocked: 192.168.1.100', time: '5 minutes ago', severity: 'high' },
    { type: 'scan', message: 'Network scan completed successfully', time: '15 minutes ago', severity: 'info' },
    { type: 'alert', message: 'Malware detected and quarantined', time: '1 hour ago', severity: 'critical' },
    { type: 'update', message: 'Security definitions updated', time: '2 hours ago', severity: 'info' },
    { type: 'threat', message: 'Phishing attempt blocked', time: '3 hours ago', severity: 'medium' },
    { type: 'scan', message: 'Vulnerability scan initiated', time: '4 hours ago', severity: 'info' }
  ];

  const quickStats = [
    { label: 'Threats Blocked', value: '1,234', change: '+12%', trend: 'up', icon: Shield },
    { label: 'Scans Today', value: '89', change: '+23%', trend: 'up', icon: Activity },
    { label: 'API Calls', value: '2,567', change: '-5%', trend: 'down', icon: Key },
    { label: 'System Uptime', value: '99.9%', change: '0%', trend: 'stable', icon: CheckCircle }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section with Enhanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/20 border border-cyan-400/30 rounded-2xl p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/5 to-purple-400/10"></div>
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-3">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-base sm:text-lg text-gray-300/90 leading-relaxed max-w-2xl">
            Your cybersecurity command center is operational. Monitor threats, manage tools, and stay protected.
          </p>
          <div className="flex items-center space-x-3 mt-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="group bg-black/40 hover:bg-black/60 border-cyan-400/20 hover:border-cyan-400/40 backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Threat Monitoring - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <ThreatMonitoringWidget />
        </div>

        {/* Recent Activities */}
        <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-white text-lg">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                  activity.severity === 'high' ? 'bg-orange-400' :
                  activity.severity === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-relaxed">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* User Profile Card - Enhanced */}
      <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white text-xl">
            <User className="h-6 w-6 text-cyan-400" />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium break-all">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-white font-medium">{user?.signupDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {user?.role}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Key className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Login Method</p>
                <p className="text-white font-medium capitalize">{user?.loginMethod}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Tools - Enhanced */}
      <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white text-xl">
            <Shield className="h-6 w-6 text-cyan-400" />
            <span>Security Tools Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityTools.map((tool, index) => (
              <div key={index} className="group p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tool.status === 'online' ? 'bg-green-400' : 
                      tool.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                    } animate-pulse`}></div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{tool.name}</h3>
                      <p className="text-gray-400 text-xs">{tool.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={tool.status === 'online' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      tool.status === 'online' ? 'bg-green-500/20 text-green-300' :
                      tool.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {tool.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Alerts: <span className="text-white font-medium">{tool.alerts}</span></span>
                  <span className="text-gray-400">Uptime: <span className="text-white font-medium">{tool.uptime}</span></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys Section - Enhanced */}
      <Card className="bg-black/40 border-cyan-400/20 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white text-xl">
            <Key className="h-6 w-6 text-cyan-400" />
            <span>API Key Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiKeys.map((api, index) => (
              <div key={index} className="group p-5 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">{api.name}</h3>
                  {api.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : api.status === 'maintenance' ? (
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-400 text-sm">Last used: <span className="text-white">{api.lastUsed}</span></p>
                  <p className="text-gray-400 text-sm">Usage: <span className="text-white">{api.requests}</span> / {api.limit}</p>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        api.status === 'active' ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-gray-600'
                      }`} 
                      style={{ width: `${(parseInt(api.requests.replace(',', '')) / parseInt(api.limit.replace(',', ''))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <Badge 
                  variant={api.status === 'active' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    api.status === 'active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                    api.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}
                >
                  {api.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ToolsPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">Security Tools</h1>
    <p className="text-gray-300">Security tools management coming soon...</p>
  </div>
);

const MonitorPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">Threat Monitor</h1>
    <ThreatMonitoringWidget />
  </div>
);

const ApiKeysPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">API Keys</h1>
    <p className="text-gray-300">API key management coming soon...</p>
  </div>
);

const SettingsPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
    <p className="text-gray-300">User settings coming soon...</p>
  </div>
);

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Fixed Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
        <UserSidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-gray-900/95 backdrop-blur-lg border-r border-cyan-500/20">
          <UserSidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-screen overflow-y-auto w-full scrollbar-thin scrollbar-track-cyber-dark scrollbar-thumb-cyber-blue/50 hover:scrollbar-thumb-cyber-blue/70 transition-colors duration-300">
          {/* Enhanced Header with Mobile Menu */}
          <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Mobile menu button + Title */}
              <div className="flex items-center space-x-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="lg:hidden text-cyan-400 hover:bg-cyan-500/10 p-2"
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
                    <h1 className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Sangrakshak Cybersecurity Platform
                    </h1>
                    <p className="text-xs text-gray-400 hidden sm:block lg:hidden">User Dashboard</p>
                  </div>
                </div>
              </div>

              {/* Right side - Back to Home button */}
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-medium bg-transparent backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                >
                  <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Back to Home</span>
                  <span className="xs:hidden">Home</span>
                </Button>
              </Link>
            </div>
          </header>
          
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}