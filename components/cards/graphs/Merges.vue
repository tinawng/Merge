<template>
  <div class="graph__container">
    <div class="graph__title">Merges</div>
    <div ref="graph-content" class="flex-grow">
      <LineChart
        v-if="chart_height && chart_width"
        :data="chart_data"
        :options="chart_option"
        :height="chart_height"
        :width="chart_width"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: { id: Number },
  data: () => ({
    chart_height: 0,
    chart_width: 0,

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

    let tab = await this.$http.$get(`token_history/${this.id}`);

    // Remove useless records (only keep record where merges count change)
    tab = tab.filter((value, index, self) => index === self.findIndex((t) => t.merges === value.merges));

    for (let i = 0; i < tab.length; i++) {
      this.chart_data.datasets[0].data.push(tab[i].merges);
      this.chart_data.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
    }

    let el = this.$refs["graph-content"];
    this.chart_height = el.clientHeight < 100 ? 300 : el.clientHeight; // 350px for 📱
    this.chart_width = el.clientWidth;
  },
};
</script>

<style lang="postcss" scoped>
.graph__container {
  @apply h-full;
  @apply flex flex-col;
}
.graph__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply text-xl text-white text-opacity-40;
}
</style>