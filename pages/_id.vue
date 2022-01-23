<template>
  <section class="overview">
    <div class="overview__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input :placeholder="token.id" />
      </div>
      <div></div>
      <div class="flex justify-end">
        <Nuxt-Link to="/">
          <button class=""><icon class="w-6" variant="return" /></button>
        </Nuxt-Link>
      </div>
    </div>
    <div class="overview__content">
      <cards-token v-bind="token" :token_class="token.class" />
      <cards-merged v-bind="token" />
      <cards-graphs-merges v-if="token.merges > 1" :id="token.id" />
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    token: {}
  }),

  created() {
    if (this.$route.params.id.match(/^\d+$/)) this.token.id = Number(this.$route.params.id);
    else this.$router.push("/");
  },
  async fetch() {
    this.token = await this.$http.$get(`token/${this.token.id}`);
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