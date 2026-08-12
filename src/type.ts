export interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  category: string;
  note: string;
  date: string;
}

export interface Category {
  id: number;
  name: string;
  limit: number;
}
