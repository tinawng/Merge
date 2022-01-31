<template>
  <section class="section__container">
    <div class="section__header">
      <span class="section__header_title">Latest Merges</span>
    </div>
    <div class="section__content">
      <div v-for="merge in latest_merges" :key="merge.id" class="section__content__row">
        <NuxtLink tag="a" :to="`/${merge.id}`" class="section__content_token">
          <span>m({{merge.mass}}) <br class="md:hidden"> #{{merge.id}}</span>
          <merge-icon v-bind="merge" />
        </NuxtLink>
        <div v-if="merge.sale_price">
          <p class="flex justify-center gap-1">{{+parseFloat(((merge.sale_price)).toFixed(2))}} <icon class="w-4" variant="eth" /></p>
          <p v-if="merge.mass > 1" class="-mt-0.5 text-2xs">
            {{+parseFloat(((merge.sale_price/merge.mass)).toFixed(4))}} / m
          </p>
        </div>
        <div class="text-2xs md:text-xs">
          {{formatDate(merge.merged_on)}}
        </div>
        <NuxtLink tag="a" :to="`/${merge.merged_to.id}`" class="section__content_token">
          <merge-icon v-bind="merge.merged_to" />
          <span class="text-right">m({{merge.merged_to.mass}}) <br class="md:hidden"> #{{merge.merged_to.id}}</span>
        </NuxtLink>
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
      return (
        date.toDateString().split(" ").slice(1, 3).join(" ") +
        ` ${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.section__container {
  @apply bg-white;
  @apply md:pb-14;
}
.section__header_title {
  @apply text-2xl md:text-xl font-medium leading-tight;
}
.section__content {
  @apply h-96 md:h-full;
  @apply mt-4 pr-4;
  @apply overflow-y-scroll;
}
.section__content__row {
  @apply h-12;
  @apply mb-4 py-2 px-2 md:px-6;
  @apply bg-gray bg-opacity-5 rounded-lg;
  @apply flex justify-between items-center;
  @apply text-xs md:text-base
}
.section__content_token {
  @apply flex items-center gap-3 md:gap-2;
  @apply cursor-pointer;
  @apply transition-colors;
}
.section__content_token:hover {
  @apply bg-black bg-opacity-10 rounded-full;
}

::-webkit-scrollbar {
  @apply w-1 md:w-2.5;
}
::-webkit-scrollbar-track {
  @apply bg-gray bg-opacity-5 rounded-xl;
}
::-webkit-scrollbar-thumb {
  @apply bg-black bg-opacity-50 hover:bg-opacity-100 rounded-xl;
}

</style>