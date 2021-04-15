import { database } from "../../root/database";

export const loadOperations = ({ operations }) => {
  const operationsRef = database.ref("operations");

  operationsRef.on("value", (snapshot) => {
    const data = snapshot.val();

    const operationsByMonth = [];

    Object.keys(data).forEach((year) => {
      Object.keys(data[year]).forEach((month) => {
        operationsByMonth.push(...[Object.values(data[year][month])].flat());
      });
    });

    operationsByMonth.sort(
      (operationA, operationB) => operationB.timestamp - operationA.timestamp,
    );

    operations.value = operationsByMonth;
  });
};
