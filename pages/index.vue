<template>
  <div class="page__container">
    <section class="overview"></section>
    <section class="floor"></section>
    <section class="leaderboard">
      <div class="leaderboard__header">
        <span class="h2">Global leaderboard</span>
        <div class="vr mx-6" />
        <span class="h2 opacity-20">Blue leaderboard</span>
        <Button class="w-6 ml-auto" icon="arrow-left" disabled/>
        <div class="vr mx-4" />
        <Button class="w-6" icon="arrow-right"/>
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
    // this.leaderboard = (await this.$http.$get("https://api.opensea.io/api/v1/assets?order_direction=asc&offset=0&limit=12&collection=m")).assets;
    // console.log(this.leaderboard[0]);
  },
  data: () => ({
    leaderboard: []
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
section.floor {
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
