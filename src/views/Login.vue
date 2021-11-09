<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="logo"></div>
      <div id="response-box">
        <p>{{ this.response }}</p>
      </div>
      <div>
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <a v-on:click="forgot_password">Forgot Password?</a>
        <input type="submit" value="LOG IN" />
      </div>

      <!-- LOAD -->
      <HalfCircleSpinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
        v-if="load"
      />
    </form>
  </div>
</template>

<script>
import HalfCircleSpinner from "../components/load.vue";

export default {
  name: "Login",
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      username: null,
      password: null,
      response: null,
      load: false,
    };
  },
  methods: {
    login() {
      if (this.username != null && this.password != null) {
        this.load = true;

        this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
      } else this.promptResponse("Username/Password Can't Be Blank", "error");
    },
    forgot_password() {
      this.$router.push({ name: "Forgot_Password" });
    },
    promptResponse(msg, responsetype) {
      this.response = msg;

      this.load = false;

      let responsebox = document.querySelector("#response-box");

      if (responsetype == "error") {
        responsebox.style.background = "#ff0000";
        responsebox.style.color = "#e7e9e9";
      } else {
        responsebox.style.background = "#D1C5B2";
        responsebox.style.color = "#141414";
      }

      responsebox.style.display = "block";
    },
  },
  created() {
    this.$store.watch(
      (state) => state.auth.error,
      (newValue) => {
        if (newValue !== "") this.promptResponse(newValue, "error");
      }
    );
    let success = this.$route.params.success;

    if (success != undefined) {
      setTimeout(() => this.promptResponse(success, "success"), 500);
    }
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url("../assets/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  #response-box {
    text-align: center;
    font-size: 0.9rem;
    background-color: $primary-red;
    padding: 1em;
    display: none;
  }

  form {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $bg-color;
    border-radius: 5px;

    .logo {
      background-image: url("../assets/logo-md.png");
      width: 100%;
      height: 75px;
      background-position: center;
      background-origin: center;
      background-repeat: no-repeat;
    }

    div {
      display: grid;

      input:not([type="submit"]) {
        padding: 0.75em;
        margin: 1em 1em 0 1em;
      }

      input[type="submit"] {
        padding: 2em 0;
        background-color: $primary-black;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 0.9rem;
        transition: 0.2s ease;

        &:hover {
          opacity: 0.85;
        }
      }

      a {
        padding: 1em;
        font-size: 0.9rem;
        cursor: pointer;
        transition: 0.2s ease;

        &:hover {
          opacity: 0.85;
          transform: translateX(5px);
        }
      }
    }
  }
}
</style>
