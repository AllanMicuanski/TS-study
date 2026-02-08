export function normalizeTransacao(transacao) {
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
    return parseFloat(valor.replace(/\./g, "").replace(",", "."));
}
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
//# sourceMappingURL=utils.js.map