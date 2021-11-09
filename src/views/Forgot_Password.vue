<template>
  <div class="forgot-password">
    <form @submit.prevent="recover_password">
      <div class="logo"></div>
      <div id="response-box">
        <p>{{ this.response }}</p>
      </div>
      <div>
        <input type="email" placeholder="Email" v-model="email" />
        <a>Need more help? <span>Contact Support</span></a>
        <input type="submit" value="RECOVER PASSWORD" />
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
  name: "Forgot_Password",
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      email: null,
      alert: null,
      response: null,
      load: false,
    };
  },
  methods: {
    recover_password() {
      if (this.email !== null && this.email !== "") {
        this.promptResponse("A Recovery Email Has Been Sent!", "success");

        this.load = true;

        setTimeout(() => {
          this.$router.push({ name: "Login" });
          this.load = false;
        }, 5000);
      } else this.promptResponse("Invalid Email. Please Try Again", "error");
    },
    promptResponse(msg, responsetype) {
      this.response = msg;

      let responsebox = document.querySelector("#response-box");

      if (responsetype == "error") {
        responsebox.style.background = "$primary-red";
        responsebox.style.color = "$bg-color";
      } else {
        responsebox.style.background = "$primary-green";
        responsebox.style.color = "$primary-black";
      }

      responsebox.style.display = "block";
    },
  },
};
</script>

<style lang="scss">
.forgot-password {
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
        background-color: #ffdec9;
        margin: 1em;
        font-size: 0.8rem;
        text-align: center;

        span {
          font-size: 0.75rem;
          cursor: pointer;
          transition: 0.2s ease;
          color: #384f72;

          &:hover {
            opacity: 0.85;
          }
        }
      }
    }
  }
}
</style>
