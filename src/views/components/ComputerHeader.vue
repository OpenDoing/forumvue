<template>
  <el-row class="vcenter">
    <el-col :span="9" :offset="4">
      <div class="hfont">APS开发组-计算机名称</div>
    </el-col>
  </el-row>

</template>

<script>
  import {config} from "../../utils/global"
  import axios from 'axios'
  export default {
    name: "ComputerHeader",
    data() {
      return {
        defautActive: 'topic',
        choose: '',
        front: [],
        db:[],
        backstage:[],
        username:'',
        userId: this.$cookies.get('userId')
      };
    },
    watch: {
      'choose':function () {
        this.$emit("updateTable",this.choose)
      }
    },
    mounted() {
      this.frontf()
      this.dbf()
      this.backstagef()
      this.init()
    },
    methods: {
      init(){
        this.username = this.$cookies.get('username')
        if (this.username === null) {
          this.$notify.info({
            title: '提示',
            message: '登录已过期!'
          });
          this.$router.push({path: '/login'})
        }
      },

      frontf() {
        const url = config.base_url + '/classify/get?firstId=1'
        axios
          .get(url)
          .then(res=>{
            this.front = res.data
          })
          .catch(err=>{

          })
      },
      dbf() {
        const url = config.base_url + '/classify/get?firstId=3'
        axios
          .get(url)
          .then(res=>{
            this.db = res.data
          })
          .catch(err=>{

          })
      },
      backstagef() {
        const url = config.base_url + '/classify/get?firstId=2'
        axios
          .get(url)
          .then(res=>{
            this.backstage = res.data
          })
          .catch(err=>{

          })
      },
      handleSelect(key, keyPath) {
        this.$router.push({path: '/topic'})
        this.choose = key
      }
    }
  }
</script>

<style scoped>
  .hfont{
    font-size: x-large;
    color: white;
  }
  .el-row{
    background-color: #409EFF;
    height: 65px;
    box-shadow: 0 2px 8px rgba(30,20,20,.1);
  }

  /*垂直居中*/
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .fontwhite{
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
