<template>
  <MountingPortal mountTo="#__nuxt" append name="merge_modal" :disabled="show">
    <div class="modal__container">{{token}}</div>
  </MountingPortal>
</template>

<script>
export default {
  props: { show: Boolean, content: [Object, Number] },

  computed: {
    token: async function () {
      if (typeof this.content === 'object')
        return this.content;
      else if (typeof this.content === 'number') {
        return await this.$http.$get("merge_token/" + this.content);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.modal__container {
  @apply absolute top-1/2 left-1/2 z-50;
  @apply transform -translate-x-1/2 -translate-y-1/2;
  @apply h-80 w-80;
  @apply bg-white;
  @apply flex justify-center items-center;
}
</style>