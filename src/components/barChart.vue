<template>
  <div id="bar">
    <chart :options="bar" autoresize> </chart>
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/chart/bar";

export default {
  components: {
    chart: ECharts,
  },
  data() {
    let data = [];

    return {
      bar: {
        color: ["#4791FF", "#FF2366", "#02BC77", "#FFD950"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sept",
            "Oct",
            "Nov",
            "Dic",
          ],
        },
        yAxis: {
          type: "value",
        },
        legend: {
          data: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        },
        series: [
          {
            name: "Semana 1",
            type: "bar",
            data: [320, 332, 301, 334, 320, 732, 1301, 334, 320, 332, 301, 334],
          },

          {
            name: "Semana 2",
            type: "bar",

            data: [220, 182, 191, 234, 320, 332, 301, 334, 320, 332, 1301, 334],
          },

          {
            name: "Semana 3",
            type: "bar",
            data: [
              862,
              1018,
              964,
              1026,
              320,
              332,
              1301,
              334,
              320,
              332,
              301,
              334,
            ],
          },

          {
            name: "Semana 4",
            type: "bar",

            data: [120, 132, 101, 134, 320, 432, 101, 534, 120, 332, 301, 634],
          },
        ],
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>