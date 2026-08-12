import { addTransaction, calculateBalance, calculateExpense, calculateIncome, deleteTransaction, filterTransactionsByMonth, sortTransactionsDateDesc, } from "./transaction.js";
import { saveTransactions, loadTransactions, saveCategories, loadCategories, } from "./storage.js";
import { renderBudgetAlerts, renderCategories, renderCategoryOptions, renderDashboard, renderSummaryTable, renderTransactions, } from "./ui.js";
import { addCategory, deleteCategory, updateCategory } from "./category.js";
const SELECTED_MONTH_KEY = "selected-month";
//load data
let transactions = loadTransactions();
let categories = loadCategories();
function getCurrentMonth() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${today.getFullYear()}-${month}`;
}
const storedMonth = localStorage.getItem(SELECTED_MONTH_KEY);
let selectedMonth = storedMonth && /^\d{4}-\d{2}$/.test(storedMonth)
    ? storedMonth
    : getCurrentMonth();
function refreshTransactionUI() {
    const monthTransactions = filterTransactionsByMonth(transactions, selectedMonth);
    const income = calculateIncome(monthTransactions);
    const expense = calculateExpense(monthTransactions);
    const balance = calculateBalance(monthTransactions);
    const sortedTransactions = sortTransactionsDateDesc(monthTransactions);
    const totalBudget = categories.reduce((total, category) => {
        return total + category.limit;
    }, 0);
    renderDashboard(balance, income, expense, totalBudget);
    renderTransactions(sortedTransactions);
    renderCategories(categories, monthTransactions);
    renderCategoryOptions(categories);
    renderBudgetAlerts(categories, monthTransactions);
    renderSummaryTable(transactions);
}
const categoryForm = document.getElementById("category-form");
const categoryNameInput = document.getElementById("category-name");
const categoryLimitInput = document.getElementById("category-limit");
const categorySubmitButton = categoryForm?.querySelector('button[type="submit"]');
let editingCategoryId = null;
const monthPicker = document.getElementById("month-picker");
if (monthPicker) {
    monthPicker.value = selectedMonth;
    monthPicker.addEventListener("change", () => {
        if (!monthPicker.value)
            return;
        selectedMonth = monthPicker.value;
        localStorage.setItem(SELECTED_MONTH_KEY, selectedMonth);
        refreshTransactionUI();
    });
}
refreshTransactionUI();
const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
if (transactionList) {
    transactionList.addEventListener("click", (e) => {
        const target = e.target;
        const deleteButton = target.closest(".delete-btn");
        if (!deleteButton)
            return;
        const id = Number(deleteButton.dataset.id);
        transactions = deleteTransaction(transactions, id);
        saveTransactions(transactions);
        refreshTransactionUI();
    });
}
if (categoryForm && categoryNameInput && categoryLimitInput) {
    categoryForm.addEventListener("reset", () => {
        editingCategoryId = null;
        if (categorySubmitButton) {
            categorySubmitButton.textContent = "+ Thêm danh mục";
        }
    });
    categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = categoryNameInput.value.trim();
        const limit = Number(categoryLimitInput.value);
        const duplicatedName = categories.some((category) => {
            return category.name.toLowerCase() === name.toLowerCase() &&
                category.id !== editingCategoryId;
        });
        if (!name || !Number.isFinite(limit) || limit <= 0) {
            window.alert("Tên danh mục không được trống và hạn mức phải lớn hơn 0.");
            return;
        }
        if (duplicatedName) {
            window.alert("Tên danh mục đã tồn tại.");
            return;
        }
        if (editingCategoryId !== null) {
            const categoryToEdit = categories.find((category) => {
                return category.id === editingCategoryId;
            });
            if (!categoryToEdit)
                return;
            const oldName = categoryToEdit.name;
            updateCategory(categories, editingCategoryId, name, limit);
            // Khi đổi tên category, cập nhật các giao dịch cũ đang dùng tên đó.
            transactions.forEach((transaction) => {
                if (transaction.category === oldName) {
                    transaction.category = name;
                }
            });
            saveTransactions(transactions);
            editingCategoryId = null;
            if (categorySubmitButton) {
                categorySubmitButton.textContent = "+ Thêm danh mục";
            }
        }
        else {
            const newCategory = {
                id: Date.now(),
                name,
                limit,
            };
            addCategory(categories, newCategory);
        }
        saveCategories(categories);
        refreshTransactionUI();
        categoryForm.reset();
    });
}
if (form) {
    const amountInput = document.getElementById("amount");
    const typeInput = document.getElementById("transaction-type");
    const categoryInput = document.getElementById("category");
    const noteInput = document.getElementById("note");
    const dateInput = document.getElementById("date");
    dateInput.value = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amount = Number(amountInput.value);
        const type = typeInput.value;
        const category = categoryInput.value;
        const note = noteInput.value;
        const date = dateInput.value;
        if (!Number.isFinite(amount) || amount <= 0) {
            window.alert("Số tiền phải lớn hơn 0.");
            return;
        }
        if (!category || !date) {
            window.alert("Hãy chọn danh mục và ngày giao dịch.");
            return;
        }
        const newTransaction = {
            id: Date.now(),
            amount,
            type,
            category,
            note,
            date,
        };
        addTransaction(transactions, newTransaction);
        saveTransactions(transactions);
        // Sau khi thêm, tự chuyển bộ lọc sang tháng của giao dịch vừa nhập.
        selectedMonth = date.slice(0, 7);
        localStorage.setItem(SELECTED_MONTH_KEY, selectedMonth);
        if (monthPicker)
            monthPicker.value = selectedMonth;
        refreshTransactionUI();
        form.reset();
        dateInput.value = new Date().toISOString().slice(0, 10);
    });
}
const categoryList = document.getElementById("category-list");
if (categoryList) {
    categoryList.addEventListener("click", (e) => {
        const target = e.target;
        const editButton = target.closest(".category-edit-btn");
        if (editButton) {
            const editId = Number(editButton.dataset.id);
            const categoryToEdit = categories.find((category) => {
                return category.id === editId;
            });
            if (!categoryToEdit || !categoryNameInput || !categoryLimitInput)
                return;
            editingCategoryId = editId;
            categoryNameInput.value = categoryToEdit.name;
            categoryLimitInput.value = String(categoryToEdit.limit);
            if (categorySubmitButton) {
                categorySubmitButton.textContent = "Lưu thay đổi";
            }
            categoryNameInput.focus();
            return;
        }
        const deleteButton = target.closest(".category-delete-btn");
        if (!deleteButton)
            return;
        const id = Number(deleteButton.dataset.id);
        const categoryToDelete = categories.find((category) => {
            return category.id === id;
        });
        if (!categoryToDelete)
            return;
        // Không cho xóa nếu transaction vẫn đang tham chiếu tới category này.
        const isCategoryInUse = transactions.some((transaction) => {
            return transaction.category === categoryToDelete.name;
        });
        if (isCategoryInUse) {
            window.alert("Không thể xóa danh mục đang được sử dụng trong giao dịch.");
            return;
        }
        categories = deleteCategory(categories, id);
        if (editingCategoryId === id) {
            editingCategoryId = null;
            categoryForm?.reset();
            if (categorySubmitButton) {
                categorySubmitButton.textContent = "+ Thêm danh mục";
            }
        }
        saveCategories(categories);
        refreshTransactionUI();
    });
}
//# sourceMappingURL=app.js.map