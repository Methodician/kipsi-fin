export interface Expense {
  id: string;
  date: Date;
  amount: number;
  isQualified: boolean;
  description: string;
  projectId: string;
}
