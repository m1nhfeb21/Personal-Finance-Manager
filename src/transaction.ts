import type { Transaction } from "./type";

export function addTransaction(
  transactions: Transaction[],
  newTransaction: Transaction,
): void {
  transactions.push(newTransaction);
}

export function calculateExpense(transactions: Transaction[]): number {
  const expenseTransactions = transactions.filter((transaction) => {
    return transaction.type === "expense";
  });

  const totalExpense = expenseTransactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
  return totalExpense;
}

export function calculateIncome(transactions: Transaction[]): number {
  const IncomeTransactions = transactions.filter((transaction) => {
    return transaction.type === "income";
  });
  const totalIncome = IncomeTransactions.reduce((total, income) => {
    return total + income.amount;
  }, 0);
  return totalIncome;
}

export function calculateBalance(transactions: Transaction[]): number {
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  return income - expense;
}

export function sortTransactionsDateDesc(
  transactions: Transaction[],
): Transaction[] {
  return [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function deleteTransaction(
  transactions: Transaction[],
  id: number,
): Transaction[] {
  return transactions.filter((transaction) => {
    return transaction.id != id;
  });
}
