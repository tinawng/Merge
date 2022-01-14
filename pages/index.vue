<template>
  <section class="overview">
    <div class="overview__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input />
      </div>
      <div class="text-xs text-white text-opacity-30">
        <p>updated every 6h</p>
        <p>want more? donate <a class="link" href="">here</a></p>
      </div>
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