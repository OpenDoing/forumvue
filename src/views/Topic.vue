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
            header-row-style="height:70px"
            row-style="height:70px">
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
                  :type="primary"
                  disable-transitions>{{scope.row.username}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="class"
              label="分类">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createDate"
              label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </el-main>
  </div>

</template>

<script>
import MenuHeader from './components/MenuHeader'
export default {
  name: "Topic",
  components: {
    MenuHeader
  },
  data() {
    return {
      total:100,//默认数据总数
      pagesize:5,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: [{
        createDate: '2016-05-02',
        username: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        class: 'HTML'
      }, {
        createDate: '2016-05-02',
        username: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        class: 'VUE'
      }, {
        createDate: '2016-05-02',
        username: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        class: 'HTML'
      }, {
        createDate: '2016-05-02',
        username: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        class: 'HTML'
      },
        {
          createDate: '2016-05-02',
          username: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄',
          class: 'HTML'
        }, {
          createDate: '2016-05-02',
          username: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄',
          class: 'VUE'
        }, {
          createDate: '2016-05-02',
          username: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄',
          class: 'HTML'
        }, {
          createDate: '2016-05-02',
          username: '王小虎',
          title: '上海市普陀区金沙江路 1518 弄',
          class: 'HTML'
        }]
    }
  },
  methods: {
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }
}
</script>

<style scoped>

</style>
