<template>
  <div class="card__container card_tooltip">
    <div class="card__title">Tiers</div>
    <div class="card__content">
      <div class="flex-grow flex flex-col gap-y-6 lg:gap-y-8">
        <NuxtLink tag="a" to="/history/tiers_count" class="card__content__row">
          <icon class="card__icon text-red" variant="circle" />
          <span class="card__content__value">{{tiers_count[3]}}</span>
          <span class="card__content__label">tier 4 tokens</span>
        </NuxtLink>
        <NuxtLink tag="a" to="/history/tiers_count" class="card__content__row">
          <icon class="card__icon text-yellow" variant="circle" />
          <span class="card__content__value">{{tiers_count[1]}}</span>
          <span class="card__content__label">tier 2 tokens</span>
        </NuxtLink>
        <NuxtLink tag="a" to="/history/tiers_count" class="card__content__row">
          <icon class="card__icon text-blue" variant="circle" />
          <span class="card__content__value">{{tiers_count[2]}}</span>
          <span class="card__content__label"> tier 3 tokens</span>
        </NuxtLink>
      </div>
      <div class="flex flex-col justify-end card__content__label text-right">
        <p>mass</p>
        <p>distribution</p>
      </div>
      <histogram :chunks="mass_repartition"></histogram>
      <div class="flex flex-col gap-2">
        <div class="card__content__row">
          <icon class="w-2 text-red" variant="square" />
          <span class="text-sm">{{Math.round(mass_repartition[0].value)}}%</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> tier 4</span>
        </div>
        <div class="card__content__row">
          <icon class="w-2 text-yellow" variant="square" />
          <span class="text-sm">{{Math.round(mass_repartition[1].value)}}%</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> tier 2</span>
        </div>
        <div class="card__content__row">
          <icon class="w-2 text-blue" variant="square" />
          <span class="text-sm">{{(mass_repartition[2].value || 0).toFixed(1)}}%</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> tier 3</span>
        </div>
        <div class="card__content__row mt-auto">
          <icon class="w-2 text-gray" variant="square" />
          <span class="text-sm">
            {{100-Math.round(mass_repartition[0].value + mass_repartition[1].value + mass_repartition[2].value)}}%
          </span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> tier 1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    mass_repartition: [{}, {}, {}],
    tiers_count: [27858, 92, 42, 5],
  }),

  async fetch() {
    let { tiers_count, total_mass } = await this.$http.$get("latest_snapshot");
    this.tiers_count = tiers_count;
    let blues = await this.$http.$get("blue_merges");
    let blue_mass = blues.reduce((p, c) => p + c.mass, 0);
    let yellows = await this.$http.$get("yellow_merges");
    let yellow_mass = yellows.reduce((p, c) => p + c.mass, 0);
    let reds = await this.$http.$get("red_merges");
    let red_mass = reds.reduce((p, c) => p + c.mass, 0);

    this.mass_repartition = [
      { value: (red_mass / total_mass) * 100, color: "red" },
      { value: (yellow_mass / total_mass) * 100, color: "yellow" },
      { value: (blue_mass / total_mass) * 100, color: "blue" },
    ];
  },
};
</script>

<style lang="postcss" scoped>

.card__content {
  @apply h-4/5;
  @apply flex gap-6;
}
.card__content__row {
  @apply w-fit;
}
</style>