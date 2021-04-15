export const getFinalBalanceByAccount = ({
  initialAmountsByAccount,
  operationsBalanceByAccount,
  transfersBalanceByAccount,
}) => {
  const a = Object.keys(initialAmountsByAccount);
  const b = Object.keys(operationsBalanceByAccount);
  const c = Object.keys(transfersBalanceByAccount);

  const allAccountsNames = Array.from(new Set([...a, ...b, ...c]));

  const finalBalanceByAccount = allAccountsNames.reduce(
    (reduction, accountName) => {
      if (reduction[accountName] === undefined) {
        reduction[accountName] = 0;
      }

      reduction[accountName] +=
        (initialAmountsByAccount[accountName] || 0) +
        (operationsBalanceByAccount[accountName] || 0) +
        (transfersBalanceByAccount[accountName] || 0);

      return reduction;
    },
    {},
  );

  const finalBalance = Object.values(finalBalanceByAccount).reduce(
    (reduction, accountBalance) => {
      return reduction + accountBalance;
    },
    0,
  );

  return { finalBalance, finalBalanceByAccount};
};
