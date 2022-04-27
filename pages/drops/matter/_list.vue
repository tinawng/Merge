<template>
  <section class="section__container">
    <nav-bar back tip :path="`/${$route.params.list}`"/>

    <div class="section__content">
      <div v-for="(token, i) in tokens" :key="token.id" >
        <div class="my-1 flex justify-between text-xs lg:text-sm xl:text-lg text-white text-opacity-30">
          <span>#{{i+1}}</span>
          <span>{{token.mass_x_merge}}</span>
        </div>
        <merge class="w-18 md:w-24 xl:w-32" v-bind="token" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "drop",

  data: () => ({
    current_list: undefined,
    tokens: [],
  }),

  created() {
    if (this.$route.params.list.match(/^(\d+[b-c]?)$/)) this.current_list = String(this.$route.params.list)
    else this.$router.push("/")
  },
  async fetch() {
    this.tokens = await this.$http.$get(`drops/matter/${this.current_list}`)
  },
}
</script>

<style lang="postcss" scoped>
.section__container {
  @apply min-h-full;
  @apply bg-blue bg-opacity-80;
}
.section__content {
  @apply h-full;
  @apply mt-10;
  @apply flex content-start flex-wrap gap-4;
}
</style>