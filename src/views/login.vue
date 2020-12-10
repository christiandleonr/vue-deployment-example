<template>
  <div id="login">
    <b-alert
      class="alert-style"
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ message }}</p>
    </b-alert>

    <div class="background-style">
      <div class="d-flex align-items-center justify-content-center h-100">
        <b-card
          class="card-style d-flex align-items-center justify-content-center"
        >
          <div class="image-style">
            <img
              alt="CFE"
              class="d-block mx-auto image-style"
              src="./../assets/cfelogo.png"
            />
          </div>
          <validation-observer ref="observer">
            <b-form ref="form" @submit.stop.prevent="login">
              <validation-provider
                name="RPE"
                :rules="{ required: true, min: 3 }"
                v-slot="validationContext"
              >
                <b-form-group
                  id="example-input-group-1"
                  label="RPE"
                  label-for="example-input-1"
                >
                  <b-form-input
                    class="input-style"
                    id="RPE-input"
                    name="RPE-input"
                    v-model="form.RPE"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>

                  <b-form-invalid-feedback id="input-1-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <validation-provider
                name="password"
                :rules="{ required: true, min: 3 }"
                v-slot="validationContext"
              >
                <b-form-group
                  id="password-input"
                  label="Password"
                  label-for="password-input"
                >
                  <b-form-input
                    class="input-style"
                    id="password-input"
                    name="password-input"
                    type="password"
                    v-model="form.password"
                    :state="getValidationState(validationContext)"
                  ></b-form-input>

                  <b-form-invalid-feedback id="input-1-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-button
                class="button-style-login text-style-button"
                variant="success"
                type="submit"
              >
                INGRESAR
              </b-button>
            </b-form>
          </validation-observer>
        </b-card>
      </div>
    </div>
  </div>
</template>
     

<script>
export default {
  data() {
    return {
      form: {
        RPE: null,
        password: null,
      },
      //alert
        dismissSecs: 2,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        message: "",
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {
      this.form = {
        RPE: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
    login: function () {
      let RPE = this.form.RPE;
      let password = this.form.password;
      this.$store
        .dispatch("login", { RPE, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.message = "Credenciales incorrectas";
          this.showAlert();
        });
    },
  },
};
</script>

<style scoped>
.alert-style {
  font: normal normal 600 20px Montserrat;
  letter-spacing: 2.5px;
  z-index: 10;
  position: fixed;
  width: 100%;
}
.card-style {
  z-index: 1;
  width: 500px;
  height: 550px;
  background: #ffffffa6 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 114px;
  opacity: 0.72;
  position: fixed;
}
.input-style {
  background: #ffffff7a 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 31px;
  opacity: 1;
  width: 340px;
}
.button-style-login {
  background: transparent linear-gradient(180deg, #007f38 0%, #00401c 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 9px 15px #00000029;
  border-radius: 42px;
  opacity: 1;
  width: 340px;
  margin-top: 60px;
  height: 45px;
}

.image-style {
  margin-left: 85px;
  margin-top: 35px;
  width: 188px;
  height: 80px;
  margin-bottom: 40px;
}
.text-style {
  text-align: left;
  font: normal normal 600 15px Montserrat;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
}
.text-style-button {
  font: normal normal 600 15px Montserrat;
  letter-spacing: 2.4px;
  color: #ffffff;
}
.background-style {
  background: #466368;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #b1c1b8 18%,
    #94c6a9 38%,
    #2b8050 66%,
    #00401c
  );
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
}
</style>