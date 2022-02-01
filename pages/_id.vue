<template>
  <section class="overview">
    <nav-bar :id="token.id" back/>
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
.overview__content {
  @apply mt-6;
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}
</style>