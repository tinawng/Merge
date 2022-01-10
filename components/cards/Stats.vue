<template>
  <div class="card__container">
    <div class="card__title">Stats</div>
    <div class="card__content">
      <div class="card__content__row">
        <icon class="card__icon" variant="circle" />
        <span class="text-xl">{{token_count}}</span>
        <span class="text-sm text-white text-opacity-40">tokens</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon bg-red" variant="minimize" :stroke="2" />
        <span class="text-xl">{{merged_count}}</span>
        <span class="text-sm text-white text-opacity-40">merged</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon dark bg-white" variant="award" :stroke="2" />
        <span class="text-xl">{{alpha_mass}}</span>
        <span class="text-sm text-white text-opacity-40">alpha mass</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon" variant="globe" />
        <span class="text-xl">{{total_mass}}</span>
        <span class="text-sm text-white text-opacity-40">global mass</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon bg-blue" variant="eth" />
        <span class="text-xl">{{price_floor}}</span>
        <span class="text-sm text-white text-opacity-40">eth floor</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon dark bg-yellow" variant="user" :stroke="2" />
        <span class="text-xl">{{owner_count}}</span>
        <span class="text-sm text-white text-opacity-40">owners</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    alpha_mass: 12121,
    total_mass: 312729,
    owner_count: 7201,
    merged_count: 312729,
    price_floor: 312729,
    token_count: 312729,
  }),
  
  async fetch() {
    let { total_mass, owner_count, merged_count, os_price_floor, token_count } = await this.$http.$get("latest_snapshot");
    this.total_mass = total_mass;
    this.owner_count = owner_count;
    this.merged_count = merged_count;
    this.price_floor = os_price_floor;
    this.token_count = token_count;
    let { mass } = await this.$http.$get("token/1");
    this.alpha_mass = mass;
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
  @apply pt-8;
  @apply grid grid-cols-2 gap-y-6;
}
.card__content__row {
  @apply flex items-center gap-2;
}
.card__icon {
  @apply w-8;
  @apply p-1.5;
  @apply border border-white border-opacity-10 rounded-full;
}
.card__icon.dark {
  @apply text-black;
}
</style>