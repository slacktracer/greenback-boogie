import {database} from "../../root/database";
import {initialAmountsByAccount} from "../data/initial-amounts-by-account";
import {getFinalBalanceByAccount} from "./get-final-balance-by-account";
import {getOperationsBalanceByAccount} from "./get-operations-balance-by-account";
import {getTransfersBalanceByAccount} from "./get-transfers-balance-by-account";

export const loadAccounts = ({ accounts }) => {
  const operationsRef = database.ref("operations");

  operationsRef.on("value", (snapshot) => {
    const data = snapshot.val();

    const operations = [];

    Object.keys(data).forEach((year) => {
      Object.keys(data[year]).forEach((month) => {
        operations.push(...[Object.values(data[year][month])].flat());
      });
    });

    operations.sort(
      (operationA, operationB) => operationB.timestamp - operationA.timestamp,
    );

    const { operationsBalanceByAccount } = getOperationsBalanceByAccount({
      operations: operations,
    });

    const { transfersBalanceByAccount } = getTransfersBalanceByAccount({
      transfers: operations,
    });

    const { finalBalance, finalBalanceByAccount} =  getFinalBalanceByAccount({
      initialAmountsByAccount,
      operationsBalanceByAccount,
      transfersBalanceByAccount,
    });

    accounts.value = { finalBalance, finalBalanceByAccount};
  });
}
