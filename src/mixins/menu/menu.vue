<template>
  <div>
    <nav class="nav flex-column bar">
      <b-button
        v-b-toggle.sidebar-1
        type="button"
        class="icon-position button-menu"
        @click="menu()"
        ><img class="icon-menu-style" alt="CFE" src="../../assets/IconMenu.png"
      /></b-button>
      <router-link
        to="/"
        class="nav-link"
        v-on:click.native="changeStylesIcon()"
        ><img alt="CFE" class="icon-style" src="../../assets/home.png" />
      </router-link>
      <router-link
        to="/user"
        class="nav-link"
        v-if="logUser == 'Administrador'"
        v-on:click.native="changeStylesIcon()"
        ><img alt="CFE" class="icon-style" src="../../assets/person.png"
      /></router-link>
      <router-link
        to="/crane"
        class="nav-link"
        v-on:click.native="changeStylesIcon()"
        ><img alt="CFE" class="icon-style" src="../../assets/crane.png"
      /></router-link>
      <router-link
        to="/report"
        class="nav-link"
        v-on:click.native="changeStylesIcon()"
        ><img alt="CFE" class="icon-style" src="../../assets/report.png"
      /></router-link>
    </nav>

    <div>
      <b-sidebar
        no-header
        no-close-on-route-change
        id="sidebar-1"
        class="text-dark"
        shadow
      >
        <label class="text-dark text-menu-style">Menu</label>
        <nav class="nav flex-column bar">
          <router-link to="/" class="nav-link text-dark text-style"
            >Inicio</router-link
          >
          <router-link
            to="/user"
            class="nav-link text-dark text-style"
            v-if="logUser == 'Administrador'"
            >Usuarios</router-link
          >
          <router-link to="/crane" class="nav-link text-dark text-style"
            >Gruás</router-link
          >
          <router-link to="/report" class="nav-link text-dark text-style"
            >Reportes</router-link
          >
        </nav>
      </b-sidebar>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    logUser() {
      return this.$store.getters.userLog;
    },
  },
  data() {
    return {};
  },
  methods: {
    menu() {
      open = !open;

      if (!open) {
        document.getElementById("main").style.marginLeft = "130px";
        document.getElementById("main").style.width = "calc(100% - 130px)";
        document.getElementById("nav").style.width = "calc(100% - 250px)";
      }
      if (open) {
        document.getElementById("main").style.marginLeft = "0px";
        document.getElementById("main").style.width = "calc(100% - 50px)";
        document.getElementById("nav").style.width = "calc(100% - 81px)";
      }
    },
    changeStylesIcon() {
      if (open) {
        document.getElementById("main").style.marginLeft = "0px";
        document.getElementById("main").style.width = "calc(100% - 50px)";
        document.getElementById("nav").style.width = "calc(100% - 81px)";
      } else {
        document.getElementById("main").style.marginLeft = "130px";
        document.getElementById("main").style.width = "calc(100% - 130px)";
        document.getElementById("nav").style.width = "calc(100% - 250px)";
      }
    },
  },
};
</script>

<style>
.text-dark {
  color: #ffffff !important;
}
.text-menu-style {
  font: normal normal 600 20px/24px Montserrat;
  letter-spacing: 0px;
  opacity: 1;
  margin-left: 100px;
  margin-top: 35px;
}

.text-style {
  margin-top: 62px;
  font: normal normal 600 20px/24px Montserrat;
  letter-spacing: 0px;
  opacity: 1;
  margin-left: 90px;
}
.bg-light {
  background-color: #0d8a44 !important;
}
button.close {
  background-color: transparent !important;
}
.b-sidebar {
  width: 259px;
}
.bar {
  position: fixed;
  width: 81px;
  height: 100%;
  background-color: #007f38;
  z-index: calc(1030 + 8);
}

.icon-menu-style {
  margin-top: 25px;
  height: 30px;
  width: 30px;
}
.button-menu {
  color: #fff;
  background-color: #007f38 !important;
  border-color: #007f38 !important;
}
.icon-style {
  margin-top: 50px;
  height: 40px;
  width: 40px;
  margin-left: auto;
  margin-right: auto;
}

.btn-secondary:hover {
  color: black;
  background-color: transparent;
  border-color: transparent;
}
.btn-secondary {
  color: black;
  background-color: transparent;
  border-color: transparent;
}
.btn-secondary:focus,
.btn-secondary.focus {
  color: black;
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
}

.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: black;
  background-color: transparent;
  border-color: transparent;
}
</style>
