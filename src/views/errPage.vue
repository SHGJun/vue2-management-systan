<template>
  <div @click="handleGoBack"></div>
</template>

<script>
export default {
  data() {
    return {
      timer: 3,
    };
  },
  created() {
    this.countDowm(this.timer)
  },
  methods:{
    handleGoBack(){
    this.$router.push('/');
    },
    countDowm(seconds){
        if(seconds <= 0){
            this.$router.push('/');
            return;
        }
        this.timer = seconds;
        setTimeout(()=>this.countDowm(seconds - 1),1000)
    }
  }
};
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: 100%;
    background: url('@/assets/404/404.jpeg')no-repeat center;
}
</style>