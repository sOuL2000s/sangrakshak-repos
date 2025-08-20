import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Shield,
  Target,
  Calendar,
  Download,
  Filter
} from "lucide-react";

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-gradient">
          Financial Reports
        </h1>
        <p className="text-muted-foreground">
          Analyze your financial performance and security metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">₹2.4L</p>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <Badge variant="secondary" className="text-xs text-success">+12%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">18.5%</p>
                <p className="text-sm text-muted-foreground">Portfolio Return</p>
                <Badge variant="secondary" className="text-xs text-success">+2.3%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">1,247</p>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
                <Badge variant="secondary" className="text-xs text-success">+5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">94/100</p>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <Badge variant="secondary" className="text-xs text-success">Excellent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="glass-card">
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Learning
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="btn-glass">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="btn-glass">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Investment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Equity Funds</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">+22.5%</span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Debt Funds</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">+8.2%</span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gold ETF</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">-2.1%</span>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">Monthly Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Food & Dining</span>
                    <span className="font-semibold">₹12,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Transportation</span>
                    <span className="font-semibold">₹8,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Entertainment</span>
                    <span className="font-semibold">₹5,800</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shopping</span>
                    <span className="font-semibold">₹15,600</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Reports */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron">Threat Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold font-orbitron text-destructive">847</p>
                  <p className="text-sm text-muted-foreground">Phishing Attempts</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-orbitron text-warning">256</p>
                  <p className="text-sm text-muted-foreground">Malware Blocked</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-orbitron text-accent">144</p>
                  <p className="text-sm text-muted-foreground">Fraud Attempts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Reports */}
        <TabsContent value="learning" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Financial Literacy</span>
                  <Badge variant="secondary" className="text-success">75% Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fraud Awareness</span>
                  <Badge variant="secondary" className="text-warning">60% Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cybersecurity</span>
                  <Badge variant="secondary" className="text-destructive">45% Complete</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;