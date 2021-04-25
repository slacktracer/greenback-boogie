<template>
  <div class="border-dark card shadow-sm" style="height: 100%">
    <i class="bi bi-patch-minus expense-operation-icon"></i>
    <div class="card-body" style="z-index: 1;">
      <h5 class="card-title expense-operation-title">
        {{ operation.category }}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ new Date(operation.timestamp).toLocaleString("pt-BR") }}
      </h6>
      <p class="card-text">{{ operation.group }}</p>
      <p class="card-text">
        {{ operation.currency }} {{ Math.abs(operation.amount) / 100 }}
      </p>
      <p class="card-text" v-if="operation.comments">
        {{ operation.comments }}
      </p>
      <router-link
        class="edit-link"
        :to="`/operation/${operation.id}`"
        @click="storeOperation"
      >
        Edit
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.expense-operation-icon {
  color: #dc3545;
  font-size: 8rem;
  left: 50%;
  opacity: 0.1;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.expense-operation-title {
  color: #dc3545;
}

.edit-link {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>

<script>
export default {
  props: ["operation"],

  setup: (props) => {
    return {
      storeOperation: () => {
        window.localStorage.setItem(props.operation.id, JSON.stringify(props.operation));
      },
    };
  },
};
</script>
