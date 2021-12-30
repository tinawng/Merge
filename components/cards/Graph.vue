<template>
  <div class="card__container">
    <div class="card__title">Token per mass</div>
    <div ref="graph-container" class="h-full">
      <LineChart v-if="chart_height" :data="barChartData" :options="barChartOptions" :height="chart_height" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    chart_height: 0,

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
              max: 15000,
              min: 0,
              stepSize: 3000,
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
    
    let tab = await this.$http.$get("mass_repartition");
    for (let i = 0; i < 15; i++) {
      this.barChartData.datasets[0].data.push(tab[i].count);
      this.barChartData.labels.push(`m(${tab[i].mass})`);
    }
    // this.barChartData.datasets[0].data = tab.slice(0, 10);
    // let l = Array.from(Array(10).keys()).map((i) => `m(${++i})`);
    // this.barChartData.labels = l;

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight;
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  @apply h-4/5;
}
.card__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply text-xl text-white text-opacity-40;
}
</style>