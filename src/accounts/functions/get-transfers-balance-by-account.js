export const getTransfersBalanceByAccount = ({ transfers }) => {
  const transfersBalanceByAccount = transfers.reduce((reduction, transfer) => {
    if (transfer.type !== "Transfer") {
      return reduction;
    }

    const { fromAccount, amount, toAccount } = transfer;

    if (reduction[fromAccount] === undefined) {
      reduction[fromAccount] = 0;
    }

    if (reduction[toAccount] === undefined) {
      reduction[toAccount] = 0;
    }

    reduction[fromAccount] -= amount;
    reduction[toAccount] += amount;

    return reduction;
  }, {});

  return { transfersBalanceByAccount };
};
