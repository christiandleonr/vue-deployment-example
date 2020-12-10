<template>
  <div>
    <b-alert
      class="alert-style"
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ message }}</p>
    </b-alert>

    <div class="text-position">
      <label class="text-style-user">Reportes</label>
    </div>

    <br />
    <div class="grid-table">
      <div class="table-position">
        <div class="card-style table-style">
          <div class="table-responsive">
            <table class="table text_style_table">
              <thead>
                <tr>
                  <th scope="col">
                    TIPO DE REPORTE
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="reportType"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>

                  <th scope="col">
                    NÚMERO ECONOMICO
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="economicNumber"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>

                  <th scope="col">
                    OPERADOR
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="operator"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>
                  <th scope="col">
                    FECHA
                    <input
                      v-on:keyup.enter="refreshTable()"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>
                  <th scope="col">
                    <label class="action_label">ACCIONES</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reportList">
                  <th scope="row">{{ report.report.reportType }}</th>
                  <td>{{ report.report.economicNumber }}</td>
                  <td>{{ report.report.operatorName }}</td>

                  <td>{{ report.report.date | formatDate }}</td>
                  <td>
                    <div>
                      <b-button
                        @click="
                          getPDF(
                            report.report.economicNumber,
                            report.report.pdf
                          )
                        "
                        class="button"
                        type="button"
                      >
                        <img
                          alt="CFE"
                          class="icon-size"
                          src="../assets/pdf.png"
                      /></b-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="float-center pagination-position">
          <nav aria-label="Page navigation example">
            <b-pagination
              v-model="ListFilters.Page"
              :total-rows="PaginationTotalSize"
              :per-page="ListFilters.PageSize"
              @change="handlePageChange"
            ></b-pagination>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportService from "../services/report.service";

export default {
  name: "report-list",
  created() {
    ReportService.getAll(this.ListFilters)
      .then((response) => {
        this.reportList = response.data.reports;
        this.PaginationTotalSize = response.data.paginationTotalSize;
        this.CurrentPage = response.data.page;
        console.log(this.reportList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  components: {},
  data() {
    return {
      //alert
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      message: "",

      reportList: null,
      PaginationTotalSize: "",
      ListFilters: {
        Page: 1,
        PageSize: 5,
        ReportType: "",
        EconomicNumber: "",
        Operator: "",
        InitialDate: "",
        FinalDate: "",
      },
      reportType: "",
      economicNumber: "",
      operator: "",
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    handlePageChange(value) {
      this.ListFilters.Page = value;
      ReportService.getAll(this.ListFilters)
        .then((response) => {
          this.reportList = response.data.reports;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshTable() {
      this.ListFilters.ReportType = this.reportType;
      this.ListFilters.EconomicNumber = this.economicNumber;
      this.ListFilters.Operator = this.operator;
      ReportService.getAll(this.ListFilters)
        .then((response) => {
          this.reportList = response.data.reports;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getPDF(economicNumber, pdf) {
   
      ReportService.getPDF(pdf)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "Reporte " + economicNumber + ".pdf"
          );
          document.body.appendChild(link);
          link.click();
          this.message="PDF ha sido descargado correctamente";
          this.showAlert();
        })
        .catch((e) => {
          this.message = e;
          this.showAlert();
        });
    },
  },
};
</script>



<style>
.alert-style {
  font: normal normal 600 20px Montserrat;
  letter-spacing: 2.5px;
  z-index: 10;
  position: fixed;
  width: 85%;
}
.btn-success {
  box-shadow: 0px 5px 10px #00000029;
  border: 1px solid #ffffff;
  border-radius: 24px;
  width: 180px;
  height: 40px;
  font: normal normal 600 12px Montserrat;
}
.page-item.active .page-link {
  color: #fff;
  background-color: #007f3861;
  border-color: #007f3861;
}

.pagination {
  justify-content: center;
}
.btn-danger {
  box-shadow: 0px 5px 10px #00000029;
  border: 1px solid #ffffff;
  border-radius: 24px;
  width: 180px;
  height: 40px;
  font: normal normal 600 12px Montserrat;
}
.text_style_table {
  text-align: left;
  font: normal normal 14px Montserrat;
  letter-spacing: 0px;
  color: #090909;
  opacity: 1;
}

.margin-switch {
  margin-top: 12px;
}
.modal-footer {
  justify-content: center;
}

.action_label {
  margin-bottom: 37px;
}
.filter-input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #ffffff;
  border-radius: 0.25rem;
  transition: box-shadow 0.15s ease-in-out #ffffff;
  border-color: #ffffff !important;
  border-bottom-color: #272d3b33 !important;
  box-shadow: inset 0 1px 1px #ffffff, 0 0 8px #ffffff !important;
}
.page-link {
  color: #007f38;
}

.pagination-position {
  align-content: flex-start;
  padding-top: 15px;
}
.page-link {
  border: 1px solid #fff;
}
.page-item.disabled .page-link {
  border-color: #fff;
}
.grid-table {
  padding-top: 19px;
  width: 100%;
  height: 100%;
}

.text-position {
  float: left;
}
.text-style-user {
  text-align: left;
  font: normal normal 600 30px/37px Montserrat;
  letter-spacing: 0.6px;
  color: #272d3b;
}
.icon-size {
  width: 26px;
  height: 26px;
}

.table-style {
  border-radius: 34px;
  box-shadow: 0px 5px 10px #272d3b33;
  border-spacing: 2px;
  border-collapse: separate;
  display: block;
  border: 1px solid #ffffff;
}
.card-style {
  display: block;
  width: 99%;
  height: 100%;
  border: 1px solid #ffffff;
}
.table-position {
  padding-top: 30px;
}

.table {
  height: 100%;
  display: table;
  width: 100%;
  border-collapse: separate;
  box-sizing: border-box;
  border-spacing: 0px;
  border-color: #ffffff;
  border-radius: 34px;
  padding-bottom: 20px;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 0px #272d3b33;
}
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #272d3b33;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #ffffff;
}

.add-button-style {
  position: fixed;
  width: 60px;
  height: 60px;
  background: #ff0000 0% 0% no-repeat padding-box !important;

  border-color: #ff0000 !important;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 0px 10px 20px #00000029;
}
</style>
