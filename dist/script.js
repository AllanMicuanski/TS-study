import { fetchTransactions } from "./api.js";
import { renderTable, renderStatistics } from "./render.js";
import { calculateTotal } from "./utils.js";
async function init() {
    try {
        const transactions = await fetchTransactions();
        const total = calculateTotal(transactions);
        renderStatistics(total);
        renderTable(transactions);
    }
    catch (error) {
        console.error("Falha ao carregar transações:", error);
    }
}
init();
//# sourceMappingURL=script.js.map