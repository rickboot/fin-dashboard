export interface KpiData {
  id: string;
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

export interface ProductData {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionData {
  _id: string;
  amount: number;
  buyer: string;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}
