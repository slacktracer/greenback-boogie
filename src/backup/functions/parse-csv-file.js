import Papa from "papaparse";

export const parseCSVFile = ({ csvFile }) => new Promise(resolve => {
  Papa.parse(csvFile, {
    complete: function ({ data, errors }) {
      const rows = data.slice(1, data.length - 1);

      if (errors.length) {
        console.error(errors);
      }

      resolve(rows);
    },
  });
});
