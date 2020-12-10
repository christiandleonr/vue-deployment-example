<template>
  <div>
    <div id="nav">
      <div>
        <nav class="navbar navbar-default navbar-right">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand">
                <img alt="CFE" class="image-style" src="../../assets/cfe.png" />
              </a>
            </div>

            <b-button class="button" type="button" @click="logout">
              <img alt="CFE" class="icon-size" src="../../assets/exit.png"
            /></b-button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
 
export default {
  
  created() {},
  data() {
    return { user: "" };
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    
  },
};
</script>

<style scoped>
.navbar.navbar-default {
  margin-bottom: 0;
}
.icon-size {
  width: 36px;
  height: 36px;
}


.text {
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
  font: normal normal 600 28px Montserrat;
  letter-spacing: 0px;
  color: #090909;
  opacity: 1;
}

.image-style {
  margin-top: 8px;
  width: 90px;
  height: 40px;
}
.margins {
  margin-left: 30px;
  margin-top: 18px;
}
#nav {
  transition: width 0.5s;
  width: calc(100% - 81px);
  height: 85px;
  box-shadow: 0px 5px 10px #00000029;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
