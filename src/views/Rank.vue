<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="userId"
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
        small
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-main>

  </div>

</template>

<script>
import MenuHeader from './components/MenuHeader'
import axios from 'axios'
export default {
  name: "Rank",
  components: {
    MenuHeader
  },
  data() {
    return {
      total:0,//默认数据总数
      pagesize:5,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: [
        {
          "userId": 1,
          "point": 85
        },
        {
          "userId": 2,
          "point": 1
        },
        {
          "userId": 3,
          "point": 0
        },
        {
          "userId": 4,
          "point": 0
        },
        {
          "userId": 5,
          "point": 0
        },
        {
          "userId": 6,
          "point": 0
        },
        {
          "userId": 7,
          "point": 0
        },
        {
          "userId": 4,
          "point": 0
        },
        {
          "userId": 5,
          "point": 0
        },
        {
          "userId": 6,
          "point": 0
        }
      ]
    }
  },
  mounted() {
    this.created()
  },
  methods:{
    created: function(){
      //加载班级的数据
      var url ='http://localhost:8004/rank/all'
      //向后台获取数据
      axios
        .get(url)
        .then(response=>{
          this.total = response.data.length
          console.log(response.data.data.length)
          this.tableData = response.data.data
        })
      // var vm = this;
      // $.getJSON(url,function(data){
      //   vm.clazzInfo = data;
      //   vm.total = data.length;//设置数据总数目！！！
      // });
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<style scoped>

</style>
