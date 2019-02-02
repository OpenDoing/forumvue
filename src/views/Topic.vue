<template>
  <div>
    <MenuHeader v-on:updateTable="tableupdate"></MenuHeader>
    <el-main>
      <TopicRow :count="total"></TopicRow>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
            :header-row-style="{height:'70px'}"
            :row-style="{height:'70px'}">
            <el-table-column
              align="center"
              prop="title"
              label="标题"
              width="250">
            </el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="作者">
              <template slot-scope="scope">
                <el-tag
                  type="primary"
                  disable-transitions>{{scope.row.username}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="category"
              label="分类">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createdDate"
              label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
    </el-main>
  </div>

</template>

<script>
import MenuHeader from './components/MenuHeader'
import TopicRow from './components/TopicRow'
import {config} from "../utils/global"
import axios from 'axios'
export default {
  name: "Topic",
  components: {
    MenuHeader,
    TopicRow
  },
  data() {
    return {
      category: '',
      count: 0,//话题数量
      total:0,//默认数据总数
      pagesize:5,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: []
    }
  },
  watch:{
    'category': function (val) {
      console.log(val)
      const url =config.base_url + '/topic/category?userId=2&category='+this.category
      //向后台获取数据
      axios
        .get(url)
        .then(response=>{
          this.total = response.data.length
          this.tableData = response.data
        })
      if (val === 'topic') {
        this.topicinit()
      }
    }
  },
  mounted() {
    this.topicinit()
  },
  methods: {
    topicinit() {
      const url =config.base_url + '/topic/all?userId=2'
      //向后台获取数据
      axios
        .get(url)
        .then(response=>{
          this.total = response.data.length
          this.tableData = response.data
        })
    },
    current_change:function(currentPage){
      this.currentPage = currentPage
    },
    tableupdate(choose) {
      // console.log("father"+choose)
      this.category = choose
    }
  }
}
</script>

<style scoped>
  .mt50{
    margin-top: 50px;
  }
</style>
