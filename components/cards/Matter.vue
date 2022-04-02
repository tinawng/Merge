<template>
  <div class="card__container">
    <div class="card__title">Matter*</div>
    <div class="card__content">
      <div class="flex-grow flex flex-col gap-y-6 lg:gap-y-8">
        <div class="card__content__row">
          <span class="card__content__value">/750</span>
          <NuxtLink tag="a" to="/drops/matter/750" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
        <div class="card__content__row">
          <span class="card__content__value">/150</span>
          <NuxtLink tag="a" to="/drops/matter/150" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
        <div class="card__content__row">
          <span class="card__content__value">/12</span>
          <NuxtLink tag="a" to="/drops/matter/12" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
      </div>
      <div class="flex-grow flex flex-col gap-y-6 lg:gap-y-8">
        <div class="card__content__row">
          <span class="card__content__value">/450</span>
          <NuxtLink tag="a" to="/drops/matter/450" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
        <div class="card__content__row">
          <span class="card__content__value">/36</span>
          <NuxtLink tag="a" to="/drops/matter/36" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
        <div class="card__content__row">
          <span class="card__content__value">/6</span>
          <NuxtLink tag="a" to="/drops/matter/6" class="card__content__label link">see fitting tokens</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({ token_left: 880 }),
  async fetch() {
    this.token_left = await this.$http.$get("drops/matter/28xxx")
  },
}
</script>

<style lang="postcss" scoped>
.card__content {
  @apply h-4/5;
  @apply flex gap-6;
}
.card__content__row {
  @apply w-fit;
}
.card__content__label {
  @apply transition-colors;
  transition-duration: 100ms;
}
.card__content__label:hover {
  @apply text-opacity-70;
}
</style>