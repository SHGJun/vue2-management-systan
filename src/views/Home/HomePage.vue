<template>
  <div>
    <div>{{ $store.state.count }}</div>
    <el-button @click="handleAddCount">增加</el-button>
    <el-button @click="handleTenCount">减少</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    handleAddCount() {
    },
    handleTenCount() {
    },
  },
};
</script>