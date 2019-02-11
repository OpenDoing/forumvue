<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row class="vcenter mt30">
        <el-col :span="6" :offset="4">
          <div class="vline vcenter"><p class="fonttopic">{{username}}的个人主页</p></div>
        </el-col>
        <el-col :span="3" :offset="8">
          <div class="vline vcenter"><p class="fonttopic">Points：{{points}}</p></div>
        </el-col>
      </el-row>
      <el-row class="mt30">
        <el-col :span="4" :offset="4">
          <img :src="img" alt="加载失败，刷新重试" class="img">
          <br>
          <el-row class="mt30">
            <el-col :span="6" :offset="7">
              <el-button  type="danger" size="mini" @click="photo" v-show="pbtn === true">更换头像</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="">
          <div class="wrapper">
            <div class="hcenter bline"><h3>Personal Data</h3></div>
            <el-row class="bline fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                用户名
              </el-col>
              <el-col :span="6" :offset="7" class="mbt">
                {{ username }}
              </el-col>
            </el-row>

            <el-row class="bline fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                账号类型
              </el-col>
              <el-col :span="6" :offset="7" class="mbt">
                {{ profile.atype }}
              </el-col>
            </el-row>

            <el-row class="fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                最近登录
              </el-col>
              <el-col :span="10" :offset="4" class="mbt">
                {{ time }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" :offset="1" class="">
          <div class="wrapper">
            <div class="hcenter bline"><h3>Activity</h3></div>
            <el-row class="bline fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                我创建的
              </el-col>
              <el-col :span="6" :offset="8" class="mbt">
                {{ createCount }}
              </el-col>
            </el-row>

            <el-row class="bline fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                送出的赞
              </el-col>
              <el-col :span="6" :offset="8" class="mbt">
                {{ zanCount }}
              </el-col>
            </el-row>

            <el-row class="fsize18">
              <el-col :span="8" :offset="2" class="mbt">
                回复数量
              </el-col>
              <el-col :span="6" :offset="8" class="mbt">
                {{ answerCount }}
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

    </el-main>
    <Footer></Footer>
    <my-upload field="file"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="300"
               :height="300"
               :url="uploadPath"
               :params="params"
               :headers="headers">
    </my-upload>
  </div>
</template>

<script>
import MenuHeader from './components/MenuHeader'
import {config} from "../utils/global";
import axios from 'axios'
import Footer from './components/Footer'
import myUpload from 'vue-image-crop-upload'

export default {
  name: "Profile",
  components: {
    Footer,
    MenuHeader,
    'my-upload': myUpload
  },
  data() {
    return {
      pid: this.$route.params.id,
      username: '',
      userId: this.$cookies.get('userId'),
      points: 0,
      img: '',
      show: false,
      params: {
        userId: this.$cookies.get('userId')
      },
      headers: {
      },
      uploadPath: config.base_url + '/profile/fileUpload',
      profile: {},
      time: '',
      zanCount: 0,
      createCount: 0,
      answerCount: 0,
      pbtn: true,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    photo() {
      this.show = !this.show
    },
    init() {
      if (this.pid !== this.userId){
        this.pbtn = false
      }
      // 获取某用户points
      const url = config.base_url + '/rank/get?userId=' + this.pid
      axios
        .get(url)
        .then(res=>{
          this.points = res.data.data.point
        })
      // 获取用户头像url
      const purl = config.base_url + '/profile/get?userId=' + this.pid
      axios
        .get(purl)
        .then(res=>{
          this.profile = res.data.data
          this.img =config.image_url + res.data.data.avatar
        })
      // 获取用户最近登陆时间
      const turl = config.base_url + '/user/user?userId=' + this.pid
      axios
        .get(turl)
        .then(res=>{
          this.username =  res.data.data.username
          this.time = res.data.data.updatetime
        })
      //收到的赞数量
      const zanurl = config.base_url + '/like/acount?userId=' + this.pid
      axios
        .get(zanurl)
        .then(res=> {
          this.zanCount = res.data.data
        })
      //创建的话题数量
      const topicurl = config.base_url + '/topic/create?userId=' + this.pid
      axios
        .get(topicurl)
        .then(res=> {
          this.createCount = res.data.data
        })
      //创建的话题数量
      const aurl = config.base_url + '/answer/count?userId=' + this.pid
      axios
        .get(aurl)
        .then(res=> {
          this.answerCount = res.data.data
        })
    },
    cropSuccess(imgDataUrl, field){

    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
      this.img = config.image_url + jsonData.data;
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log(status);
      console.log('field: ' + field);
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

  .el-main{
    height: 520px;
  }

  .wrapper{
    border: 1px solid lightgray;
  }

  .hcenter{
    display: flex;
    justify-content:center;
  }

  .bline{
    border-bottom: 1px solid lightgray;
  }

  .fsize18{
    font-size: 18px;
  }

  .mbt{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .img{
    width: 220px;
    height: 220px;
  }

    .mt60{
      margin-top: 60px;
    }
</style>
