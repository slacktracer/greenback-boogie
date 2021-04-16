<template>
  <div>
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
</template>

<script>
export default {
  props: ["operation"]
};
</script>
