<template>
<!-- Tags右键之后的菜单组件 -->
    <div class="tags-menu" :style="{left:clientX+'px',top:clientY+'px'}">
        <ul>
            <li v-for="item,index in tmenu"
                :key="index"
                v-show="isShowLi(index)"
                @click="hdClick(index)"
            >
                <i :class="item.icon"></i>
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:["clientX","clientY","clickIndex","tagsLength"],
    data () {
        return {
            tmenu:[
                {
                    icon:"el-icon-refresh-right",
                    text:"刷新页面"
                },
                {
                    icon:"el-icon-close",
                    text:"关闭当前"
                },
                {
                    icon:"el-icon-circle-close",
                    text:"关闭其他"
                },
                {
                    icon:"el-icon-back",
                    text:"关闭左侧"
                },
                {
                    icon:"el-icon-right",
                    text:"关闭右侧"
                },
                {
                    icon:"el-icon-circle-close",
                    text:"全部关闭"
                }
            ]
 
        }
    },
    methods:{
        hdClick(i){
            this.$emit("fn",i)
            // if(i==5){
                // 全部关闭 ，要操作的数组在父组件

            // }
        },
        isShowLi(i){

            if(this.tagsLength===1){
                // 只有首页
                return i==0
            }
            if(this.clickIndex==0){
                return ![1,3].includes(i)
            }

            if(this.clickIndex==1 && this.clickIndex==this.tagsLength-1){
                // 用户点击第二个且是最后一个
                return ![3,4].includes(i)
            }else if(this.clickIndex==1 && this.clickIndex!=this.tagsLength-1){
                return i!=3
            }

            if(this.clickIndex==this.tagsLength-1){
                // 用户点击最后一项
                return i!=4
            }


            return true
        }
    }
}
</script>
 
<style lang="scss" scoped>
   .tags-menu{
       background-color: #fff;
       box-shadow: 2px 2px 4px #ccc;
       position: absolute;
       border-radius: 6px;
       ul{
           padding: 10px 0;
       }
        li{
            padding:8px 15px;
            cursor: pointer;
            &:hover{
                background-color: #ddd;
            }
        }
   } 
</style>