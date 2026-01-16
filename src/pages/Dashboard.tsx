import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  PiggyBank, 
  TrendingUp, 
  Save, 
  Compass, 
  Github, 
  Linkedin, 
  Mail,
  Wallet,
  Target,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import IncomePanel, { Income } from "@/components/IncomePanel";
import ExpensePanel, { Expense } from "@/components/ExpensePanel";
import WishlistPanel from "@/components/WishlistPanel";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savings, setSavings] = useState(0);
  const [tempSavings, setTempSavings] = useState("");

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const disposableIncome = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((disposableIncome / totalIncome) * 100).toFixed(1) : "0";

  const saveSavings = () => {
    setSavings(Number(tempSavings) || 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-success/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
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
                <p className="text-xs text-muted-foreground hidden sm:block">Financial Dashboard</p>
              </div>
            </div>
            
            <Link to="/eligibility">
              <Button variant="outline" size="sm" className="gap-2">
                <FileCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Check Eligibility</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Page Title & Quick Stats */}
        <div className="mb-8 animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Badge className="mb-2 bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">
                <Wallet className="h-3 w-3 mr-1" />
                Personal Finance
              </Badge>
              <h2 className="text-3xl font-display font-bold">
                Financial Dashboard
              </h2>
              <p className="text-muted-foreground mt-1">Track and manage your income, expenses, and savings goals</p>
            </div>
            
            {/* Quick Stats Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                <ArrowUpRight className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">₹{totalIncome.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">₹{totalExpenses.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Total Income */}
          <Card className="glass-card hover-lift animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <ArrowUpRight className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Total Income</span>
              </div>
              <p className="text-2xl font-bold text-success">₹{totalIncome.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Total Expenses */}
          <Card className="glass-card hover-lift animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-destructive/20">
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">Total Expenses</span>
              </div>
              <p className="text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Disposable Income */}
          <Card className="glass-card hover-lift animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Disposable</span>
              </div>
              <p className={cn(
                "text-2xl font-bold",
                disposableIncome >= 0 ? "text-primary" : "text-destructive"
              )}>
                {disposableIncome >= 0 ? `₹${disposableIncome.toLocaleString()}` : "N/A"}
              </p>
            </CardContent>
          </Card>

          {/* Savings Rate */}
          <Card className="glass-card hover-lift animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Target className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Savings Rate</span>
              </div>
              <p className="text-2xl font-bold text-accent">{savingsRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Income & Expenses */}
          <div className="lg:col-span-7 space-y-6">
            {/* Income & Expenses Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
                <IncomePanel incomes={incomes} setIncomes={setIncomes} />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <ExpensePanel expenses={expenses} setExpenses={setExpenses} />
              </div>
            </div>

            {/* Savings Section */}
            <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
              <Card className="glass-card hover-lift">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-display">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent to-accent/70 shadow-lg shadow-accent/25">
                      <PiggyBank className="h-5 w-5 text-accent-foreground" />
                    </div>
                    Existing Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex gap-3">
                      <Input
                        type="number"
                        placeholder="Enter your current savings (₹)"
                        value={tempSavings}
                        onChange={(e) => setTempSavings(e.target.value)}
                        className="flex-1 no-spinner bg-secondary/50 border-border focus:ring-2 focus:ring-accent/30"
                      />
                      <Button onClick={saveSavings} className="px-5 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="text-xl font-bold text-accent font-display">
                        ₹{savings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Card */}
            <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Card className="glass-card overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                <CardContent className="relative py-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-1">Ready to apply for a loan?</h3>
                      <p className="text-sm text-muted-foreground">Check your eligibility based on your financial profile</p>
                    </div>
                    <Link to="/eligibility">
                      <Button className="gap-2 bg-primary hover:bg-primary/90 whitespace-nowrap">
                        <FileCheck className="h-4 w-4" />
                        Check Loan Eligibility
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
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
