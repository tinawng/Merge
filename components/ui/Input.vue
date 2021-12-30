<template>
  <div class="input__container">
    <icon class="w-4 mr-2 text-white" variant="hash" />
    <input class="text-white text-opacity-50" placeholder="27000" type="number" min="1" max="28990" step="1"/>
    <div class="ml-2 mr-4 vr"/>
    <button-icon class="w-4 text-white text-opacity-70" icon="search"><input class="hidden" type="submit"></button-icon>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.input__container {
  @apply px-4;
  @apply bg-white bg-opacity-10;
  @apply flex items-center;
}
input {
  @apply flex-grow;
  @apply bg-transparent;
}
</style>