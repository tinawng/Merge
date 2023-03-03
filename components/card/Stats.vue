<script setup>
const snapshot = await useAPI("/latest_snapshot")
const alpha_token = await useAPI("/token/1")
const token_left = await useAPI("/28xxx")
</script>

<template>
  <div class="card__container">
    <div class="card__title">Stats</div>
    <div class="card__content">
      <p class="card__content__row">
        <icon class="card__icon" variant="circle" />
        <span class="card__content__value">{{snapshot?.token_count}}</span>
        <span class="card__content__label">tokens</span>
      </p>
      <p class="card__content__row">
        <icon class="card__icon bg-red" variant="minimize" :stroke="2" />
        <span class="card__content__value">{{snapshot?.merged_count}}</span>
        <span class="card__content__label">merged</span>
      </p>
      <p class="card__content__row">
        <icon class="card__icon dark bg-white" variant="award" :stroke="2" />
        <span class="card__content__value">{{alpha_token?.mass}}</span>
        <span class="card__content__label">alpha mass</span>
      </p>
      <p class="card__content__row">
        <icon class="card__icon" variant="globe" />
        <span class="card__content__value">{{snapshot?.total_mass}}</span>
        <span class="card__content__label">global mass</span>
      </p>
      <p class="card__content__row">
        <icon class="card__icon bg-blue" variant="eth" />
        <span class="card__content__value">{{+(snapshot?.os_price_floor?.toFixed(4))}}</span>
        <span class="card__content__label">eth floor</span>
      </p>
      <p class="card__content__row">
        <icon class="card__icon dark bg-yellow" variant="hash" :stroke="2" />
        <span class="card__content__value">{{token_left}}</span>
        <span class="card__content__label">#id > 28000</span>
      </p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card__content {
  @apply grid grid-cols-2 gap-y-6 lg:gap-y-8;
}
.card__content__row {
  @apply w-fit;
}
</style>