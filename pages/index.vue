<template>
  <div class="page__container">
    <section class="overview">
      <div class="overview__header">
        <div class="flex justify-between">
          <h1 class="text-white">Merge.</h1>
          <ui-input />
        </div>
        <div></div>
        <div class="text-right">
          <span class="text-white">button back to overview</span>
        </div>
      </div>
      <div class="overview__content">
        <cards-token :id="16112" />
        <cards-merged :id="16112" />
        <cards-graphs-merges :id="23780" />
      </div>
      <!-- <div class="overview__content">
        <cards-stats />
        <cards-masses />
        <cards-graphs-mass-repartition />
      </div> -->
    </section>
    <section class="merge_history">
      <span class="h2">Latest Merges</span>
      <ul class="mt-8">
        <li v-for="(token, i) in latest_merges" :key="token.id">
          <div class="pill bg-gray" @click="openModal(token)">m({{token.mass}}) #{{token.id}}</div>
          <icon variant="circle" class="w-1.5 animate-ping-slow" :style="`--delay: ${0.0+i/2}s`" />
          <icon variant="circle" class="w-1.5 animate-ping-slow" :style="`--delay: ${0.4+i/2}s`" />
          <div class="flex text-sm tracking-wider">
            <div class="pt-1">{{token.sale_price.toFixed(4)}}</div>
            <icon class="w-5 text-gray" />
          </div>
          <icon variant="circle" class="w-2 animate-ping-slow text-blue" :style="`--delay: ${0.8+i/2}s`" />
          <icon variant="circle" class="w-2.5 animate-ping-slow text-blue" :style="`--delay: ${1.0+i/2}s`" />
          <div class="pill bg-blue" @click="openModal(token.merged_to)">m(21) #{{token.merged_to}}</div>
        </li>
      </ul>
    </section>
    <section class="leaderboard">
      <div class="leaderboard__header">
        <span class="h2">Global leaderboard</span>
        <div class="vr mx-6" />
        <span class="h2 opacity-20">Blue leaderboard</span>
        <button-icon class="w-6 ml-auto" icon="arrow-left" disabled />
        <div class="vr mx-4" />
        <button-icon class="w-6" icon="arrow-right" />
      </div>

      <div class="leaderboard__content">
        <merge v-for="i in 100" :key="i" class="w-24" :id="i" />
      </div>

      <!-- <div v-for="token in leaderboard" :key="token.id" class="w-1/4 flex-shrink-0" >
        {{token.name}}
        <img :src="token.image_url" alt="">
      </div> -->
    </section>
    <!-- <modals-merge-token v-click-outside="closeModal" :show="modal_show" :content="modal_content" /> -->
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
  methods: {
    openModal(content) {
      this.modal_show = true;
      this.modal_content = content;
    },
    closeModal() {
      this.modal_show = false;
    },
  },
};
</script>

<style lang="postcss">
.page__container {
  @apply h-screen;
  @apply grid grid-rows-2;
  grid-template-columns: 36rem 1fr 1fr;
}

section {
  @apply p-8;
}
section.overview {
  @apply col-span-3;
  @apply bg-black;
}
.overview__header {
  @apply grid grid-cols-3 gap-8;
}
.overview__content {
  @apply mt-8;
  @apply grid grid-cols-3 gap-8;
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

section.leaderboard {
  @apply col-span-2;
  @apply pb-14; /* scrollbar padding */
  @apply bg-blue;
}
.leaderboard__header {
  @apply flex items-center;
  @apply text-white text-opacity-80;
}
.leaderboard__content {
  @apply h-full;
  @apply mt-4;
  @apply flex items-center flex-wrap gap-6;
  @apply overflow-y-scroll;
}
</style>
