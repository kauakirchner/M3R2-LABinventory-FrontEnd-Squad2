<template>
  <div class="side-bar p-2" :style="sidebar">

    <div class="sb-icon text-center">
      <img
        id="logo"
        src="../../assets/InventaryLogonobg.png"
        alt="DevInventary Logo"
        v-show="toggleSideBar"
      />
    </div>

    <div class="btns-div" v-show="toggleSideBar">
      <SideBarButtons
        title="Geral"
        icon1="fa-solid fa-chart-simple"
        btn1="Inventário"
        :method1="inventory"
        icon2="fa-solid fa-arrow-right-from-bracket"
        btn2="Sair"
        :method2="logout"
      />

      <SideBarButtons
        title="Colaboradores"
        icon1="fa-solid fa-user-plus"
        btn1="Cadastrar"
        :method1="collaboratorRegister"
        icon2="fa-solid fa-list"
        btn2="Listar"
        :method2="collaboratorsList"
      />

      <SideBarButtons
        title="Itens"
        icon1="fa-solid fa-circle-plus"
        btn1="Cadastrar"
        :method1="itemRegister"
        icon2="fa-solid fa-share-nodes"
        btn2="Emprestar"
        :method2="borrowItems"
      />
    </div>

    <!-- BUTTONS toggleSideBar=false-->
    <div class="text-center" v-show="!toggleSideBar">
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-chart-simple" :method="inventory" />
        <SmallIcon icon="fa-solid fa-arrow-right-from-bracket" :method="logout" />
      </div>
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-user-plus" :method="collaboratorRegister" />
        <SmallIcon icon="fa-solid fa-list" :method="collaboratorsList" />
      </div>
      <div class="col mb-5">
        <SmallIcon icon="fa-solid fa-circle-plus" :method="itemRegister" />
        <SmallIcon icon="fa-solid fa-share-nodes" :method="borrowItems" />
      </div>
    </div>

    <div id="switchDiv">
      <div id="switchBody" @click="toggleSwitch">
      <div id="switchCircle"></div>
      </div>
    </div>

  </div>
</template>
<script>
import SideBarButtons from "./SideBarButtons.vue"
import SmallIcon from "../SmallIcon.vue"

export default {

  components: {
    SideBarButtons, 
    SmallIcon
  },
  methods: {

    toggleSwitch() {

      let switchCircle = document.getElementById("switchCircle");
      let switchDiv = document.getElementById("switchDiv");
      let logoImg = document.getElementById("logo");

      if (switchCircle.className != "switchCircle") {
        switchCircle.className = "switchCircle";
        switchDiv.style.justifyContent = "center";

      } else {
        switchCircle.className = "";
        switchDiv.style.justifyContent = "right";
        logoImg.style.width = "auto";
      }
      this.$store.commit("template/controlSideBar");
    },
    inventory() {
      this.$router.push("/users/inventario");
    },
    logout() {
      this.$store.commit("auth/logOutUser")
      this.$toast.info(this.$store.getters["auth/setLogoutMsg"], {position: 'top-left'});
      this.$router.push("/");
    },
    collaboratorRegister() {
      this.$router.push("/users/cadastro-colaborador");
    },
    collaboratorsList() {
      this.$router.push("/users/colaboradores");
    },
    itemRegister() {
      this.$router.push("/users/cadastro-item");
    },
    
    borrowItems() {
      this.$router.push("/users/emprestar");
    },
  },
  computed: {
    sidebar() {
      return this.$store.getters["template/sidebar"];
    },
    toggleSideBar() {
      return this.$store.state.template.toggleSideBar;
    }

  },
}
</script>
<style scoped>
label {
  color: rgb(7, 201, 239);
}
#switchDiv {
  display: flex;
  justify-content: flex-end;
}
#switchBody {
  display: flex;
  justify-content: left; 
  align-items: center;
  width: 50px;
  height: 28px;
  border: 1px solid #fff;
  border-radius: 34px;
}
/* Switch circle */
#switchCircle {
  width: 21px;
  height: 21px;
  margin-left: 3px;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.4s;
}
.switchCircle {
  margin-left: 24px !important;
}

#sb-fa-icon {
  color: #2196f3;
}

.side-bar {
  position: sticky;
  top: 0;
  background-color: #2196f3;
  padding-right: 10px;
}
</style>
