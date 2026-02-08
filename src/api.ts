import type { TransacaoAPI, Transacao } from "./types.js";
import { normalizeTransacao } from "./utils.js";

export async function fetchTransacoes(): Promise<Transacao[]> {
  try {
    const response = await fetch(
      "https://api.origamid.dev/json/transacoes.json",
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const json: TransacaoAPI[] = await response.json();
    return json.map(normalizeTransacao);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw error;
  }
}
