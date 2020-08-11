<template>
<div class="login_container">
  <vue-particles
    color="#fff"
    :particleOpacity="0.5"
    :particlesNumber="60"
    shapeType="circle"
    :particleSize="4"
    linesColor="#fff"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="2"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    class="lizi"
    style="height:100%"
    >
  </vue-particles>
  <div class="container">
    <div class="login-div">
      <div class="left">
        <div class="img-box">
          <img src="../../assets/images/login/login_bg.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="titleColor h1 loginTitle">欢迎登录</div>
        <div class="login-form">
          <el-form class="el-login-form" size="medium" :model="loginForm">
            <el-form-item>
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="loginForm.userName">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-key"
                v-model="loginForm.password">
              </el-input>
              <div class="text-left contentColor"><el-checkbox class="font12" v-model="checked">记住密码</el-checkbox></div>
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn" v-waves type="primary" @click.stop="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      startClass: '',
      checked: false,
      loginForm: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang='scss' scoped>
.login_container {
  background-image: linear-gradient( -180deg, $--color-primary 0%, $--color-success 100%);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
.container{
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // pointer-events: none;
  .login-div{
    @include fj(flex-start);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 480px;
    min-width: 800px;
    margin-left: -25%;
    margin-top: -240px;
    background: $--color-white;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    .left{
      flex: 1;
      padding: 0 20px;
      border-right: 1px solid $--color-bg;
    }
    .right{
      height: 100%;
      padding: 30px 0;
      flex: 1;
      @include fc(center);
      align-items: center;
      .loginTitle{
        height: 60px;
        line-height: 60px;
      }
      .login-form{
        flex: 1;
       padding-top: 40%;
        width: 100%;
        height: 100%;
        padding: 0 50px;
        min-width: 400px;
        .el-login-form{
          width: 100%;
          padding-top: 10%;
          /deep/.el-form-item{
            margin-bottom: 30px;
          }
        }
        .loginBtn{
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
  /deep/ .el-checkbox__label{
    font-size: $--text-12;
    color: $--color-gray-9;
  }
}
</style>
