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
//# sourceMappingURL=utils.js.map