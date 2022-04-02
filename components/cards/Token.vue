<template>
  <div class="card__container">
    <merge-svg class="md:w-56 lg:w-80 xl:w-96 rounded-lg" :tier="tier" :mass="mass" />
    <div class="flex-grow flex flex-col justify-start py-3 pr-2">
      <div class="flex gap-1.5">
        <span class="text-xl lg:text-2xl xl:text-3xl font-semibold">m({{mass}})</span>
        <span class="self-end ">#{{id}}</span>
      </div>
      <p class="mt-2 ">Tier {{tier}}</p>
      <p>Class {{token_class}}</p>
      <p>Merges {{merges || 0}}</p>
      <div class="mt-3 flex gap-1">
        <NuxtLink
          v-for="fit in token_drops_fittings"
          :key="fit"
          tag="a"
          :to="`/drops/matter/${fit}`"
          class="drop_fit"
          >{{fit}}</NuxtLink
        >
      </div>

      <p class="mt-auto flex items-end gap-1">
        <span v-if="merged" class="h-fit w-fit px-2 py-1.5 bg-black text-white text-xs font-normal rounded"
          >MERGED</span
        >
        <a
          class="h-8 w-8 ml-auto flex justify-center button bg-white rounded-full"
          :href="`https://opensea.io/assets/0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab/${id}`"
          target="_blank"
        >
          <img src="~/assets/svgs/opensea.svg" alt="opensea" />
        </a>
        <a
          class="h-8 w-8 p-1.5 flex justify-center button bg-black rounded-full"
          :href="`https://niftygateway.com/marketplace?collection=0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab&tokenId=${id}`"
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
    tier: Number,
    mass: Number,
    token_class: Number,
    merges: Number,
    merged: Boolean,
  },

  data: () => ({ token_drops_fittings: [] }),

  async fetch() {
    let drops = ["750", "450", "150", "36", "12", "6"]
    let fittings = await Promise.all(drops.map((d) => this.$http.$get(`drops/matter/${d}`)))
    fittings.forEach((fit_list, i) => {
      if (fit_list.some((token) => token.id === this.id)) this.token_drops_fittings.push(drops[i])
    })
  },

  methods: {
    formatDate(merged_on) {
      if (!merged_on) return ""
      return new Date(merged_on).toDateString()
    },
  },
}
</script>

<style lang="postcss" scoped>
.card__container {
  @apply relative;
  @apply w-full flex-grow;
  @apply p-2;
  @apply bg-white rounded-xl;
  @apply flex gap-4;
  @apply text-black font-medium lg:text-lg xl:text-xl;
}
.drop_fit {
  @apply px-1.5 py-0.5 lg:px-2.5 lg:pt-1 lg:pb-0.5;
  @apply bg-black rounded-full;
  @apply text-white text-xs font-thin lg:text-sm lg:font-normal;
}
</style>