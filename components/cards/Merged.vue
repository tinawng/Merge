<template>
  <div v-if="merge.merged" class="card__container">
    <div class="card__title">Merged</div>
    <div class="card__content">
      <div v-if="merge.merged_to" class="card__content__row">
        <icon class="card__icon dark bg-white" :stroke="2" variant="minimize" />
        <span class="card__content__value">
          Merged into <NuxtLink tag="a" class="link" :to="`/${merge.merged_to}`">{{merge.merged_to}}</NuxtLink>
        </span>
      </div>
      <div v-if="merge.sale_price" class="card__content__row">
        <icon class="card__icon dark bg-white" :stroke="2" variant="eth" />
        <span class="card__content__value">Sold for {{merge.sale_price}}</span>
        <icon class="-ml-1.5 w-5" variant="eth" />
        <span v-if="merge.mass > 1" class="card__content__label">{{+parseFloat(((merge.sale_price/merge.mass)).toFixed(4))}} per mass</span>
      </div>
      <div v-if="merge.merged_on" class="card__content__row">
        <icon class="card__icon dark bg-white" :stroke="2" variant="clock" />
        <span class="card__content__value">Merged on {{formatDate(merge.merged_on)}}</span>
        <span class="w-full -mt-2.5 ml-10 lg:ml-13 card__content__label">
          Last {{life_span.days}}d {{life_span.hours}}h
        </span>
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
@import '~/assets/css/card.postcss';

.card__content {
  @apply grid grid-cols-1 gap-y-6 lg:gap-y-8;
}
.card__content__row {
  @apply flex-wrap;
}
</style>