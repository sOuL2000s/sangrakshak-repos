import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  const dashboardPath = user.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 font-rajdhani bg-transparent backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
        >
          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">{user.name}</span>
          <span className="xs:hidden truncate max-w-[60px]">{user.name.split(' ')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-cyber-dark/95 backdrop-blur-md border-cyber-blue/20 z-50"
      >
        <DropdownMenuItem asChild>
          <Link to={dashboardPath} className="flex items-center cursor-pointer text-white hover:bg-cyber-blue/10">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center cursor-pointer text-white hover:bg-cyber-blue/10">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-cyber-blue/20" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center cursor-pointer text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};