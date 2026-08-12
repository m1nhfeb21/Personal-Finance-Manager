import type { Transaction, Category } from "./type";
export declare function renderDashboard(balance: number, income: number, expense: number, totalBudget?: number): void;
export declare function renderTransactions(transactions: Transaction[]): void;
export declare function renderCategories(categories: Category[], monthTransactions?: Transaction[]): void;
export declare function renderCategoryOptions(categories: Category[]): void;
export declare function renderBudgetAlerts(categories: Category[], monthTransactions: Transaction[]): void;
export declare function renderSummaryTable(transactions: Transaction[]): void;
//# sourceMappingURL=ui.d.ts.map