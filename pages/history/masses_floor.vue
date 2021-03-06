<template>
  <section class="section__container">
    <nav-bar back />

    <div class="section__content">
      <div class="card__container">
        <div class="card__title">Masses Price Floors</div>
        <div class="card__content">
          <div class="card__content__row">
            <button :class="{'active': data_format == 'ratio'}" @click="changeDataFormat('ratio')">m(1) ratio</button>
            <button :class="{'active': data_format == 'per_mass'}" @click="changeDataFormat('per_mass')">
              per mass
            </button>
            <button :class="{'active': data_format == 'sale_price'}" @click="changeDataFormat('sale_price')">
              sale prices
            </button>
          </div>
          <div class="card__content__row flex-wrap">
            <p v-if="data_format == 'ratio'">Display ratio between m(x) sale price and m(1) floor price</p>
            <p v-else-if="data_format == 'per_mass'">Display price by mass</p>
            <p v-else-if="data_format == 'sale_price'">Display price per token <small>(logarithmic scale)</small></p>
            <p class="w-full">Based on the latest sale available for each mass:</p>
            <icon class="card__icon text-blue" variant="circle" />
            <span>Today</span>
            <icon class="w-6 md:w-8 lg:w-10 mx-2 p-1 md:p-1.5 lg:p-2 text-white" variant="code" />
            <span>A month ago</span>
            <icon class="card__icon text-yellow" variant="circle" />
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
          label: "eth",
          data: [],
          backgroundColor: "#33F3",
          borderColor: "#33F6",
          borderWidth: 2,
          pointBackgroundColor: [],
          pointBorderColor: [],
          pointRadius: 2.5,
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
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "#39373E99",
            },
            position: "right",
            ticks: {
              callback: (value) => value,
            },
          },
        ],
      },
    },

    data: [],
    data_format: "per_mass",
  }),

  async mounted() {
    this.data = await this.$http.$get("masses_price_floor");
    this.updateChartData(this.data);

    let el = this.$refs["graph-container"];
    this.chart_height = el.clientHeight < 100 ? 300 : el.clientHeight; // 300px for 📱
    this.chart_width = el.clientWidth;
  },

  methods: {
    updateChartData(tab) {
      this.chart_data.datasets[0].data = [];
      this.chart_data.labels = [];
      this.chart_data.datasets[0].pointBorderColor = [];

      let m1_floor = tab[0].sale_price;

      for (let i = 0; i < tab.length; i++) {
        if (this.data_format == "ratio") this.chart_data.datasets[0].data.push((tab[i].sale_price / tab[i].mass) / m1_floor);
        else if (this.data_format == "per_mass") this.chart_data.datasets[0].data.push(tab[i].sale_price / tab[i].mass);
        else if (this.data_format == "sale_price") this.chart_data.datasets[0].data.push(tab[i].sale_price);

        this.chart_data.labels.push(`m(${tab[i].mass})`);
        let days_since = (Date.now() - Date.parse(tab[i].merged_on)) / 86000000;
        let hex = Math.max(Math.round(15 - days_since), 3).toString(16);
        let hex2 = Math.max(Math.min(Math.round(days_since), 15), 3).toString(16);
        this.chart_data.datasets[0].pointBorderColor.push(`#${hex2}${hex2}${hex}`);
        this.chart_data.datasets[0].pointBackgroundColor.push(`#${hex2}${hex2}${hex}`);
      }

      this.chart_data = { ...this.chart_data };
    },

    changeDataFormat(format) {
      this.data_format = format;
      if (this.data_format == "sale_price") this.chart_option.scales.yAxes[0].type = "logarithmic";
      else this.chart_option.scales.yAxes[0].type = "linear";
      this.updateChartData(this.data);
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
  @apply grid grid-cols-1 gap-y-6;
}
</style>