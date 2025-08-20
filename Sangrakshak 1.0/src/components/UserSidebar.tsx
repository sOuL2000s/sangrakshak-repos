import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Shield, Settings, LogOut, Key, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UserSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Shield, label: 'Security Tools', path: '/dashboard/tools' },
    { icon: Activity, label: 'Threat Monitor', path: '/dashboard/monitor' },
    { icon: Key, label: 'API Keys', path: '/dashboard/api-keys' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-lg border-r border-cyan-500/20 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <img 
            src="/gopal-uploads/878b1e93-b32c-4111-a502-526cf9e07b1f.png" 
            alt="Sangrakshak Logo" 
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Sangrakshak
            </h1>
            <p className="text-xs text-gray-400">Cybersecurity Platform</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user?.name}</p>
            <p className="text-gray-400 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};