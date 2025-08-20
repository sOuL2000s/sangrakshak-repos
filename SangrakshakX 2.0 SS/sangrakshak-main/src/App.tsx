import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LearningHub from "./pages/LearningHub";
import SimulationGame from "./pages/SimulationGame";
import AIAdvisor from "./pages/AIAdvisor";
import Calculators from "./pages/Calculators";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import SafePayments from "./pages/SafePayments";
import SecureShield from "./pages/SecureShield";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learning" element={<LearningHub />} />
          <Route path="/simulation" element={<SimulationGame />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/community" element={<Community />} />
          <Route path="/payments" element={<SafePayments />} />
          <Route path="/secureshield" element={<SecureShield />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
