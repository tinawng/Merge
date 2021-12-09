<template>
  <div class="page__container">
    <section class="overview"></section>
    <section class="floor"></section>
    <section class="leaderboard">
      <div v-for="token in leaderboard" :key="token.id">
        {{token.name}}
        <img :src="token.image_url" alt="">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.leaderboard = (await this.$http.$get("https://api.opensea.io/api/v1/assets?order_direction=asc&offset=0&limit=8&collection=m")).assets;
    console.log(this.leaderboard[0]);
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
  @apply bg-blue;
}
</style>
