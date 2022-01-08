<template>
  <section class="section__container">
    <div class="section__header">
      <span class="h2 pr-4" :class="{'opacity-20': index != 'mass'}" @click="index = 'mass'">Global leaderboard</span>
      <span class="h2 px-4 border-l border-white border-opacity-20 text-white" :class="{'text-opacity-20': index != 'blue'}" @click="index = 'blue'">Blue leaderboard</span>
      <span class="h2 px-4 border-l border-white border-opacity-20 text-white" :class="{'text-opacity-20': index != 'merges'}" @click="index = 'merges'">Merges leaderboard</span>
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
        blue: [],
        merges: []
    },
    index: "mass",
  }),
  async fetch() {
    this.top_100.mass = await this.$http.$get(`mass_top/100`);
    this.top_100.blue = await this.$http.$get(`blue_merges`);
    this.top_100.merges = await this.$http.$get(`merges_top/100`);
  },
};
</script>

<style lang="postcss" scoped>
.section__container {
  @apply col-span-2;
  @apply pb-14; /* scrollbar padding */
  @apply bg-blue bg-opacity-80;
}
.section__header {
  @apply flex items-center;
  @apply text-white text-opacity-80;
  @apply cursor-pointer;
}
.section__content {
  @apply h-full;
  @apply mt-4;
  @apply flex items-center flex-wrap gap-x-6 gap-y-2;
  @apply overflow-y-scroll;
}
</style>