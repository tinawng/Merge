<script setup>
const top_100 = reactive({ mass: [], blue: [], merges: [] })
top_100.mass = await useAPI("/mass_top")
top_100.blue = await useAPI("/blue_mass")
top_100.merges = await useAPI("/merges_top")

const index = ref("mass")
</script>

<template>
  <section class="section__container">
    <div class="section__header">
      <span class="section__header_title pr-4" :class="{'opacity-20': index != 'mass'}" @click="index = 'mass'"
        >Global leaderboard</span
      >
      <span
        class="section__header_title px-4 border-l border-white border-opacity-20 text-white"
        :class="{'text-opacity-20': index != 'blue'}"
        @click="index = 'blue'"
        >Blue leaderboard</span
      >
      <span
        class="section__header_title px-4 border-l border-white border-opacity-20 text-white"
        :class="{'text-opacity-20': index != 'merges'}"
        @click="index = 'merges'"
        >Merges leaderboard</span
      >
    </div>

    <div class="section__content">
      <merge v-for="token in top_100[index]" :key="token.id" class="w-18 md:w-24 xl:w-32" :id="+token.id" :tier="token.tier" :mass="token.mass"/>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.section__container {
  @apply col-span-2;
  @apply md:pb-14; /* scrollbar padding */
  @apply bg-blue bg-opacity-80;
}
.section__header {
  @apply flex items-center;
  @apply text-white text-opacity-80;
  @apply cursor-pointer;
}
.section__header_title {
  @apply text-sm md:text-xl font-medium leading-tight;
}
.section__content {
  @apply h-96 md:h-full;
  @apply mt-4;
  @apply flex content-start flex-wrap gap-x-2 md:gap-x-6 gap-y-2;
  @apply overflow-y-scroll;
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