<template>
  <div id="app">
   
    <div v-if="isLoggedIn">
      <Menu />

      <Nav />

      <div id="main">
        <router-view />
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <Login />
    </div>
  </div>
</template>

<script>
import Menu from "./mixins/menu/menu.vue";
import Nav from "./mixins/nav/nav.vue";
import Login from "./views/login.vue";

export default {
  name: "app",
  created() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  components: {
    Login,
    Menu,
    Nav,
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style>
#main {
  transition: margin-left 0.5s;
  width: 95%;
  overflow: hidden;
  height: 100%;
  padding-left: 140px;
  padding-top: 120px;
}
</style>