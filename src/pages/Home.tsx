import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PiggyBank, TrendingUp, Save, Sparkles } from "lucide-react";
import IncomePanel, { Income } from "@/components/IncomePanel";
import ExpensePanel, { Expense } from "@/components/ExpensePanel";
import WishlistPanel from "@/components/WishlistPanel";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savings, setSavings] = useState(0);
  const [tempSavings, setTempSavings] = useState("");

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const disposableIncome = totalIncome - totalExpenses;

  const saveSavings = () => {
    setSavings(Number(tempSavings) || 0);
  };

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-warning/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-soft" />
            Loan<span className="text-primary">Compass</span>
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Income & Expenses & Summary */}
          <div className="lg:col-span-7 space-y-6">
            {/* Income & Expenses Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="opacity-0 animate-fade-up stagger-1">
                <IncomePanel incomes={incomes} setIncomes={setIncomes} />
              </div>
              <div className="opacity-0 animate-fade-up stagger-2">
                <ExpensePanel expenses={expenses} setExpenses={setExpenses} />
              </div>
            </div>

            {/* Savings & Disposable Income Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Savings Section */}
              <div className="opacity-0 animate-fade-up stagger-3">
                <Card className="glass-card hover-lift h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg font-display">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 shadow-inner">
                        <PiggyBank className="h-5 w-5 text-accent" />
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
                        className="flex-1 no-spinner bg-muted/50 border-0 focus:ring-2 focus:ring-accent/20"
                      />
                      <Button onClick={saveSavings} variant="secondary" className="px-5 bg-accent/10 hover:bg-accent/20 text-accent border-0">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">Current savings</span>
                      <span className="text-2xl font-bold text-accent font-display">
                        ₹{savings.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Disposable Income Card */}
              <div className="opacity-0 animate-fade-up stagger-4">
                <Card className="glass-card hover-lift h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <CardHeader className="pb-2 relative">
                    <CardTitle className="flex items-center gap-3 text-lg font-display">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-inner">
                        <TrendingUp className="h-5 w-5 text-primary" />
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
                      <p className="text-sm text-destructive mt-2 bg-destructive/10 px-3 py-2 rounded-lg">
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
          <div className="lg:col-span-5 opacity-0 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <WishlistPanel disposableIncome={disposableIncome} savings={savings} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-6 mt-8 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Built for PICT TechFiesta 2025-26 • LoanCompass Team
        </div>
      </footer>
    </div>
  );
}
