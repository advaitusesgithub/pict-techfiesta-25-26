import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PiggyBank, TrendingUp, Save, Sparkles, Compass, Github, Linkedin, Mail } from "lucide-react";
import IncomePanel, { Income } from "@/components/IncomePanel";
import ExpensePanel, { Expense } from "@/components/ExpensePanel";
import WishlistPanel from "@/components/WishlistPanel";
import LoanEligibilityForm, { LoanFormData } from "@/components/LoanEligibilityForm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Home() {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savings, setSavings] = useState(0);
  const [tempSavings, setTempSavings] = useState("");
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const disposableIncome = totalIncome - totalExpenses;

  const saveSavings = () => {
    setSavings(Number(tempSavings) || 0);
  };

  const handleCheckEligibility = async (data: LoanFormData) => {
    setIsCheckingEligibility(true);
    
    // TODO: Connect to backend API
    console.log("Loan eligibility data:", data);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsCheckingEligibility(false);
      toast.success("Eligibility check complete!", {
        description: "Backend integration pending. Check console for form data.",
      });
    }, 1500);
  };

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
            
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground hidden sm:inline">Dashboard Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-fade-up">
          <h2 className="text-3xl font-display font-bold flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-primary" />
            Financial Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">Check your loan eligibility and manage your finances</p>
        </div>

        {/* Loan Eligibility Form - Full Width */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <LoanEligibilityForm 
            onCheckEligibility={handleCheckEligibility} 
            isLoading={isCheckingEligibility} 
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Income & Expenses & Summary */}
          <div className="lg:col-span-7 space-y-6">
            {/* Income & Expenses Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <IncomePanel incomes={incomes} setIncomes={setIncomes} />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <ExpensePanel expenses={expenses} setExpenses={setExpenses} />
              </div>
            </div>

            {/* Savings & Disposable Income Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Savings Section */}
              <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Card className="glass-card hover-lift h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-display">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent to-accent/70 shadow-lg shadow-accent/25">
                        <PiggyBank className="h-5 w-5 text-accent-foreground" />
                      </div>
                      Existing Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        placeholder="Enter current savings (₹)"
                        value={tempSavings}
                        onChange={(e) => setTempSavings(e.target.value)}
                        className="flex-1 no-spinner bg-secondary/50 border-border focus:ring-2 focus:ring-accent/30"
                      />
                      <Button onClick={saveSavings} className="px-5 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center justify-between pt-2 px-3 py-3 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-sm text-muted-foreground">Current savings</span>
                      <span className="text-2xl font-bold text-accent font-display">
                        ₹{savings.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Disposable Income Card */}
              <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <Card className="glass-card hover-lift h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                  <CardHeader className="pb-2 relative">
                    <CardTitle className="flex items-center gap-3 text-lg font-display">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                        <TrendingUp className="h-5 w-5 text-primary-foreground" />
                      </div>
                      Monthly Disposable
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p
                      className={cn(
                        "text-4xl font-bold font-display tracking-tight",
                        disposableIncome >= 0 ? "text-success" : "text-destructive"
                      )}
                    >
                      {disposableIncome >= 0
                        ? `₹${disposableIncome.toLocaleString()}`
                        : "N/A"}
                    </p>
                    {disposableIncome < 0 && (
                      <p className="text-sm text-destructive mt-2 bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
                        Expenses exceed income. Reduce expenses or add income sources.
                      </p>
                    )}
                    {disposableIncome > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Available for savings & wishlist items
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - Wishlist */}
          <div className="lg:col-span-5 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <WishlistPanel disposableIncome={disposableIncome} savings={savings} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border mt-12 bg-card/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold">LoanCompass</h3>
                <p className="text-xs text-muted-foreground">Navigate your finances wisely</p>
              </div>
            </div>

            {/* Center Section */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for <span className="text-primary font-medium">PICT TechFiesta 2025-26</span>
              </p>
            </div>

            {/* Social Links */}
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
