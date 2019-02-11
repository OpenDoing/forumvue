<template>
  <div>
    <Header></Header>
    <el-main>
      <el-row>
        <el-col :span="10" :offset="7">
          <h1 class="hcenter">注册</h1>
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

      <el-row class="mt vcenter">
        <el-col :span="2" :offset="5">
          账号类型：
        </el-col>
        <el-col :span="12">
          <el-select v-model="type" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="mt70">
        <el-col :span="6" :offset="9">
          <el-button type="danger" round style="width: 100%" @click="register">注册</el-button>
        </el-col>
      </el-row>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import {config} from "../utils/global"
import axios from 'axios'

export default {
  name: "Register",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      username: '',
      password: '',
      type: '请选择账号类型',
      options: [{
        value: '0',
        label: '学生'
      }, {
        value: '1',
        label: '教师'
      }],
    }
  },
  methods: {
    register: function () {
      let url = config.base_url + '/user/register'
      const self = this
      console.log(this.type)
      axios({
        url: url,
        method:"post",
        params: {
          username: this.username,
          password: this.password,
          role: this.type
        },
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          self.$notify({
            title: '成功',
            message: '账号成功注册',
            type: 'success'
          });
        })
        .catch(function (error) {
          self.$notify.error({
            title: '错误',
            message: '注册失败'
          });
        });

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
