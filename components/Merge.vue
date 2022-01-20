<template>
  <NuxtLink tag="div" class="merge__container" :to="`/${id}`">
    <merge-svg class="h-full rounded-lg" :tier="tier" :mass="mass" />
    <div class="merge_label" :class="[bg_color, text_color]">
      <span>m({{mass}})</span>
      <span>#{{id}}</span>
    </div>
    <!-- <div class="pt-0.5 px-1 flex justify-between text-xs text-white text-opacity-40">
      <span>m({{mass}})</span>
      <span>#{{id}}</span>
    </div> -->
  </NuxtLink>
</template>

<script>
export default {
  props: {
    id: Number,
    tier: Number,
    mass: Number,
    alpha_mass: { type: Number, default: 12121 },
  },

  computed: {
    bg_color: function () {
      let color = this.tier == 4 ? this.mass == this.alpha_mass ? 'white' : 'red' : this.tier == 2 ? 'black' : this.tier == 3 ? 'blue' : 'black';
      return 'bg-' + color;
    },
    text_color: function () {
      let color = this.mass == this.alpha_mass ? 'black font-medium' : 'white';
      return 'text-' + color;
    },
  },
};
</script>

<style lang="postcss" scoped>
.merge__container {
  @apply cursor-pointer;
}
.merge_label {
  @apply mt-1;
  @apply py-0.5 px-1.5;
  @apply flex justify-between rounded-md;
  @apply text-2xs text-opacity-90;
}
</style>