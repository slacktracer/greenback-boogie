<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm">
        <h1>Load backup files</h1>
        <form @submit="startProcess">
          <div class="mb-3">
            <label class="form-label" for="expenses-and-income">
              Expenses and Income Operations
            </label>
            <input
              class="form-control"
              id="expenses-and-income"
              type="file"
              @change="loadExpensesAndIncomeOperations"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="transfer">
              Transfer Operations
            </label>
            <input
              class="form-control"
              id="transfer"
              type="file"
              @change="loadTransferOperations"
            />
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-dark" type="submit">
              Start process
            </button>
            <button class="btn btn-outline-danger" disabled type="button" @click="removeAllOperations">
              Remove All Operations
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { importBackup } from "./functions/import-backup";
import {clearOperations} from "./functions/clear-operations";

export default {
  setup: () => {
    let expensesAndIncomeFile;
    let transferFile;

    const removeAllOperations = () => {
      clearOperations();
    }

    const loadExpensesAndIncomeOperations = ({ target: { files } }) => {
      [expensesAndIncomeFile] = files;
    };

    const loadTransferOperations = ({ target: { files } }) => {
      [transferFile] = files;
    };

    const startProcess = async (event) => {
      event.preventDefault();

      if (expensesAndIncomeFile && transferFile) {
        await importBackup({ expensesAndIncomeFile, transferFile });
      }
    };

    return {
      removeAllOperations,
      loadExpensesAndIncomeOperations,
      loadTransferOperations,
      startProcess,
    };
  },
};
</script>
