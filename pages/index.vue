<template>
  <div class="page__container">
    <section class="overview"></section>
    <section class="merge_history">
      <span class="h2">Latest Merges</span>
      <ul class="mt-8">
        <li v-for="token in latest_merges" :key="token.id">
          <div class="pill">m({{token.mass}}) #{{token.id}}</div>
          <div class="pill">m(21) #{{token.merged_to}}</div>
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
  },
  data: () => ({
    latest_merges: [],
  }),
};
</script>

<style lang="postcss">
.page__container {
  @apply h-screen;
  @apply grid grid-cols-3 grid-rows-2;
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
  @apply overflow-scroll;
  @apply transition-colors;
}
section li {
  @apply p-4;
  @apply flex items-center;
}
.pill {
  @apply relative;
  @apply p-2;
  @apply bg-blue rounded-full;
  @apply text-sm text-white text-opacity-80;
  transform-style: preserve-3d;

}
.pill:before {
  content: 'opensea';
  @apply absolute top-0 left-0 -z-1;
  @apply w-full h-full;
  @apply pt-1 pb-px;
  @apply bg-blue bg-opacity-10 rounded-full;
  @apply text-blue text-center whitespace-nowrap;
  @apply transition-transform;
  transform: translateZ(-1px);
}
.pill:hover:before {
  transform: translateY(50%);
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
