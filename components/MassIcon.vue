<template>
  <span v-if="tier == 1">⚫</span>
  <span v-else-if="tier == 2">🟡</span>
  <span v-else-if="tier == 3">🔵</span>
  <span v-else-if="tier == 4">🔴</span>
</template>

<script>
export default {
    props: {tier: Number}
}
</script>