<template>
    <div class="layout-content">
        <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style lang="scss">
.layout-content{
    padding: 20px;
    /* 重点！ 减号两边需要空格，否则无效 */
    height: calc(100% - 124px);
    /* opacity: 0; */
}

.fade-transform-enter, .fade-transform-leave-to{
    opacity: 0;
    transform: translateX(10px);
}

/* 指定要过渡的属性 */
.fade-transform-enter-active,.fade-transform-leave-active{
    transition:all .3s;
}

/* 进场的结束效果  和 离开场的开始效果  */
.fade-transform-enter-to, .fade-transform-leave{
    opacity: 1;
    transform: translateX(0px);
}
</style>