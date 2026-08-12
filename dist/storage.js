const CATEGORY_KEY = "categories";
const LEGACY_TRANSACTION_KEY = "transactions";
const TRANSACTION_MONTHS_KEY = "transaction-months";
const TRANSACTION_PREFIX = "transactions-";
function getCurrentMonth(offset = 0) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + offset);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${date.getFullYear()}-${month}`;
}
function parseArray(data) {
    if (!data)
        return [];
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
function createSeedTransactions() {
    const currentMonth = getCurrentMonth();
    const previousMonth = getCurrentMonth(-1);
    return [
        {
            id: 101,
            amount: 10_000_000,
            type: "income",
            category: "Lương",
            note: "Lương tháng này",
            date: `${currentMonth}-01`,
        },
        {
            id: 102,
            amount: 500_000,
            type: "expense",
            category: "Ăn uống",
            note: "Đi chợ",
            date: `${currentMonth}-05`,
        },
        {
            id: 103,
            amount: 9_000_000,
            type: "income",
            category: "Lương",
            note: "Lương tháng trước",
            date: `${previousMonth}-01`,
        },
        {
            id: 104,
            amount: 750_000,
            type: "expense",
            category: "Di chuyển",
            note: "Xăng xe",
            date: `${previousMonth}-10`,
        },
    ];
}
function createSeedCategories() {
    return [
        { id: 1, name: "Ăn uống", limit: 2_000_000 },
        { id: 2, name: "Di chuyển", limit: 1_000_000 },
        { id: 3, name: "Mua sắm", limit: 1_500_000 },
        { id: 4, name: "Giải trí", limit: 800_000 },
    ];
}
export function saveTransactions(transactions) {
    const groupedTransactions = new Map();
    transactions.forEach((transaction) => {
        const month = transaction.date.slice(0, 7);
        const monthTransactions = groupedTransactions.get(month) ?? [];
        monthTransactions.push(transaction);
        groupedTransactions.set(month, monthTransactions);
    });
    const oldMonths = parseArray(localStorage.getItem(TRANSACTION_MONTHS_KEY));
    const newMonths = [...groupedTransactions.keys()];
    // Xóa key của tháng không còn giao dịch sau thao tác delete.
    oldMonths.forEach((month) => {
        if (!groupedTransactions.has(month)) {
            localStorage.removeItem(`${TRANSACTION_PREFIX}${month}`);
        }
    });
    groupedTransactions.forEach((monthTransactions, month) => {
        localStorage.setItem(`${TRANSACTION_PREFIX}${month}`, JSON.stringify(monthTransactions));
    });
    localStorage.setItem(TRANSACTION_MONTHS_KEY, JSON.stringify(newMonths));
    localStorage.removeItem(LEGACY_TRANSACTION_KEY);
}
export function loadTransactions() {
    const monthData = localStorage.getItem(TRANSACTION_MONTHS_KEY);
    if (monthData !== null) {
        const months = parseArray(monthData);
        return months.flatMap((month) => {
            return parseArray(localStorage.getItem(`${TRANSACTION_PREFIX}${month}`));
        });
    }
    // Giữ lại dữ liệu đã làm trước đây rồi tự chuyển sang cách lưu theo tháng.
    const legacyTransactions = parseArray(localStorage.getItem(LEGACY_TRANSACTION_KEY));
    if (legacyTransactions.length > 0) {
        saveTransactions(legacyTransactions);
        return legacyTransactions;
    }
    const seedTransactions = createSeedTransactions();
    saveTransactions(seedTransactions);
    return seedTransactions;
}
export function saveCategories(categories) {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
}
export function loadCategories() {
    const data = localStorage.getItem(CATEGORY_KEY);
    if (data !== null)
        return parseArray(data);
    const seedCategories = createSeedCategories();
    saveCategories(seedCategories);
    return seedCategories;
}
//# sourceMappingURL=storage.js.map