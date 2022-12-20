<template>
  <div class="center-icon">
    <div class="onlyIcon" @click="method">
      <i :class="icon"> </i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
    },
    method: {},
  },
};
</script>
<style scoped>
i {
  color: #fff;
}

.center-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.onlyIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px solid #fff;
  padding: 6px 12px;
  width: 34px;
  height: 34px;
  cursor: pointer;
}

.onlyIcon:hover {
  background-color: #fff;
}

.onlyIcon:hover i {
  color: #2196f3;

}
</style>
