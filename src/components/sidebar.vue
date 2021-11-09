<template>
  <div class="sidebar">
    <div class="logo"></div>
    <div class="nav-group">
      <div
        class="nav-link"
        v-bind:class="[$route.path === '/Dashboard' ? 'selected' : '']"
      >
        <span>DASHBOARD</span>
      </div>
      <div class="nav-link"><span>USERS</span></div>
      <div class="nav-link"><span>SETTINGS</span></div>
      <div class="nav-link" v-on:click="logout"><span>LOGOUT</span></div>
    </div>

    <!-- USER INFO -->
    <div id="user-info">
      <p>{{ this.user_title }} {{ this.user_name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      user_name: null,
      user_title: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    this.user_name = this.$store.state.auth.user_name;
    this.user_title = this.$store.state.auth.user_title;
  },
};
</script>

<style lang="scss">
.sidebar {
  background-color: #1d4354;
  width: 300px;
  height: 100vh;
  position: sticky;
  z-index: 100;

  .selected {
    opacity: 0.65;
    position: relative;

    &::after {
      content: "";
      width: 10px;
      height: 100%;
      background-color: $primary-red;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .logo {
    background-image: url("../assets/logo-wt-md.png");
    width: 100%;
    height: 75px;
    background-position: center;
    background-origin: center;
    background-repeat: no-repeat;
  }

  #user-info {
    position: fixed;
    top: 0;
    right: 0;
    background-color: $secondary-bg;
    color: $bg-color;
    padding: 1em 2em;
    margin: 1em 1em 0 0;
    border-radius: 5px;
    letter-spacing: 2px;
    font-size: 0.8rem;
    box-shadow: 0 0 5px $primary-black;
  }

  .nav-group {
    .nav-link {
      text-align: left;
      color: white;
      padding: 1em;
      background-color: $primary-black;
      border-bottom: solid $secondary-bg 1px;
      letter-spacing: 2px;
      font-size: 0.9rem;
      cursor: pointer;

      transition: 0.2s ease;

      &:hover:not(.selected) {
        opacity: 0.85;
        padding-left: 1.5em;
      }
    }
  }
}
</style>
