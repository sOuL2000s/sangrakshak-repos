import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Activity, 
  Settings, 
  LogOut, 
  BarChart3,
  Eye,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Activity, label: 'System Monitor', path: '/admin/monitor' },
    { icon: Eye, label: 'Login Activity', path: '/admin/activity' },
    { icon: Database, label: 'System Health', path: '/admin/health' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-black/95 backdrop-blur-lg border-r border-cyan-400/30 h-screen flex flex-col relative overflow-hidden">
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
      
      {/* Header */}
      <div className="relative p-6 border-b border-cyan-400/30">
        <div className="flex items-center space-x-3">
          <img 
            src="/gopal-uploads/878b1e93-b32c-4111-a502-526cf9e07b1f.png" 
            alt="Sangrakshak Logo" 
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sangrakshak
            </h1>
            <p className="text-xs text-cyan-300/80">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="relative p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/25">
            <span className="text-black font-bold text-sm">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user?.name}</p>
            <p className="text-cyan-300/80 text-xs font-medium">Administrator</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-400/10'
                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:text-cyan-200 hover:border hover:border-cyan-400/20'
              }`
            }
          >
            <item.icon className="h-5 w-5 relative z-10" />
            <span className="font-medium relative z-10">{item.label}</span>
            {/* Neon glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/5 group-hover:to-purple-400/5 rounded-lg transition-all duration-300"></div>
          </NavLink>
        ))}
        
        {/* Logout button - moved higher for better visibility */}
        <div className="pt-4 mt-4 border-t border-gray-700/50">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10 border hover:border-red-400/20 transition-all duration-300"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </nav>

      {/* System Status */}
      <div className="relative p-4 border-t border-gray-700/50">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-xs font-medium">System Online</span>
          </div>
          <p className="text-green-200/80 text-xs mt-1">All services operational</p>
        </div>
      </div>
    </div>
  );
};