<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-row class="vcenter mt30">
      <el-col :span="16" :offset="4">
        <div class="vline vcenter"><p class="fonttopic">{{topic.title}}</p></div>
      </el-col>
    </el-row>

    <el-row class="vcenter mt30">
      <el-col :span="1" :offset="4">
        <el-tag type="warning">{{username}}</el-tag>
      </el-col>
      <el-col :span="1" >
        <el-button type="danger" size="small" round >{{topic.category}}</el-button>
      </el-col>
      <el-col :span="2" :offset="12">
        <p>{{topic.createdDate}}</p>
      </el-col>
    </el-row>

    <el-row class="vcenter mt30">
      <el-col :span="16" :offset="4">
        <div><p class="fonttopic">{{topic.content}}</p></div>
      </el-col>
    </el-row>

    <el-row class="vcenter mt30">
      <el-col :span="3" :offset="4">
        <div class="vline vcenter"><p class="fonttopic">Answers:{{answersLength}}</p></div>
      </el-col>
    </el-row>

    <el-row class="mt30" v-for="item in answers" :key="item.id">
      <el-col :span="16" :offset="4">
        <div class="answerWrapper">
          <el-row class="vcenter">
            <el-col :span="1" :offset="1">
              <el-tag type="">{{ item.username }}</el-tag>
              <!--<el-button size="small" round>{{ item.username }}</el-button>-->
            </el-col>
            <el-col :span="2" :offset="1">
              <div @click="good(item.judge, item.useful, item.id)" class="sameLine">
                <img v-if="item.judge === false" src="@/assets/img/good.png" alt="点赞"/>
                <img v-else="item.judge === true" src="@/assets/img/good1.png"  alt=""/>
                <div class="vcenter">{{ item.useful }}</div>
              </div>
            </el-col>
            <el-col :span="4">
              <div>评分：{{item.score}}</div>
            </el-col>
            <el-col :span="4" :offset="8">
              {{ item.createtime }}
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button size="small" type="danger" icon="el-icon-delete" circle @click="delAnswer(item.id, item.username)"></el-button>
              <el-button size="small" type="primary" icon="el-icon-edit" circle v-show="scorebtn === true" @click="dafen(item.id)"></el-button>
            </el-col>
          </el-row>
          <el-row class="mt30">
            <el-col :span="16" :offset="1">
              <div v-html="item.content">

              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row class="vcenter mt30">
      <el-col :span="6" :offset="4">
        <div class="vline vcenter"><p class="fonttopic">Add Answer:</p></div>
      </el-col>
      <el-col :span="2" :offset="9">
        <el-button size="medium" type="danger" @click="reply">回复</el-button>
      </el-col>
    </el-row>

    <el-row  class="vcenter mt30">
      <el-col :span="16" :offset="4">
        <div class="edit_wrapper">
          <div id="editorMenu" class="toolbar"></div>
          <div id="editor" class="text"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopicRow from "./components/TopicRow"
import MenuHeader from "./components/MenuHeader"
import {config} from "../utils/global"
import axios from 'axios'
import E from 'wangeditor'

export default {
  name: "Answer",
  inject: ['reload'],
  components: {MenuHeader, TopicRow},
  data() {
    return {
      topicId:this.$route.params.id,
      topic:[],
      title: '',
      username: this.$cookies.get('username'),
      userId: this.$cookies.get('userId'),
      answersLength: 0,
      answers: [],
      zan: false,
      editorObject: new E('#editorMenu', '#editor'),
      editor: '',
      role: 0,
      scorebtn: false
    }
  },
  mounted() {
    this.init()
    this.initEditor()
  },
  methods: {
    dafen(id) {
      this.$prompt('请输入分数', '评分', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const url = config.base_url + '/answer/changeScore'
        axios
          .post(url,{
            answerId: id,
            score: value,
          })
          .then(res=>{

          })

        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

      const url = config.base_url + '/answer/?answerId=' + id

    },
    delAnswer(id, username) {
      const self = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = config.base_url + '/answer/delete?answerId=' + id
        if (username === this.username) {
          axios
            .delete(url)
            .then(res=>{
              console.log(res)
              self.$message.success('删除成功！')
              self.reload()
            })
        }else {
          self.$message.error("这是别人的内容，你不能删除")
        }
      }).catch(() => {

      });


      // const url = config.base_url + '/answer/delete?answerId=' + id
      // if (username === this.username) {
      //   axios
      //     .delete(url)
      //     .then(res=>{
      //       console.log(res)
      //       this.$message.success('删除成功！')
      //       this.reload()
      //     })
      // }else {
      //   this.$message.error("这是别人的内容，你不能删除")
      // }
    },
    reply() {
      const url = config.base_url + '/answer/add'
      const rurl = config.base_url + '/recommend/reply'
      if (this.editorObject.txt.text() === '') {
        this.$message.error('内容为空！')
        return;
      }
      axios
        .post(url,{
          topicId: this.topicId,
          userId: this.userId,
          username: this.username,
          content: this.editorObject.txt.html()
        })
        .then(res=>{
          console.log(res)
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.reload()
        })

      axios
        .post(rurl,{
          userId: this.userId,
          topicId: this.topicId,
        })
        .then(res=>{
          console.log(res)
        })
    },
    initEditor(){
      this.editorObject.create()
      this.editorObject.customConfig.onchange = (html) => {
        this.editor = html
      }
    },
    good(judge, useful, id) {
      const url = config.base_url + '/like/reverse'
      const count = config.base_url + '/like/count?id=' + id
      const answerUrl = config.base_url + '/answer/get?topicId=' + this.topicId + '&userId=' + this.userId + '&username=' + this.username
      axios
        .post(url,{
          id: id,
          userId: this.userId
        })
        .then(res=>{
          axios
            .get(answerUrl)
            .then(res=>{
              this.answersLength = res.data.length
              this.answers = res.data
            })
        })
    },
    init() {
      const id = this.topicId
      const answerUrl = config.base_url + '/answer/get?topicId=' + id + '&userId=' + this.userId + '&username=' + this.username
      const topicUrl = config.base_url + '/topic/get?topicId=' + id
      const userUrl = config.base_url + '/user/user?userId=' + this.userId
      axios
        .get(answerUrl)
        .then(res=>{
          console.log(res.data)
          this.answersLength = res.data.length
          this.answers = res.data
          console.log(this.answers)
        })

      axios
        .get(topicUrl)
        .then(res=>{
          this.topic = res.data
          // console.log(res.data)
        })

      axios
        .get(userUrl)
        .then(res=>{
          this.username = res.data.data.username
          this.role = res.data.data. role
          if (this.role === 1) {
            this.scorebtn = true
          }
        })
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

  .answerWrapper{
    padding: 20px;
    background: #E9EEF3;
    height: 120px;
  }

  .sameLine{
    display: flex;
  }

  .toolbar {
    border: 1px solid #ccc;
    margin-bottom: 30px;
    padding-top: 10px;
  }

  .text {
    border: 1px solid #ccc;
    height: 200px;
    margin-bottom: 50px;
  }

</style>
