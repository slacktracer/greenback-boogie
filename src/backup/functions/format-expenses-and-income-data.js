import { getTime, parse } from "date-fns";

import { parseAmount } from "./parse-amount";

export const formatExpensesAndIncomeData = ({ expensesAndIncomeData }) => {
  const expenseAndIncomeOperations = [];

  for (const operation of expensesAndIncomeData) {
    const [
      datetime,
      type,
      account,
      group,
      category,
      currency,
      amountPerUnit,
      unitCount,
      finalAmount,
      comments,
    ] = operation;

    const timepath = datetime.split(" ")[0].split(".").reverse();
    const timestamp = getTime(parse(datetime, "dd.MM.yy HH:mm", new Date()));

    expenseAndIncomeOperations.push({
      account,
      amountPerUnit: parseAmount({ amount: amountPerUnit }),
      comments,
      category,
      currency: currency.replace(/^r$/, "R$"),
      finalAmount: parseAmount({ amount: finalAmount }),
      group,
      timestamp,
      type,
      unitCount: Number(unitCount),
      __meta__: { timepath },
    });
  }

  return expenseAndIncomeOperations;
};
