<template>
  <section class="overview">
    <nav-bar tip/>
    <div class="overview__content">
      <cards-stats />
      <cards-Matter />
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
.overview__content {
  @apply mt-0 md:mt-8;
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
</style>