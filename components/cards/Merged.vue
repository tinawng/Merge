<template>
  <div v-if="merge.merged" class="card__container">
    <div class="card__title">Merged</div>
    <div class="card__content">
      <div v-if="merge.merged_to" class="card__content__row">
        <icon class="card__icon dark bg-white" :stroke="2" variant="minimize" />
        <span class="text-xl">
          Merged into <NuxtLink tag="a" class="link" :to="`/${merge.merged_to}`">{{merge.merged_to}}</NuxtLink>
        </span>
      </div>
      <div v-if="merge.merged_on" class="card__content__row">
        <icon class="card__icon dark bg-white" :stroke="2" variant="clock" />
        <span class="text-xl">Merged on {{formatDate(merge.merged_on)}}</span>
        <span class="w-full -mt-0.5 ml-10 lg:ml-13 text-sm text-white text-opacity-40">
          Last {{life_span.days}}d {{life_span.hours}}h
        </span>
      </div>
      <div v-if="merge.sale_price" class="card__content__row -mt-4">
        <icon class="card__icon dark bg-white" :stroke="2" variant="eth" />
        <span class="text-xl">Sold for {{merge.sale_price}}</span>
        <icon class="-ml-1.5 w-5" variant="eth" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data: () => ({
    merge: {},
  }),
  computed: {
    life_span: function () {
      let diff = Date.parse(this.merge.merged_on) - Date.parse("2021-12-2 18:00:00 EST");
      var msec = diff;
      var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
      msec -= dd * 1000 * 60 * 60 * 24;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;

      return { days: dd, hours: hh };
    },
  },

  async fetch() {
    this.merge = await this.$http.$get(`token/${this.id}`);
  },

  methods: {
    formatDate(merged_on) {
      if (!merged_on) return "";
      return new Date(merged_on).toDateString();
    },
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply text-white;
}
.card__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply text-xl text-white text-opacity-40;
}
.card__content {
  @apply pt-6;
}
.card__content__row {
  @apply mb-8;
  @apply flex items-center flex-wrap gap-x-2 lg:gap-x-3;
}
.card__icon {
  @apply w-8 lg:w-10;
  @apply p-1.5 lg:p-2;
  @apply border border-white border-opacity-10 rounded-full;
}
.card__icon.dark {
  @apply text-black;
}
</style>