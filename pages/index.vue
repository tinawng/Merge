<template>
  <section class="overview">
    <div class="overview__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input />
      </div>
      <div></div>
      <div class="text-right">
      </div>
    </div>
    <div class="overview__content">
      <cards-stats />
      <cards-tiers />
      <cards-graphs-mass-repartition />
    </div>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
section.overview {
  @apply col-span-3;
  @apply bg-black;
}
.overview__header {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
.overview__content {
  @apply mt-8;
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
</style>