import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Receipt, IndianRupee } from "lucide-react";

export interface Expense {
  id: number;
  title: string;
  amount: number;
}

interface ExpensePanelProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export default function ExpensePanel({ expenses, setExpenses }: ExpensePanelProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const addExpense = () => {
    if (!title || !amount) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
      },
    ]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <Card className="glass-card hover-lift h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-display">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-destructive/20 to-rose-500/10 shadow-inner">
            <Receipt className="h-5 w-5 text-destructive" />
          </div>
          Monthly Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Expense name (Rent, Utilities)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-muted/50 border-0 focus:ring-2 focus:ring-destructive/20"
          />
          <div className="flex gap-3">
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9 no-spinner bg-muted/50 border-0 focus:ring-2 focus:ring-destructive/20"
              />
            </div>
            <Button onClick={addExpense} size="icon" className="bg-destructive hover:bg-destructive/90 shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {expenses.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center bg-muted/30 rounded-xl border border-dashed border-border">
              No expenses added yet
            </div>
          ) : (
            expenses.map((e, idx) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-3 bg-destructive/5 rounded-xl group hover:bg-destructive/10 transition-all duration-200 animate-scale-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive shadow-lg shadow-destructive/50" />
                  <span className="font-medium text-sm">{e.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-destructive font-semibold text-sm">
                    -₹{e.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-all p-1 hover:bg-destructive/10 rounded"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-border/50 flex justify-between items-center">
          <span className="text-muted-foreground text-sm font-medium">Total Expenses</span>
          <span className="text-2xl font-bold text-destructive font-display">
            ₹{totalExpenses.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
