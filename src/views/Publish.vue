<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row  class="vcenter mt35">
        <el-col :span="2" :offset="6">
          <div>选择话题目录</div>
        </el-col>
        <el-col :span="8" :offset="1" >
          <el-select v-model="firstclass" placeholder="请选择" style="width: 100%" @change="showsecond">
            <el-option
              v-for="item in firstselect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row  class="vcenter mt35">
        <el-col :span="2" :offset="6">
          <div>选择话题分类</div>
        </el-col>
        <el-col :span="8" :offset="1" >
          <el-select v-model="secondclass" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in secondselect"
              :key="item.id"
              :label="item.second"
              :value="item.second">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row  class="vcenter mt35">
        <el-col :span="2" :offset="6">
          <div>标题</div>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-input v-model="title"/>
        </el-col>
      </el-row>

      <el-row  class="vcenter mt35">
      <el-col :span="2" :offset="6">
        <div>内容</div>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input
          type="textarea"
          v-model="content"
          :rows="10"/>
      </el-col>
    </el-row>
      <el-row class="vcenter mt35">
        <el-col :span="6" :offset="9">
          <el-button type="danger" round style="width: 100%" @click="publish">发表</el-button>
        </el-col>
      </el-row>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import MenuHeader from './components/MenuHeader'
import {config} from "../utils/global"
import axios from 'axios'
import Footer from  './components/Footer'
export default {
  name: "Publish",
  components: {
    Footer,
    MenuHeader
  },
  data() {
    return {
      //一级目录话题Id
      category: 0,
      code: '',
      content: '',
      title: '',
      des: '',
      firstselect: [{
        value: '1',
        label: '前端'
      }, {
        value: '2',
        label: '后台'
      }, {
        value: '3',
        label: '数据库'
      }],
      secondselect:[],
      firstclass: '',
      // 二级目录选择的select分类
      secondclass: ''
    }
  },
  mounted() {

  },
  methods: {
    showsecond(vId) {
      this.category = vId
      const url = config.base_url + '/classify/get?firstId=' + vId
      axios
        .get(url)
        .then(response=>{
          console.log(response.data)
          this.secondselect = response.data
        })
    },
    publish(){
      const url = config.base_url + '/topic/add'
        axios
          .post(url,{
            category: this.secondclass,
            code: this.code,
            content: this.content,
            title: this.title,
            userId: this.$cookies.get('userId')
          })
          .then(res=>{
            console.log(res)
            this.$message({
              message: '话题发表成功',
              type: 'success'
            })
          })
    }
  }
}
</script>

<style scoped>
  .hcenter{
    display: flex;
    justify-content:center;
  }
  /*垂直居中*/
  .vcenter{

    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .mt35{
    margin-top: 25px;
  }
</style>
