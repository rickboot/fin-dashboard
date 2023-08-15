export interface KpiData {
  id: string;
  // _id: string;
  // __v: number;
  totalExpenses: number;
  totalProfit: number;
  totalRevenue: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<MonthlyData>;
  dailyData: Array<DailyData>;
}

export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}

export interface MonthlyData {
  id: string;
  month: string;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  revenue: number;
}

export interface DailyData {
  id: string;
  date: string;
  expenses: number;
  revenue: number;
}
