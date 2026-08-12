import type { Transaction, Category } from "./type";

export function saveTransactions(transactions: Transaction[]): void {
  const data = JSON.stringify(transactions);

  localStorage.setItem("transactions", data);
}

export function loadTransactions(): Transaction[] {
  const data = localStorage.getItem("transactions");
  if (!data) return [];
  return JSON.parse(data);
}

export function saveCategories(categories: Category[]): void {
  const data = JSON.stringify(categories);
  localStorage.setItem("categories", data);
}

export function loadCategories(): Category[] {
  const data = localStorage.getItem("categories");
  if (!data) return [];
  return JSON.parse(data);
}
