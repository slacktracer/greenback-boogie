import { getTime, parse } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

import { parseAmount } from "./parse-amount";

export const formatTransferData = ({ transferData }) => {
  const transferOperations = [];

  for (const operation of transferData) {
    const [
      datetime,
      type,
      fromAccount,
      toAccount,
      currency,
      ,
      amount,
      ,
      rate,
      comments,
    ] = operation;

    const [date, time] = datetime.split(" ");

    const datepath = date.split(".").reverse();

    const timestamp = getTime(parse(datetime, "dd.MM.yy HH:mm", new Date()));

    transferOperations.push({
      amount: parseAmount({ amount }),
      comments,
      currency: currency.replace(/^r$/, "R$"),
      fromAccount,
      id: uuidv4(),
      rate,
      timestamp,
      toAccount,
      type,
      __meta__: { datepath, time },
    });
  }

  return transferOperations;
};
