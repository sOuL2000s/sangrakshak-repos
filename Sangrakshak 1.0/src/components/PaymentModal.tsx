import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan | null;
  onPaymentSuccess: (plan: Plan) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, selectedPlan, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      onPaymentSuccess(selectedPlan);
      toast({
        title: "Payment Successful!",
        description: `Welcome to ${selectedPlan.name}! Your premium features are now active.`,
      });
      
      onClose();
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        email: '',
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="cyber-card max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyber-gold" />
            Complete Your Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <Card className="cyber-card border-cyber-gold/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-orbitron font-semibold text-white">{selectedPlan.name}</h3>
                  <p className="font-rajdhani text-white/70">{selectedPlan.period}</p>
                </div>
                <div className="text-right">
                  <div className="font-orbitron text-xl font-bold text-cyber-gold">{selectedPlan.price}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white font-rajdhani">Email Address</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="cyber-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-rajdhani">Cardholder Name</Label>
              <Input
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                className="cyber-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-rajdhani">Card Number</Label>
              <Input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                className="cyber-input"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white font-rajdhani">Expiry Date</Label>
                <Input
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryDateChange}
                  className="cyber-input"
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-rajdhani">CVV</Label>
                <Input
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="cyber-input"
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm font-rajdhani">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 cyber-button bg-gradient-to-r from-cyber-gold to-cyber-blue"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ${selectedPlan.price}`
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;