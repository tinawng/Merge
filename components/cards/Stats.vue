<template>
  <div class="card__container card_tooltip">
    <div class="card__title">Stats</div>
    <div class="card__content">
      <NuxtLink tag="a" to="/history?param=token_count" class="card__content__row">
        <icon class="card__icon" variant="circle" />
        <span class="card__content__value">{{token_count}}</span>
        <span class="card__content__label">tokens</span>
      </NuxtLink>
      <NuxtLink tag="a" to="/history?param=merged_count" class="card__content__row">
        <icon class="card__icon bg-red" variant="minimize" :stroke="2" />
        <span class="card__content__value">{{merged_count}}</span>
        <span class="card__content__label">merged</span>
      </NuxtLink>
      <NuxtLink tag="a" to="/1" class="card__content__row">
        <icon class="card__icon dark bg-white" variant="award" :stroke="2" />
        <span class="card__content__value">{{alpha_mass}}</span>
        <span class="card__content__label">alpha mass</span>
      </NuxtLink>
      <p class="card__content__row">
        <icon class="card__icon" variant="globe" />
        <span class="card__content__value">{{total_mass}}</span>
        <span class="card__content__label">global mass</span>
      </p>
      <NuxtLink tag="a" to="/history?param=os_price_floor" class="card__content__row">
        <icon class="card__icon bg-blue" variant="eth" />
        <span class="card__content__value">{{+(price_floor.toFixed(4))}}</span>
        <span class="card__content__label">eth floor</span>
      </NuxtLink>
      <p class="card__content__row">
        <icon class="card__icon dark bg-yellow" variant="hash" :stroke="2" />
        <span class="card__content__value">{{token_left}}</span>
        <span class="card__content__label">#id > 28000</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    alpha_mass: 12121,
    total_mass: 312729,
    merged_count: 312729,
    price_floor: 312729,
    token_count: 312729,
    token_left: 880,
  }),

  async fetch() {
    let { total_mass, merged_count, os_price_floor, token_count } = await this.$http.$get(
      "latest_snapshot"
    )
    this.total_mass = total_mass
    this.merged_count = merged_count
    this.price_floor = os_price_floor
    this.token_count = token_count
    let { mass } = await this.$http.$get("token/1")
    this.alpha_mass = mass

    this.token_left = await this.$http.$get("28xxx")
  },
}
</script>

<style lang="postcss" scoped>
.card__content {
  @apply grid grid-cols-2 gap-y-6 lg:gap-y-8;
}
.card__content__row {
  @apply w-fit;
}
</style>