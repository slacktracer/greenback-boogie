import { database } from "../../root/database";
import { formatExpensesAndIncomeData } from "./format-expenses-and-income-data";
import { formatTransferData } from "./format-transfer-data";
import { parseCSVFile } from "./parse-csv-file";

export const importBackup = async ({ expensesAndIncomeFile, transferFile }) => {
  const expensesAndIncomeData = await parseCSVFile({
    csvFile: expensesAndIncomeFile,
  });
  const transferData = await parseCSVFile({ csvFile: transferFile });

  const expensesAndIncomeOperations = formatExpensesAndIncomeData({
    expensesAndIncomeData,
  });
  const transferOperations = formatTransferData({ transferData });

  const allOperations = [
    ...expensesAndIncomeOperations,
    ...transferOperations,
  ].sort(
    (operationA, operationB) => operationB.timestamp - operationA.timestamp,
  );

  const operationsAsAnYearMonthDayStructure = allOperations.reduce(
    (reduction, operation) => {
      const [year, month, day] = operation.__meta__.timepath;

      if (reduction[year] === undefined) {
        reduction[year] = {};
      }

      if (reduction[year][month] === undefined) {
        reduction[year][month] = {};
      }

      if (reduction[year][month][day] === undefined) {
        reduction[year][month][day] = [];
      }

      delete operation.__meta__;

      reduction[year][month][day].push(operation);

      return reduction;
    },
    {},
  );

  try {
    await database
      .ref("operations")
      .set(operationsAsAnYearMonthDayStructure);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
