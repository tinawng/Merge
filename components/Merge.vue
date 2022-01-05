<template>
  <div class="merge__container">
    <merge-svg
      class="h-full rounded-lg"
      :tier="tier"
      :mass="mass"
    />
  </div>
</template>

<script>
export default {
  props: {
    tier: Number,
    mass: Number,
  },
};
</script>

<style lang="postcss" scoped>
.merge__container {
  @apply transition-all;
}
</style>