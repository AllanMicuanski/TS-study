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
export function renderStatistics(total) {
    const container = document.querySelector("#estatisticas");
    if (!container) {
        console.warn("Container #estatisticas não encontrado");
        return;
    }
    container.innerHTML = `
    <div class="estatistica">
      <strong>Total:</strong> ${formatCurrency(total)}
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