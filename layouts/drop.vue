<template>
  <div class="layout__container">
    <Nuxt />
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
}

section {
  @apply p-4 md:p-8;
}
</style>
