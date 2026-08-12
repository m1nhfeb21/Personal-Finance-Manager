import type { Transaction, Category } from "./type";
export function renderDashboard(
  balance: number,
  income: number,
  expense: number,
): void {
  const balanceElement = document.getElementById("balance");
  const incomeElement = document.getElementById("income");
  const expenseElement = document.getElementById("expense");

  if (!balanceElement || !incomeElement || !expenseElement) {
    return;
  }
  balanceElement.textContent = `${balance}đ`;
  incomeElement.textContent = `${income}đ`;
  expenseElement.textContent = `${expense}đ`;
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
    <td class="px-5 py-4">${transaction.amount}</td>
    <td class="px-5 py-4"><button class="delete-btn rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-100" data-id="${transaction.id}">Xóa</button></td>`;

    transactionList.appendChild(row);
  });
}

export function renderCategories(categories: Category[]): void {
  const categoryList = document.getElementById("category-list");

  if (!categoryList) return;

  categoryList.innerHTML = "";

  categories.forEach((category) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="px-5 py-4">
        ${category.name}
      </td>

      <td class="px-5 py-4">
        ${category.limit.toLocaleString("vi-VN")}đ
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
      </td>
    `;

    categoryList.appendChild(row);
  });
}
