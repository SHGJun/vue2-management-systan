<template>
    <div class="tags">
        <el-tag class="tag" size="medium" :closable="index>0"
            v-for="item,index in tags"
            :key="item.path"
            :effect="item.title==$route.meta.titles[$route.meta.titles.length-1]?'dark':'plain'"
            @click="goTo(item.path)"
            @close="close(index)"
            :disable-transitions="true"
            @contextmenu.native.prevent="rightClick($event,index)"
        >
        <i class="cir" v-show="item.title==$route.meta.titles[$route.meta.titles.length-1]"></i>
        {{item.title}}</el-tag>
        

        <TagsMenu 
            v-show="isShowTagsMenu"
            :clientX="clientX"
            :clientY="clientY"
            :clickIndex="clickIndex"
            :tagsLength="tags.length"
            @fn="clickMenu"
        />
    </div>
</template>

<script>
import TagsMenu from "./TagsMenu.vue"
export default {
    components:{
        TagsMenu
    },
    data () {
        return {
            tags:[{
                title:"首页",
                path:"/home"
            }],
            isShowTagsMenu:false,
            clientX:0,
            clientY:0,
            clickIndex:0
        }
    },
    mounted(){
        // 给文档添加点击事件
        // document.addEventListener("click",this.closeMenu);
    },
    beforeDestroy(){
        document.removeEventListener("click",this.closeMenu);
    },
    methods:{
        clickMenu(i){
            if(i==5){
                // 全部关闭
                // 1 处理数组
                this.tags=[{
                    title:"首页",
                    path:"/home"
                }]
                // 跳转到首页
                this.goTo("/home")
            }
        },
        rightClick(e,i){
            console.log("右键点击了",e.clientX,e.clientY);
            this.isShowTagsMenu = true;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.clickIndex = i;
        },
        closeMenu(){
            this.isShowTagsMenu = false;
        },
        goTo(path){
            this.$router.push(path);
            this.closeMenu();
        },
        close(i){
            if(this.tags[i].path===this.$route.path && i!==this.tags.length-1){
                this.$router.push(this.tags[this.tags.length-1].path);
            }
            else if(i===this.tags.length-1){
                this.$router.push(this.tags[this.tags.length-2].path);
            }
            // 关闭当前项，本质上就是删除tags的对应项
            this.tags.splice(i,1);
            this.closeMenu();
        }
    },
    watch:{
        $route:{
            immediate:true, // 立即监听
            handler(val,oldval){
                const bool = this.tags.find(item=>{
                    // return 当前路径跟不跟 item.path 相等
                    return val.path == item.path 
                })
                if(!bool){
                    this.tags.push({
                        title:val.meta.titles[val.meta.titles.length-1],
                        path:val.path
                    })
                }
                
            }
        }
    }
}
</script>
 
<style lang = "scss" scoped>
    .tags{
        padding-left: 20px;
        padding-top: 5px;
        .tag{
            cursor: pointer;
            margin-right: 5px;

            .cir{
                width: 8px;
                height: 8px;
                margin-right: 4px;
                background-color: #fff;
                border-radius: 50%;
                display: inline-block;
            }
        }
    }
</style>