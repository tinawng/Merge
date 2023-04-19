<script setup>
const $route = useRoute()
const $router = useRouter()

if (isNaN($route.params.id)) $router.push("/")
const token = await useAPI(`/token/${$route.params.id}`)
</script>

<template>
  <section class="overview">
    <nav-bar :id="+$route.params.id" back />
    <div class="overview__content">
      <card-token v-bind="token" :token_class="token?.class" />
      <card-merged v-bind="token" />
      <card-merges v-if="token?.merges > 0" :id="+token.id" />
    </div>
  </section>
</template>

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