<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row  class="vcenter">
        <el-col :span="2" :offset="6">
          <div>选择话题分类</div>
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

      <el-row  class="vcenter">
        <el-col :span="2" :offset="6">
          <div>选择二级话题分类</div>
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
    </el-main>
  </div>
</template>

<script>
import MenuHeader from './components/MenuHeader'
import {config} from "../utils/global"
import axios from 'axios'
export default {
  name: "Publish",
  components: {
    MenuHeader
  },
  data() {
    return {
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
      secondclass: ''
    }
  },
  mounted() {

  },
  methods: {
    showsecond(vId) {
      const url = config.base_url + '/classify/get?firstId=' + vId
      axios
        .get(url)
        .then(response=>{
          console.log(response.data)
          this.secondselect = response.data
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
</style>
