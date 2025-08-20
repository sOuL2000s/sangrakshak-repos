import { useState } from "react";
import { Menu, User, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [isLoggedIn] = useState(false); // This will be managed by auth context later

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section - Hamburger + Logo & Branding */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="p-2 hover:bg-primary/10 transition-all duration-300"
          >
            <Menu className="h-6 w-6 text-primary" />
          </Button>

          <div className="flex items-center space-x-3">
            <img 
              src="https://github.com/debarghya17/UI-Elements/blob/main/sangrakshak.png?raw=true"
              alt="SangrakshaX Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="font-orbitron text-xl font-bold text-gradient">
                SangrakshakX
              </h1>
              <p className="text-xs text-muted-foreground font-inter italic">
                From the Family of AstraGenX Corp.
              </p>
            </div>
          </div>
        </div>

        {/* Right section - Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
              <User className="h-6 w-6 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="glass-card border-glass-border/50 bg-glass/95 backdrop-blur-xl"
          >
            {isLoggedIn ? (
              <>
                <DropdownMenuItem className="hover:bg-primary/10">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-destructive/10 text-destructive">
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem className="hover:bg-primary/10">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};