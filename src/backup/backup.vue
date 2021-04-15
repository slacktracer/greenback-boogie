<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm">
        <h1>Load backup files</h1>
        <form @submit.prevent="startProcess">
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
            <button class="btn btn-outline-dark" type="submit" :disabled="process.started">
              Start process
            </button>
            <button
              class="btn btn-outline-danger"
              disabled
              type="button"
              @click="removeAllOperations"
            >
              Remove All Operations
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import eai from "./dataToBackup/Report-2021-04-14--19-21-02.csv?raw"
import t from "./dataToBackup/Report-2021-04-14--19-21-19.csv?raw"

import { importBackup } from "./functions/import-backup";
import { clearOperations } from "./functions/clear-operations";

export default {
  setup: () => {
    let expensesAndIncomeFile;
    const process = reactive({ result: undefined, started: false });
    let transferFile;

    //
    expensesAndIncomeFile = eai;
    transferFile = t;
    //

    const removeAllOperations = () => {
      clearOperations();
    };

    const loadExpensesAndIncomeOperations = ({ target: { files } }) => {
      [expensesAndIncomeFile] = files;
    };

    const loadTransferOperations = ({ target: { files } }) => {
      [transferFile] = files;
    };

    const startProcess = async () => {
      if (expensesAndIncomeFile && transferFile) {
        process.started = true;
        process.result = await importBackup({
          expensesAndIncomeFile,
          transferFile,
        });
        process.started = false;
      }
    };

    return {
      removeAllOperations,
      loadExpensesAndIncomeOperations,
      loadTransferOperations,
      process,
      startProcess,
    };
  },
};
</script>
