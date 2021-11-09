<template>
  <div id="app">
    <Sidebar v-if="showSidebar()" />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  methods: {
    showSidebar() {
      if (
        this.$route.path !== "/Login" &&
        this.$route.path !== "/Forgot_Password"
      )
        return true;
      else return false;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: $bg-color;
  font-family: "Roboto", sans-serif;
}

#app {
  display: flex;
}

.page {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 5em 3em 3em 3em;
}
</style>
