<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm">
          <h1>Operations</h1>
          <div class="list-group">
            <div
              class="list-group-item"
              v-for="operation of operations"
              :key="operation.timestamp"
            >
              <div
                v-if="operation.type === 'Expense' || operation.type === 'Income'"
              >
                <small class="text-muted">{{
                    new Date(operation.timestamp).toLocaleString("pt-BR")
                  }}</small>
                <div>
                  {{ operation.type }} &rsaquo; {{ operation.group }} &raquo;
                  {{ operation.category }}
                </div>
                <div>
                  {{ operation.currency }} {{ Math.abs(operation.amount) / 100 }}
                  <small class="text-muted"
                  >({{ operation.currency }}
                    {{ Math.abs(operation.amountPerUnit) / 100 }} &times;
                    {{ operation.unitCount }})</small
                  >
                </div>
                <div>{{ operation.comments }}</div>
              </div>
              <div v-if="operation.type === 'Transfer'">
                <small class="text-muted">{{
                    new Date(operation.timestamp).toLocaleString("pt-BR")
                  }}</small>
                <div>
                  {{ operation.type }} &rsaquo; {{ operation.fromAccount }} &raquo;
                  {{ operation.toAccount }}
                </div>
                <div>
                  {{ operation.currency }} {{ Math.abs(operation.amount) / 100 }}
                </div>
                <div>{{ operation.comments }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { loadOperations } from "./functions/load-operations";

export default {
  setup: () => {
    const operations = ref([]);

    loadOperations({ operations });

    return {
      operations,
    };
  },
};
</script>
