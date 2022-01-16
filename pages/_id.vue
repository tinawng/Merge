<template>
  <section class="overview">
    <div class="overview__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input :placeholder="token_id" />
      </div>
      <div></div>
      <div class="flex justify-end">
        <Nuxt-Link to="/">
          <button class=""><icon class="w-6" variant="return" /></button>
        </Nuxt-Link>
      </div>
    </div>
    <div class="overview__content">
      <cards-token :id="token_id" />
      <cards-merged :id="token_id" />
      <cards-graphs-merges :id="token_id" />
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    token_id: 27000,
  }),

  created() {
    if (this.$route.params.id.match(/^\d+$/)) this.token_id = Number(this.$route.params.id);
    else this.$router.push("/");
  },
};
</script>

<style lang="postcss" scoped>
section.overview {
  @apply col-span-3;
  @apply bg-black;
}
.overview__header {
  @apply grid grid-cols-3 gap-8;
}
.overview__content {
  @apply mt-6;
  @apply grid grid-cols-3 gap-8;
}
</style>