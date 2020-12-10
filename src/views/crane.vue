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

    <b-modal
      id="chartDetail"
      ref="chartDetail"
      centered
      v-bind:title="chartEconomic"
      hide-footer
      ok-only
    >
      <barChart />
    </b-modal>
    <div class="text-position">
      <label class="text-style-user">Grúas</label>
    </div>
    <br />
    <div class="grid-table">
      <div class="add-button-position">
        <b-button
          b-button
          @click="addCrane()"
          type="button"
          class="btn btn-danger add-button-style rounded-circle"
        >
          <img src="../assets/add.png" />
        </b-button>

        <b-modal
          centered
          id="craneDetail"
          size="lg"
          ref="craneDetail"
          v-bind:title="title"
          hide-footer
          @hidden="resetForm"
          ok-only
          no-stacking
        >
          <b-tabs content-class="mt-3" justified ref="wizard">
            <b-tab title="Chasis" active>
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form
                  ref="form"
                  @submit.stop.prevent="handleSubmit(onSubmit)"
                >
                  <b-container fluid>
                    <b-row class="mb-1">
                      <b-col align-self="start">
                        <validation-provider
                          name="Numero Economico"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="economicNumber-input"
                            label="Numero Economico*"
                            label-for="economicNumber-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="economicNumber-input"
                              name="economicNumber-input"
                              v-model="crane.economicNumber"
                              :disabled="isDisabled"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Numero Economico"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="Modelo"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="model-input"
                            label="Modelo*"
                            label-for="model-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="model-input"
                              name="model-input"
                              v-model="crane.model"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Modelo"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row class="mb-3">
                      <b-col align-self="start">
                        <validation-provider
                          name="Serie"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="serie-input"
                            label="Serie*"
                            label-for="serie-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="serie-input"
                              name="serie-input"
                              v-model="crane.serie"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Serie"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="Submarca"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="subbrand-input"
                            label="Submarca*"
                            label-for="subbrand-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="subbrand-input"
                              name="subbrand-input"
                              v-model="crane.subbrand"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Submarca"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col align-self="start">
                        <validation-provider
                          name="Marca"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="brand-input"
                            label="Marca*"
                            label-for="brand-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="brand-input"
                              name="brand-input"
                              v-model="crane.brand"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Marca"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="Proceso"
                          :rules="{ required: true }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="process-input"
                            label="Proceso"
                            label-for="process-input"
                          >
                            <b-form-select
                              plain
                              id="process-input"
                              name="process-input"
                              class="select-style"
                              v-model="crane.process"
                              :state="getValidationState(validationContext)"
                            >
                              <b-form-select-option disabled v-bind:value="null"
                                >Selecciona proceso</b-form-select-option
                              >
                              <b-form-select-option
                                v-for="process in processList"
                                v-bind:value="process.id"
                                >{{ process.process}}</b-form-select-option
                              >
                            </b-form-select>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col align-self="start">
                        <validation-provider
                          name="Estatus"
                          :rules="{ required: true }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="status-input"
                            label="Estatus"
                            label-for="status-input"
                          >
                            <b-form-select
                              plain
                              id="status-input"
                              name="status-input"
                              class="select-style"
                              v-model="crane.status"
                              :state="getValidationState(validationContext)"
                            >
                              <b-form-select-option disabled v-bind:value="null"
                                >Selecciona un Estatus</b-form-select-option
                              >
                              <b-form-select-option
                                v-for="status in statusList"
                                v-bind:value="status.id"
                                >{{ status.name }}</b-form-select-option
                              >
                            </b-form-select>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="RPE"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="RPE-input"
                            label="Operador*"
                            label-for="RPE-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="RPE-input"
                              name="RPE-input"
                              v-model="crane.rpe"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Operador"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form>
              </validation-observer>
            </b-tab>
            <b-tab title="Equipo Hidraulico">
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form
                  ref="form"
                  @submit.stop.prevent="handleSubmit(onSubmit)"
                >
                  <b-container fluid>
                    <b-row class="mb-3">
                      <b-col align-self="start">
                        <validation-provider
                          name="Serie"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="serieHT-input"
                            label="Serie*"
                            label-for="serieHT-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="serieHT-input"
                              name="serieHT-input"
                              v-model="crane.serieHT"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Serie"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="Marca"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="brandHT-input"
                            label="Marca*"
                            label-for="brandHT-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="brandHT-input"
                              name="brandHT-input"
                              v-model="crane.brandHT"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Marca"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col align-self="start">
                        <validation-provider
                          name="Submarca"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="subbrandHT-input"
                            label="Submarca*"
                            label-for="subbrandHT-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="subbrandHT-input"
                              name="subbrandHT-input"
                              v-model="crane.subbrandHT"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Submarca"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                      <b-col align-self="end">
                        <validation-provider
                          name="Modelo"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="modelHT-input"
                            label="Modelo*"
                            label-for="modelHT-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="modelHT-input"
                              name="modelHT-input"
                              v-model="crane.modelHT"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Modelo"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col align-self="start">
                        <validation-provider
                          name="Especificacion LAPEM"
                          :rules="{ required: true, min: 3 }"
                          v-slot="validationContext"
                        >
                          <b-form-group
                            id="LAPEM-input"
                            label="Especificacion LAPEM*"
                            label-for="LAPEM-input"
                          >
                            <b-form-input
                              class="input-style"
                              id="LAPEM-input"
                              name="LAPEM-input"
                              v-model="crane.LAPEM"
                              :state="getValidationState(validationContext)"
                              placeholder="Ingresar Especificacion LAPEM"
                            ></b-form-input>

                            <b-form-invalid-feedback>{{
                              validationContext.errors[0]
                            }}</b-form-invalid-feedback>
                          </b-form-group>
                        </validation-provider>
                      </b-col>
                    </b-row>
                  </b-container>
                  <div class="buttons-position">
                    <b-button
                      class="button-style-cancel"
                      variant="outline-danger"
                      @click="hideModal"
                    >
                      CANCELAR
                    </b-button>
                    <b-button class="button-style-save" type="submit">
                      GUARDAR
                    </b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-tab>
          </b-tabs>
        </b-modal>
      </div>
      <div class="table-position">
        <div class="card card-style table-style">
          <div class="table-responsive">
            <table class="table text_style_table">
              <thead>
                <tr>
                  <th scope="col">
                    Número Economico
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.EconomicNumber"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>

                  <th scope="col">
                    Serie
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.Serie"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>

                  <th scope="col">
                    OPERADOR
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.Operator"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>
                  <th scope="col">
                    ESTATUS
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.Status"
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
                <tr v-for="crane in craneList">
                  <th scope="row">{{ crane.crane.economicNumber }}</th>
                  <td>{{ crane.crane.serie }}</td>
                  <td>{{ crane.name }}</td>
                  <td>{{ crane.status.name }}</td>
                  <td>
                    <div>
                      <b-button
                        class="button"
                        type="button"
                        @click="openChart(crane.crane.economicNumber)"
                      >
                        <img
                          alt="CFE"
                          class="icon-size"
                          src="../assets/chart.png"
                      /></b-button>

                      <b-button
                        @click="updateCrane(crane)"
                        class="button"
                        type="button"
                      >
                        <img
                          alt="CFE"
                          class="icon-size"
                          src="../assets/edit.png"
                      /></b-button>

                      <b-button
                        class="button"
                        @click="deleteCrane(crane.crane.economicNumber)"
                        type="button"
                      >
                        <img
                          alt="CFE"
                          class="icon-size"
                          src="../assets/delete.png"
                      /></b-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-position">
      <b-pagination
        v-model="ListFilters.Page"
        :total-rows="PaginationTotalSize"
        :per-page="ListFilters.PageSize"
        @change="handlePageChange"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import CraneService from "../services/crane.service";
import barChart from "../components/barChart";

export default {
  components: {
    barChart,
  },
  created() {
    CraneService.getAll(this.ListFilters)
      .then((response) => {
        this.craneList = response.data.craneList;
        console.log(this.craneList);
        this.PaginationTotalSize = response.data.paginationTotalSize;
        this.CurrentPage = response.data.page;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      //alert
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      message: "",

      craneList: null,
      PaginationTotalSize: "",
      ListFilters: {
        Page: 1,
        PageSize: 5,
        EconomicNumber: "",
        Serie: "",
        Operator: "",
        Status: "",
      },
      crane: {
        rpe: "",
        LAPEM: "",
        serie: "",
        subbrand: "",
        model: "",
        brand: "",
        economicNumber: "",
        process: "",
        status: "",
        serieHT: "",
        brandHT: "",
        subbrandHT: "",
        modelHT: "",
      },
      processList: null,
      statusList: null,
      title: "",
      isDisabled: "",
      chartEconomic: "",
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
      CraneService.getAll(this.ListFilters)
        .then((response) => {
          this.craneList = response.data.craneList;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshTable() {
      CraneService.getAll(this.ListFilters)
        .then((response) => {
          this.craneList = response.data.craneList;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteCrane(economicNumber) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("¿Estas seguro de eliminar a " + economicNumber + "?", {
          buttonSize: "sm",
          okVariant: "success",
          okTitle: "CONFIRMAR",
          size: "md",
          cancelTitle: "CANCELAR",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
          cancelVariant: "danger",
        })
        .then((value) => {
          if (value) {
            CraneService.delete(economicNumber)
              .then((response) => {
                this.message = "La grúa ha sido eliminada correctamente";
                this.showAlert();
                this.refreshTable();
              })
              .catch((err) => {
                this.message = err;
                this.showAlert();
              });
          }
        })
        .catch((err) => {});
    },
    //MODAL METHODS
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {
      this.crane = {
        rpe: "",
        LAPEM: "",
        serie: "",
        subbrand: "",
        model: "",
        brand: "",
        economicNumber: "",
        process: "",
        status: "",
        serieHT: "",
        brandHT: "",
        subbrandHT: "",
        modelHT: "",
        update: "",
      };
    },
    onSubmit() {
      console.log(this.crane);
      if (this.crane.update == 1) {
        CraneService.update(this.crane)
          .then((response) => {
            this.message = "La grúa ha sido actulizada correctamente";
            this.showAlert();
            this.refreshTable();
          })
          .catch((e) => {
            this.message = e;
            this.showAlert();
          });
      } else {
        CraneService.create(this.crane)
          .then((response) => {
            this.message = "La grúa ha sido creada correctamente";
            this.showAlert();
            this.refreshTable();
          })
          .catch((e) => {
            this.message = e;
            this.showAlert();
          });
      }

      this.hideModal();
      this.resetForm();
    },
    hideModal() {
      this.$refs["craneDetail"].hide();
      this.resetForm();
    },
    getCombos() {
      CraneService.getProcess()
        .then((response) => {
          this.processList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      CraneService.getStatus()
        .then((response) => {
          this.statusList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addCrane() {
      this.title = "Agregar Grúa";
      this.isDisabled = false;
      this.getCombos();

      this.$refs["craneDetail"].show();
    },
    updateCrane(craneIn) {
      this.title = "Editar Grua";
      this.isDisabled = true;

      this.getCombos();
      CraneService.getCraneByEconomicNumber(craneIn.crane.economicNumber)
        .then((response) => {
          console.log(response.data);
          (this.crane.rpe = response.data.rpe),
            (this.crane.serie = response.data.serie),
            (this.crane.model = response.data.model),
            (this.crane.subbrand = response.data.subBrand),
            (this.crane.economicNumber = response.data.economicNumber),
            (this.crane.brand = response.data.brand),
            (this.crane.process = response.data.process),
            (this.crane.LAPEM = response.data.hydraulic.lapem),
            (this.crane.brandHT = response.data.hydraulic.brand),
            (this.crane.serieHT = response.data.hydraulic.serie),
            (this.crane.subbrandHT = response.data.hydraulic.subBrand),
            (this.crane.modelHT = response.data.hydraulic.model),
            (this.crane.serieHT = response.data.hydraulic.serie),
            (this.crane.status = response.data.status),
            (this.crane.update = 1);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$refs["craneDetail"].show();
    },
    openChart(economicNumber) {
      this.chartEconomic = economicNumber + " - Horas Trabajadas";

      this.$refs["chartDetail"].show();
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
.modal-content {
  width: 100%;
  box-shadow: 0px 10px 20px #0000005e;
  align-items: center;
}

.modal-content {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 52px;
  outline: 0;
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
.search-button-position {
  float: right;
  padding-right: 15px;
}
.add-button-position {
  position: relative;
  float: right;
  padding-right: 52px;
  z-index: calc(1030 + 8);
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
.custom-control-input:checked ~ .custom-control-label::before {
  color: #007f3861;
  border-color: #007f3861;
  background-color: #007f3861;
}
.custom-switch .custom-control-input:checked ~ .custom-control-label::after {
  background-color: #007f38;
}
/* for md */

.custom-switch.custom-switch-md .custom-control-label {
  padding-left: 2rem;
  padding-bottom: 1.5rem;
}

.custom-switch.custom-switch-md .custom-control-label::before {
  height: 1.5rem;
  width: calc(2rem + 0.75rem);
  border-radius: 3rem;
}

.custom-switch.custom-switch-md .custom-control-label::after {
  width: calc(1.5rem - 4px);
  height: calc(1.5rem - 4px);
  border-radius: calc(2rem - (1.5rem / 2));
}

.custom-switch.custom-switch-md
  .custom-control-input:checked
  ~ .custom-control-label::after {
  transform: translateX(calc(1.5rem - 0.25rem));
}
/*MODAL*/
.align-left {
  text-align: left !important;
}
.select-style {
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 31px !important;
  border-color: #ffffff;
  width: 340px;
}
.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  margin-left: 25px;
}
.modal-content {
  border-radius: 52px;
  width: 300%;
  padding: 0px;
  box-shadow: 0px 10px 20px #0000005e;
}
.modal-footer {
  border-top: 1px solid #ffffff;
}
.buttons-position {
  float: right;
}
.popup-card {
  box-shadow: 0px 10px 20px #0000005e;
  border-radius: 52px;
  opacity: 1;
}
.button-style-save {
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 25px;
  opacity: 1;
  width: 160px;
  background: #007f38 0% 0% no-repeat padding-box;
  font: normal normal 600 Montserrat;
  letter-spacing: 0.8px;
  color: #ffffff;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-right: 20px;
}
.button-style-cancel {
  background: #f30808 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 25px;
  width: 160px;
  opacity: 1;
  font: normal normal 600 Montserrat;
  letter-spacing: 0.8px;
  color: #ffffff;
  margin-top: 25px;
  margin-bottom: 25px;
}

.input-style {
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 31px !important;
  border-color: #ffffff;
  width: 340px;
}
.close {
  display: none;
}
a {
  color: #007f38;
  text-decoration: none;
  background-color: transparent;
}
</style>