<template>
  <div>
    <Back></Back>
    <el-row class="mt50">
      <el-col :span="16" :offset="4">
        <el-table
          empty-text="暂无需要审核的用户"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
          :header-row-style="{height:'70px'}"
          :row-style="{height:'70px'}">
          <el-table-column
            align="center"
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="账号类型">
            <template slot-scope="scope">
              <el-tag>学生</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 2">限制登录</div>
              <div v-else>正常</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="updatetime"
            label="最近登录时间">
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="relieve(scope.$index, scope.row)">解封</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="prohibit(scope.$index, scope.row)">封号</el-button>
            </template>
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
  </div>
</template>

<script>
import { config } from "../../../utils/global"
import axios from 'axios'
import Back from "../../components/Back";
export default {
    name: "prohibit",
  inject: ['reload'],
  components: {Back},
  data() {
      return{
        tableData: [],
        total:0,          //默认数据总数
        pagesize:5,       //每页的数据条数
        currentPage:1,    //默认开始页面
      }
  },
  mounted() {
      this.init()
  },
  methods: {
    init() {
      const url = config.base_url + '/user/list?role=0'
      axios
        .get(url)
        .then(res=>{
          this.tableData = res.data
          this.total = res.data.length
        })
    },
    prohibit(index,row) {
      const self = this
      const url = config.base_url + '/user/fen?userId=' + row.id + '&status=2'
      axios
        .post(url)
        .then(res=>{
          self.$message.error(row.username + '已限制登录！')
          self.reload()

        })
    },
    relieve(index,row) {
      const self = this
      const url = config.base_url + '/user/fen?userId=' + row.id + '&status=1'
      axios
        .post(url)
        .then(res=>{
          self.$message.success(row.username + '已恢复登录！')
          self.reload()

        })
    },
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<style scoped>
  .mt50{
    margin-top: 50px;
  }
</style>
