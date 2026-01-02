import { cn } from "@/lib/utils";

interface EmiSafetyBarProps {
  emi: number;
  disposableIncome: number;
}

export default function EmiSafetyBar({ emi, disposableIncome }: EmiSafetyBarProps) {
  if (disposableIncome <= 0) {
    return (
      <p className="text-xs text-destructive mt-2 font-medium">
        No disposable income available
      </p>
    );
  }

  const ratio = (emi / disposableIncome) * 100;

  let status = "Safe";
  let colorClass = "bg-success";
  let textClass = "text-success";

  if (ratio > 30 && ratio <= 50) {
    status = "Stretch";
    colorClass = "bg-warning";
    textClass = "text-warning";
  } else if (ratio > 50) {
    status = "Risky";
    colorClass = "bg-destructive";
    textClass = "text-destructive";
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className={cn("font-semibold", textClass)}>
          EMI Safety: {status}
        </span>
        <span className="text-muted-foreground font-medium">
          {ratio.toFixed(1)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClass)}
          style={{ width: `${Math.min(ratio, 100)}%` }}
        />
      </div>
    </div>
  );
}
