import type { TransacaoAPI, Transacao } from "./types.js";

export function normalizeTransaction(transacao: TransacaoAPI): Transacao {
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

export function formatCurrency(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calculateTotal(transacoes: Transacao[]): number {
  return transacoes.reduce((total, transacao) => total + transacao.value, 0);
}

export function countByPaymentMethod(
  transacoes: Transacao[],
): Record<string, number> {
  return transacoes.reduce(
    (acc, transacao) => {
      const method = transacao.paymentMethod;
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

export function countByStatus(transacoes: Transacao[]): Record<string, number> {
  return transacoes.reduce(
    (acc, transacao) => {
      const status = transacao.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

function parseDate(dateString: string): Date {
  // Formato: "01/09/2022 01:21"
  const [date, time] = dateString.split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`);
}

function getDayOfWeek(date: Date): string {
  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return days[date.getDay()];
}

export function totalSalesByWeekDay(
  transacoes: Transacao[],
): Record<string, number> {
  return transacoes.reduce(
    (acc, transacao) => {
      const date = parseDate(transacao.date);
      const dayOfWeek = getDayOfWeek(date);
      acc[dayOfWeek] = (acc[dayOfWeek] || 0) + transacao.value;
      return acc;
    },
    {} as Record<string, number>,
  );
}

export function getBestSalesDay(
  salesByWeekDay: Record<string, number>,
): string {
  let bestDay = "";
  let maxValue = 0;

  for (const [day, value] of Object.entries(salesByWeekDay)) {
    if (value > maxValue) {
      maxValue = value;
      bestDay = day;
    }
  }

  return bestDay;
}
