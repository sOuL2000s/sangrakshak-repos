import { 
  Calculator, 
  Bot, 
  Gamepad2, 
  BookOpen, 
  Shield, 
  CreditCard 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const quickActions = [
  {
    title: "EMI Calculator",
    description: "Calculate loan EMIs",
    icon: Calculator,
    href: "/calculators",
    color: "primary"
  },
  {
    title: "AI Advisor",
    description: "Get personalized tips",
    icon: Bot,
    href: "/ai-advisor",
    color: "accent"
  },
  {
    title: "Play Game",
    description: "Learn through simulation",
    icon: Gamepad2,
    href: "/simulation",
    color: "success"
  },
  {
    title: "Learn Finance",
    description: "Educational resources",
    icon: BookOpen,
    href: "/learning",
    color: "warning"
  },
  {
    title: "SecureShield",
    description: "Protect your website",
    icon: Shield,
    href: "/secureshield",
    color: "destructive"
  },
  {
    title: "Safe Payments",
    description: "Secure transactions",
    icon: CreditCard,
    href: "/payments",
    color: "primary"
  }
];

export const QuickActions = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-orbitron text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <NavLink key={action.href} to={action.href}>
              <Button
                variant="ghost"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/10 transition-all duration-300 group"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                  <action.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </NavLink>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};