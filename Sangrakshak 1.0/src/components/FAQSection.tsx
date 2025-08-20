
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Sangrakshak's AI bot detection work?",
      answer: "Our AI uses advanced machine learning algorithms to analyze visitor behavior patterns, device fingerprinting, and traffic anomalies. It can distinguish between human users and malicious bots with 99.8% accuracy, protecting your site from scraping, DDoS attacks, and fraudulent activities."
    },
    {
      question: "Is the financial literacy content available in regional languages?",
      answer: "Yes! Sangrakshak supports English, Hindi, and Punjabi languages. Our interactive courses, fraud simulations, and educational content are fully localized to make financial literacy accessible to users across India."
    },
    {
      question: "How quickly can I integrate Sangrakshak into my website?",
      answer: "Integration takes less than 5 minutes! Simply install our plug-and-play module with one line of code. Our AI automatically configures optimal security settings based on your website patterns, requiring no complex setup or technical expertise."
    },
    {
      question: "What types of financial frauds does the simulation cover?",
      answer: "Our fraud simulation covers phishing emails, OTP scams, fake investment schemes, social engineering attacks, UPI frauds, credit card scams, and cryptocurrency frauds. New scenarios are added regularly based on emerging threat patterns."
    },
    {
      question: "Is there a free trial available?",
      answer: "Absolutely! Our Basic Shield plan is completely free forever, including essential bot detection, security scanning, and basic financial literacy content. You can upgrade to Pro Guardian or Enterprise Fortress anytime for advanced features."
    },
    {
      question: "How does real-time threat monitoring work?",
      answer: "Our system continuously monitors your website traffic, analyzing threats in milliseconds. When suspicious activity is detected, automatic protective measures are triggered, and you receive instant alerts via email, SMS, or dashboard notifications."
    },
    {
      question: "Can Sangrakshak protect multiple websites?",
      answer: "Yes! Our Enterprise Fortress plan supports multi-site protection with centralized management. You can monitor and protect multiple domains from a single dashboard with customized security rules for each site."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer email support for Basic users, priority support for Pro users, and dedicated 24/7 phone support for Enterprise customers. Our support team includes cybersecurity experts and financial literacy specialists."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 mb-4">
            Questions & Answers
          </Badge>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-cyber-blue neon-text">Questions</span>
          </h2>
          <p className="font-rajdhani text-xl text-white/80 max-w-3xl mx-auto">
            Get answers to common questions about Sangrakshak's cybersecurity and financial literacy features
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="cyber-card group hover:shadow-cyber transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-cyber-blue/5 transition-colors rounded-lg"
                >
                  <h3 className="font-orbitron font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-cyber-blue" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-cyber-blue" />
                    )}
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="scanning-line mb-4"></div>
                    <p className="font-rajdhani text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center mt-16">
          <div className="holographic p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              Still Have <span className="text-cyber-blue">Questions</span>?
            </h3>
            <p className="font-rajdhani text-white/80 mb-6">
              Our cybersecurity experts are here to help you understand how Sangrakshak can protect your digital assets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cyber-button">
                Contact Support
              </button>
              <button className="border border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10 px-6 py-3 rounded-lg font-rajdhani font-semibold transition-all">
                Schedule Demo Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
