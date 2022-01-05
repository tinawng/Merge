<template>
  <section class="section__container">
    <div class="section__header">
      <span class="h2" :class="{'opacity-20': index != 'mass'}" @click="index = 'mass'">Global leaderboard</span>
      <div class="vr mx-6" />
      <span class="h2" :class="{'opacity-20': index != 'blue'}" @click="index = 'blue'">Blue leaderboard</span>
      <button-icon class="w-6 ml-auto" icon="arrow-left" disabled />
      <div class="vr mx-4" />
      <button-icon class="w-6" icon="arrow-right" />
    </div>

    <div class="section__content">
      <merge v-for="token in top_100[index]" :key="token.id" class="w-24" v-bind="token" />
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    top_100: {
        mass: [],
        blue: []
    },
    index: "mass",
  }),
  async fetch() {
    top_100.mass = await this.$http.$get(`mass_top/100`);
    top_100.blue = await this.$http.$get(`blue_merges`);
  },
};
</script>

<style lang="postcss" scoped>
.section__container {
  @apply col-span-2;
  @apply pb-14; /* scrollbar padding */
  @apply bg-blue;
}
.section__header {
  @apply flex items-center;
  @apply text-white text-opacity-80;
}
.section__content {
  @apply h-full;
  @apply mt-4;
  @apply flex items-center flex-wrap gap-6;
  @apply overflow-y-scroll;
}
</style>