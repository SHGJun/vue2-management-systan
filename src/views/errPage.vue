<template>
  <div>
    <p>访问页面不存在！{{ timer }}后自动返回首页</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: 5,
    };
  },
  created() {
    this.countDowm(this.timer)
  },
  methods:{
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