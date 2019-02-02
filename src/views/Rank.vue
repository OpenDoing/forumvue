<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style=" width: 100%"
          >
            <el-table-column
              prop="username"
              label="账号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="grade"
              label="等级"
              align="center">
            </el-table-column>
            <el-table-column
              prop="point"
              label="积分"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        @current-change="current_change">
      </el-pagination>
    </el-main>

  </div>

</template>

<script>
import MenuHeader from './components/MenuHeader'
import { config } from "../utils/global"
import axios from 'axios'
export default {
  name: "Rank",
  components: {
    MenuHeader
  },
  data() {
    return {
      total:0,          //默认数据总数
      pagesize:5,       //每页的数据条数
      currentPage:1,    //默认开始页面
      tableData: []
    }
  },
  mounted() {
    this.created()
  },
  methods:{
    created: function(){
      //加载的数据
      const url =config.base_url + '/rank/all'
      //向后台获取数据
      axios
        .get(url)
        .then(response=>{
          this.total = response.data.length
          console.log(response.data.data.length)
          this.tableData = response.data.data
        })
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<style scoped>

</style>
