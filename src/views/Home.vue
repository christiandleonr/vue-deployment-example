<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="card card-style-charts">
          <b-row>
            <b-col align-self="start">
              <div class="text-position margin-left-cards">
                <label class="label-style"
                  >Bienvenido al sitio web de Control Hidraulico de CFE</label
                >
              </div>
            </b-col>
            <b-col align-self="end">
              <img
                alt="CFE"
                class="icon-size"
                src="./../assets/craneImage.png"
              />
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col>
        <div class="card card-style-charts">
          <b-row>
            <b-col align-self="start">
              <div class="text-position margin-left-cards">
                <label class="label-style"
                  >Usuario: {{userName}}</label
                >
                <br />
                <label class="label-style">{{level}}</label>
              </div>
            </b-col>
            <b-col align-self="end">
              <img alt="CFE" class="icon-size" src="./../assets/operator.png" />
            </b-col>
          </b-row>
        </div>
      </b-col>

      <b-col
        ><div class="card card-style-charts">
          <b-row>
            <b-col align-self="start">
              <div class="text-position">
                <label class="total-cranes">Total de Gruas Disponibles</label>
                <br />
                <label class="total-cranes-available"
                  >{{ available }} Grúas</label
                >
              </div>
            </b-col>
            <b-col align-self="end">
              <chart :options="pie" class="pie-size" autoresize> </chart>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row class="margin-rows">
      <b-col>
        <div class="card card-style-charts">
          <div class="title-charts">
            <label class="label-style">Estatus de Grua</label>
          </div>
          <chart :options="bar" class="bar-size" autoresize> </chart>
        </div>
      </b-col>
      <b-col
        ><div class="card card-style-charts">
          <div class="title-charts">
            <label class="label-style">Disponibilidad de Gruas</label>
          </div>

          <chart :options="line" class="line-size" autoresize> </chart></div
      ></b-col>
    </b-row>
  </b-container>
</template>>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/chart/bar";
import HomeService from "../services/home.service";
import UserService from "../services/user.service";

export default {
  created() {
    HomeService.getAvailabilityData()
      .then((response) => {
        this.available = response.data.available;
        let data = [
          { value: response.data.available, name: "available" },
          { value: response.data.unavailable, name: "unavailable" },
        ];
        this.setPie(data);
      })
      .catch((e) => {
        console.log(e);
      });

    
        UserService.getUserByRPE(this.$store.getters.rpeLog)
        .then((response) => {
          this.userName=response.data.name,
          this.level=response.data.levelName
        })
        .catch((err) => {
          console.log(err);
        });
 
      

    HomeService.getStatusData()
      .then((response) => {
        let data = [
          response.data.inWorkshop,
          response.data.infield,
          response.data.onSite,
          response.data.scheduledEntry,
        ];
        this.setBar(data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  components: {
    chart: ECharts,
  },
  data() {
    return {
      userName:'',
      level:'',
      available: "",
      bar: {
        legend: {
          data: ["En Taller", "En Campo", "En Sitio", "Programado"],
        },
        tooltip: {
          trigger: "axis",
        },
        color: ["#4791FF"],
        xAxis: {
          type: "category",
          data: ["En Taller", "En Campo", "En Sitio", "Programado"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
            barWidth: 40,
          },
        ],
        responsive: true,
        maintainAspectRatio: false,
        avoidLabelOverlap: false,
      },
      line: {
        avoidLabelOverlap: false,
        color: ["#F30808", "#02BC77"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["2019", "2020"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Agost",
            "Sept",
            "Oct",
            "Nov",
            "Dic",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "2019",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 134, 90, 100, 230, 210],
          },
          {
            name: "2020",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310, 234, 200, 290, 330, 310],
          },
        ],
      },
      pie: {
        tooltip: {
          trigger: "item",
          formatter: "{d}%",
        },
        series: [
          {
            name: "pieChart",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            color: ["#EEAB27", "#DCDCDC"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    setPie(data) {
      this.pie.series[0].data = data;
    },
    setBar(data) {
      this.bar.series[0].data = data;
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 350px; /* or e.g. 400px */
}
.margin-left-cards {
  margin-left: 25px;
}
.margin-rows {
  margin-top: 15px;
}

.label-style {
  font: normal normal 600 15px Montserrat;
  letter-spacing: 0px;
  opacity: 1;
}
.card-style-charts {
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 20px #272d3b33;
  border-radius: 20px;
  opacity: 1;
  width: 100%;
  height: 97%;
  margin-bottom: 10px;
}

.pie-size {
  width: 100%;
  height: 125px;
}
.line-size {
  width: 95%;
}
.bar-size {
  width: 100%;
}
.text-position {
  text-align: center;
  margin-top: 10%;
}
.title-charts {
  margin-top: 5px;
  margin-left: 20px;
  text-align: left;
  font: normal normal 600 18px Montserrat;
  letter-spacing: 0.63px;
  color: #707070;
  opacity: 1;
}
.total-cranes {
  font: normal normal 600 16px Montserrat;
  letter-spacing: 0px;
  color: #090909;
  opacity: 1;
}
.total-cranes-available {
  font: normal normal 600 24px Montserrat;
  letter-spacing: 0px;
  color: #007f38;
  opacity: 1;
}
.icon-size {
  width: 126px;
  height: 126px;
  padding: 10px;
}
</style>