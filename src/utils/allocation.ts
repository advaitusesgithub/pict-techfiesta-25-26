const PRIORITY_WEIGHTS: Record<string, number> = {
  High: 0.5,
  Medium: 0.3,
  Low: 0.2,
};

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  priority: string;
  manual?: boolean;
  manualAmount?: number;
}

export interface AllocationResult {
  monthlyAllocation: number;
  monthsNeeded: number | null;
  status: string;
}

export function calculateAllocation(
  disposableIncome: number,
  savings: number,
  item: WishlistItem,
  manualAllocation: number | null
): AllocationResult {
  // If savings alone can cover
  if (savings >= item.price) {
    return {
      monthlyAllocation: 0,
      monthsNeeded: 0,
      status: "Affordable now (using savings)",
    };
  }

  if (disposableIncome <= 0) {
    return {
      monthlyAllocation: 0,
      monthsNeeded: null,
      status: "Needs loan",
    };
  }

  const allocation =
    manualAllocation ?? disposableIncome * PRIORITY_WEIGHTS[item.priority];

  const remainingAmount = item.price - savings;

  if (allocation >= remainingAmount) {
    return {
      monthlyAllocation: allocation,
      monthsNeeded: 1,
      status: "Affordable now",
    };
  }

  const monthsNeeded = Math.ceil(remainingAmount / allocation);

  return {
    monthlyAllocation: allocation,
    monthsNeeded,
    status: "Needs savings",
  };
}
