import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Eye, CheckCircle } from "lucide-react";

const threats = [
  {
    id: 1,
    type: "Phishing Attempt",
    severity: "high",
    description: "Suspicious email detected from unknown sender",
    time: "5 minutes ago",
    status: "blocked"
  },
  {
    id: 2,
    type: "Malware Scan",
    severity: "medium",
    description: "Potentially unwanted program found",
    time: "1 hour ago", 
    status: "quarantined"
  },
  {
    id: 3,
    type: "Network Intrusion",
    severity: "low",
    description: "Unusual traffic pattern detected",
    time: "3 hours ago",
    status: "monitoring"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "text-destructive";
    case "medium": 
      return "text-warning";
    case "low":
      return "text-success";
    default:
      return "text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "blocked":
      return <Shield className="h-4 w-4 text-destructive" />;
    case "quarantined":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case "monitoring":
      return <Eye className="h-4 w-4 text-success" />;
    default:
      return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

export const ThreatAlerts = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="font-orbitron text-xl flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Security Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="mt-1">
              {getStatusIcon(threat.status)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{threat.type}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getSeverityColor(threat.severity)}`}
                >
                  {threat.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {threat.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {threat.time}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="opacity-70 hover:opacity-100">
              View
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4 btn-glass">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};