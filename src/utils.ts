import type { TransacaoAPI, Transacao } from "./types.js";

export function normalizeTransacao(transacao: TransacaoAPI): Transacao {
  return {
    newClient: Boolean(transacao["Cliente Novo"]),
    date: transacao.Data,
    email: transacao.Email,
    paymentMethod: transacao["Forma de Pagamento"],
    id: transacao.ID,
    name: transacao.Nome,
    status: transacao.Status,
    value: stringToNumber(transacao["Valor (R$)"]),
  };
}

function stringToNumber(valor: string): number {
  const numeroLimpo = valor.replace(/\./g, "").replace(",", ".");
  const resultado = parseFloat(numeroLimpo);

  if (isNaN(resultado)) {
    console.warn("Valor inválido:", valor);
    return 0;
  }

  return resultado;
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calcularTotal(transacoes: Transacao[]): number {
  console.log("Transações:", transacoes);
  console.log("Primeira transação:", transacoes[0]);
  return transacoes.reduce((total, transacao) => total + transacao.value, 0);
}
