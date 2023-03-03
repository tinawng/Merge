<script setup>
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const mass_repartition = await useAPI("/mass_repartition")
const chart_bound = 14

const chart_data = {
  labels: [],
  datasets: [
    {
      label: "tokens",
      data: [],
      backgroundColor: "#33F3",
      fill: "start",
      borderColor: "#33F",
      borderWidth: 2,
      pointBackgroundColor: "#33F",
      pointRadius: 2.5,
      pointHoverBackgroundColor: "#55F",
      pointHoverRadius: 6,
      tension: 0.3,
    },
  ],
}
const chart_options = {
  normalized: true,
  responsive: true,
  plugins: {
    legend: { display: false, title: { display: false } },
    title: { display: false },
    tooltip: { backgroundColor: "#33F3" },
  },
  scales: {
    x: { grid: { display: true, color: "#39373E99" } },
    y: {
      grid: { display: true, color: "#39373E99" },
      position: "right",
    },
  },
}

if (mass_repartition.value) fillChartData(mass_repartition.value)
else watch(mass_repartition, fillChartData)

function fillChartData(mass_repartition) {
  for (let i = 0; i < chart_bound; i++) {
    chart_data.datasets[0].data.push(mass_repartition[i].count)
    chart_data.labels.push(`m(${mass_repartition[i].mass})`)
  }
}
</script>

<template>
  <div class="graph_container">
    <div class="graph__title">
      <span>Token per mass</span>
    </div>
    <div class="h-full">
      <Line v-if="mass_repartition" :data="chart_data" :options="chart_options" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.graph__container {
  height: calc(100% - 2rem);
}
.graph__title {
  @apply pb-2;
  @apply border-b border-white border-opacity-10;
  @apply flex justify-between items-center;
  @apply text-xl text-white text-opacity-40;
}
</style>