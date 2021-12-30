<template>
  <div class="merge__container">
    <merge-svg
      class="h-full rounded-lg"
      :class="[tier==3 ? 'border border-black border-opacity-20' : '']"
      :tier="tier"
      :mass="mass"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data: () => ({
    tier: undefined,
    mass: undefined,
  }),

  async fetch() {
    let merge = await this.$http.$get(`token/${this.id}`);
    this.tier = merge.tier;
    this.mass = merge.mass;
  }
};
</script>

<style lang="postcss" scoped>
.merge__container {
  @apply transition-all;
}
</style>