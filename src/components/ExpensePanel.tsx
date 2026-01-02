import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Receipt } from "lucide-react";

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
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Receipt className="h-5 w-5 text-destructive" />
          </div>
          Monthly Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Expense name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-32 no-spinner"
          />
          <Button onClick={addExpense} className="px-6">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center bg-muted/50 rounded-lg">
              No expenses added yet.
            </p>
          ) : (
            expenses.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="font-medium">{e.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-destructive font-semibold">
                    -₹{e.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t flex justify-between items-center">
          <span className="text-muted-foreground font-medium">Total Expenses</span>
          <span className="text-xl font-bold text-destructive">
            ₹{totalExpenses.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
