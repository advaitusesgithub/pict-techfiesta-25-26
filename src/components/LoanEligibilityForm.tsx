import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calculator, 
  IndianRupee, 
  Calendar, 
  CreditCard, 
  User, 
  Briefcase, 
  PiggyBank, 
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";

export interface LoanFormData {
  monthlyIncome: number;
  requestedLoanAmount: number;
  loanTenure: number;
  creditScore: number;
  age: number;
  existingEMIs: number;
  incomeType: "salaried" | "freelance" | "self-employed";
  savingsRate: number;
  yearsAtCurrentJob: number;
}

interface LoanEligibilityFormProps {
  onCheckEligibility: (data: LoanFormData) => void;
  isLoading?: boolean;
}

export default function LoanEligibilityForm({ onCheckEligibility, isLoading = false }: LoanEligibilityFormProps) {
  const [formData, setFormData] = useState<LoanFormData>({
    monthlyIncome: 0,
    requestedLoanAmount: 0,
    loanTenure: 12,
    creditScore: 750,
    age: 30,
    existingEMIs: 0,
    incomeType: "salaried",
    savingsRate: 10,
    yearsAtCurrentJob: 1,
  });

  const handleInputChange = (field: keyof LoanFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === "string" ? (field === "incomeType" ? value : Number(value) || 0) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckEligibility(formData);
  };

  const inputFields = [
    {
      id: "monthlyIncome",
      label: "Monthly Income (₹)",
      icon: IndianRupee,
      type: "number",
      placeholder: "e.g., 50000",
      value: formData.monthlyIncome || "",
    },
    {
      id: "requestedLoanAmount",
      label: "Requested Loan Amount (₹)",
      icon: CreditCard,
      type: "number",
      placeholder: "e.g., 500000",
      value: formData.requestedLoanAmount || "",
    },
    {
      id: "loanTenure",
      label: "Loan Tenure (Months)",
      icon: Calendar,
      type: "number",
      placeholder: "e.g., 24",
      value: formData.loanTenure || "",
    },
    {
      id: "creditScore",
      label: "Credit Score",
      icon: CheckCircle2,
      type: "number",
      placeholder: "e.g., 750",
      value: formData.creditScore || "",
      min: 300,
      max: 900,
    },
    {
      id: "age",
      label: "Age (Years)",
      icon: User,
      type: "number",
      placeholder: "e.g., 30",
      value: formData.age || "",
      min: 18,
      max: 70,
    },
    {
      id: "existingEMIs",
      label: "Existing EMIs (₹)",
      icon: IndianRupee,
      type: "number",
      placeholder: "e.g., 5000",
      value: formData.existingEMIs || "",
    },
    {
      id: "savingsRate",
      label: "Savings Rate (%)",
      icon: PiggyBank,
      type: "number",
      placeholder: "e.g., 10",
      value: formData.savingsRate || "",
      min: 0,
      max: 100,
    },
    {
      id: "yearsAtCurrentJob",
      label: "Years at Current Job",
      icon: Clock,
      type: "number",
      placeholder: "e.g., 3",
      value: formData.yearsAtCurrentJob || "",
      min: 0,
    },
  ];

  return (
    <Card className="glass-card hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-display">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          Loan Eligibility Check
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in your details to check your loan eligibility
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inputFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-medium flex items-center gap-2">
                  <field.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id as keyof LoanFormData, e.target.value)}
                  min={field.min}
                  max={field.max}
                  className="no-spinner bg-secondary/50 border-border focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            ))}

            {/* Income Type Select */}
            <div className="space-y-2">
              <Label htmlFor="incomeType" className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                Income Type / Career
              </Label>
              <Select
                value={formData.incomeType}
                onValueChange={(value) => handleInputChange("incomeType", value)}
              >
                <SelectTrigger className="bg-secondary/50 border-border focus:ring-2 focus:ring-primary/30">
                  <SelectValue placeholder="Select income type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salaried">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      Salaried
                    </span>
                  </SelectItem>
                  <SelectItem value="freelance">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-warning" />
                      Freelance
                    </span>
                  </SelectItem>
                  <SelectItem value="self-employed">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Self-Employed
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-primary/90 hover:scale-[1.02] transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Check Eligibility
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
