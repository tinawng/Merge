<template>
  <div class="layout__container">
    <slot />

    <section-latest-merges />
    <section-leaderboard />
  </div>
</template>

<style lang="postcss">
.layout__container {
  @apply h-screen;
  @apply md:grid grid-rows-2;
  grid-template-columns: 36rem 1fr 1fr;
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
