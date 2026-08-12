import type { Transaction, Category } from "./type";
import { calculateCategoryExpense } from "./transaction.js";

function formatCurrency(value: number): string {
  return `${value.toLocaleString("vi-VN")}đ`;
}

export function renderDashboard(
  balance: number,
  income: number,
  expense: number,
  totalBudget = 0,
): void {
  const balanceElement = document.getElementById("balance");
  const incomeElement = document.getElementById("income");
  const expenseElement = document.getElementById("expense");

  if (balanceElement) balanceElement.textContent = formatCurrency(balance);
  if (incomeElement) incomeElement.textContent = formatCurrency(income);
  if (expenseElement) expenseElement.textContent = formatCurrency(expense);

  const budgetProgress = document.getElementById("budget-progress");
  const budgetStatus = document.getElementById("budget-status");
  const budgetText = document.getElementById("budget-text");
  const percentage = totalBudget > 0 ? (expense / totalBudget) * 100 : 0;

  if (budgetProgress) {
    budgetProgress.style.width = `${Math.min(percentage, 100)}%`;
    budgetProgress.className = `h-full rounded-full ${percentage > 100 ? "bg-red-500" : "bg-emerald-500"}`;
  }

  if (budgetStatus) {
    budgetStatus.textContent = percentage > 100 ? "Vượt" : "Đạt";
    budgetStatus.className = percentage > 100 ? "font-semibold text-red-500" : "font-semibold text-emerald-600";
  }

  if (budgetText) {
    budgetText.textContent = `${formatCurrency(expense)} / ${formatCurrency(totalBudget)} (${Math.round(percentage)}%)`;
  }
}

export function renderTransactions(transactions: Transaction[]): void {
  const transactionList = document.getElementById("transaction-list");

  if (!transactionList) return;
  transactionList.innerHTML = "";
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    // row.className =
    //   "border-b border-slate-100 text-sm text-center text-slate-600";
    row.innerHTML = `<td class="px-5 py-4">${transaction.date}</td>
    <td class="px-5 py-4">${transaction.type}</td>
    <td class="px-5 py-4">${transaction.category}</td>
    <td class="px-5 py-4">${transaction.note}</td>
    <td class="px-5 py-4 ${transaction.type === "income" ? "text-emerald-600" : "text-red-500"}">${transaction.type === "income" ? "+" : "-"}${formatCurrency(transaction.amount)}</td>
    <td class="px-5 py-4"><button class="delete-btn rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-100" data-id="${transaction.id}">Xóa</button></td>`;

    transactionList.appendChild(row);
  });
}

export function renderCategories(
  categories: Category[],
  monthTransactions: Transaction[] = [],
): void {
  const categoryList = document.getElementById("category-list");

  if (!categoryList) return;

  categoryList.innerHTML = "";

  categories.forEach((category) => {
    const row = document.createElement("tr");
    const spent = calculateCategoryExpense(monthTransactions, category.name);
    const isOverLimit = category.limit > 0 && spent > category.limit;

    row.innerHTML = `
      <td class="px-5 py-4">
        ${category.name}
      </td>

      <td class="px-5 py-4">
        ${category.limit.toLocaleString("vi-VN")}đ
      </td>

      <td class="px-5 py-4 ${isOverLimit ? "font-semibold text-red-500" : "text-emerald-600"}">
        ${formatCurrency(spent)}
        ${isOverLimit ? "- Vượt hạn mức" : ""}
      </td>

      <td class="px-5 py-4">
        <button
          class="category-delete-btn
                 rounded-lg
                 bg-rose-50
                 px-3 py-2
                 text-sm
                 font-medium
                 text-rose-500
                 transition
                 hover:bg-rose-100"
          data-id="${category.id}"
        >
          Xóa
        </button>

        <button
          class="category-edit-btn
                 rounded-lg
                 bg-green-500
                 px-3 py-2
                 text-sm
                 font-medium
                 text-white
                 transition
                 hover:bg-green-600"
          data-id="${category.id}"
        >
          Sửa
        </button>
      </td>
    `;

    categoryList.appendChild(row);
  });
}

// Tạo option từ mảng categories thay vì viết cứng trong HTML.
export function renderCategoryOptions(categories: Category[]): void {
  const categorySelect = document.getElementById(
    "category",
  ) as HTMLSelectElement | null;
  if (!categorySelect) return;

  categorySelect.innerHTML = '<option value="">Chọn danh mục</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

export function renderBudgetAlerts(
  categories: Category[],
  monthTransactions: Transaction[],
): void {
  const alertList = document.getElementById("budget-alerts");
  if (!alertList) return;

  const exceededCategories = categories.filter((category) => {
    const spent = calculateCategoryExpense(monthTransactions, category.name);
    return category.limit > 0 && spent > category.limit;
  });

  if (exceededCategories.length === 0) {
    alertList.innerHTML =
      '<p class="rounded-lg bg-emerald-50 p-4 text-emerald-700">Các danh mục đều trong hạn mức.</p>';
    return;
  }

  alertList.innerHTML = exceededCategories
    .map((category) => {
      const spent = calculateCategoryExpense(monthTransactions, category.name);
      return `<p class="rounded-lg bg-red-50 p-4 text-red-600"><strong>${category.name}</strong> đã vượt ${formatCurrency(spent - category.limit)}.</p>`;
    })
    .join("");
}

export function renderSummaryTable(transactions: Transaction[]): void {
  const summaryList = document.getElementById("summary-list");
  if (!summaryList) return;

  const summaries = new Map<string, { income: number; expense: number }>();

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);
    const summary = summaries.get(month) ?? { income: 0, expense: 0 };

    if (transaction.type === "income") {
      summary.income += transaction.amount;
    } else {
      summary.expense += transaction.amount;
    }

    summaries.set(month, summary);
  });

  summaryList.innerHTML = "";

  [...summaries.entries()]
    .sort(([monthA], [monthB]) => monthB.localeCompare(monthA))
    .forEach(([month, summary]) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-5 py-4">${month}</td>
        <td class="px-5 py-4 text-emerald-600">${formatCurrency(summary.income)}</td>
        <td class="px-5 py-4 text-red-500">${formatCurrency(summary.expense)}</td>
        <td class="px-5 py-4">${formatCurrency(summary.income - summary.expense)}</td>
      `;
      summaryList.appendChild(row);
    });
}
