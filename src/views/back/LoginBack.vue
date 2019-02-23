<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">论坛后台管理系统</h3>
      <el-form-item prop="username">

        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">

        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="Login">
          登录
        </el-button>
      </el-form-item>
      <!--<div class="tips">-->
      <!--<span style="margin-right:20px;">username: test41</span>-->
      <!--<span> password: 123456</span>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
import { config } from "../../utils/global"
import axios from 'axios'
export default {
  name: "LoginBack",
  data() {
      return{
        loginForm: {
          username: '',
          password: ''
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
  },
  methods: {
    Login() {
      const self = this
      const url = config.base_url + '/user/login'
      axios
        .post(url, {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(response => {
          const data = response.data
          if (data.errno === 500) {
            self.$notify.info({
              title: '提示',
              message: '请输入正确的用户名!'
            })
          } else if (data.errno === 403) {
            self.$notify.info({
              title: '提示',
              message: '账号密码错误!'
            })
          } else if (data.errno === 402) {
            self.$notify.info({
              title: '提示',
              message: '请输入正确的用户名！'
            })
          } else if (data.errno === 0) {
            if (this.loginForm.username === 'admin') {
              this.$router.push('/back/user')
            }else {
              self.$notify.error({
                title: '错误',
                message: '您不是管理员！'
              })
            }

          } else {
            self.$notify.error({
              title: '错误',
              message: '参数错误！'
            })
          }
        })
        .catch(function() {
          self.$notify.error({
            title: '错误',
            message: '服务器端无响应！'
          })
        })
    }
  }
}
</script>

<style  scoped>
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

</style>
