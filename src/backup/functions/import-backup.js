import { database } from "../../root/database";
import { formatExpensesAndIncomeData } from "./format-expenses-and-income-data";
import { formatTransferData } from "./format-transfer-data";
import { getGroupsAndCategories } from "./get-groups-and categories";
import { parseCSVFile } from "./parse-csv-file";

export const importBackup = async ({ expensesAndIncomeFile, transferFile }) => {
  const expensesAndIncomeData = await parseCSVFile({
    csvFile: expensesAndIncomeFile,
  });
  const transferData = await parseCSVFile({ csvFile: transferFile });

  const groupsAndCategories = getGroupsAndCategories({ expensesAndIncomeData });

  const expensesAndIncomeOperations = formatExpensesAndIncomeData({
    expensesAndIncomeData,
  });
  const transferOperations = formatTransferData({ transferData });

  const allOperations = [
    ...expensesAndIncomeOperations,
    ...transferOperations,
  ].sort(
    (operationA, operationB) => operationA.timestamp - operationB.timestamp,
  );

  const operationsAsAnYearMonthDayStructure = allOperations.reduce(
    (reduction, operation) => {
      const [year, month] = operation.__meta__.datepath;

      if (reduction[year] === undefined) {
        reduction[year] = {};
      }

      if (reduction[year][month] === undefined) {
        reduction[year][month] = {};
      }

      reduction[year][month][operation.id] = operation;

      return reduction;
    },
    {},
  );

  try {
    await database.ref("groupsAndCategories").set(groupsAndCategories);
    await database.ref("operations").set(operationsAsAnYearMonthDayStructure);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
