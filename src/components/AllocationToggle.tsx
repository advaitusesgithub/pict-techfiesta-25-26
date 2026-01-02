import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AllocationToggleProps {
  manual: boolean;
  value: number | undefined;
  onChange: (manual: boolean, value?: number) => void;
}

export default function AllocationToggle({
  manual,
  value,
  onChange,
}: AllocationToggleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch
          id="manual-allocation"
          checked={manual}
          onCheckedChange={(checked) => onChange(checked)}
        />
        <Label htmlFor="manual-allocation" className="text-sm text-muted-foreground cursor-pointer">
          Customize monthly allocation
        </Label>
      </div>

      {manual && (
        <Input
          type="number"
          placeholder="Enter custom amount (₹)"
          value={value || ""}
          onChange={(e) => onChange(true, Number(e.target.value))}
          className="no-spinner"
        />
      )}
    </div>
  );
}
