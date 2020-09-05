<template>
  <div>
    <Header></Header>
    <el-main>
      <el-row>
        <el-col :span="10" :offset="7">
          <h1 class="hcenter">登录</h1>
        </el-col>
      </el-row>

      <el-row class="mt vcenter">
        <el-col :span="2" :offset="5">
          用户名：
        </el-col>
        <el-col :span="12" >
          <el-input v-model="username"></el-input>
        </el-col>
      </el-row>

      <el-row class="mt vcenter">
        <el-col :span="2" :offset="5">
          密码：
        </el-col>
        <el-col :span="12" >
          <el-input type="password" v-model="password"></el-input>
        </el-col>
      </el-row>

      <el-row class="mt70">
        <el-col :span="6" :offset="9">
          <el-button type="danger" round style="width: 100%" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from  './components/Footer'
import {config} from "../utils/global"
import axios from 'axios'
export default {
  name: "Login",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const url = config.base_url + '/user/login'
      axios
        .post(url,{
          username: this.username,
          password: this.password
        })
        .then(response => {
          let data = response.data
          console.log(data)
          if (data.errno === 0) {
            if (data.data.status === 1) {
              this.$cookies.set('userId', data.data.id, 60 * 60)
              this.$cookies.set('token', data.data.token,60 * 60)
              this.$cookies.set('username', data.data.username,60 * 60)
              this.$router.push({path: '/topic'})
            } else if (data.data.status === 0) {
              this.$notify.info({
                title: '提示',
                message: '您的账号未通过审核!请联系管理员'
              })
            } else {
              this.$notify.error({
                title: '警告',
                message: '由于您账号异常，已封号!请联系管理员'
              })
            }
          }else if (data.errno === 403) {
            this.$notify.info({
              title: '提示',
              message: '账号密码不对!'
            });
          } else if (data.errno === 402) {
            this.$notify.info({
              title: '提示',
              message: '请输入正确的用户名！'
            });
          } else {
            this.$notify.info({
              title: '提示',
              message: '这是个意外！'
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: '不存在的用户名！'
          });
        })
    }
  }
}
</script>

<style scoped>
  .el-main{
    height: 520px;
  }
  .hcenter{
    display: flex;
    justify-content:center;
  }
  .mt{
    margin-top: 50px;
  }
  /*垂直居中*/
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .mt70{
    margin-top: 70px;
  }
</style>
