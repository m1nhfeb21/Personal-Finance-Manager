export function addTransaction(transactions, newTransaction) {
    transactions.push(newTransaction);
}
export function calculateExpense(transactions) {
    const expenseTransactions = transactions.filter((transaction) => {
        return transaction.type === "expense";
    });
    const totalExpense = expenseTransactions.reduce((total, transaction) => {
        return total + transaction.amount;
    }, 0);
    return totalExpense;
}
export function calculateIncome(transactions) {
    const IncomeTransactions = transactions.filter((transaction) => {
        return transaction.type === "income";
    });
    const totalIncome = IncomeTransactions.reduce((total, income) => {
        return total + income.amount;
    }, 0);
    return totalIncome;
}
export function calculateBalance(transactions) {
    const income = calculateIncome(transactions);
    const expense = calculateExpense(transactions);
    return income - expense;
}
export function sortTransactionsDateDesc(transactions) {
    return [...transactions].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
export function deleteTransaction(transactions, id) {
    return transactions.filter((transaction) => {
        return transaction.id !== id;
    });
}
// date có dạng YYYY-MM-DD, còn month có dạng YYYY-MM.
export function filterTransactionsByMonth(transactions, month) {
    return transactions.filter((transaction) => {
        return transaction.date.startsWith(month);
    });
}
// Cộng tổng tiền chi của một danh mục để so sánh với hạn mức.
export function calculateCategoryExpense(transactions, categoryName) {
    return transactions.reduce((total, transaction) => {
        const isCategoryExpense = transaction.type === "expense" && transaction.category === categoryName;
        return isCategoryExpense ? total + transaction.amount : total;
    }, 0);
}
//# sourceMappingURL=transaction.js.map