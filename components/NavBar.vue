<template>
  <div class="navbar__container">
    <div class="flex justify-between">
      <NuxtLink to="/" tag="h1" class="text-white">Merge.</NuxtLink>
      <ui-input class="hidden" :placeholder="id" />
    </div>
    <tip v-if="tip" />
    <div v-else />
    <div v-if="back" class="hidden md:flex justify-end">
        <button @click="$router.go(-1)"><icon class="w-6" variant="return" /></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, default: 27000 },
    back: Boolean,
    tip: Boolean,
  },
};
</script>

<style lang="postcss" scoped>
.navbar__container {
  @apply mb-4 md:mb-0;
  @apply grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8;
}
</style>