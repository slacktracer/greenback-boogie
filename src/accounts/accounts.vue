<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm">
        <h1>Accounts</h1>
        <pre>{{ accounts }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { loadAccounts } from "./functions/load-accounts";

export default {
  setup: () => {
    const accounts = ref([]);

    loadAccounts({ accounts });

    return {
      accounts,
    };
  },
};
</script>
