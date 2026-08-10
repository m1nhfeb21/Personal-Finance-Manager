import type { Transaction } from "./type.ts";
import { showTransactionMessage } from "./ui.js";

const form = document.getElementById("transaction-form") as HTMLFormElement;

const amountInput = document.getElementById("amount") as HTMLInputElement;

const categoryInput = document.getElementById("category") as HTMLSelectElement;

const dateInput = document.getElementById("date") as HTMLInputElement;

const typeInput = document.getElementById(
  "transaction-type",
) as HTMLSelectElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  showTransactionMessage(amount, category);
});
