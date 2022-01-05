<template>
  <div class="layout__container">
    <Nuxt/>
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
    
    <sections-leaderboard/>
    
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
.layout__container {
  @apply h-screen;
  @apply grid grid-rows-2;
  grid-template-columns: 36rem 1fr 1fr;
}

section {
  @apply p-8;
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
