<template>
    <div class="navbar-div">
        <div id="title">
            <p class="current-route" id="current-route">{{path}}</p>
        </div>
        <div id="user">
        <span v-text="userName"></span>
        <img :src="userImage" alt="" class="img">
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
            userName: 'Username',
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
        
        userImage() {
            const image = localStorage.getItem("userImage");
            return image;
        }
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
.current-route {
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

.img {
    width: 40px;
    border-radius: 30%;
}

@media screen and (max-width: 720px) {
    .current-route {
        color: #fff;
        font-size: 14px;
        margin: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    span {
        font-size: 12px;
    }
}
</style>