import { formatCurrency } from "./utils.js";
function createTableHeader() {
    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Valor</th>
      <th>Pagamento</th>
      <th>Status</th>
    </tr>
  `;
    return thead;
}
function createTableRow(transacao) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${transacao.name}</td>
    <td>${transacao.email}</td>
    <td>${formatCurrency(transacao.value)}</td>
    <td>${transacao.paymentMethod}</td>
    <td>${transacao.status}</td>
  `;
    return tr;
}
export function renderStatistics(total, paymentMethods, status, salesByWeekDay, bestDay) {
    const container = document.querySelector("#estatisticas");
    if (!container) {
        console.warn("Container #estatisticas não encontrado");
        return;
    }
    const paymentMethodsHTML = Object.entries(paymentMethods)
        .map(([method, count]) => `<p>${method}: ${count}</p>`)
        .join("");
    const statusHTML = Object.entries(status)
        .map(([statusName, count]) => `<p>${statusName}: ${count}</p>`)
        .join("");
    const salesByWeekDayHTML = Object.entries(salesByWeekDay)
        .map(([day, value]) => `<p>${day}: ${formatCurrency(value)}</p>`)
        .join("");
    container.innerHTML = `
    <div class="estatistica">
      <strong>Total:</strong> ${formatCurrency(total)}
    </div>
    <div class="estatistica">
      <strong>Pagamentos:</strong>
      ${paymentMethodsHTML}
    </div>
    <div class="estatistica">
      <strong>Status:</strong>
      ${statusHTML}
    </div>
    <div class="estatistica">
      <strong>Vendas por dia:</strong>
      ${salesByWeekDayHTML}
    </div>
    <div class="estatistica">
      <strong>Melhor dia:</strong> ${bestDay}
    </div>
  `;
}
export function renderTable(transacoes) {
    const container = document.querySelector("#transacoes");
    if (!container) {
        console.warn("Container #transacoes não encontrado");
        return;
    }
    const tabela = document.createElement("table");
    const thead = createTableHeader();
    const tbody = document.createElement("tbody");
    transacoes.forEach((transacao) => {
        const linha = createTableRow(transacao);
        tbody.appendChild(linha);
    });
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    container.appendChild(tabela);
}
//# sourceMappingURL=render.js.map