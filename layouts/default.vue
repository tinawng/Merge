<template>
  <div class="layout__container">
    <Nuxt />

    <sections-latest-merges />
    <sections-leaderboard />
  </div>
</template>

<script>
export default {
  data: () => ({
    contract: "0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab",
    latest_merges: [],

    modal_show: false,
    modal_content: undefined,
  }),
};
</script>

<style lang="postcss" scoped>
.layout__container {
  @apply h-screen;
  @apply md:grid grid-rows-2;
  grid-template-columns: 36rem 1fr 1fr;
}

section {
  @apply p-4 md:p-8;
}

section.merge_history {
  @apply bg-white;
  @apply overflow-hidden;
  @apply transition-colors;
}
section li {
  @apply py-4;
  @apply flex justify-between items-center;
}
.pill {
  @apply px-5 py-2;
  @apply rounded-full;
  @apply text-sm text-white text-opacity-80 tracking-wider;
}
</style>
