import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Trash2, TrendingUp, Sparkles, Clock, AlertTriangle, IndianRupee } from "lucide-react";
import { calculateAllocation, WishlistItem, AllocationResult } from "@/utils/allocation";
import AllocationToggle from "./AllocationToggle";
import EmiSafetyBar from "./EmiSafetyBar";
import { cn } from "@/lib/utils";

interface WishlistPanelProps {
  disposableIncome: number;
  savings: number;
}

export default function WishlistPanel({
  disposableIncome,
  savings,
}: WishlistPanelProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addItem = () => {
    if (!name || !price) return;
    setWishlist([
      ...wishlist,
      {
        id: Date.now(),
        name,
        price: Number(price),
        priority,
      },
    ]);
    setName("");
    setPrice("");
    setPriority("Medium");
  };

  const updateItem = (id: number, changes: Partial<WishlistItem>) => {
    setWishlist(
      wishlist.map((i) => (i.id === id ? { ...i, ...changes } : i))
    );
  };

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter((i) => i.id !== id));
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-500/10 text-rose-600 border-rose-500/30";
      case "Medium":
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "Low":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status.includes("Affordable")) return <Sparkles className="h-4 w-4" />;
    if (status === "Needs savings") return <Clock className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getStatusStyle = (status: string) => {
    if (status.includes("Affordable")) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
    if (status === "Needs savings") return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    return "bg-rose-500/10 text-rose-600 border-rose-500/30";
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-display">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/10 shadow-inner">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          Wishlist Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Add Item Form */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
          <Input
            type="text"
            placeholder="Item name (Car, Phone, Laptop)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-card border-0 focus:ring-2 focus:ring-primary/20"
          />
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="pl-9 no-spinner bg-card border-0 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="bg-card border-0">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  High Priority
                </span>
              </SelectItem>
              <SelectItem value="Medium">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Medium Priority
                </span>
              </SelectItem>
              <SelectItem value="Low">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Low Priority
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addItem} className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Add to Wishlist
          </Button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Your wishlist is empty</p>
              <p className="text-xs mt-1">Add items to see loan eligibility</p>
            </div>
          ) : (
            wishlist.map((item, idx) => {
              const result: AllocationResult = calculateAllocation(
                disposableIncome,
                savings,
                item,
                item.manual ? (item.manualAmount ?? null) : null
              );

              return (
                <div
                  key={item.id}
                  className="p-4 bg-card rounded-2xl border border-border/50 space-y-4 hover-lift animate-scale-in"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-xl font-bold text-primary font-display">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("text-xs font-medium", getPriorityStyle(item.priority))}
                      >
                        {item.priority}
                      </Badge>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1.5 hover:bg-destructive/10 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <AllocationToggle
                    manual={item.manual || false}
                    value={item.manualAmount}
                    onChange={(manual, value) =>
                      updateItem(item.id, {
                        manual,
                        manualAmount: value ?? item.manualAmount,
                      })
                    }
                  />

                  <div className="space-y-3 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Monthly allocation
                      </span>
                      <span className="font-bold text-primary text-lg font-display">
                        ₹{Math.round(result.monthlyAllocation).toLocaleString()}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border",
                        getStatusStyle(result.status)
                      )}
                    >
                      {getStatusIcon(result.status)}
                      {result.status.includes("Affordable") ? (
                        <span>{result.status}</span>
                      ) : result.status === "Needs savings" ? (
                        <span>
                          Needs savings ({result.monthsNeeded} months)
                        </span>
                      ) : (
                        <span>Loan required</span>
                      )}
                    </div>

                    <EmiSafetyBar
                      emi={result.monthlyAllocation}
                      disposableIncome={disposableIncome}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
