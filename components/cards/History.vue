<template>
  <div class="card__container">
    <div class="card__title">Stats History</div>
    <div class="card__content">
      <div class="card__content__row">
        <icon class="card__icon dark bg-white" variant="arrow-up" :stroke="2" />
        <span class="text-xl">{{max}}</span>
        <span class="text-sm text-white text-opacity-40">eth</span>
      </div>
      <div class="card__content__row">
        <icon class="card__icon dark bg-white" variant="arrow-down" :stroke="2" />
        <span class="text-xl">{{min}}</span>
        <span class="text-sm text-white text-opacity-40">eth</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Array },
  data: () => ({
    // max: 0.24,
    // min: 0.18,
  }),
  computed: {
    max: function () {
      return this.data.reduce((prev, curr) => (prev > curr ? prev : curr), 0);
    },
    min: function () {
      return this.data.reduce((prev, curr) => (prev < curr ? prev : curr), 0);
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
  @apply pt-8;
  @apply grid grid-cols-2 gap-y-6;
}
.card__content__row {
  @apply w-fit;
  @apply flex items-center gap-2;
}
.card__content__row:hover {
  @apply bg-white bg-opacity-5;
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