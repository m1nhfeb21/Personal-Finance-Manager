export function showTransactionMessage(amount: number, category: string) {
  const result = document.getElementById("result");

  if (!result) return;

  result.textContent = `Bạn vừa thêm ${amount} cho ${category}`;
}
