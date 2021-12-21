<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g v-if="!variant || variant == 'icon'">
      <path
        fill="currentColor"
        stroke="transparent"
        d="M16,9H19L14,16M10,9H14L12,17M5,9H8L10,16M15,4H17L19,7H16M11,4H13L14,7H10M7,4H9L8,7H5M6,2L2,8L12,22L22,8L18,2H6Z"
      />
    </g>
    <g v-else-if="variant == 'arrow-right'">
      <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
    </g>
    <g v-else-if="variant == 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
    </g>
    <g v-else-if="variant == 'circle'">
      <circle fill="currentColor" stroke="transparent" cx="12" cy="12" r="10"></circle>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    variant: String,
    stroke: {
      type: Number,
      default: 1.5,
    },
  },
};
</script>