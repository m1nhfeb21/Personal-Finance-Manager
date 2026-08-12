import type { Transaction, Category } from "./type";
import {
  addTransaction,
  calculateBalance,
  calculateExpense,
  calculateIncome,
  sortTransactionsDateDesc,
  deleteTransaction,
} from "./transaction.js";
import {
  saveTransactions,
  loadTransactions,
  saveCategories,
  loadCategories,
} from "./storage.js";
import { renderDashboard, renderTransactions, renderCategories } from "./ui.js";
import { addCategory, deleteCategory } from "./category.js";
//load data
let transactions: Transaction[] = loadTransactions();
let categories: Category[] = loadCategories();
renderCategories(categories);

//calculate data
const expense = calculateExpense(transactions);
const income = calculateIncome(transactions);
const balance = calculateBalance(transactions);
const categoryForm = document.getElementById(
  "category-form",
) as HTMLFormElement | null;

renderDashboard(balance, income, expense);

const sortedTransactions = sortTransactionsDateDesc(transactions);
renderTransactions(sortedTransactions);

const form = document.getElementById(
  "transaction-form",
) as HTMLFormElement | null;

const transactionList = document.getElementById("transaction-list");
if (transactionList) {
  transactionList.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const deleteButton = target.closest(".delete-btn");

    if (!deleteButton) return;

    const id = Number((deleteButton as HTMLElement).dataset.id);
    transactions = deleteTransaction(transactions, id);

    saveTransactions(transactions);

    renderTransactions(sortTransactionsDateDesc(transactions));
  });
}
if (categoryForm) {
  const categoryNameInput = document.getElementById(
    "category-name",
  ) as HTMLInputElement;

  const categoryLimitInput = document.getElementById(
    "category-limit",
  ) as HTMLInputElement;

  categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = categoryNameInput.value.trim(); //remove all leading and trailing whitespace

    const limit = Number(categoryLimitInput.value);

    if (!name || limit <= 0) return;

    const newCategory: Category = {
      id: Date.now(),
      name,
      limit,
    };

    addCategory(categories, newCategory);

    saveCategories(categories);
    renderCategories(categories);

    categoryForm.reset();
  });
}
if (form) {
  const amountInput = document.getElementById("amount") as HTMLInputElement;

  const typeInput = document.getElementById(
    "transaction-type",
  ) as HTMLSelectElement;

  const categoryInput = document.getElementById(
    "category",
  ) as HTMLSelectElement;

  const noteInput = document.getElementById("note") as HTMLInputElement;

  const dateInput = document.getElementById("date") as HTMLInputElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = Number(amountInput.value);

    const type = typeInput.value as "income" | "expense";

    const category = categoryInput.value;

    const note = noteInput.value;

    const date = dateInput.value;

    const newTransaction: Transaction = {
      id: Date.now(),
      amount,
      type,
      category,
      note,
      date,
    };

    addTransaction(transactions, newTransaction);
    saveTransactions(transactions);
    renderTransactions(sortTransactionsDateDesc(transactions));
  });
}

const categoryList = document.getElementById("category-list");

if (categoryList) {
  categoryList.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const deleteButton = target.closest(
      ".category-delete-btn",
    ) as HTMLElement | null;

    if (!deleteButton) return;

    const id = Number(deleteButton.dataset.id);

    categories = deleteCategory(categories, id);

    saveCategories(categories);

    renderCategories(categories);
  });
}
