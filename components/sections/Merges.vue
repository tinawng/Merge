<template>
  <section class="section__container">
    <div class="section__header">
      <span class="h2 text-black">Latest Merges</span>
    </div>
    <div class="section__content">
      <div v-for="merge in latest_merges" :key="merge.id" class="section__content__row">
        <div class="flex items-center gap-2">
          <span class="">m({{merge.mass}}) #{{merge.id}}</span>
          <merge-icon v-bind="merge" />
        </div>
        <div v-if="merge.sale_price">
          <p class="flex gap-1">{{merge.sale_price}} <icon class="w-4" variant="eth"/></p>
          <p v-if="merge.mass > 1" class="text-2xs">{{+parseFloat(((merge.sale_price/merge.mass)).toFixed(4))}} / m</p>
        </div>
        <div class="text-2xl">
          {{formatDate(merge.merged_on)}}
        </div>
        <div class="flex items-center gap-2">
          <merge-icon v-bind="merge.merged_to" />
          <span class="">m({{merge.merged_to.mass}}) #{{merge.merged_to.id}}</span>
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

  methods: {
    formatDate(merged_on) {
      let date = new Date(merged_on);
      return date.toDateString().split(" ").slice(1, 3).join(" ") + ` ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;
    },
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
  @apply h-12;
  @apply mb-4 py-2 px-6;
  @apply bg-gray bg-opacity-5 rounded-lg;
  @apply flex justify-between items-center;
}
</style>