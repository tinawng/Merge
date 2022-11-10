<template>
  <div class="card__container">
    <div class="card__title">Matter*</div>
    <div class="card__content">
      <div class="flex-grow flex flex-col gap-y-6 lg:gap-y-8">
        <p class="card__content__row">
          <icon class="card__icon text-white" variant="circle" />
          <span class="card__content__value">{{total_matter_tokens}}</span>
          <span class="card__content__label">total Matter* tokens</span>
        </p>
        <p class="card__content__row">
          <icon class="card__icon text-white" variant="circle-hollow" />
          <span class="card__content__value">{{unidentified_count}}</span>
          <span class="card__content__label">unidentified Matter</span>
        </p>
        <p class="card__content__row">
          <icon class="card__icon text-white" variant="circle-slashed" />
          <span class="card__content__value">{{antimatter_count}}</span>
          <span class="card__content__label">Antimatter</span>
        </p>
      </div>
      <div class="flex flex-col justify-end card__content__label text-right">
        <p>mass</p>
        <p>distribution</p>
      </div>
      <histogram :chunks="histogram_data"></histogram>
      <div class="flex flex-col gap-2">
        <div class="card__content__row">
          <icon class="w-2 text-white" variant="square" />
          <span class="text-sm">{{Math.round(mass_repartition.positive)}}</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> positive</span>
        </div>
        <div class="card__content__row mt-auto">
          <icon class="w-2 text-gray-light" variant="square" />
          <span class="text-sm">{{Math.round(mass_repartition.unidentified)}}</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> unidentified</span>
        </div>
        <div class="card__content__row">
          <icon class="w-2 text-gray-dark" variant="square" />
          <span class="text-sm">{{Math.round(mass_repartition.negative)}}</span>
          <span class="hidden md:block text-xs text-white text-opacity-40"> negative</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    total_matter_tokens: 1395,
    unidentified_count: 256,
    antimatter_count: 90,
    mass_repartition: { positive: 306149, unidentified: 96799, negative: -8849 },
  }),
  computed: {
    histogram_data: function () {
      let total_mass =
        this.mass_repartition.positive + this.mass_repartition.unidentified - this.mass_repartition.negative

      let cac = [
        { value: (this.mass_repartition.positive / total_mass) * 100, color: "white" },
        { value: (this.mass_repartition.unidentified / total_mass) * 100, color: "gray-light" },
        { value: (this.mass_repartition.negative / total_mass) * -100, color: "gray-dark" },
      ]
      console.log(cac)
      return cac
    },
  },

  async fetch() {
    this.unidentified_count = await this.$http.$get("matter/unidentified_count")
    this.antimatter_count = await this.$http.$get("matter/antimatter_count")
    this.mass_repartition = await this.$http.$get("matter/masses")
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
</style>