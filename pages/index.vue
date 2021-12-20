<template>
  <div class="page__container">
    <section class="overview"></section>
    <section class="merge_history">
      <span class="h2">Latest Merge</span>
      <ul class="mt-8">
        <li v-for="token in latest_merges" :key="token.id" class="my-0.5">
          <span class="text-sm">⚫</span>
          <span class="font-medium opacity-90">#{{token.id}} =></span>
          <span class="text-sm">⚫</span>
          <span class="font-medium opacity-90">#{{token.merged_to}}</span>
        </li>
      </ul>
    </section>
    <section class="leaderboard">
      <div class="leaderboard__header">
        <span class="h2">Global leaderboard</span>
        <div class="vr mx-6" />
        <span class="h2 opacity-20">Blue leaderboard</span>
        <Button class="w-6 ml-auto" icon="arrow-left" disabled />
        <div class="vr mx-4" />
        <Button class="w-6" icon="arrow-right" />
      </div>
      <!-- <div v-for="token in leaderboard" :key="token.id" class="w-1/4 flex-shrink-0" >
        {{token.name}}
        <img :src="token.image_url" alt="">
      </div> -->
    </section>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.latest_merges = await this.$http.$get("latest_merges");
    console.log(this.latest_merges);
  },
  data: () => ({
    latest_merges: [],
  }),
};
</script>

<style lang="postcss">
.page__container {
  @apply h-screen;
  @apply grid grid-cols-3;
}

section {
  @apply p-8;
}
section.overview {
  @apply col-span-3;
  @apply bg-black;
}
section.merge_history {
  @apply bg-white;
}
section.leaderboard {
  @apply col-span-2;
  @apply grid grid-rows-2;
  /* @apply flex flex-nowrap;
  @apply overflow-hidden; */
  @apply bg-blue;
}
.leaderboard__header {
  @apply h-fit;
  @apply flex items-center;
  @apply text-white text-opacity-80;
}
</style>
