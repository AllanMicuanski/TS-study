import { fetchTransactions } from "./api.js";
import { renderTable, renderStatistics } from "./render.js";
import {
  calculateTotal,
  countByPaymentMethod,
  countByStatus,
  totalSalesByWeekDay,
  getBestSalesDay,
} from "./utils.js";

async function init(): Promise<void> {
  try {
    const transactions = await fetchTransactions();
    const total = calculateTotal(transactions);
    const paymentMethods = countByPaymentMethod(transactions);
    const status = countByStatus(transactions);
    const salesByWeekDay = totalSalesByWeekDay(transactions);
    const bestDay = getBestSalesDay(salesByWeekDay);

    renderStatistics(total, paymentMethods, status, salesByWeekDay, bestDay);
    renderTable(transactions);
  } catch (error) {
    console.error("Falha ao carregar transações:", error);
  }
}

init();
