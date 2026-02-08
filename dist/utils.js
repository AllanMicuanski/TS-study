export function normalizeTransaction(transacao) {
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
function stringToNumber(valor) {
    const numeroLimpo = valor.replace(/\./g, "").replace(",", ".");
    const resultado = parseFloat(numeroLimpo);
    if (isNaN(resultado)) {
        console.warn("Valor inválido:", valor);
        return 0;
    }
    return resultado;
}
export function formatCurrency(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
export function calculateTotal(transacoes) {
    return transacoes.reduce((total, transacao) => total + transacao.value, 0);
}
export function countByPaymentMethod(transacoes) {
    return transacoes.reduce((acc, transacao) => {
        const method = transacao.paymentMethod;
        acc[method] = (acc[method] || 0) + 1;
        return acc;
    }, {});
}
export function countByStatus(transacoes) {
    return transacoes.reduce((acc, transacao) => {
        const status = transacao.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});
}
function parseDate(dateString) {
    const [date, time] = dateString.split(" ");
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}T${time}`);
}
function getDayOfWeek(date) {
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
export function totalSalesByWeekDay(transacoes) {
    return transacoes.reduce((acc, transacao) => {
        const date = parseDate(transacao.date);
        const dayOfWeek = getDayOfWeek(date);
        acc[dayOfWeek] = (acc[dayOfWeek] || 0) + transacao.value;
        return acc;
    }, {});
}
export function getBestSalesDay(salesByWeekDay) {
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
//# sourceMappingURL=utils.js.map