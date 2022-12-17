<template>
  <div class="template">
    <proj-sidebar></proj-sidebar>
    <div class="router" :style="main">
      <proj-navbar></proj-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import SideBar from "../components/dashboard/SideBar";
import NavBar from '../components/dashboard/NavBar';

export default {
  components: {
    "proj-sidebar": SideBar,
    'proj-navbar': NavBar
  },
  computed: {
    main() {
      return this.$store.getters['template/main'];
    },
  },
}
</script>
<style scoped>
.template {
  background-color: aliceblue;
  display: flex; 
  flex-direction: row; 
}

</style>
