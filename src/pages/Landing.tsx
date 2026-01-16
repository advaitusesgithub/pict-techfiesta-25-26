import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, PiggyBank, Calculator, Target, Sparkles, Shield, TrendingUp, BarChart3, FileCheck, Compass } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Calculator,
      title: "Track Finances",
      description: "Monitor your income and expenses with real-time calculations",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Target,
      title: "Smart Allocation",
      description: "Priority-based budget allocation for your financial goals",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500",
    },
    {
      icon: Shield,
      title: "EMI Safety Check",
      description: "Know your loan eligibility before you apply",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
  ];

  const stats = [
    { value: "100%", label: "Accurate", icon: CheckCircle2 },
    { value: "Real-time", label: "Calculations", icon: TrendingUp },
    { value: "Smart", label: "Insights", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen gradient-mesh overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-warning/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm border border-primary/20 shadow-lg shadow-primary/10 opacity-0 animate-fade-up">
              <Sparkles className="h-4 w-4 animate-pulse-soft" />
              Smart Financial Planning
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-display font-extrabold text-foreground tracking-tight opacity-0 animate-fade-up stagger-1">
              Loan<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Compass</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up stagger-2">
              Know your loan eligibility before you apply. Make informed financial decisions with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
              <Link to="/eligibility">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 group bg-gradient-to-r from-primary to-primary/90 hover:scale-105"
                >
                  <FileCheck className="mr-2 h-5 w-5" />
                  Check Loan Eligibility
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-7 rounded-2xl border-2 hover:bg-secondary/50 transition-all duration-300"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Financial Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex justify-center gap-12 pt-12 opacity-0 animate-fade-up stagger-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold font-display text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            Everything you need to <span className="text-primary">plan wisely</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            Comprehensive tools to help you make smart financial decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 glass-card rounded-3xl hover-lift opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.7 + index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
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

      {/* CTA Section */}
      <div className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Eligibility CTA */}
          <div className="glass-card rounded-3xl p-10 text-center overflow-hidden relative group hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
                <FileCheck className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">Check Loan Eligibility</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Get instant insights on your loan eligibility based on your financial profile.
              </p>
              <Link to="/eligibility">
                <Button size="lg" className="px-8 py-6 rounded-xl shadow-lg shadow-primary/25 group">
                  Check Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard CTA */}
          <div className="glass-card rounded-3xl p-10 text-center overflow-hidden relative group hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg shadow-accent/25">
                <BarChart3 className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3">Financial Dashboard</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Track your income, expenses, and manage your wishlist with smart insights.
              </p>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="px-8 py-6 rounded-xl border-2 hover:bg-accent/10">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-10 bg-card/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold">LoanCompass</h3>
                <p className="text-xs text-muted-foreground">Navigate your finances wisely</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for <span className="text-primary font-medium">PICT TechFiesta 2025-26</span>
            </p>
          </div>
          <div className="border-t border-border/50 mt-6 pt-6 text-center text-xs text-muted-foreground">
            © 2026 LoanCompass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
