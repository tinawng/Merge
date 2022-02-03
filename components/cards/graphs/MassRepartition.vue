<template>
  <div class="graph__container">
    <div class="graph__title">
      <span>Token per mass</span>
      <div class="flex items-center">
        <button-icon class="w-5 ml-auto" icon="arrow-left" :disabled="chart_bound_min == 0" @click.native="previous" />
        <div class="vr mx-4" />
        <button-icon
          class="w-5"
          icon="arrow-right"
          :disabled="chart_bound_max > mass_repartition.length"
          @click.native="next"
        />
      </div>
    </div>
    <div ref="graph-content" class="h-full">
      <LineChart v-if="chart_height" :data="chart_data" :options="chart_option" :height="chart_height" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    mass_repartition: [],

    chart_height: 0,
    chart_bound_min: 0,
    chart_bound_max: 14,

    chart_data: {
      labels: [],
      datasets: [
        {
          label: "tokens",
          data: [],
          backgroundColor: "#33F3",
          borderColor: "#33F",
          borderWidth: 2,
          pointBackgroundColor: "#33F",
          pointRadius: 2.5,
          pointHoverBackgroundColor: "#BBF",
          pointHoverBorderColor: "#33F",
          pointHoverRadius: 6,
        },
      ],
    },
    chart_option: {
      normalized: true,
      responsive: true,
      legend: { display: false },
      title: { display: false },
      tooltips: { backgroundColor: "#33F3" },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "#39373E99",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              userCallback: (label) => {
                return Math.floor(label) === label ? label : null;
              },
            },
            gridLines: {
              display: true,
              color: "#39373E99",
            },
            position: "right",
          },
        ],
      },
    },
  }),

  async mounted() {
    this.chart_data.datasets[0].data = [];
    this.chart_data.labels = [];

    this.mass_repartition = await this.$http.$get("mass_repartition");
    for (let i = this.chart_bound_min; i < this.chart_bound_max; i++) {
      this.chart_data.datasets[0].data.push(this.mass_repartition[i].count);
      this.chart_data.labels.push(`m(${this.mass_repartition[i].mass})`);
    }

    let el = this.$refs["graph-content"];
    this.chart_height = el.clientHeight < 100 ? 300 : el.clientHeight; // 350px for 📱
  },

  methods: {
    next() {
      this.chart_bound_min += 14;
      this.chart_bound_max += 14;
      this.updateChartData();
    },
    previous() {
      this.chart_bound_min -= 14;
      this.chart_bound_max -= 14;
      this.updateChartData();
    },

    updateChartData() {
      this.chart_data.datasets[0].data = [];
      this.chart_data.labels = [];

      for (let i = this.chart_bound_min; i < this.chart_bound_max; i++) {
        if (!this.mass_repartition[i]) continue;
        this.chart_data.datasets[0].data.push(this.mass_repartition[i].count);
        this.chart_data.labels.push(`m(${this.mass_repartition[i].mass})`);
      }
      this.chart_data = { ...this.chart_data };
    },
  },
};
</script>

<style lang="postcss" scoped>
.graph__container {
  height: calc(100% - 2rem);
}
.graph__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply flex justify-between items-center;
  @apply text-xl text-white text-opacity-40;
}
</style>