export function saveTransactions(transactions) {
    const data = JSON.stringify(transactions);
    localStorage.setItem("transactions", data);
}
export function loadTransactions() {
    const data = localStorage.getItem("transactions");
    if (!data)
        return [];
    return JSON.parse(data);
}
export function saveCategories(categories) {
    const data = JSON.stringify(categories);
    localStorage.setItem("categories", data);
}
export function loadCategories() {
    const data = localStorage.getItem("categories");
    if (!data)
        return [];
    return JSON.parse(data);
}
//# sourceMappingURL=storage.js.map