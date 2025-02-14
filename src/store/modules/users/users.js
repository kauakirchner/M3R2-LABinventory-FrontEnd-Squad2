import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            success: false,
            account: null,
            users: [],
            existe: false,
        }
    },
    mutations: {
        setAccountUser(state, value) {
            state.account = value;
        },
        setUsers(state, users) {
            state.users.push(users);
        },
        setExiste(state, value) {
            state.existe = value;
        },
        setSuccess(state, value) {
            state.success = value;
        }
    },
    actions: {
        async setAccount(context, user) {
            context.commit('setSuccess', false);
            const headers = {
                "Content-Type": "application/json"
            }
            await axios.post("http://localhost:5000/users/create", user, headers)
            .then((response) => {
                if(response.status == 201) {
                    context.commit('setSuccess', true);
                    context.commit('setUsers', user)
                    localStorage.setItem("userImage", user.image)
                }
                return true;
            })
            .catch((e) => {
                console.error("error", e);
            })
        }
    }
}