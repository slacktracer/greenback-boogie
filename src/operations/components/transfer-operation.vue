<template>
  <div class="border-dark card shadow-sm" style="height: 100%">
    <div class="card-body">
      <i class="bi bi-patch-exclamation transfer-operation-icon"></i>
      <h5 class="card-title">
        {{ operation.fromAccount }} &rsaquo; {{ operation.toAccount }}
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
    </div>
    <div class="card-footer">
      <button class="btn btn-outline-dark">Edit</button>
    </div>
  </div>
</template>

<style scoped>
.transfer-operation-icon {
  color: #ffc107;
  font-size: 8rem;
  left: 50%;
  opacity: 0.1;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
export default {
  props: ["operation"],
};
</script>
