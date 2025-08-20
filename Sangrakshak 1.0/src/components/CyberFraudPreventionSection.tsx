import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Users } from 'lucide-react';
import { fraudTopics, type FraudTopic } from '@/data/fraudTopics';
import FraudLearningModal from '@/components/FraudLearningModal';

const CyberFraudPreventionSection = () => {
  const [selectedTopic, setSelectedTopic] = useState<FraudTopic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (topic: FraudTopic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-cyber-dark to-cyber-gray/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-cyber-blue mr-3" />
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
              Cyber Fraud <span className="text-cyber-blue neon-text">Prevention</span>
            </h2>
          </div>
          <p className="font-rajdhani text-lg text-white/80 max-w-3xl mx-auto">
            Stay ahead of cybercriminals by learning to identify and prevent common fraud tactics. 
            Knowledge is your best defense against digital threats.
          </p>
        </div>

        {/* Fraud Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fraudTopics.map((topic) => (
            <Card 
              key={topic.id} 
              className="bg-cyber-gray/30 backdrop-blur-sm border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-cyber-blue group-hover:text-cyber-green transition-colors">
                      {topic.icon}
                    </div>
                    <div>
                      <CardTitle className="text-white font-orbitron text-xl">
                        {topic.title}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className="mt-2 border-cyber-gold text-cyber-gold bg-cyber-gold/10"
                      >
                        {topic.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 font-rajdhani text-base mb-6">
                  {topic.description}
                </CardDescription>
                
                <Button 
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-white font-rajdhani font-semibold transition-all duration-300"
                  onClick={() => handleLearnMore(topic)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-cyber-gray/20 backdrop-blur-sm rounded-2xl p-8 border border-cyber-blue/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-cyber-green mr-3" />
              <h3 className="font-orbitron text-xl font-bold text-white">
                Stay Protected
              </h3>
            </div>
            <p className="font-rajdhani text-white/80 mb-6">
              Knowledge is power. The more you understand about cyber threats, 
              the better you can protect yourself and your loved ones.
            </p>
            <Button 
              variant="outline" 
              className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
            >
              Explore More Security Topics
            </Button>
          </div>
        </div>
      </div>

      {/* Fraud Learning Modal */}
      <FraudLearningModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        topic={selectedTopic}
      />
    </section>
  );
};

export default CyberFraudPreventionSection;