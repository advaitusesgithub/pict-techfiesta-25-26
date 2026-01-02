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
import { ShoppingCart, Plus, Trash2, TrendingUp, Sparkles, Clock, AlertTriangle } from "lucide-react";
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "Low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    if (status.includes("Affordable")) return <Sparkles className="h-3.5 w-3.5" />;
    if (status === "Needs savings") return <Clock className="h-3.5 w-3.5" />;
    return <AlertTriangle className="h-3.5 w-3.5" />;
  };

  const getStatusStyle = (status: string) => {
    if (status.includes("Affordable")) return "bg-success/10 text-success";
    if (status === "Needs savings") return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  return (
    <Card className="shadow-lg border-0 bg-card h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          Wishlist Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Item (Car, Phone)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="no-spinner"
          />
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">🔴 High Priority</SelectItem>
              <SelectItem value="Medium">🟡 Medium Priority</SelectItem>
              <SelectItem value="Low">🟢 Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {wishlist.map((item) => {
            const result: AllocationResult = calculateAllocation(
              disposableIncome,
              savings,
              item,
              item.manual ? (item.manualAmount ?? null) : null
            );

            return (
              <div
                key={item.id}
                className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-lg font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getPriorityColor(item.priority))}
                    >
                      {item.priority}
                    </Badge>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
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

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Monthly allocation
                    </span>
                    <span className="font-semibold text-primary">
                      ₹{Math.round(result.monthlyAllocation).toLocaleString()}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
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
                      <span>Needs loan</span>
                    )}
                  </div>

                  <EmiSafetyBar
                    emi={result.monthlyAllocation}
                    disposableIncome={disposableIncome}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
