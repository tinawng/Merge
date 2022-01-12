<template>
  <div class="rounded-full" :class="[color, size]"></div>
</template>

<script>
export default {
  props: { mass: Number, tier: Number },
  computed: {
    color: function () {
      let color = this.tier == 4 ? "red" : this.tier == 2 ? "yellow" : this.tier == 3 ? "blue" : "black";
      return "bg-" + color;
    },
    size: function () {
      let size = this.mass > 1000 ? '6' : this.mass > 300 ? '5' : this.mass > 50 ? '4' : this.mass > 10 ? '3' : '2';
      return `h-${size} w-${size}`;
    },

  },
};
</script>

<style lang="postcss" scoped>
</style>