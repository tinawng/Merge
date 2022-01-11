<template>
  <section class="section__container">
    <div class="section__header">
      <span class="h2 text-black">Latest Merges</span>
    </div>
    <div class="section__content">
      <div v-for="merge in latest_merges" :key="merge.id" class="section__content__row">
        <div class="flex items-center gap-2">
          <span class="text-sm">m({{merge.mass}}) #{{merge.id}}</span>
          <merge-icon v-bind="merge" /></div>
        <div class="flex items-center gap-2">
          <merge-icon v-bind="merge.merged_to" />
          <span class="text-sm">m({{merge.merged_to.mass}}) #{{merge.merged_to.id}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    latest_merges: [],
  }),

  async fetch() {
    this.latest_merges = await this.$http.$get("latest_merges");
  },
};
</script>

<style lang="postcss">
.section__container {
  @apply bg-white;
}
.section__content {
  @apply h-full;
  @apply mt-4;
  @apply overflow-y-scroll;
}
.section__content__row {
  @apply mb-2;
  @apply bg-gray bg-opacity-5 rounded-lg;
  @apply flex justify-between items-center;
}
</style>