import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PiggyBank, TrendingUp, Save } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-display font-bold">
            Loan<span className="text-primary">Compass</span>
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Income & Expenses */}
          <div className="lg:col-span-2 space-y-6">
            <IncomePanel incomes={incomes} setIncomes={setIncomes} />
            <ExpensePanel expenses={expenses} setExpenses={setExpenses} />

            {/* Savings Section */}
            <Card className="shadow-lg border-0 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-display">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <PiggyBank className="h-5 w-5 text-accent" />
                  </div>
                  Existing Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Enter current savings (₹)"
                    value={tempSavings}
                    onChange={(e) => setTempSavings(e.target.value)}
                    className="flex-1 no-spinner"
                  />
                  <Button onClick={saveSavings} variant="secondary" className="px-6">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Saved savings:{" "}
                  <span className="font-semibold text-accent">
                    ₹{savings.toLocaleString()}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Disposable Income Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-display">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  Monthly Disposable Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "text-4xl font-bold font-display",
                    disposableIncome >= 0 ? "text-success" : "text-destructive"
                  )}
                >
                  {disposableIncome >= 0
                    ? `₹${disposableIncome.toLocaleString()}`
                    : "N/A"}
                </p>
                {disposableIncome < 0 && (
                  <p className="text-sm text-destructive mt-2">
                    Your expenses exceed your income. Consider reducing expenses or adding income sources.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Wishlist */}
          <div className="lg:col-span-1">
            <WishlistPanel disposableIncome={disposableIncome} savings={savings} />
          </div>
        </div>
      </main>
    </div>
  );
}
