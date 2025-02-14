import { useCookies } from "vue3-cookies";
const cookies = useCookies().cookies;
import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      // Mensagem de erro para os inputs do login
      errorMsg: null,
      logoutMsg: null,
      success: false,
      user: null,
      users: [],
      url_auth: null,
    };
  },
  actions: {
    async authentication(context, user) {
      context.commit("setSuccess", false);
      context.commit("setUser", null);

      await axios.post("http://localhost:5000/users/login", user)
      .then((response) => {
        if(response.data.status_code !== 401) {
          context.commit("setSuccess", true);
          context.commit("setUser", {
            "name": response.data.name,
            "email": response.data.email,
            "token": response.data.token,
          });
          cookies.set("logged", {
              "name": response.data.name,
              "email": response.data.email,
              "token": response.data.token,
              "status": true,
          });
            
        }
      })
      .catch((e) => {
        console.error(e);
        context.commit("setMsgError", e.response.data.error);
      })
    },
    async getUrlAuth(context) {
      context.commit("setURL", null);
      await axios.post("http://localhost:5000/users/auth/google")
      .then((response) => {
        context.commit("setURL", response.data.url);
      })   
    }
  },
  mutations: {
    setURL(state, url) {
      state.url_auth = url;
    },
    setMsgError(state, msg) {
      state.errorMsg = msg;
    },
    setUsers(state, user) {
      state.users.push(user);
    },
    setSuccess(state, value) {
      state.success = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    logOutUser(state) {
      let check = cookies.get("logged");
      if (check !== null) {
        check.status = false;
        cookies.set("logged", check);
        state.logoutMsg = "Logout efetuado com sucesso.";
      }
      if (check === null) {
        state.logoutMsg = "Você já efetuou o logout!";
      }
    },
  },
  getters: {
    setLogoutMsg(state) {
      return state.logoutMsg;
    },
  },
};
