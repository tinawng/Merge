<template>
  <div class="card__container">
    <merge-svg class="md:w-56 lg:w-80 xl:w-96 rounded-lg" :tier="merge.tier" :mass="merge.mass" />
    <div class="flex-grow flex flex-col justify-start py-3 pr-2">
      <div class="flex gap-1.5">
        <span class="text-xl font-semibold">m({{merge.mass}})</span>
        <span class="self-end ">#{{merge.id}}</span>
        <!-- <span v-if="merge.merged" class="ml-auto p-1.5 bg-black text-white text-xs font-normal rounded">MERGED</span> -->
      </div>
      <p class="mt-2 ">Tier {{merge.tier}}</p>
      <p class="">Class {{merge.class}}</p>
      <p class="">Merges {{merge.merges || 0}}</p>

      <p class="mt-auto flex items-end gap-1">
        <span v-if="merge.merged" class="h-fit w-fit px-2 py-1.5 bg-black text-white text-xs font-normal rounded">MERGED</span>
        <a
          class="h-8 w-8 ml-auto flex justify-center button bg-white rounded-full"
          :href="`https://opensea.io/assets/0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab/${merge.id}`"
          target="_blank"
        >
          <img src="~/assets/svgs/opensea.svg" alt="opensea" />
        </a>
        <a
          class="h-8 w-8 p-1.5 flex justify-center button bg-black rounded-full"
          :href="`https://niftygateway.com/marketplace?collection=0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab&tokenId=${merge.id}`"
          target="_blank"
        >
          <img src="~/assets/svgs/nifty.svg" alt="opensea" />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
  },
  data: () => ({
    merge: {},
  }),
  
  async fetch() {
    this.merge = await this.$http.$get(`token/${this.id}`);
  },

  methods: {
    formatDate(merged_on) {
      if (!merged_on) return "";

      return new Date(merged_on).toDateString();
    },
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply relative;
  @apply w-full;
  @apply p-2;
  @apply bg-white rounded-xl;
  @apply flex gap-4;
  @apply font-medium;
  flex-grow: 1;
}
</style>