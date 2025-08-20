import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, CheckCircle } from 'lucide-react';

interface PremiumStatusBadgeProps {
  plan: {
    name: string;
    price: string;
    period: string;
  } | null;
  className?: string;
}

const PremiumStatusBadge: React.FC<PremiumStatusBadgeProps> = ({ plan, className = "" }) => {
  if (!plan || plan.price === "Free") {
    return null;
  }

  return (
    <Badge className={`bg-gradient-to-r from-cyber-gold to-cyber-purple text-cyber-dark font-orbitron font-bold px-3 py-1 ${className}`}>
      <Crown className="w-4 h-4 mr-1" />
      Premium User - {plan.name}
    </Badge>
  );
};

export default PremiumStatusBadge;