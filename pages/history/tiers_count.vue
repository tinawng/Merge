<template>
  <section class="section__container">
    <nav-bar back />

    <div class="section__content">
      <div class="card__container">
        <div class="card__title">Stats History</div>
        <div class="card__content">
          <div class="card__content__row">
            <icon class="card__icon dark bg-yellow" variant="arrow-up" :stroke="2" />
            <span class="text-xl">{{data_max[0]}}</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon dark bg-yellow" variant="arrow-down" :stroke="2" />
            <span class="text-xl">{{data_min[0]}}</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon bg-blue" variant="arrow-up" :stroke="2" />
            <span class="text-xl">{{data_max[1]}}</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon bg-blue" variant="arrow-down" :stroke="2" />
            <span class="text-xl">{{data_min[1]}}</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon bg-red" variant="arrow-up" :stroke="2" />
            <span class="text-xl">{{data_max[2]}}</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon bg-red" variant="arrow-down" :stroke="2" />
            <span class="text-xl">{{data_min[2]}}</span>
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

      <div ref="graph-container" class="md:col-span-2" style="height: calc(100% - 2rem);">
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
          label: "token",
          data: [],
          backgroundColor: "#FC31",
          borderColor: "#FC3",
          borderWidth: 2,
          pointBackgroundColor: "#FC3",
          pointRadius: 2.5,
          pointHoverBackgroundColor: "#FFF",
          pointHoverBorderColor: "#FC3",
          pointHoverRadius: 6,
        },
        {
          label: "token",
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
        {
          label: "token",
          data: [],
          backgroundColor: "#F333",
          borderColor: "#F33",
          borderWidth: 2,
          pointBackgroundColor: "#F33",
          pointRadius: 2.5,
          pointHoverBackgroundColor: "#FBB",
          pointHoverBorderColor: "#F33",
          pointHoverRadius: 6,
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
      return [
        this.chart_data.datasets[0].data.reduce((prev, curr) => (prev > curr ? prev : curr), 0),
        this.chart_data.datasets[1].data.reduce((prev, curr) => (prev > curr ? prev : curr), 0),
        this.chart_data.datasets[2].data.reduce((prev, curr) => (prev > curr ? prev : curr), 0),
      ];
    },
    data_min: function () {
      return [
        this.chart_data.datasets[0].data.reduce((prev, curr) => (prev < curr ? prev : curr), 100),
        this.chart_data.datasets[1].data.reduce((prev, curr) => (prev < curr ? prev : curr), 100),
        this.chart_data.datasets[2].data.reduce((prev, curr) => (prev < curr ? prev : curr), 100),
      ];
    },
  },

  async mounted() {
    this.history = await this.$http.$get("history");
    let tab = this.history.map((d) => {
      return { data: d.tiers_count, timestamp: d.timestamp };
    });
    this.updateChartData(tab);

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight < 100 ? 300 : el.clientHeight; // 350px for 📱
    this.chart_width = el.clientWidth;
  },

  methods: {
    updateChartData(tab) {
      this.chart_data.datasets[0].data = [];
      this.chart_data.datasets[1].data = [];
      this.chart_data.datasets[2].data = [];
      this.chart_data.labels = [];

      for (let i = 0; i < tab.length; i++) {
        this.chart_data.datasets[0].data.push(tab[i].data[1]);
        this.chart_data.datasets[1].data.push(tab[i].data[2]);
        this.chart_data.datasets[2].data.push(tab[i].data[3]);
        this.chart_data.labels.push(new Date(tab[i].timestamp).toDateString().split(" ").slice(1, 3).join(" "));
      }

      this.chart_data.labels = this.chart_data.labels.map((item, pos) => {
        if (this.chart_data.labels.indexOf(item) == pos) return item;
        else return "";
      });

      this.chart_data = { ...this.chart_data };
    },

    changeTimeframe(timeframe) {
      this.history_timeframe = timeframe;
      let tab = this.history.map((d) => {
        return { data: d.tiers_count, timestamp: d.timestamp };
      });

      if (timeframe === "week") {
        tab = tab.filter((d) => Date.parse(d.timestamp) >= Date.now() - 604800000);
      } else if (timeframe === "month") {
        tab = tab.filter((d) => Date.parse(d.timestamp) >= Date.now() - 2678400000);
      }

      this.updateChartData(tab);
    },
  },
};
</script>

<style lang="postcss" scoped>

.section__container {
  @apply col-span-3 bg-black;
}
.section__content {
  @apply h-full;
  @apply mt-4;
  @apply grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8;
}

.card__content {
  @apply grid grid-cols-2 gap-y-6;
}
</style>