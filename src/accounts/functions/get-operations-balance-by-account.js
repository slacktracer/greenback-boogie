export const getOperationsBalanceByAccount = ({ operations }) => {
  const operationsBalanceByAccount = operations.reduce(
    (reduction, operation) => {
      if (operation.type === "Transfer") {
        return reduction;
      }

      const { amount, account } = operation;

      if (reduction[account] === undefined) {
        reduction[account] = 0;
      }

      reduction[account] += amount;

      return reduction;
    },
    {},
  );

  return { operationsBalanceByAccount };
};
