import axios from "axios";
import router from "../../router/index";

export default {
  state: {
    access_token: localStorage.getItem("access_token") || null,
    error: "",
    logout: "",
    user_name: localStorage.getItem("user_name") || null,
    user_id: localStorage.getItem("user_id") || null,
    user_title: localStorage.getItem("user_title") || null,
  },
  getters: {},
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.access_token = token;
      localStorage.setItem("access_token", token);
    },
    REMOVE_ACCESS_TOKEN(state) {
      state.access_token = null;
      localStorage.setItem("access_token", null);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    REMOVE_ERROR(state) {
      state.error = "";
    },
    SET_USER(state, user) {
      state.user_name = user["Name"];

      state.user_id = user["_id"]["$oid"];

      state.user_title = user["Title"];

      localStorage.setItem("user_name", user["Name"]);

      localStorage.setItem("user_id", user["_id"]["$oid"]);

      localStorage.setItem("user_title", user["Title"]);
    },
  },
  actions: {
    login({ commit }, data) {
      axios
        .post(`/auth/login`, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((resp) => {
          commit("SET_ACCESS_TOKEN", resp.data["access_token"]);

          // commit("SET_USER", resp.data["user"], {
          //   root: true,
          // });

          commit("SET_USER", resp.data["user"]);

          setTimeout(() => {
            if (
              resp.data["access_token"] !== null &&
              resp.data["access_token"] !== "" &&
              resp.data["access_token"] !== undefined
            ) {
              router.push({ name: "Dashboard" });
            }
          }, 500);
        })
        .catch((err) => {
          let error = err.response.data.error;
          commit("REMOVE_ERROR");

          setTimeout(() => {
            commit("SET_ERROR", error);
          }, 250);
        });
    },
    logout({ commit, state }) {
      axios
        .get(`/auth/logout`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": state.access_token,
          },
        })
        .then(() => {
          commit("REMOVE_ACCESS_TOKEN");

          router
            .push({
              name: "Login",
              params: { success: "You have been logged out" },
            })
            .catch(() => {});
        })
        .catch((err) => {
          console.log(err.data.error);
        });
    },
  },
};
