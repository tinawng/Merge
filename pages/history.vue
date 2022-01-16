<template>
  <section class="section__container">
    <div class="section__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input :placeholder="token_id" />
      </div>
      <div></div>
      <div class="flex justify-end">
        <Nuxt-Link to="/">
          <button class=""><icon class="w-6" variant="return" /></button>
        </Nuxt-Link>
      </div>
    </div>
    <div class="section__content">
      <cards-history />
      <div ref="graph-container" class="col-span-2" style="height: calc(100% - 2rem);">
        <LineChart
          v-if="chart_height"
          :data="chart_data"
          :options="chart_option"
          :height="chart_height"
          :width="chart_width"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    chart_height: 0,
    chart_width: 0,

    chart_data: {
      labels: [],
      datasets: [
        {
          label: "eth",
          data: [],
          backgroundColor: "#33F3",
          borderColor: "#33F",
          borderWidth: 3,
          pointRadius: 2,
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
            ticks: {
              min: "Dec 26",
            },
          },
        ],
        yAxes: [
          {
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

  async fetch() {},

  async mounted() {
    this.chart_data.datasets[0].data = [];
    this.chart_data.labels = [];

    let stat = this.$route.query.stat;
    let history = await this.$http.$get("history");
    let tab = history.map((d) => {
      return { data: d[stat], timestamp: d.timestamp };
    });

    for (let i = 0; i < tab.length; i++) {
      this.chart_data.datasets[0].data.push(tab[i].data);
      this.chart_data.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
    }

    this.chart_data.labels = this.chart_data.labels.map((item, pos) => {
      if (this.chart_data.labels.indexOf(item) == pos) return item;
      else return "";
    });

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight;
    this.chart_width = el.clientWidth;
  },
};
</script>

<style lang="postcss" scoped>
.section__container {
  @apply col-span-3 bg-black;
}
.section__header {
  @apply grid grid-cols-3 gap-8;
}
.section__content {
  @apply mt-8;
  @apply grid grid-cols-3 gap-8;
}
</style>