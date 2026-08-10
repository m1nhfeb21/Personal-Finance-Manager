import { showTransactionMessage } from "./ui.js";
const form = document.getElementById("transaction-form");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("transaction-type");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    showTransactionMessage(amount, category);
});
//# sourceMappingURL=app.js.map