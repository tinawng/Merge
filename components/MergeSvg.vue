<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
    <g :class="`m${tier} ${mass == alpha_mass ? 'a' : ''}`">
      <rect id="r" width="2000" height="2000" />
      <circle id="c" cx="1000" cy="1000" :r="circle_radius" />
    </g>
  </svg>
</template>

<script>
// https://etherscan.io/address/0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab#code#F2#L91
export default {
  props: {
    tier: Number,
    mass: Number,
    alpha_mass: { type: Number, default: 12121 },
  },
  data: () => ({ max_radius: 1000 }),

  computed: {
    // https://etherscan.io/address/0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab#code#F2#L238
    circle_radius: function () {
      const radiusMass = this.getRadius(this.mass);
      const radiusAlphaMass = this.getRadius(this.alpha_mass);
      const scalePercentage = radiusMass / radiusAlphaMass;
      return this.max_radius * scalePercentage;
    },
  },

  methods: {
    // https://etherscan.io/address/0xc3f8a0f5841abff777d3eefa5047e8d413a1c9ab#code#F2#L251
    getRadius(mass) {
      let cubeRootScalar = 62035049089 / 1000000;
      let cubeRootMass = Math.pow(mass, 1 / 3) / 1;
      let radius = cubeRootMass * cubeRootScalar;
      return radius;
    },
  },
};
</script>

<style lang="postcss" scoped>
.m1 #c {
  fill: #fff;
}
.m1 #r {
  fill: #000;
}
.m2 #c {
  fill: #fc3;
}
.m2 #r {
  fill: #000;
}
.m3 #c {
  fill: #fff;
}
.m3 #r {
  fill: #33f;
}
.m4 #c {
  fill: #fff;
}
.m4 #r {
  fill: #f33;
}
.a #c {
  fill: #000 !important;
}
.a #r {
  fill: #fff !important;
}
</style>