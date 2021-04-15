import { getTime, parse } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

import {fixName} from "../helpers/fix-names";
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
      amount,
      comments,
    ] = operation;

    const [date, time] = datetime.split(" ");

    const datepath = date.split(".").reverse();

    const timestamp = getTime(parse(datetime, "dd.MM.yy HH:mm", new Date()));

    expenseAndIncomeOperations.push({
      account,
      amount: parseAmount({ amount }),
      amountPerUnit: parseAmount({ amount: amountPerUnit }),
      comments,
      category: fixName({ name: category, type: "category" }),
      currency: currency.replace(/^r$/, "R$"),
      group: fixName({ name: group, type: "group" }),
      id: uuidv4(),
      timestamp,
      type,
      unitCount: Number(unitCount),
      __meta__: { datepath, time },
    });
  }

  return expenseAndIncomeOperations;
};
