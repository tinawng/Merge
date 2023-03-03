<template>
  <section class="overview">
    <nav-bar tip/>
    <div class="overview__content">
      <card-stats />
      <card-matters />
      <card-graph-mass-repartition />
    </div>
  </section>
</template>

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