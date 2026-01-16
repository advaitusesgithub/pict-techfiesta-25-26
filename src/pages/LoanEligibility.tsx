import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Compass, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Shield, 
  Zap,
  Calculator,
  FileText,
  BarChart3
} from "lucide-react";
import LoanEligibilityForm, { LoanFormData } from "@/components/LoanEligibilityForm";
import { toast } from "sonner";

export default function LoanEligibility() {
  const navigate = useNavigate();
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean;
    maxAmount: number;
    suggestedTenure: number;
    interestRate: number;
  } | null>(null);

  const handleCheckEligibility = async (data: LoanFormData) => {
    setIsCheckingEligibility(true);
    
    // TODO: Connect to backend API
    console.log("Loan eligibility data:", data);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsCheckingEligibility(false);
      
      // Mock eligibility result for demonstration
      const mockResult = {
        eligible: data.creditScore >= 650,
        maxAmount: Math.min(data.monthlyIncome * 60, data.requestedLoanAmount),
        suggestedTenure: data.loanTenure,
        interestRate: data.creditScore >= 750 ? 8.5 : data.creditScore >= 700 ? 10.5 : 12.5,
      };
      
      setEligibilityResult(mockResult);
      
      toast.success("Eligibility check complete!", {
        description: mockResult.eligible 
          ? "Congratulations! You are eligible for a loan." 
          : "Unfortunately, you don't meet the eligibility criteria.",
      });
    }, 1500);
  };

  const features = [
    { icon: Calculator, title: "Smart Calculation", desc: "AI-powered eligibility assessment" },
    { icon: Shield, title: "Secure Process", desc: "Your data is encrypted & protected" },
    { icon: Zap, title: "Instant Results", desc: "Get your eligibility in seconds" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-warning/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <Compass className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold tracking-tight">
                  Loan<span className="text-primary">Compass</span>
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Smart Financial Planning</p>
              </div>
            </div>
            
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-up">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Quick & Easy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Check Your <span className="text-primary">Loan Eligibility</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant insights on your loan eligibility. Fill in your details below and let our 
            smart system analyze your financial profile.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <LoanEligibilityForm 
            onCheckEligibility={handleCheckEligibility} 
            isLoading={isCheckingEligibility} 
          />
        </div>

        {/* Eligibility Result */}
        {eligibilityResult && (
          <div className="mt-8 animate-scale-in">
            <Card className={`glass-card border-2 ${eligibilityResult.eligible ? 'border-success/50' : 'border-destructive/50'}`}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${eligibilityResult.eligible ? 'bg-success/20' : 'bg-destructive/20'}`}>
                    {eligibilityResult.eligible ? (
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : (
                      <FileText className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <span className={eligibilityResult.eligible ? 'text-success' : 'text-destructive'}>
                    {eligibilityResult.eligible ? 'Congratulations! You are Eligible' : 'Not Eligible'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {eligibilityResult.eligible ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-sm text-muted-foreground mb-1">Maximum Loan Amount</p>
                      <p className="text-2xl font-bold text-success">₹{eligibilityResult.maxAmount.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-sm text-muted-foreground mb-1">Suggested Tenure</p>
                      <p className="text-2xl font-bold">{eligibilityResult.suggestedTenure} months</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                      <p className="text-2xl font-bold text-primary">{eligibilityResult.interestRate}% p.a.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Based on your current financial profile, you may not meet the eligibility criteria. 
                    Consider improving your credit score or reducing existing EMIs.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA to Dashboard */}
        <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Card className="glass-card p-8 inline-block">
            <h3 className="text-lg font-display font-semibold mb-2">
              Want to manage your finances better?
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Track your income, expenses, and wishlist items in our comprehensive dashboard.
            </p>
            <Link to="/dashboard">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <BarChart3 className="h-4 w-4" />
                Open Financial Dashboard
              </Button>
            </Link>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border mt-12 bg-card/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold">LoanCompass</h3>
                <p className="text-xs text-muted-foreground">Navigate your finances wisely</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for <span className="text-primary font-medium">PICT TechFiesta 2025-26</span>
              </p>
            </div>

            <div className="flex items-center justify-end gap-4">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-110">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-110">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-border mt-6 pt-6 text-center text-xs text-muted-foreground">
            © 2026 LoanCompass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
