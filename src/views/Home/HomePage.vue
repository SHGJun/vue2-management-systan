<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>welcome</span>
      </div>
      <p>
        Vue2 + Element UI + Vuex + Echarts后台管理系统基本架构
      </p>
      <br>
      <p>
        GitHub：<a target="_blank" href="https://github.com/SHGJun/vue2-management-systan">https://github.com/SHGJun/vue2-management-systan</a>
      </p>
      <br>
      <p>
        博客园：时光SHG
      </p>
      <br>
      <p>
        联系QQ：177540246
      </p>
      <br>
      <p>
        基本架构正在火速开发中.......
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>