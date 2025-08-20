import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  TrendingUp,
  Award,
  Send,
  Star
} from "lucide-react";

const posts = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "/placeholder.svg",
    role: "Financial Advisor",
    time: "2 hours ago",
    content: "Just completed the Advanced Investment Strategies course! The module on risk assessment was particularly insightful. Highly recommend it to anyone looking to diversify their portfolio. 📈",
    likes: 24,
    comments: 8,
    badges: ["Expert", "Top Contributor"]
  },
  {
    id: 2,
    author: "Rahul Kumar",
    avatar: "/placeholder.svg", 
    role: "Security Analyst",
    time: "4 hours ago",
    content: "PSA: New phishing campaign targeting UPI users. Always verify the sender before clicking any payment links. SangrakshaX's simulation helped me spot this immediately! 🛡️",
    likes: 156,
    comments: 32,
    badges: ["Verified", "Security Pro"]
  },
  {
    id: 3,
    author: "Anita Desai",
    avatar: "/placeholder.svg",
    role: "Community Member", 
    time: "1 day ago",
    content: "Question: What's the ideal emergency fund size for a family of 4? Currently have 3 months of expenses saved up. Should I increase this before starting SIP investments?",
    likes: 45,
    comments: 23,
    badges: ["New Member"]
  }
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", points: 2450, badge: "🥇" },
  { rank: 2, name: "Rahul Kumar", points: 2380, badge: "🥈" },
  { rank: 3, name: "Anita Desai", points: 2310, badge: "🥉" },
  { rank: 4, name: "Vikram Singh", points: 2290, badge: "" },
  { rank: 5, name: "Kavya Patel", points: 2250, badge: "" }
];

const Community = () => {
  return (
    <Layout>
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-gradient">
          Community
        </h1>
        <p className="text-muted-foreground">
          Connect, learn, and share financial knowledge with fellow members
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">2.4K</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">1.2K</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold font-orbitron">856</p>
                <p className="text-sm text-muted-foreground">Solutions Shared</p>
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
                <p className="text-2xl font-bold font-orbitron">95%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Share your financial insights, ask questions, or celebrate your achievements..."
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">💡 Tip</Badge>
                    <Badge variant="outline" className="text-xs">❓ Question</Badge>
                    <Badge variant="outline" className="text-xs">🎉 Achievement</Badge>
                  </div>
                  <Button className="btn-glow">
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          {post.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.role} • {post.time}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-sm leading-relaxed">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center gap-6 pt-2">
                      <Button variant="ghost" size="sm" className="h-auto p-1 gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-1 gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-1 gap-2">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Share</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{user.badge || `#${user.rank}`}</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="font-orbitron font-bold text-sm">{user.points}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm">
                📋 Community Guidelines
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                🏆 Achievement Badges
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                📚 Knowledge Base
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                🎯 Financial Challenges
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                💼 Expert Network
              </Button>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { topic: "#SIPInvesting", posts: 45 },
                { topic: "#PhishingAlert", posts: 32 },
                { topic: "#TaxSaving", posts: 28 },
                { topic: "#MutualFunds", posts: 24 },
                { topic: "#CryptoSafety", posts: 19 }
              ].map((trend) => (
                <div key={trend.topic} className="flex items-center justify-between">
                  <span className="font-medium text-sm text-primary">{trend.topic}</span>
                  <span className="text-xs text-muted-foreground">{trend.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Community;