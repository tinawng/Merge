<template>
  <NuxtLink tag="div" class="merge__container" :to="`/${id}`">
    <merge-svg class="h-full rounded-lg" :tier="tier" :mass="mass" />
    <div class="ii" :class="bg_color">
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
  },

  computed: {
    bg_color: function () {
      let color = this.tier == 4 ? 'red' : this.tier == 2 ? 'black' : this.tier == 3 ? 'blue' : 'black';
      return 'bg-' + color;
    },
  },
};
</script>

<style lang="postcss" scoped>
.merge__container {
  @apply cursor-pointer;
}
.ii {
  @apply mt-1;
  @apply py-0.5 px-1.5;
  @apply flex justify-between rounded-md;
  @apply text-2xs text-white text-opacity-90;
}
</style>