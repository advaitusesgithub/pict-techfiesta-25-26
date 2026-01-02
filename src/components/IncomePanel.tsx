import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Wallet, IndianRupee } from "lucide-react";

export interface Income {
  id: number;
  source: string;
  amount: number;
}

interface IncomePanelProps {
  incomes: Income[];
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>;
}

export default function IncomePanel({ incomes, setIncomes }: IncomePanelProps) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);

  const addIncome = () => {
    if (!source || !amount) return;
    setIncomes([
      ...incomes,
      {
        id: Date.now(),
        source,
        amount: Number(amount),
      },
    ]);
    setSource("");
    setAmount("");
  };

  const removeIncome = (id: number) => {
    setIncomes(incomes.filter((i) => i.id !== id));
  };

  return (
    <Card className="glass-card hover-lift h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-display">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-success/20 to-emerald-500/10 shadow-inner">
            <Wallet className="h-5 w-5 text-success" />
          </div>
          Monthly Income
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Income source (Salary, Freelance)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="bg-muted/50 border-0 focus:ring-2 focus:ring-success/20"
          />
          <div className="flex gap-3">
            <div className="relative flex-1">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9 no-spinner bg-muted/50 border-0 focus:ring-2 focus:ring-success/20"
              />
            </div>
            <Button onClick={addIncome} size="icon" className="bg-success hover:bg-success/90 shrink-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {incomes.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center bg-muted/30 rounded-xl border border-dashed border-border">
              No income sources added yet
            </div>
          ) : (
            incomes.map((i, idx) => (
              <div
                key={i.id}
                className="flex items-center justify-between p-3 bg-success/5 rounded-xl group hover:bg-success/10 transition-all duration-200 animate-scale-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success shadow-lg shadow-success/50" />
                  <span className="font-medium text-sm">{i.source}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success font-semibold text-sm">
                    +₹{i.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeIncome(i.id)}
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
          <span className="text-muted-foreground text-sm font-medium">Total Income</span>
          <span className="text-2xl font-bold text-success font-display">
            ₹{totalIncome.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
