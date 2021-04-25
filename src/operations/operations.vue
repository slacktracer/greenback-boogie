<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm">
          <h1>Operations</h1>
          <div class="mb-3">
            <router-link class="btn btn-outline-primary" to="/operation/new">
              New Operation
            </router-link>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
              gap: 1rem;
            "
          >
            <div
              :key="operation.id"
              v-for="operation of operations.slice(range.start, range.end)"
            >
              <expense-operation
                v-if="operation.type === 'Expense'"
                :operation="operation"
              ></expense-operation>
              <income-operation
                v-if="operation.type === 'Income'"
                :operation="operation"
              ></income-operation>
              <transfer-operation
                v-if="operation.type === 'Transfer'"
                :operation="operation"
              ></transfer-operation>
            </div>
          </div>
          <nav class="d-flex justify-content-center mt-3">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: noPrevious }">
                <span class="page-link" v-if="noPrevious === true">
                  Previous
                </span>
                <a
                  class="page-link"
                  href="#"
                  v-if="noPrevious === false"
                  @click="previousPage"
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" @click="nextPage">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";

import expenseOperation from "./components/expense-operation.vue";
import incomeOperation from "./components/income-operation.vue";
import transferOperation from "./components/transfer-operation.vue";
import { loadOperations } from "./functions/load-operations";

import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    expenseOperation,
    incomeOperation,
    transferOperation,
  },

  setup: () => {
    const operations = ref([]);
    const route = useRoute();
    const router = useRouter();

    loadOperations({ operations });

    const range = reactive({ start: 0, end: 100 });

    const nextPage = () => {
      const currentPage = Number(route.query.page || 1);

      router.push({ query: { page: currentPage + 1 } });

      let start = (currentPage + 1) * 100 - 100;
      let end = (currentPage + 1) * 100;

      range.start = start;
      range.end = end;
    };

    const noPrevious = computed(() => {
      return route.query.page === undefined || route.query.page === "1";
    });

    const previousPage = () => {
      const currentPage = Number(route.query.page || 1);

      router.push({ query: { page: currentPage - 1 } });

      let start = (currentPage - 1) * 100 - 100;
      let end = (currentPage - 1) * 100;

      range.start = start;
      range.end = end;
    };

    return {
      nextPage,
      noPrevious,
      previousPage,
      operations,
      range,
    };
  },
};
</script>
