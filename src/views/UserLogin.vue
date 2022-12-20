<template>
    <main>
        <login-form 
            id="loginform" 
            @submit="auth" 
            :validation-schema="schema" 
            v-slot="{ errors }">
            
            <h1>Login</h1>
            <login-field 
                type="email" 
                class="form-control" 
                name="email" 
                v-model="user.email"
                placeholder="E-mail"
            />
            <span 
                class="text-danger" 
                v-text="errors.email" 
                v-show="showMailError">
            </span>
            <login-field 
                type="password" 
                class="form-control" 
                name="password" 
                v-model="user.password"
                placeholder="Senha"
            />
            <span 
                class="text-danger" 
                v-text="errors.password" 
                v-show="showPassError"
            >
            </span>
            <div class="row">
                <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
            <div class="row">
                <div>
                    <button 
                        class="btn btn-link link" 
                        data-bs-toggle="modal" 
                        data-bs-target="#newAccountModal"
                    >
                    Criar conta
                    </button>
                    <button class="btn btn-link link" @click="inProgress">Esqueceu a senha</button>
                </div>
                <button class="btn btn-outline-primary text-dark btn-google" id="google" @click="enterWithGoogle">G</button>
            </div>
           
        </login-form>
    </main>
    <ModalNewAccount></ModalNewAccount>
</template>
<script>
import { Form, Field } from 'vee-validate';
import rules from '../validations/validateusers';
import { useCookies } from 'vue3-cookies';
import ModalNewAccount from './ModalNewAccount.vue';
import { mapActions, mapState } from 'vuex';

const cookies = useCookies().cookies;
rules;

export default {
    data() {
        return {
            schema: {
                email: 'required',
                password: 'required',
            },
            user: {}
        }
    },
    components: {
        "login-form": Form,
        "login-field": Field,
        ModalNewAccount
    },
    methods: {
        ...mapActions(["auth/authentication", "auth/getUrlAuth"]),
        auth() {
            this['auth/authentication']({
                "email": this.user.email,
                "password": this.user.password
            }).then(() => {
                if(this.success) {
                    this.$toast.info(`Bem-vindo(a), ${this.userLogged.name}!`, {position: 'top-right'});
                    this.$router.push('/users/inventario');
                    return true;
                } 
                this.$toast.error(this.errorMsg);
            })
        },
        enterWithGoogle() {
            this["auth/getUrlAuth"]().then(() => {
                location.href = this.url_auth;
            })
        },
        cleanForm() {
            const form = document.getElementById('loginform');
            form.reset();
        },
        inProgress() {
            this.$toast.info(`Pedimos desculpas...a funcionalidade "Esqueceu senha?" está em construção.`, {position: 'top-left'});
        }
    },
    computed: {
        ...mapState({
            success: (state) => state.auth.success,
            errorMsg: (state) => state.auth.errorMsg,
            userLogged: (state) => state.auth.user,
            url_auth: (state) => state.auth.url_auth,
        }),
        showMailError() {
            if (this.user.email) {
                if (this.user.email.length > 0) {
                    return false;
                }
            }
            return true;
        },
        showPassError() {
            if (this.user.password) {
                if (this.user.password.length > 0) {
                    return false;
                }
            }
            return true;
        }, 
    },
    mounted() {
        if (cookies.get('logged') !== null) {
            if (cookies.get('logged').status === true) {
                this.$router.push('/users/inventario');
            }
        }
    }
}
</script>
<style scoped>
.btn {
    border-radius: 8px;
    padding: 10px;
    
}

.link {
    font-size: 12px;
}

.text-blue:hover {
    color: #2196f3;
}
main {
    background-color: #c3e0f8;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    width: 400px;
    height: 550px;
    background-color: rgba(255, 255, 255, 0.782);
    border-radius: 35px;
    box-shadow: 0px 10px 27px -6px rgba(0, 0, 0, 0.140);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    margin-bottom: 50px;
    font-size: 36px;
}

input {
    padding: 10px 0px 10px 15px;
    width: 285px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
}

p {
    font-size: 12px;
    margin-bottom: 20px;
}

div {
    display: flex;
    justify-content: left;
    width: 300px;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.btn-google {
    width: 40px;
    border-radius: 8px;
    font-weight: bold;
}


</style>