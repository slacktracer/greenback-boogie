<template>
  <div class="border-dark card shadow-sm" style="height: 100%">
    <div class="card-body">
      <i class="bi bi-patch-plus income-operation-icon"></i>
      <h5 class="card-title income-operation-title">{{ operation.category }}</h5>
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
.income-operation-icon {
  color: #198754;
  font-size: 8rem;
  left: 50%;
  opacity: 0.1;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.income-operation-title {
  color: #198754;
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
