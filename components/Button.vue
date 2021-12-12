<template>
  <div class="button__container" :class="{'opacity-20': disabled}">
    <icon :variant="icon" :stroke="2" />
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    disabled: Boolean,
  },
};
</script>

<style lang="postcss" scoped>
.button__container {
  @apply relative;
  @apply rounded-full;
  @apply transition-colors;
  user-select: none;
}
.button__container:before {
  @apply absolute;
  top: -20%;
  left: -20%;
  height: 140%;
  width: 140%;
  @apply bg-white bg-opacity-20 rounded-full;
  @apply transform scale-0;
  @apply transition-all;
  content: "";
}
.button__container:hover:before {
  @apply transform scale-100;
}
.button__container:active:before {
  @apply bg-opacity-30;
}
</style>