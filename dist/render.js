import { formatarMoeda } from "./utils.js";
function criarCabecalho() {
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
function criarLinha(transacao) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${transacao.name}</td>
    <td>${transacao.email}</td>
    <td>${formatarMoeda(transacao.value)}</td>
    <td>${transacao.paymentMethod}</td>
    <td>${transacao.status}</td>
  `;
    return tr;
}
export function renderizarTabela(transacoes) {
    const container = document.querySelector("#transacoes");
    if (!container) {
        console.warn("Container #transacoes não encontrado");
        return;
    }
    const tabela = document.createElement("table");
    const thead = criarCabecalho();
    const tbody = document.createElement("tbody");
    transacoes.forEach((transacao) => {
        const linha = criarLinha(transacao);
        tbody.appendChild(linha);
    });
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    container.appendChild(tabela);
}
//# sourceMappingURL=render.js.map