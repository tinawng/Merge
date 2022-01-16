<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g v-if="!variant || variant == 'eth'">
      <path
        fill="currentColor"
        stroke="transparent"
        d="M12,1.75L5.75,12.25L12,16L18.25,12.25L12,1.75M5.75,13.5L12,22.25L18.25,13.5L12,17.25L5.75,13.5Z"
      />
    </g>
    <g v-else-if="variant == 'arrow-right'">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </g>
    <g v-else-if="variant == 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </g>
    <g v-else-if="variant == 'arrow-up'">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </g>
    <g v-else-if="variant == 'arrow-down'">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </g>
    <g v-else-if="variant == 'circle'">
      <circle fill="currentColor" stroke="transparent" cx="12" cy="12" r="10"></circle>
    </g>
    <g v-else-if="variant == 'square'">
      <rect fill="currentColor" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </g>
    <g v-else-if="variant == 'minimize'">
      <polyline points="4 14 10 14 10 20"></polyline>
      <polyline points="20 10 14 10 14 4"></polyline>
      <line x1="14" y1="10" x2="21" y2="3"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </g>
    <g v-else-if="variant == 'user'">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
    <g v-else-if="variant == 'award'">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </g>
    <g v-else-if="variant == 'globe'">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </g>
    <g v-else-if="variant == 'dollar'">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </g>
    <g v-else-if="variant == 'hash'">
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="4" y1="15" x2="20" y2="15"></line>
      <line x1="10" y1="3" x2="8" y2="21"></line>
      <line x1="16" y1="3" x2="14" y2="21"></line>
    </g>
    <g v-else-if="variant == 'search'">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </g>
    <g v-else-if="variant == 'clock'">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </g>
    <g v-else-if="variant == 'return'">
      <polyline points="9 10 4 15 9 20"></polyline>
      <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
    </g>
    <g v-else-if="variant == 'plus'">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </g>
    <g v-else-if="variant == 'minus'">
      <line x1="5" y1="12" x2="19" y2="12"></line>
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