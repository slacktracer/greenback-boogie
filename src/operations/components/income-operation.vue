<template>
  <div>
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
</template>

<script>
export default {
  props: ["operation"]
};
</script>
