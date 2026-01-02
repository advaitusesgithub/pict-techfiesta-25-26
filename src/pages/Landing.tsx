import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, PiggyBank, Calculator, Target } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Track Income & Expenses",
      description: "Get a clear picture of your monthly finances",
    },
    {
      icon: Target,
      title: "Smart Allocation",
      description: "Priority-based budget allocation for your goals",
    },
    {
      icon: PiggyBank,
      title: "Loan Eligibility",
      description: "Know if you can afford it before you apply",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              <CheckCircle2 className="h-4 w-4" />
              Smart Financial Planning
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tight">
              Loan<span className="text-primary">Compass</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Know your loan eligibility before you apply. Make informed financial decisions with confidence.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/home")}
                className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
              >
                Check My Eligibility
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Built for PICT TechFiesta 2025-26 • LoanCompass Team
        </div>
      </footer>
    </div>
  );
}
