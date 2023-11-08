<template>
    <div class="layout">
        <NavBar />
        <div class="layout-right">
            <HeaderView />
            <ContentView />
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBarView.vue'
import HeaderView from './components/HeaderView.vue';
import ContentView from './components/ContentView.vue';
export default{
    components:{NavBar,HeaderView,ContentView},
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
    display: flex;
    .layout-right{
        flex: 1;
    }
}
</style>