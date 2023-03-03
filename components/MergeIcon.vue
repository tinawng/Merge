<script setup>
const props = defineProps({ mass: Number, tier: Number, dark: Boolean })

const color = computed(() => {
  let color =
    props.tier == 4 ? "red" : props.tier == 2 ? "yellow" : props.tier == 3 ? "blue" : props.dark ? "white" : "black"
  return "bg-" + color
})
const size = computed(() => {
  let size = props.mass > 1000 ? "6" : props.mass > 300 ? "5" : props.mass > 50 ? "4" : props.mass > 10 ? "3" : "2"
  return `h-${size} w-${size}`
})
</script>

<template>
  <div class="rounded-full" :class="[color, size]"></div>
</template>