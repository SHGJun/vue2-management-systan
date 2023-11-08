<template>
  <!-- isCollapse为真则为div增加类名为isCollapse的样式，否则无 -->
  <div class="navbar" :class="{ isCollapse }">
    <div class="title">
      <h1>
        <!-- <img src="logo" alt=""> -->
        <span>时光SHG</span>
      </h1>
    </div>
    <el-menu
      :router="true"
      unique-opened
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#3f89fb"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <div v-for="item in menuListData" :key="item.id">
        <el-submenu :index="item.path" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            :index="child.path"
            v-for="child in item.children"
            :key="child.path"
            >{{ child.title }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import menuListData from '../menuListData';
export default {
  data(){
    return{
      menuListData:menuListData
    }
  },
  computed: {
    ...mapState({ isCollapse: (state) => state.navCollapse.isCollapse }),
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<style lang="scss">
.navbar {
  width: 220px;
  height: 100%;
  position: relative;
  background-color: #3f89fb;
  box-shadow: 6px 0 5px #ccc;
  // 过渡
  transition: all 0.3s;
  .title {
    text-align: center;
    padding: 20px 0;
    color: #fff;
  }
  .el-menu {
    width: 100%;
    border: none;
  }
  &.isCollapse {
    width: 64px;
  }
}
.isCollapse .el-submenu__title span {
  display: none;
}
.isCollapse .el-submenu__title .el-submenu__icon-arrow:before {
  display: none;
}
</style>