<template>
  <div class="card__container">
    <div class="card__title">
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
    <div ref="graph-container" class="h-full">
      <LineChart v-if="chart_height" :data="barChartData" :options="barChartOptions" :height="chart_height" />
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

    barChartData: {
      labels: [],
      datasets: [
        {
          label: "tokens",
          data: [],
          backgroundColor: "#33F3",
          borderColor: "#33F",
          borderWidth: 2,
          pointRadius: 1,
        },
      ],
    },
    barChartOptions: {
      normalized: true,
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#33F3",
      },
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
    this.barChartData.datasets[0].data = [];
    this.barChartData.labels = [];

    this.mass_repartition = await this.$http.$get("mass_repartition");
    for (let i = this.chart_bound_min; i < this.chart_bound_max; i++) {
      this.barChartData.datasets[0].data.push(this.mass_repartition[i].count);
      this.barChartData.labels.push(`m(${this.mass_repartition[i].mass})`);
    }

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight;
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
      this.barChartData.datasets[0].data = [];
      this.barChartData.labels = [];

      for (let i = this.chart_bound_min; i < this.chart_bound_max; i++) {
        if (!this.mass_repartition[i]) continue;
        this.barChartData.datasets[0].data.push(this.mass_repartition[i].count);
        this.barChartData.labels.push(`m(${this.mass_repartition[i].mass})`);
      }
      this.barChartData = { ...this.barChartData };
    },
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  height: calc(100% - 0.75rem);
}
.card__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply flex justify-between items-center;
  @apply text-xl text-white text-opacity-40;
}
</style>