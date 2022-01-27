<template>
  <div class="graph__container">
    <div class="graph__title">Masses Floor</div>
    <div ref="graph-content" class="flex-grow">
      <LineChart
        v-if="chart_height"
        :data="chart_data"
        :options="chart_option"
        :height="chart_height"
      />
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    chart_height: 0,

    chart_data: {
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
    chart_option: {
      normalized: true,
      responsive: false,
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
    this.chart_data.datasets[0].data = [];
    this.chart_data.labels = [];

    let tab = await this.$http.$get("masses_price_floor");

    for (let i = 0; i < tab.length; i++) {
      this.chart_data.datasets[0].data.push(tab[i].merges);
      this.chart_data.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
    }

    let el = this.$refs["graph-content"];
    this.chart_height = el.clientHeight;
  },
};
</script>

<style lang="postcss" scoped>
.graph__container {
}
.graph__title {

}
</style>