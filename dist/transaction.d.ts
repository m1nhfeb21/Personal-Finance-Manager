import type { Transaction } from "./type";
export declare function addTransaction(transactions: Transaction[], newTransaction: Transaction): void;
export declare function calculateExpense(transactions: Transaction[]): number;
export declare function calculateIncome(transactions: Transaction[]): number;
export declare function calculateBalance(transactions: Transaction[]): number;
export declare function sortTransactionsDateDesc(transactions: Transaction[]): Transaction[];
export declare function deleteTransaction(transactions: Transaction[], id: number): Transaction[];
//# sourceMappingURL=transaction.d.ts.map