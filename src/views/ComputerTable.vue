<template>
  <div>
    <ComputerHeader></ComputerHeader>
    <el-main>
      <el-row>
        <el-col :span="4" :offset="4">
          <el-button type="primary" @click="addComputer">添加计算机</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="3">
          <el-table
            v-loading="loading"
            empty-text="暂无相关数据"
            :row-class-name="tableRowClassName"
            :data="tableData.filter(data => !search || data.username.includes(search) || data.computer.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            :header-row-style="{height:'80px'}"
            :row-style="{height:'70px',fontSize:'18px'}">
            <el-table-column
              type="index"
              width="80"
              label="序号"
              :index="indexMethod">
            </el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="姓名"
              width="250">
            </el-table-column>
            <el-table-column
              align="center"
              prop="card"
              label="工号"
              width="200">
            </el-table-column>
            <el-table-column
              align="center"
              prop="computer"
              width="280"
              label="计算机名称">
            </el-table-column>
            <el-table-column
              align="center"
              width="300"
              prop="">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="medium"
                  placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDel(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="mt50">
        <el-col :span="6" :offset="17">
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

    <el-dialog title="修改配置信息" :visible.sync="updateVisible">
      <el-form :model="updateform">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="updateform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="updateform.card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计算机名称" :label-width="formLabelWidth">
          <el-input v-model="updateform.computer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加配置信息" :visible.sync="addVisible">
      <el-form :model="updateform">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="addform.card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计算机名称" :label-width="formLabelWidth">
          <el-input v-model="addform.computer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import MenuHeader from './components/MenuHeader'
  import ComputerHeader from './components/ComputerHeader'
  import TopicRow from './components/TopicRow'
  import {config} from "../utils/global"
  import axios from 'axios'
  import Footer from './components/Footer'

  export default {
    name: "ComputerTable",
    components: {
      Footer,
      MenuHeader,
      TopicRow,
      ComputerHeader
    },
    data() {
      return {
        category: '',
        count: 0,//话题数量
        total: 0,//默认数据总数
        pagesize: 5,//每页的数据条数
        currentPage: 1,//默认开始页面
        search: '',//搜索栏
        loading: true,//表格加载动画
        updateVisible: false,//编辑弹出框
        addVisible:false,//添加弹出框
        formLabelWidth: '100px',
        updateform: {
          id: '',
          username: '',
          card: '',
          computer: '',
        },
        addform: {
          username: '',
          card: '',
          computer: '',
        },
        tableData: [
          {
            "id": "dsdhfdiuf-sdff-df",
            "username": "杜",
            "card": "085965",
            "computer": "DESKTOP-DSFDGG"
          },
          {
            "id": "dsddssdff-df",
            "username": "wang",
            "card": "9363",
            "computer": "DESKTOP-sdfdsf"
          },
          {
            "id": "aaiuf-sdff-df",
            "username": "问先填",
            "card": "7472",
            "computer": "DESKTOP-asd"
          },
          {
            "id": "asd-sdff-df",
            "username": "王索宇",
            "card": "42282",
            "computer": "DESKTOP-DSFDwqeGG"
          },
          {
            "id": "hjk-sdff-df",
            "username": "景天",
            "card": "2772",
            "computer": "DESKTOP-fsdg"
          },
          {
            "id": "dfg-sdff-df",
            "username": "电费",
            "card": "42524",
            "computer": "DESKTOP-b"
          },
          {
            "id": "yu-sdff-df",
            "username": "宿舍",
            "card": "425245",
            "computer": "DESKTOP-DSFDGG"
          }
        ],
        userId: this.$cookies.get('userId'),
      }
    },
    mounted() {
      this.initTable()
    },
    methods: {
      addComputer() {
        this.addVisible = true
      },

      initTable() {
        //TODO:调用查询所有人的接口
        const url = config.computer_url + '/getAll'
        axios
          .post(url, {
            id: '0',
          })
          .then(res => {
            this.tableData = res.data
            //TODO:更新table 的length
            this.total = res.data.length
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: '数据获取失败'
            });
          })
        let temp = 0
        for (let i=0;i<100000;i++){
          temp+=i
        }
        this.loading = false
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      indexMethod(index) {
        return index + 1;
      },
      current_change: function (currentPage) {
        this.currentPage = currentPage
      },
      handleEdit(index, row) {
        this.updateVisible = true;
        this.updateform.username = row.username
        this.updateform.card = row.card
        this.updateform.computer = row.computer
        this.updateform.id = row.id
      },
      handleDel(index, row) {
        this.delete(row)
      },
      delete(row) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteInfo(row.id)
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      deleteInfo(rowid) {
        //TODO:调用删除的接口
        const url = config.computer_url + '/deleteSomeone'
        axios
          .post(url, {
            id: rowid,
          })
          .then(res => {
            this.initTable()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: '删除失败！'
            });
          })

      },
      addInfo() {
        //TODO:调用添加的接口
        const url = config.computer_url + '/addSomeone'
        axios
          .post(url, {
            username: this.addform.username,
            card: this.addform.card,
            computer: this.addform.computer
          })
          .then(res => {
            this.tableData = res.data
          })
          .catch(err => {
            this.$notify.error({
              title: '错误',
              message: '数据获取失败'
            });
          })
      },
      updateInfo() {
        //TODO:调用update接口
        const url = config.computer_url + '/updateSomeone'
        axios
          .post(url, {
            id: this.updateform.id,
            username: this.updateform.username,
            card: this.updateform.card,
            computer: this.updateform.computer
          })
          .then(res => {
            console.log(res)
          })
        this.updateVisible = false;
      }
    },
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .mt50 {
    margin-top: 50px;
  }
</style>
