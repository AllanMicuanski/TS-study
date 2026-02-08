import { fetchTransacoes } from "./api.js";
import { renderizarTabela } from "./render.js";

async function iniciar(): Promise<void> {
  try {
    const transacoes = await fetchTransacoes();
    renderizarTabela(transacoes);
  } catch (error) {
    console.error("Falha ao carregar transações:", error);
  }
}

iniciar();
