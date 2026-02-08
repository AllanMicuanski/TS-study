import type { TransacaoAPI, Transacao } from "./types.js";
import { normalizeTransaction } from "./utils.js";

export async function fetchTransactions(): Promise<Transacao[]> {
  try {
    const response = await fetch(
      "https://api.origamid.dev/json/transacoes.json",
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const json: TransacaoAPI[] = await response.json();
    return json.map(normalizeTransaction);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw error;
  }
}
