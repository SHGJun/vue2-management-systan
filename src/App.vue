<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getLocalStorage, getTimeState } from "@/utils";
export default {
  data() {
    return {};
  },
  created() {
    if(!getLocalStorage('shg_token')) return
    const stateMessage = getTimeState();
    this.$notify({
          title: '消息提示',
          message:stateMessage,
          position: 'top-right'
        });
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>