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
  return parseFloat(valor.replace(/\./g, "").replace(",", "."));
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
