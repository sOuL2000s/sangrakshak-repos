import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Gamepad2,
  Bot,
  Calculator,
  BarChart3,
  Users,
  CreditCard,
  Shield,
  Activity,
  Settings,
  HelpCircle,
  Info,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Learning Hub", url: "/learning", icon: BookOpen },
  { title: "Simulation Game", url: "/simulation", icon: Gamepad2 },
  { title: "AI Advisor", url: "/ai-advisor", icon: Bot },
  { title: "Calculators", url: "/calculators", icon: Calculator },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Community", url: "/community", icon: Users },
  { title: "Safe Payments Lab", url: "/payments", icon: CreditCard },
];

const securityItems = [
  { title: "SecureShield", url: "/secureshield", icon: Shield },
  { title: "Threat Monitoring", url: "/monitoring", icon: Activity },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "About", url: "/about", icon: Info },
];

export const Sidebar = ({ isOpen, className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const SidebarItem = ({ item, isCompact = false }: { item: any; isCompact?: boolean }) => (
    <NavLink 
      to={item.url} 
      className="block"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 h-12 transition-all duration-300 group relative overflow-hidden",
          "hover:bg-sidebar-accent/50 hover:shadow-lg hover:border-primary/30",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:to-accent/10",
          "before:translate-x-[-100%] before:transition-transform before:duration-300",
          "hover:before:translate-x-0",
          isActive(item.url) && "bg-sidebar-accent text-sidebar-primary shadow-lg border border-primary/30",
          isActive(item.url) && "before:translate-x-0",
          isCompact && "px-3 justify-center"
        )}
      >
        <item.icon className={cn(
          "h-5 w-5 transition-all duration-300 relative z-10",
          "group-hover:scale-110 group-hover:text-primary",
          isActive(item.url) && "text-sidebar-primary scale-110"
        )} />
        {!isCompact && (
          <span className={cn(
            "font-medium transition-all duration-300 relative z-10",
            "group-hover:text-primary",
            isActive(item.url) && "text-sidebar-primary"
          )}>
            {item.title}
          </span>
        )}
        {!isCompact && isActive(item.url) && (
          <ChevronRight className="h-4 w-4 ml-auto text-sidebar-primary relative z-10 animate-pulse" />
        )}
      </Button>
    </NavLink>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 glass-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        "border-r border-sidebar-border/30",
        className
      )}
    >
      <ScrollArea className="h-full py-4">
        <div className="px-3 space-y-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!isOpen && <div className="h-6" />}
            {isOpen && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                Main
              </h3>
            )}
            {mainMenuItems.map((item) => (
              <SidebarItem key={item.url} item={item} isCompact={!isOpen} />
            ))}
          </div>

          <Separator className="bg-sidebar-border/30" />

          {/* Security Section */}
          <div className="space-y-1">
            {isOpen && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Security
              </h3>
            )}
            {securityItems.map((item) => (
              <SidebarItem key={item.url} item={item} isCompact={!isOpen} />
            ))}
          </div>

          <Separator className="bg-sidebar-border/30" />

          {/* Other Items */}
          <div className="space-y-1">
            {isOpen && (
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                Other
              </h3>
            )}
            {otherItems.map((item) => (
              <SidebarItem key={item.url} item={item} isCompact={!isOpen} />
            ))}
          </div>

          {/* Upgrade Section */}
          {isOpen && (
            <div className="mt-8 px-3">
              <div className="glass-card p-4 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Upgrade</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Unlock advanced features and protect more endpoints.
                </p>
                <Button size="sm" className="w-full btn-glow">
                  Go Premium
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
