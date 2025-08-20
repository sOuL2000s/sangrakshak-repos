import React from 'react';
import { Mail, DollarSign } from 'lucide-react';

export interface FraudTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
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

export const fraudTopics: FraudTopic[] = [
  {
    id: 'phishing-emails',
    title: 'Phishing Emails',
    description: 'Learn to identify and protect yourself from deceptive email attacks that steal personal information.',
    icon: React.createElement(Mail, { className: "w-8 h-8" }),
    badge: 'Most Common',
    content: {
      overview: 'Phishing emails are fraudulent messages designed to trick recipients into revealing sensitive information like passwords, credit card numbers, or personal data. These attacks have become increasingly sophisticated and are one of the most common cybersecurity threats.',
      characteristics: [
        'Urgent or threatening language to create panic',
        'Generic greetings like "Dear Customer" instead of your name',
        'Suspicious sender addresses that mimic legitimate companies',
        'Poor grammar, spelling errors, or awkward phrasing',
        'Requests for sensitive information via email',
        'Links that don\'t match the claimed destination'
      ],
      tactics: [
        'Spoofing legitimate company emails and websites',
        'Creating fake login pages to steal credentials',
        'Using emotional manipulation (fear, urgency, excitement)',
        'Embedding malicious attachments or links',
        'Impersonating trusted contacts or authority figures',
        'Offering too-good-to-be-true deals or prizes'
      ],
      recognition: [
        'Check the sender\'s email address carefully',
        'Hover over links to see the actual destination',
        'Look for spelling and grammar mistakes',
        'Verify unexpected requests through other channels',
        'Be suspicious of urgent demands for information',
        'Check for personalization - legitimate emails use your name'
      ],
      prevention: [
        'Never click suspicious links or download attachments',
        'Always verify requests by contacting the company directly',
        'Use two-factor authentication when available',
        'Keep your email software and antivirus updated',
        'Report phishing attempts to your email provider',
        'Educate yourself about current phishing trends'
      ],
      videoUrl: 'https://www.youtube.com/embed/XBkzBrXlle0',
      videoTitle: 'How to Identify Phishing Emails'
    }
  },
  {
    id: 'investment-scams',
    title: 'Fake Investment Scams',
    description: 'Recognize fraudulent investment schemes that promise unrealistic returns to steal your money.',
    icon: React.createElement(DollarSign, { className: "w-8 h-8" }),
    badge: 'High Risk',
    content: {
      overview: 'Fake investment scams lure victims with promises of high returns and minimal risk. These schemes often use sophisticated marketing tactics and fake testimonials to appear legitimate, targeting people looking for financial opportunities.',
      characteristics: [
        'Promises of guaranteed high returns with little to no risk',
        'Pressure to invest quickly before "limited time" offers expire',
        'Lack of proper licensing or regulatory registration',
        'Vague explanations about how the investment actually works',
        'Testimonials that seem too good to be true',
        'Requests for payment via unconventional methods'
      ],
      tactics: [
        'Using fake celebrity endorsements and testimonials',
        'Creating professional-looking websites and marketing materials',
        'Targeting victims through social media and email campaigns',
        'Offering "insider information" or "secret strategies"',
        'Using high-pressure sales tactics and artificial urgency',
        'Exploiting current events or trending topics'
      ],
      recognition: [
        'Research the company and check regulatory databases',
        'Be skeptical of "guaranteed" returns above market rates',
        'Verify testimonials and check for fake reviews',
        'Look for proper licensing and contact information',
        'Ask detailed questions about the investment strategy',
        'Be wary of pressure to invest immediately'
      ],
      prevention: [
        'Always research investments thoroughly before committing',
        'Consult with licensed financial advisors',
        'Check with regulatory bodies like the SEC or FINRA',
        'Never invest money you can\'t afford to lose',
        'Be suspicious of unsolicited investment offers',
        'Take time to think - legitimate investments don\'t require instant decisions'
      ],
      videoUrl: 'https://www.youtube.com/embed/1ysHRtfNcSs',
      videoTitle: 'Spotting Investment Fraud: Red Flags and Warning Signs'
    }
  }
];

// Helper function to get topic by ID
export const getFraudTopicById = (id: string): FraudTopic | undefined => {
  return fraudTopics.find(topic => topic.id === id);
};

// Helper function to get topic by title
export const getFraudTopicByTitle = (title: string): FraudTopic | undefined => {
  return fraudTopics.find(topic => 
    topic.title.toLowerCase().includes(title.toLowerCase()) ||
    title.toLowerCase().includes(topic.title.toLowerCase())
  );
};