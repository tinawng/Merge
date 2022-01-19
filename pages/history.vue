<template>
  <section class="section__container">
    <div class="section__header">
      <div class="flex justify-between">
        <h1 class="text-white">Merge.</h1>
        <ui-input />
      </div>
      <div></div>
      <div class="flex justify-end">
        <Nuxt-Link to="/">
          <button class=""><icon class="w-6" variant="return" /></button>
        </Nuxt-Link>
      </div>
    </div>

    <div class="section__content">
      <div class="card__container">
        <div class="card__title">Stats History</div>
        <div class="card__content">
          <div class="card__content__row">
            <icon class="card__icon dark bg-white" variant="arrow-up" :stroke="2" />
            <span class="text-xl">{{data_max}}</span>
            <span class="text-sm text-white text-opacity-40">eth</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon dark bg-white" variant="arrow-down" :stroke="2" />
            <span class="text-xl">{{data_min}}</span>
            <span class="text-sm text-white text-opacity-40">eth</span>
          </div>
          <div class="card__content__row col-span-2">
            <button :class="{'active': history_timeframe == 'all'}" @click="changeTimeframe('all')">all time</button>
            <button :class="{'active': history_timeframe == 'month'}" @click="changeTimeframe('month')">
              this month
            </button>
            <button :class="{'active': history_timeframe == 'week'}" @click="changeTimeframe('week')">this week</button>
          </div>
        </div>
      </div>

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

    history: undefined,
    history_timeframe: "all",
  }),
  computed: {
    data_max: function () {
      return this.chart_data.datasets[0].data.reduce((prev, curr) => (prev > curr ? prev : curr), 0);
    },
    data_min: function () {
      return this.chart_data.datasets[0].data.reduce(
        (prev, curr) => (prev < curr ? prev : curr),
        Number.MAX_SAFE_INTEGER
      );
    },
  },

  async mounted() {

    let stat = this.$route.query.stat;
    this.history = await this.$http.$get("history");
    let tab = this.history.map((d) => {
      return { data: d[stat], timestamp: d.timestamp };
    });
    this.updateChartData(tab);

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight;
    this.chart_width = el.clientWidth;
  },

  methods: {
    updateChartData(tab) {
      this.chart_data.datasets[0].data = [];
      this.chart_data.labels = [];

      for (let i = 0; i < tab.length; i++) {
        this.chart_data.datasets[0].data.push(tab[i].data);
        this.chart_data.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
      }

      this.chart_data.labels = this.chart_data.labels.map((item, pos) => {
        if (this.chart_data.labels.indexOf(item) == pos) return item;
        else return "";
      });
    },

    changeTimeframe(timeframe) {
      let stat = this.$route.query.stat;
      let tab = this.history.map((d) => {
        return { data: d[stat], timestamp: d.timestamp };
      });

      if (timeframe === "week") {
        tab = tab.filter((d) => Date.parse(d.timestamp) >= Date.now() - 604800000);
      } else if (timeframe === "month") {
        tab = tab.filter((d) => Date.parse(d.timestamp) >= Date.now() - 18748800000);
      }
      console.log(tab);
      this.updateChartData(tab);
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "~/assets/css/card.postcss";

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

.card__content {
  @apply grid grid-cols-2 gap-y-6;
}
</style>