<template>
  <section class="section__container">
    <div class="section__header">
      <span class="h2 text-black">Latest Merges</span>
    </div>
    <div class="section__content">
      <div v-for="merge in latest_merges" :key="merge.id" class="section__content__row">
        <span>{{merge.id}}</span>
        <span>{{merge.merged_to}}</span>
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
  @apply overflow-y-scroll;
}
.section__content__row {
  @apply flex justify-between;
}
</style>