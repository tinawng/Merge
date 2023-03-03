<script setup>

defineProps({ placeholder: { type: Number, default: 27000 } })

const $router = useRouter()
const token_id = ref(undefined)

function submit() {
  $router.push(`/${token_id.value || 27000}`)
}
</script>

<template>
  <form class="input__container" @submit.prevent="submit">
    <icon class="w-4 mr-2 text-white" variant="hash" />
    <input
      class="text-white text-opacity-50"
      v-model="token_id"
      :placeholder="placeholder"
      type="number"
      min="1"
      max="28990"
      step="1"
    />
    <div class="ml-2 mr-4 vr" />
    <button-icon class="w-4 text-white text-opacity-70" icon="search" @click="submit" />
  </form>
</template>

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
::placeholder {
  @apply text-white text-opacity-40;
}
</style>