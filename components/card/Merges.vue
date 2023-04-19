<script setup>
const props = defineProps({ id: Number })
const merges = await useAPI(`/tokens_merged_into/${props.id}`)
</script>

<template>
  <div class="card__container">
    <div class="card__title">Tokens Merged</div>
    <div class="card__content">
      <span class="flex items-center gap-3" v-for="token in merges" :key="token.id">
        <merge-icon v-bind="token" dark />
        <NuxtLink tag="a" :to="`/${+token.id}`" class="link lg:text-xl">
          {{+token.id}}
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.card__content {
  @apply max-h-72 md:max-h-40 lg:max-h-64 xl:max-h-72;
  @apply pt-0 mt-8 pr-4;
  @apply overflow-y-scroll;
  @apply flex flex-wrap gap-x-6 gap-y-3;
}

::-webkit-scrollbar {
  @apply w-1 md:w-2.5;
}
::-webkit-scrollbar-track {
  @apply bg-white bg-opacity-10 rounded-xl;
}
::-webkit-scrollbar-thumb {
  @apply bg-white bg-opacity-70 hover:bg-opacity-100 rounded-xl;
}
</style>