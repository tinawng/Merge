<template>
  <div class="histogram__container">
    <div v-for="(chunk, i) in chunks" :key="i" :class="`bg-${chunk.color}`" :style="`height: max(2px, ${chunk.value}%)`"></div>
    <div class="flex-grow bg-gray"></div>
  </div>
</template>

<script>
export default {
  props: { chunks: Array }
};
</script>

<style lang="postcss" scoped>
.histogram__container {
  @apply h-full w-4;
  min-width: 2px;
  @apply flex flex-col gap-1;
}
</style>