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
      <label class="text-style-user">Usuarios</label>
    </div>
    <br />
    <div class="grid-table">
      <div class="add-button-position">
        <b-button
          b-button
          @click="addUser()"
          type="button"
          class="btn btn-danger add-button-style rounded-circle"
        >
          <img src="../assets/add.png" />
        </b-button>
        <b-modal
          centered
          id="userDetail"
          size="lg"
          ref="userDetail"
          class="modal-content-style"
          v-bind:title="title"
          hide-footer
          no-stacking
          @hidden="resetForm"
        >
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form
              ref="form"
              @submit.stop.prevent="handleSubmit(onSubmit)"
              class="align-left"
            >
              <b-container fluid>
                <b-row class="mb-1">
                  <b-col align-self="start">
                    <validation-provider
                      name="RPE"
                      :rules="{ required: true, min: 3 }"
                      v-slot="validationContext"
                    >
                      <b-form-group
                        id="RPE-input"
                        label="RPE*"
                        label-for="RPE-input"
                      >
                        <b-form-input
                          class="input-style"
                          id="RPE-input"
                          name="RPE-input"
                          v-model="user.RPE"
                          :disabled="isDisabled"
                          :state="getValidationState(validationContext)"
                          placeholder="Ingresar RPE"
                        ></b-form-input>

                        <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                  <b-col align-self="end">
                    <validation-provider
                      name="Puesto"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                    >
                      <b-form-group
                        id="level-input"
                        label="Puesto"
                        label-for="level-input"
                      >
                        <b-form-select
                          plain
                          id="level-input"
                          name="level-input"
                          class="select-style"
                          v-model="user.level"
                          :state="getValidationState(validationContext)"
                        >
                          <b-form-select-option disabled v-bind:value="null"
                            >Selecciona puesto</b-form-select-option
                          >
                          <b-form-select-option
                            v-for="level in levelList"
                            v-bind:value="level.id"
                            >{{ level.level }}</b-form-select-option
                          >
                        </b-form-select>

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
                      name="Nombre"
                      :rules="{ required: true, min: 3 }"
                      v-slot="validationContext"
                    >
                      <b-form-group
                        id="name-input"
                        label="Nombre*"
                        label-for="name-input"
                      >
                        <b-form-input
                          class="input-style"
                          id="name-input"
                          name="name-input"
                          v-model="user.name"
                          :state="getValidationState(validationContext)"
                          placeholder="Ingresar Nombre"
                        ></b-form-input>

                        <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                    <div v-if="showFields">
                      <b-form-group
                        id="password-input"
                        label="Contraseña*"
                        label-for="password-input"
                      >
                        <b-form-input
                          class="input-style"
                          id="password-input"
                          name="password-input"
                          v-model="user.password"
                          type="password"
                          placeholder="Ingresar Contraseña"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                  </b-col>
                  <b-col>
                    <label>Jefe</label>
                    <vue-suggestion
                      :items="items"
                      id="boss-input"
                      v-model="item"
                      :setLabel="setLabel"
                      @changed="inputChange"
                      @selected="itemSelected"
                      :itemTemplate="itemTemplate"
                    >
                    </vue-suggestion>
                    <div v-if="showFields">
                      <b-form-group
                        id="estatus-input"
                        label="Estatus"
                        label-for="estatus-input"
                      >
                        <div
                          class="custom-control custom-switch custom-switch-md justify margin-switch"
                        >
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customSwitch2"
                            v-model="user.status"
                            @change="!user.status"
                          />
                          <label
                            class="custom-control-label"
                            for="customSwitch2"
                          ></label>
                        </div>
                      </b-form-group>
                    </div>
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
        </b-modal>
      </div>

      <div class="table-position">
        <div class="card card-style table-style">
          <div class="table-responsive">
            <table class="table text_style_table">
              <thead>
                <tr>
                  <th scope="col">
                    RPE
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.RPE"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>

                  <th scope="col">
                    NOMBRE
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.Name"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>
                  <th scope="col">
                    PUESTO
                    <input
                      v-on:keyup.enter="refreshTable()"
                      v-model="ListFilters.Level"
                      type="filter"
                      class="form-control filter-input"
                    />
                  </th>
                  <th scope="col">
                    ESTATUS
                    <div
                      class="custom-control custom-switch custom-switch-md justify margin-switch"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        @change="refreshTable()"
                        v-model="ListFilters.Status"
                      />
                      <label
                        class="custom-control-label"
                        for="customSwitch1"
                      ></label>
                    </div>
                  </th>
                  <th scope="col">
                    <label class="action_label">ACCIONES</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userList">
                  <th scope="row">{{ user.rpe }}</th>
                  <td>{{ user.name }}</td>
                  <td>{{ user.level.level }}</td>
                  <td>
                    <div class="custom-control custom-switch custom-switch-md">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        v-model="user.status"
                      />
                      <label
                        class="custom-control-label"
                        for="customSwitch1"
                      ></label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <b-button
                        @click="updateUser(user)"
                        class="button"
                        type="button"
                      >
                        <img
                          alt="CFE"
                          class="icon-size"
                          src="../assets/edit.png"
                        />
                      </b-button>

                      <b-button
                        class="button"
                        @click="deleteUser(user.rpe, user.name)"
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
        <div class="pagination-position">
          <nav>
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
import UserService from "../services/user.service";
import itemTemplate from "../mixins/ItemTemplate.vue";

export default {
  name: "user-list",

  components: {},
  created() {
    UserService.getAll(this.ListFilters)
      .then((response) => {
        this.userList = response.data.userList;
        this.PaginationTotalSize = response.data.paginationTotalSize;
        this.CurrentPage = response.data.page;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      //GetALL
      userList: null,
      PaginationTotalSize: "",
      ListFilters: {
        Page: 1,
        PageSize: 5,
        RPE: "",
        Name: "",
        Level: "",
        Status: true,
      },

      //modal
      isDisabled: false,
      showSpinner: false,
      title: "",
      levelList: null,
      //alert
      dismissSecs: 2,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      message: "",
      //user form
      user: {
        RPE: "",
        name: "",
        password: "",
        boss: "",
        level: null,
        update: "",
        status: true,
      },
      item: {},
      items: null,
      itemTemplate,
      showFields: false,
      modalStatus: true,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    //MODAL METHODS
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    resetForm() {
      this.user = {
        RPE: "",
        name: "",
        password: "",
        boss: "",
        level: null,
      };
      this.item = {};
    },

    onSubmit() {
      if (this.user.update == 1) {
        if (this.user.password == "") {
          this.user.password = null;
        }
        UserService.update(this.user)
          .then((response) => {
            this.message = "El usuario ha sido actualizado correctamente";
            this.showAlert();
            this.refreshTable();
          })
          .catch((e) => {
            this.message = e;
            this.showAlert();
          });
      } else {
        this.user.password = this.user.RPE;
        UserService.create(this.user)
          .then((response) => {
            this.message = "El usuario ha sido creado correctamente";
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
      this.$refs["userDetail"].hide();
      this.resetForm();
    },

    addUser() {
      this.title = "Agregar Usuario";
      this.showFields = false;
      this.isDisabled = false;
      UserService.getLevels()
        .then((response) => {
          this.levelList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      this.$refs["userDetail"].show();
    },

    updateUser(userIn) {
      this.showFields = true;
      this.title = "Editar Usuario";
      this.isDisabled = true;
      UserService.getLevels()
        .then((response) => {
          this.levelList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      UserService.getUserByRPE(userIn.rpe)
        .then((response) => {
          this.user.RPE = response.data.rpe;
          this.user.name = response.data.name;
          this.user.boss = response.data.reportsTo;
          this.user.level = response.data.level;
          this.user.status = response.data.status;
          this.item.rpe = response.data.reportsTo;
          this.item.name = response.data.bossName;
          console.log(this.item);
          this.itemSelected(this.item);
          this.setLabel(this.item);
          this.user.update = 1;
        })
        .catch((err) => {
          console.log(err);
        });

      this.$refs["userDetail"].show();
    },
    handlePageChange(value) {
      this.ListFilters.Page = value;
      UserService.getAll(this.ListFilters)
        .then((response) => {
          this.userList = response.data.userList;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshTable() {
      UserService.getAll(this.ListFilters)
        .then((response) => {
          this.userList = response.data.userList;
          this.PaginationTotalSize = response.data.paginationTotalSize;
          this.CurrentPage = response.data.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser(rpe, name) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("¿Estas seguro de eliminar a " + name + "?", {
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
            UserService.delete(rpe)
              .then((response) => {
                this.message = "El usuario ha sido eliminado correctamente";
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

    //AUTOCOMPLETE
    itemSelected(item) {
      this.item = item.rpe;
      this.user.boss = item.rpe;
    },
    setLabel(item) {
      return item.name;
    },
    inputChange(text) {
      UserService.getOperator(text)
        .then((response) => {
          this.items = response.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
[type="search"] {
  height: 37px;
  outline-offset: 0px;
  -webkit-appearance: none;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 31px !important;
  border-color: #ffffff;
  width: 340px;
  margin-top: 0px;
  margin-bottom: 18px;
}
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

.modal-content-style {
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
  border-radius: 52px !important;
  outline: 0;
  box-shadow: 0px 10px 20px #0000005e;
  align-items: center;
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