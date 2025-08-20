import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, Target, Shield } from 'lucide-react';

interface FraudTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: {
    overview: string;
    characteristics: string[];
    tactics: string[];
    recognition: string[];
    prevention: string[];
    videoUrl: string;
    videoTitle: string;
  };
}

interface FraudLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: FraudTopic | null;
}

const FraudLearningModal = ({ isOpen, onClose, topic }: FraudLearningModalProps) => {
  if (!topic) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-cyber-dark border-cyber-blue/30">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl text-white flex items-center">
            <div className="text-cyber-blue mr-3">
              {topic.icon}
            </div>
            {topic.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-white">
          {/* Overview */}
          <div>
            <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-3">
              Overview
            </h3>
            <p className="font-rajdhani text-white/90 leading-relaxed">
              {topic.content.overview}
            </p>
          </div>

          {/* Video */}
          <div>
            <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-3">
              Educational Video
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-cyber-gray/20">
              <iframe
                src={topic.content.videoUrl}
                title={topic.content.videoTitle}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Characteristics */}
            <div>
              <h3 className="font-orbitron text-lg font-semibold text-cyber-green mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Key Characteristics
              </h3>
              <ul className="space-y-2">
                {topic.content.characteristics.map((item, index) => (
                  <li key={index} className="font-rajdhani text-white/80 flex items-start">
                    <span className="text-cyber-green mr-2 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tactics */}
            <div>
              <h3 className="font-orbitron text-lg font-semibold text-red-400 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Common Tactics
              </h3>
              <ul className="space-y-2">
                {topic.content.tactics.map((item, index) => (
                  <li key={index} className="font-rajdhani text-white/80 flex items-start">
                    <span className="text-red-400 mr-2 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recognition */}
            <div>
              <h3 className="font-orbitron text-lg font-semibold text-cyber-gold mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                How to Recognize
              </h3>
              <ul className="space-y-2">
                {topic.content.recognition.map((item, index) => (
                  <li key={index} className="font-rajdhani text-white/80 flex items-start">
                    <span className="text-cyber-gold mr-2 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention */}
            <div>
              <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Prevention Tips
              </h3>
              <ul className="space-y-2">
                {topic.content.prevention.map((item, index) => (
                  <li key={index} className="font-rajdhani text-white/80 flex items-start">
                    <span className="text-cyber-blue mr-2 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FraudLearningModal;