// --- START FILE: src\pages\AIAdvisor.tsx ---

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { 
  Bot, 
  MessageCircle, 
  TrendingUp, 
  DollarSign,
  Send,
  Lightbulb,
  Target,
  AlertCircle,
  Loader2, // Added for loading spinner
  Globe // Added for translate button
} from "lucide-react";
import { toast } from "@/components/ui/use-toast"; // Using the shadcn toast component for notifications

// --- NEW IMPORTS FOR MARKDOWN RENDERING & LANGUAGE SELECTION ---
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// ---------------------------------------------------------------

// --- WARNING: DIRECTLY EMBEDDING API KEYS IN FRONTEND IS NOT SECURE FOR PRODUCTION ---
// For a production application, you should proxy this request through a backend server
// to keep your API key secure and prevent unauthorized usage.
const GEMINI_API_KEY = "AIzaSyCzx6ReMk8ohPJcCjGwHHzu7SvFccJqAbA"; // THIS KEY IS EXPOSED!
const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-05-20";

// --- GOOGLE TRANSLATE API INFORMATION (FOR REFERENCE ONLY - NOT USED DIRECTLY WITHOUT KEY) ---
// IMPORTANT: There is NO official "keyless" Google Translate API for programmatic use.
// For actual translation, you would need to:
// 1. Enable Google Cloud Translation API in your Google Cloud project.
// 2. Obtain an API key.
// 3. (HIGHLY RECOMMENDED & SECURE) Create a backend endpoint that takes text and target language,
//    calls Google Cloud Translation API with your securely stored API key, and returns the translation.
// 4. Update this frontend code to call your new backend endpoint.
// The constants below are illustrative for a *real* (keyed) API call, but WILL NOT BE USED for translation in this "keyless" example.
const GOOGLE_TRANSLATE_API_URL = "https://translation.googleapis.com/language/translate/v2";
// ---------------------------------------------------------------------------------------------

interface ChatMessage {
  id: number;
  type: "user" | "ai" | "system"; // 'system' for error messages
  message: string;
  time: string;
}

// Language options for translation (subset of commonly supported by Google)
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja", name: "Japanese" },
  { code: "ar", name: "Arabic" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ko", name: "Korean" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  // Add more languages as needed based on Google's Cloud Translation API supported list
];

const AIAdvisor = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translatingMessageId, setTranslatingMessageId] = useState<number | null>(null); // State for translation loading
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState<string>("es"); // Default to Spanish
  const chatEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling

  useEffect(() => {
    // Scroll to bottom of chat on new message
    // Use setTimeout to ensure DOM has updated after markdown rendering, 
    // especially for longer responses which might take a moment to fully render
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Small delay to allow DOM to update
    return () => clearTimeout(timer);
  }, [chatHistory, isLoading]); // Re-run when chat history or loading state changes

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const addMessage = (type: "user" | "ai" | "system", message: string) => {
    setChatHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type,
        message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const sendMessageToAI = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to history
    addMessage("user", message);
    setUserInput(""); // Clear input immediately

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response from AI");
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiResponse) {
        addMessage("ai", aiResponse);
      } else {
        addMessage("system", "AI did not provide a valid response. Please try again.");
      }
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      addMessage("system", `Error: ${(error as Error).message}. Please try again later.`);
      toast({
        variant: "destructive",
        title: "AI Communication Error",
        description: `Failed to get AI response: ${(error as Error).message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATED FUNCTION: Simulate translation and explain API key necessity
  const translateMessage = async (messageId: number, text: string, targetLang: string) => {
    setTranslatingMessageId(messageId);
    try {
        // --- CRITICAL INFORMATION FOR THE USER ---
        // As you requested, this function demonstrates the UI for translation without directly
        // using a Google Translate API key in the frontend.
        // HOWEVER, please be aware:
        // 1. Google Cloud Translation API requires an API key and billing to function.
        // 2. There is no official "keyless" Google Translate API for programmatic use.
        // 3. Attempts to scrape Google's public translate website are unreliable, against their
        //    terms of service, and not suitable for a production application.
        //
        // For REAL translation functionality, you would need to:
        // a) Enable Google Cloud Translation API in your Google Cloud project.
        // b) Obtain an API key.
        // c) (RECOMMENDED & SECURE) Create a backend endpoint. This endpoint would receive the text
        //    and target language from the frontend, call Google Cloud Translation API (using your
        //    securely stored API key on the backend), and then return the translation to the frontend.
        // d) Modify this `translateMessage` function to call your new secure backend endpoint.

        console.warn("Translation simulated: Google Translate API requires an API key and secure backend integration for actual functionality.");

        // Simulate a delay for the "translation"
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        const targetLanguageName = LANGUAGES.find(l => l.code === targetLang)?.name || targetLang.toUpperCase();
        toast({
            title: `Translation Feature (Simulated)`,
            description: `To translate "${text.substring(0, 50)}..." to ${targetLanguageName}, a Google Cloud Translation API key is required and should be handled via a secure backend.`,
            duration: 8000,
            variant: "default", // Using default variant for simulation info
        });

    } catch (error) {
        console.error("Error during simulated translation request:", error);
        toast({
            variant: "destructive",
            title: "Simulation Error",
            description: `An unexpected error occurred during simulation: ${(error as Error).message}`,
            duration: 5000,
        });
    } finally {
        setTranslatingMessageId(null);
    }
  };


  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    sendMessageToAI(userInput);
  };

  const handleQuickQuestionClick = (question: string) => {
    sendMessageToAI(question);
  };

  // Static suggestions array with quickQuestion property
  const suggestions = [
    {
      id: 1,
      title: "Investment Opportunity",
      description: "Consider diversifying your portfolio with index funds",
      category: "Investment",
      priority: "high",
      icon: TrendingUp,
      quickQuestion: "What are some good index funds for diversification?"
    },
    {
      id: 2,
      title: "Emergency Fund",
      description: "Build up your emergency fund to 6 months of expenses",
      category: "Savings",
      priority: "medium",
      icon: DollarSign,
      quickQuestion: "How much should my emergency fund be for my income?"
    },
    {
      id: 3,
      title: "Tax Planning",
      description: "Optimize your tax savings with ELSS investments",
      category: "Tax",
      priority: "high",
      icon: Target,
      quickQuestion: "Explain ELSS investments for tax savings."
    }
  ];

  const quickQuestions = [
    "How to start investing?",
    "Best SIP amount for me?",
    "Tax saving options?",
    "Emergency fund planning",
    "Retirement planning basics"
  ];

  return (
    <Layout>
      <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-orbitron text-gradient">
          AI Financial Advisor
        </h1>
        <p className="text-muted-foreground">
          Get personalized financial advice powered by artificial intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px]"> {/* Added flex-col and min-h for better height control */}
          <Card className="glass-card flex-1 flex flex-col"> {/* flex-1 allows it to grow and shrink */}
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat with AI Advisor
                {isLoading && (
                  <Loader2 className="h-4 w-4 animate-spin ml-2 text-primary" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0"> {/* Adjusted padding to p-0 */}
              {/* Language Selector */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-border/50">
                <span className="text-sm font-medium text-muted-foreground">Translate AI Responses to:</span>
                <Select value={selectedTargetLanguage} onValueChange={setSelectedTargetLanguage}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto mb-4 custom-scrollbar">
                {chatHistory.length === 0 && (
                  <div className="text-center text-muted-foreground py-10">
                    <Bot className="h-10 w-10 mx-auto mb-2 text-primary/50" />
                    <p>Start by asking me a financial question!</p>
                    <p>Try clicking on a quick question or suggestion.</p>
                  </div>
                )}
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex px-4 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        chat.type === 'user'
                          ? 'bg-primary text-primary-foreground max-w-[90%] sm:max-w-[80%]' // User message max-width adjusted for mobile
                          : chat.type === 'system'
                            ? 'bg-destructive/20 text-destructive max-w-[90%] sm:max-w-[80%]'
                            : 'bg-primary text-primary-foreground max-w-[90%] sm:max-w-[80%]' // AI messages now use primary blue background with dark text
                      } break-words`}
                    >
                      {chat.type === 'ai' ? (
                        <div className="prose prose-ai max-w-none"> {/* Use new custom prose variant */}
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {chat.message}
                            </ReactMarkdown>
                            {/* NEW: Translate button for AI messages */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 text-xs text-primary-foreground/80 hover:bg-primary-foreground/10"
                              onClick={() => translateMessage(chat.id, chat.message, selectedTargetLanguage)}
                              disabled={translatingMessageId === chat.id}
                            >
                              {translatingMessageId === chat.id ? (
                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              ) : (
                                <Globe className="h-3 w-3 mr-1" />
                              )}
                              Translate to {LANGUAGES.find(l => l.code === selectedTargetLanguage)?.name || selectedTargetLanguage.toUpperCase()}
                            </Button>
                        </div>
                      ) : (
                        <p className="text-sm">{chat.message}</p>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {chat.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} /> {/* For auto-scrolling */}
              </div>

              {/* Input Area */}
              <form onSubmit={handleUserInput} className="flex gap-2 p-4 pt-0"> {/* Added padding to input form */}
                <Textarea
                  placeholder="Ask me anything about finance, investments, or savings..."
                  className="flex-1 resize-none"
                  rows={2}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" className="btn-glow" disabled={isLoading || !userInput.trim()}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-warning" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleQuickQuestionClick(suggestion.quickQuestion)}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <suggestion.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {suggestion.description}
                      </p>
                      <Button variant="ghost" size="sm" className="text-xs p-1 h-auto" onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from firing again
                        handleQuickQuestionClick(suggestion.quickQuestion);
                      }}>
                        Ask AI
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-orbitron flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-accent" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 text-sm hover:bg-primary/10"
                  onClick={() => handleQuickQuestionClick(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="glass-card border-warning/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-warning">Disclaimer</p>
                  <p className="text-xs text-muted-foreground">
                    AI advice is for educational purposes. Consult certified financial advisors for personalized guidance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default AIAdvisor;

// --- END FILE: src\pages\AIAdvisor.tsx ---