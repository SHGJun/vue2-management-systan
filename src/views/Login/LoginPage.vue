<template>
  <div class="login">
    <div class="content">
      <!-- 左布局 -->
      <div class="login-left">
        <img class="login-left-img" src="@/assets/logo/login.png" alt="login" />
      </div>
      <!-- 右布局 -->
      <div class="input-format">
        <!-- 登录 -->
        <div class="form_content login-form" v-if="isLogin">
          <!-- 表单 -->
          <el-form
            ref="loginformRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                clearable
                type="text"
                placeholder="admin"
              />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="123456"
                clearable
                @keyup.enter="handleLogin(loginForm)"
                show-password
              />
            </el-form-item>
            <!-- 表单提交 -->
            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="default"
                type="primary"
                style="width: 100%"
                @click="handleLogin(loginForm)"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
          <div>
            还没有账号？点击
            <a class="commom-style" @click="() => (isLogin = !isLogin)"
              >注册账号</a
            >
          </div>
        </div>
        <!-- 注册 -->
        <div class="form_content register-form" v-if="!isLogin">
          <!-- 表单 -->
          <el-form
            ref="loginformRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                clearable
                type="text"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                clearable
                @keyup.enter="handleRegister(loginForm)"
                show-password
              />
            </el-form-item>
            <!-- 表单提交 -->
            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="default"
                type="primary"
                style="width: 100%"
                @click="handleRegister(loginForm)"
              >
                <span v-if="!loading">注册</span>
              </el-button>
            </el-form-item>
          </el-form>
          <div>
            已有账号？点击
            <a class="commom-style" @click="() => (isLogin = !isLogin)"
              >登录账号</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleRegisterRequest } from "@/api/login";
import { getTimeState } from "@/utils";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: "",
      },
      //   表单校验
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        captcha: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
        ],
      },
      //   提交表单loading
      loading: false,
      // 登录或注册
      isLogin: true,
    };
  },
  methods: {
    // 登录
    handleLogin(formEl) {
      if (!formEl) return;
      this.$refs.loginformRef.validate((valid, fields) => {
        if (!valid) return;
        this.loading = true;
        const loginForm = {
          username: this.loginForm.username,
          password: this.loginForm.password,
        };
        this.Login(loginForm).then((res) => {
          if (res.code == 200) {
            this.$router.push("/");
            const stateMessage = getTimeState();
            this.$notify({
              title: stateMessage,
              message: `欢迎登录 ${loginForm.username}`,
              position: "top-right",
            });
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
            this.loading = false;
          }
        });
      });
    },
    // 注册
    handleRegister(formEl) {
      if (!formEl) return;
      this.$refs.loginformRef.validate((valid, fields) => {
        if (!valid) return;
        this.loading = true;
        const registerForm = {
          username: this.loginForm.username,
          password: this.loginForm.password,
        };
        handleRegisterRequest(registerForm).then((res) => {
          if (res.code == 200) {
            Object.keys(this.loginForm).forEach((key) => {
              this.$set(this.loginForm, key, '');
            });
            this.$message({
              type: "success",
              message: "注册成功",
            });
            this.loading = false;
            this.isLogin = true;
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
            this.loading = false;
          }
        });
      });
    },
    ...mapActions(["Login"]),
  },
};
</script>

<style lang="scss">
@keyframes loginline {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    transform: translateY(-40px);
    -webkit-transform: translateY(-40px);
  }
  25% {
    transform: translateY(-20px);
    -webkit-transform: translateY(-20px);
  }
  50% {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }
  75% {
    transform: translateY(20px);
    -webkit-transform: translateY(20px);
  }
  100% {
    transform: translateY(40px);
    -webkit-transform: translateY(40px);
  }
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(
    #4d3af9,
    #255fff,
    #3f89fb,
    #5088ff,
    #1a68ff
  );
  background-size: cover;
  position: relative;
  .square {
    position: absolute;
    width: 100px;
    height: 100px;
    background: #4d86ff;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-right: 1px solid #3f89fb;
    border-bottom: 1px solid #3f89fb;
    border-radius: 10px;
    animation: animate 12s linear infinite;
    animation-delay: calc(-1s * var(--i));
    &:nth-child(1) {
      top: -10px;
      right: 50%;
    }
    &:nth-child(2) {
      top: 10%;
      right: 20%;
    }
    &:nth-child(3) {
      top: 10%;
      right: 10px;
    }
    &:nth-child(4) {
      bottom: 10%;
      right: 15%;
      width: 80px;
      height: 80px;
    }
    &:nth-child(5) {
      top: 180px;
      left: 20px;
    }
    &:nth-child(6) {
      bottom: 80px;
      left: 20px;
      width: 70px;
      height: 70px;
    }
    &:nth-child(7) {
      bottom: 40%;
      right: 50px;
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(8) {
      top: 120px;
      left: 220px;
      width: 70px;
      height: 70px;
    }
    &:nth-child(9) {
      bottom: 10%;
      right: 40%;
    }
    &:nth-child(10) {
      bottom: 40%;
      right: 45%;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 92%;
    padding: 0 30px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 15px;
    position: relative;
    .dark {
      position: absolute;
      top: 13px;
      right: 18px;
    }
    .login-left {
      width: 660px;
      margin-right: 10px;
      box-shadow: 2px 3px 20px 4px #b2b6fe;
      border-radius: 15px;
      .login-left-img {
        width: 100%;
        height: 100%;
      }
    }
    .input-format {
      width: 354px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      padding: 2px;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        z-index: 0;
        width: 350px;
        height: 440px;
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #4b3bf9,
          #4b3bf9,
          #4b3bf9
        );
        transform-origin: bottom right;
        animation: loginline 5s linear infinite;
      }
      &::after {
        background: linear-gradient(
          0deg,
          transparent,
          transparent,
          #ff2771,
          #ff2771,
          #ff2771
        );
        animation-delay: -3s;
      }
      .form_content {
        width: 350px;
        max-height: 440px;
        padding: 20px;
        text-align: center;
        background-color: var(--el-bg-color);
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 1;
        position: relative;
        .login-form {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          font-size: 14px;
          font-feature-settings: "tnum";
          font-variant: tabular-nums;
          line-height: 1.5;
          color: var(--el-text-color-primary);
          list-style: none;
          .el-input {
            height: 38px;
            input {
              height: 38px;
            }
          }
          .captcha {
            .el-form-item__content {
              display: flex;
            }
            .el-input {
              width: 50%;
              margin-right: 14%;
            }
            .el-button {
              width: 112px;
            }
          }
        }
      }
    }
    @for $i from 1 through 6 {
      .star#{$i} {
        $size: #{$i}px;
        position: fixed;
        top: 0;
        left: 0;
        width: $size;
        height: $size;
        border-radius: 50%;
        &::after {
          position: fixed;
          top: 100vh;
          left: 0;
          width: $size;
          height: $size;
          content: "";
          border-radius: inherit;
          box-shadow: inherit;
        }
      }
    }
  }
  @media screen and (max-width: 1150px) {
    .content {
      justify-content: center;
      .login-left {
        display: none;
      }
    }
  }
}
.login-form,
.register-form {
  .commom-style {
    color: #1a68ff;
  }
  .commom-style:hover {
    cursor: pointer;
    color: #5088ff;
  }
}
</style>
