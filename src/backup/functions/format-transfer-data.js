import { getTime, parse } from "date-fns";

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

    const timepath = datetime.split(" ")[0].split(".").reverse();
    const timestamp = getTime(parse(datetime, "dd.MM.yy HH:mm", new Date()));

    transferOperations.push({
      amount,
      comments,
      currency: currency.replace(/^r$/, "R$"),
      fromAccount,
      rate,
      timestamp,
      toAccount,
      type,
      __meta__: { timepath },
    });
  }

  return transferOperations;
};
