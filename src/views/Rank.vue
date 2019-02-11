<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row class="vcenter mt30">
        <el-col :span="3" :offset="4">
          <div class="vline vcenter"><p class="fonttopic">排行榜</p></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style=" width: 100%"
            :header-row-style="{height:'70px'}"
            :row-style="{height:'70px'}"
            >
            <el-table-column
              prop="username"
              label="账号"
              align="center">
              <template slot-scope="scope">
                <router-link :to="{name:'Profile',params: { id: scope.row.userId }}" class="fontwhite" >{{scope.row.username}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="grade"
              label="等级"
              align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.point >= 0 && scope.row.point < 20" src="@/assets/img/1.png" alt="网络错误，刷新重试">
                <img v-else-if="scope.row.point >= 20 && scope.row.point < 40" src="@/assets/img/2.png" alt="网络错误，刷新重试">
                <img v-else-if="scope.row.point >= 40 && scope.row.point < 60" src="@/assets/img/3.png" alt="网络错误，刷新重试">
                <img v-else-if="scope.row.point >= 60 && scope.row.point < 80" src="@/assets/img/4.png" alt="网络错误，刷新重试">
                <img v-else-if="scope.row.point >= 80 && scope.row.point < 100" src="@/assets/img/5.png" alt="网络错误，刷新重试">
                <img v-else="scope.row.point >= 100" src="@/assets/img/6.png" alt="网络错误，刷新重试">
              </template>
            </el-table-column>
            <el-table-column
              prop="point"
              label="积分"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row class="mt50">
        <el-col :span="6" :offset="9">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pagesize"
            @current-change="current_change">
          </el-pagination>
        </el-col>
      </el-row>
    </el-main>
    <Footer></Footer>
  </div>

</template>

<script>
import MenuHeader from './components/MenuHeader'
import { config } from "../utils/global"
import axios from 'axios'
import Footer from './components/Footer'
export default {
  name: "Rank",
  components: {
    Footer,
    MenuHeader
  },
  data() {
    return {
      total:0,          //默认数据总数
      pagesize:5,       //每页的数据条数
      currentPage:1,    //默认开始页面
      tableData: [],
      userId: this.$cookies.get('userId'),
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    //json数组比较
    compare(property) {
      return function(a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
      }
    },
    init: function(){
      //加载的数据
      const url =config.base_url + '/rank/all'
      //向后台获取数据
      axios
        .get(url)
        .then(response=>{
          this.total = response.data.data.length
          console.log(response.data.data.length)
          this.tableData = response.data.data
          this.tableData = this.tableData.sort(this.compare("point")).reverse();
        })
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<style scoped>
  .vline{
    height: 50px;
    border-left: 5px solid #ee6e73;
  }

  /*垂直居中*/
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .fonttopic{
    font-size: 24px;
    margin-left: 20px;
  }

  .mt30{
    margin-top: 30px;
  }
  .mt50{
    margin-top: 50px;
  }

</style>
