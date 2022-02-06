<template>
  <section class="section__container">
    <nav-bar back />

    <div class="section__content">
      <div class="card__container">
        <div class="card__title">Stats History</div>
        <div class="card__content">
          <div class="card__content__row">
            <icon class="card__icon dark bg-white" variant="arrow-up" :stroke="2" />
            <span class="text-xl">{{data_max}}</span>
            <span v-show="history_param == 'os_price_floor'" class="text-sm text-white text-opacity-40">eth</span>
          </div>
          <div class="card__content__row">
            <icon class="card__icon dark bg-white" variant="arrow-down" :stroke="2" />
            <span class="text-xl">{{data_min}}</span>
            <span v-show="history_param == 'os_price_floor'" class="text-sm text-white text-opacity-40">eth</span>
          </div>
          <div class="card__content__row col-span-2">
            <button :class="{'active': history_timeframe == 'all'}" @click="changeTimeframe('all')">all time</button>
            <button :class="{'active': history_timeframe == 'month'}" @click="changeTimeframe('month')">
              this month
            </button>
            <button :class="{'active': history_timeframe == 'week'}" @click="changeTimeframe('week')">this week</button>
          </div>

          <div v-if="history_param == 'os_price_floor'" class="card__content__row">
            <NuxtLink tag="button" to="history/masses_floor">per mass floor</NuxtLink>
          </div>
          <div v-if="history_param == 'merged_count'" class="md:mt-2 card__content__row">
            <icon class="card__icon dark bg-white" :stroke="2" variant="clock" />
            <span class="card__content__value">{{last24h}}</span>
            <span class="card__content__label">last 24h</span>
            <span class="text-xs flex gap-1" :class="[diff48h >= 0 ? 'text-blue' : 'text-red']">
              <icon class="w-3" :variant="[diff48h >= 0 ? 'arrow-up' : 'arrow-down']"/>
              {{diff48h}}
            </span>
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

    history: [],
    history_timeframe: "all",
  }),
  computed: {
    history_param: function () {
      return this.$route.query.param;
    },
    data_max: function () {
      return this.chart_data.datasets[0].data.reduce((prev, curr) => (prev > curr ? prev : curr), 0);
    },
    data_min: function () {
      return this.chart_data.datasets[0].data.reduce(
        (prev, curr) => (prev < curr ? prev : curr),
        Number.MAX_SAFE_INTEGER
      );
    },
    last24h: function () {
      let tab = this.history.map((d) => {
        return { data: d[this.history_param], timestamp: d.timestamp };
      });
      tab = tab.reverse();
      let today = tab[0];
      let yesterday = tab.find((d) => Date.parse(d.timestamp) + 86400000 < Date.parse(today.timestamp));
      return today?.data - yesterday?.data;
    },
    last48h: function () {
      let tab = this.history.map((d) => {
        return { data: d[this.history_param], timestamp: d.timestamp };
      });
      tab = tab.reverse();
      let today = tab[0];
      let yester2day = tab.find((d) => Date.parse(d.timestamp) + 172800000 < Date.parse(today.timestamp));
      return today?.data - yester2day?.data;
    },
    diff48h: function () {
      return this.last24h - (this.last48h - this.last24h);
    },
  },

  async mounted() {
    this.history = await this.$http.$get("history");
    let tab = this.history.map((d) => {
      return { data: d[this.history_param], timestamp: d.timestamp };
    });
    this.updateChartData(tab);

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight < 100 ? 300 : el.clientHeight; // 350px for 📱
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

      this.chart_data = { ...this.chart_data };
    },

    changeTimeframe(timeframe) {
      this.history_timeframe = timeframe;

      // keep only wanted data
      let tab = this.history.map((d) => {
        return { data: d[this.history_param], timestamp: d.timestamp };
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