<template>
  <div class="card__container">
    <merge-svg class="w-52 rounded-lg" :tier="merge.tier" :mass="merge.mass" />
    <div class="flex-grow flex flex-col" :class="[merge.merged ? 'justify-center' : 'justify-start pt-2']">
      <div class="flex gap-1.5">
        <span class="text-xl font-semibold">m({{merge.mass}})</span>
        <span class="self-end ">#{{merge.id}}</span>
        <span v-if="merge.merged" class="ml-auto p-1.5 bg-black text-white text-xs font-normal rounded">MERGED</span>
      </div>
      <p class="mt-2 ">Tier {{merge.tier}}</p>
      <p class="">Class {{merge.class}}</p>
      <p class="">Merges {{merge.merge || 0}}</p>

      <p v-if="merge.merged_to" class="mt-3 ">
        Merged into <a class="link" :href="`/${merge.merged_to}`">{{merge.merged_to}}</a>
      </p>
      <p v-if="merge.merged_on" class="">on {{formatDate(merge.merged_on)}}</p>
      <p v-if="merge.sale_price" class="flex gap-0.5 items-center">
        Sold for {{merge.sale_price.toFixed(3)}} <icon class="w-4" variant="eth" />
      </p>

      <div class="absolute bottom-2 right-2 flex gap-1">
        <a
          class="h-8 w-8 flex justify-center button bg-white rounded-full"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.merge = await this.$http.$get(`token/${this.id}`);
  },
  
  props: {
    id: Number,
  },
  data: () => ({
    merge: {},
  }),

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
  @apply h-56 w-full;
  @apply p-2;
  @apply bg-white rounded-xl;
  @apply flex gap-4;
  @apply font-medium;
}
</style>