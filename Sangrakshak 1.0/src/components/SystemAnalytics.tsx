import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Activity, 
  Shield, 
  TrendingUp, 
  Server, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const SystemAnalytics: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Sessions',
      value: '324',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Threats Blocked',
      value: '2,891',
      change: '-5%',
      trend: 'down',
      icon: Shield,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Server,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const systemHealth = [
    { service: 'Authentication Service', status: 'operational', uptime: '99.9%' },
    { service: 'Database Cluster', status: 'operational', uptime: '99.8%' },
    { service: 'API Gateway', status: 'operational', uptime: '100%' },
    { service: 'Threat Detection', status: 'maintenance', uptime: '98.5%' },
    { service: 'User Dashboard', status: 'operational', uptime: '99.7%' }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'john.doe@example.com', time: '2 minutes ago', type: 'user' },
    { action: 'Threat detected and blocked', source: '192.168.1.100', time: '5 minutes ago', type: 'security' },
    { action: 'Admin login', user: 'admin@sangrakshak.com', time: '10 minutes ago', type: 'admin' },
    { action: 'API key generated', user: 'jane.smith@example.com', time: '15 minutes ago', type: 'api' },
    { action: 'System backup completed', source: 'Automated', time: '30 minutes ago', type: 'system' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-400" />;
      case 'security': return <Shield className="h-4 w-4 text-red-400" />;
      case 'admin': return <Activity className="h-4 w-4 text-purple-400" />;
      case 'api': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'system': return <Server className="h-4 w-4 text-cyan-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-black/60 border-cyan-400/20 backdrop-blur-lg relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`}></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2 space-x-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400 text-xs">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-lg">
          <CardHeader className="border-b border-cyan-400/20">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Server className="h-5 w-5 text-cyan-400" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'operational' ? 'bg-green-400 animate-pulse' : 
                    service.status === 'maintenance' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium text-sm">{service.service}</p>
                    <p className="text-gray-400 text-xs">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {service.status === 'operational' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : service.status === 'maintenance' ? (
                    <Clock className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-xs font-medium capitalize ${
                    service.status === 'operational' ? 'text-green-400' :
                    service.status === 'maintenance' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-black/60 border-cyan-400/20 backdrop-blur-lg">
          <CardHeader className="border-b border-cyan-400/20">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-800/20 rounded-lg transition-colors">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {activity.user || activity.source} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};