<script setup>
defineProps({
  id: { type: Number, default: 27000 },
  back: Boolean,
  tip: Boolean,
  path: String,
})

const $router = useRouter()
</script>

<template>
  <div class="navbar__container">
    <div class="flex justify-between">
      <NuxtLink tag="a" to="/" class="text-white"><h1>Merge.</h1></NuxtLink>
      <ui-input class="hidden" :placeholder="id" />
    </div>
    <div v-if="path" class="flex justify-between items-end">
      <span class="text-3xl text-white text-opacity-90">{{path}}</span>
      <tip v-if="tip" />
    </div>
    <tip v-else-if="tip" />
    <div v-else />
    <div v-if="back" class="hidden md:flex justify-end">
      <button @click="$router.go(-1)"><icon class="w-6" variant="return" /></button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.navbar__container {
  @apply mb-4 md:mb-0;
  @apply grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8;
}
</style>