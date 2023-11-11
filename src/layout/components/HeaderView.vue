<template>
  <div class="header">
      
      <div class="header-top">
          <div class="fl">
              <el-button icon="el-icon-s-unfold" v-show="!isShow" @click="changeShow"></el-button>
              <el-button icon="el-icon-s-fold" v-show="isShow" @click="changeShow"></el-button>
          </div>
          <div class="fl">
              <Crumb></Crumb>
          </div>
          
          <div class="fr">
              <el-dropdown @command="hdCommand">
                  <div class="avatar-box">
                      <img src="@/assets/images/avatar.jpeg" alt="" width="40" height="40">
                  </div>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                      <el-dropdown-item divided  command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </div>
      </div>
      <div class="header-bottom">
          <Tags></Tags>
      </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import Crumb from "@/components/Crumb"
import Tags from "@/components/Tags"
import { removeLocalStorage } from '@/utils'
export default {
  components:{
      Crumb,Tags
  },
  data () {
      return {
          isShow:false,
      }
  },
  methods:{
      ...mapMutations({
          changeIsCollapse:"navCollapse/changeIsCollapse"
      }),
      changeShow(){
          this.isShow=!this.isShow;
          this.changeIsCollapse()
      },
      hdCommand(command){
          if(command==="logout"){
              removeLocalStorage('shg_token');
              removeLocalStorage('user_info')
              this.$router.push("/login")
          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .header{
      height: 84px;
      box-shadow: 0px 5px 5px #eee;
      /* padding-left: 20px; */
      button{
          width: 50px;
          height: 50px;
          margin: 0;
          font-size: 24px;
          padding: 12px 10px;
          border:none;
      }
      .header-top{
          height: 50px;
          box-shadow: 0px 3px 3px #eee;
      }

      .avatar-box{
          padding: 5px 20px 0 0;
          img{
              border-radius:5px;
          }
          img,i{
              cursor: pointer;
          }
      }
  }
  .fl{
      float: left;
  }
  .fr{
      float: right;
  }
</style>