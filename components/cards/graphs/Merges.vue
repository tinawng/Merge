<template>
  <div class="card__container">
    <div class="card__title">Merges</div>
    <div ref="graph-container" class="h-full">
      <LineChart v-if="chart_height" :data="barChartData" :options="barChartOptions" :height="chart_height" />
    </div>
  </div>
</template>

<script>
export default {
  props: { id: Number },
  data: () => ({
    chart_height: 0,

    barChartData: {
      labels: [],
      datasets: [
        {
          label: "merges",
          data: [],
          backgroundColor: "#33F3",
          borderColor: "#33F",
          borderWidth: 2,
          pointRadius: 1.5,
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
              stepSize: 1,
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

    let tab = await this.$http.$get(`token_history/${this.id}`);

    // Remove useless records (only keep record when merges count change)
    tab = tab.filter((value, index, self) => index === self.findIndex((t) => t.merges === value.merges));

    for (let i = 0; i < tab.length; i++) {
      this.barChartData.datasets[0].data.push(tab[i].merges);
      this.barChartData.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
    }

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight;
  },
};
</script>

<style lang="postcss" scoped>
.card__container {
  height: calc(100% - 2rem);
}
.card__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply text-xl text-white text-opacity-40;
}
</style>