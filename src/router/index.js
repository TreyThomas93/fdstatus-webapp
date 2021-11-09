import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import axios from "axios";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Forgot_Password from "../views/Forgot_Password.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Forgot_Password",
    name: "Forgot_Password",
    component: Forgot_Password,
  },
  {
    path: "*",
    redirect: { name: "Dashboard" },
  },
  {
    path: "/",
    redirect: { name: "Dashboard" },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

const guard = function (to, from, next) {
  // check for valid auth token
  axios
    .get(`/auth/checkAuthToken`, {
      headers: { "x-access-token": store.state.auth.access_token },
    })
    .then(() => {
      // Token is valid, so continue
      next();
    })
    .catch(() => {
      // There was an error so redirect
      next({ name: "Login" });
    });
};

router.beforeEach((to, from, next) => {
  document.title = to["name"] || "FDStatus"; // CHANGE THIS TO APP NAME

  if (
    to.name !== "Login" &&
    from.name != "Login" &&
    to.name != "Forgot_Password" &&
    from.name != "Forgot_Password"
  ) {
    guard(to, from, next);
  } else next();
});

export default router;
