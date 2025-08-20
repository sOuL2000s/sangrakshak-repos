
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      company: "TechStart Solutions",
      image: "👨‍💼",
      rating: 5,
      text: "Sangrakshak saved my e-commerce site from multiple bot attacks. The AI detection is incredibly accurate, and the financial literacy modules helped me understand online payment security better.",
      highlight: "99.8% threat detection accuracy"
    },
    {
      name: "Priya Sharma",
      role: "Financial Advisor",
      company: "WealthCare India",
      image: "👩‍💼",
      rating: 5,
      text: "The fraud simulation training is brilliant! My clients now understand phishing attempts and investment scams much better. The multilingual support in Hindi is a game-changer.",
      highlight: "Prevented ₹2.5L fraud attempt"
    },
    {
      name: "Arjun Singh",
      role: "IT Manager",
      company: "Digital Innovations",
      image: "👨‍💻",
      rating: 5,
      text: "Enterprise-grade security made simple. The real-time monitoring dashboard gives us complete visibility into threats. Installation took just 5 minutes!",
      highlight: "Zero security incidents since deployment"
    },
    {
      name: "Meera Patel",
      role: "Student",
      company: "Gujarat University",
      image: "👩‍🎓",
      rating: 5,
      text: "As a commerce student, the financial literacy courses are incredibly valuable. I learned to identify fake investment schemes and secure my online transactions.",
      highlight: "Completed all fraud awareness modules"
    },
    {
      name: "Vikram Joshi",
      role: "Startup Founder",
      company: "FinTech Innovations",
      image: "👨‍🚀",
      rating: 5,
      text: "Sangrakshak's API integration was seamless. The bot protection saved us thousands in click fraud. The educational content builds trust with our users.",
      highlight: "Blocked 10K+ malicious bots daily"
    },
    {
      name: "Anjali Gupta",
      role: "Cybersecurity Analyst",
      company: "SecureNet Corp",
      image: "👩‍💻",
      rating: 5,
      text: "Professional-grade threat intelligence at an affordable price. The predictive analysis helps us stay ahead of emerging threats. Highly recommended!",
      highlight: "Identified threats 48hrs before attacks"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 mb-4">
            Success Stories
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-cyber-blue neon-text">150K+ Users</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            See how Sangrakshak is protecting businesses and educating users across India
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="cyber-card group hover:shadow-cyber transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-6 space-y-4">
                <div className="scanning-line opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-cyber-blue/50" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-cyber-gold fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="font-rajdhani text-white/80 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Highlight */}
                <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
                    <span className="font-rajdhani text-cyber-green text-sm font-semibold">
                      {testimonial.highlight}
                    </span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t border-cyber-blue/20">
                  <div className="text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="font-rajdhani text-cyber-blue text-sm">
                      {testimonial.role}
                    </p>
                    <p className="font-rajdhani text-white/60 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="holographic p-8 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyber-blue">
                  150K+
                </div>
                <div className="font-rajdhani text-white/80">
                  Protected Users
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyber-green">
                  99.9%
                </div>
                <div className="font-rajdhani text-white/80">
                  Uptime
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyber-gold">
                  5M+
                </div>
                <div className="font-rajdhani text-white/80">
                  Threats Blocked
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-orbitron text-3xl font-bold text-cyber-magenta">
                  4.9/5
                </div>
                <div className="font-rajdhani text-white/80">
                  User Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
