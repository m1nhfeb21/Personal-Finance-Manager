export function showTransactionMessage(amount, category) {
    const result = document.getElementById("result");
    if (!result)
        return;
    result.textContent = `Bạn vừa thêm ${amount} cho ${category}`;
}
//# sourceMappingURL=ui.js.map