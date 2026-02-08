import { fetchTransacoes } from "./api.js";
import { renderizarTabela, renderizarEstatisticas } from "./render.js";
import { calcularTotal } from "./utils.js";
async function iniciar() {
    try {
        const transacoes = await fetchTransacoes();
        const total = calcularTotal(transacoes);
        renderizarEstatisticas(total);
        renderizarTabela(transacoes);
    }
    catch (error) {
        console.error("Falha ao carregar transações:", error);
    }
}
iniciar();
//# sourceMappingURL=script.js.map