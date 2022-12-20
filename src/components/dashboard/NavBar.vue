<template>
    <div class="navbar-div">
        <div id="title">
            <p class="current-route">{{path}}</p>
        </div>
        <div id="user">
            <span v-text="userName"></span>
            <vue-gravatar class="gravatar" :email="user" size="40"/>
        </div>
    </div>
</template>
<script>
import { useCookies } from 'vue3-cookies';

const cookies = useCookies().cookies;

export default {
    data() {
        
        return {
            user: 'teste@teste.com',
            userName: 'Username'
        }
    },
    computed: {
        path() {
            let pathInfo = this.$router.currentRoute.value.fullPath;
            let currPath = pathInfo.split('/')[2];
            let splitName = currPath.split('-');
            let firstName = splitName[0];
            let secondName = splitName[1];
            let name1 = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} de ${secondName}`;
            let name2 = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)}`;
            return splitName.length > 1 ? name1 : name2;
        },
    },
    mounted() {
        this.user = cookies.get('logged').email;
        this.userName = cookies.get('logged').name;
    }
}
</script>
<style scoped>
.navbar-div {
    position: sticky;
    top: 0;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #2196f3;
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
}
p {
    color: #fff;
    font-size: 1.5em;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}
span {
    color: #fff;
    margin-right: 10px;
}
.gravatar {
    border-radius: 50%;
}
</style>