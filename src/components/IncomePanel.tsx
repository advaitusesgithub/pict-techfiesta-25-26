import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Wallet } from "lucide-react";

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
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <div className="p-2 rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          Monthly Income
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Income source (Salary, Freelance)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-32 no-spinner"
          />
          <Button onClick={addIncome} className="px-6">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {incomes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center bg-muted/50 rounded-lg">
              No income sources added yet.
            </p>
          ) : (
            incomes.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="font-medium">{i.source}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success font-semibold">
                    ₹{i.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeIncome(i.id)}
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
          <span className="text-muted-foreground font-medium">Total Income</span>
          <span className="text-xl font-bold text-success">
            ₹{totalIncome.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
