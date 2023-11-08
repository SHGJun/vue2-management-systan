<template>
  <div class="header">
    <el-button
      icon="el-icon-s-unfold"
      v-if="!isShowFold"
      @click="handleIsShowFold"
    />
    <el-button
      icon="el-icon-s-fold"
      v-if="isShowFold"
      @click="handleIsShowFold"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isShowFold: true,
    };
  },
  methods: {
    ...mapMutations({ changeIsCollapse: "navCollapse/changeIsCollapse" }),
    handleIsShowFold() {
      this.changeIsCollapse();
      this.isShowFold = !this.isShowFold
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 84px;
  box-shadow: 0 5px 5px #eee;
  padding-left: 20px;
  button {
    // width:50px;
    // height:50px;
    padding: 5px;
    margin: 0;
    font-size: 24px;
    border-style: none;
  }
}
</style>