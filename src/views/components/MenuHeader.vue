<template>
  <el-row class="vcenter">
    <el-col :span="9" :offset="4">
      <el-menu
        :router="true"
        :default-active="defautActive"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#ee6e73"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="topic">All</el-menu-item>
        <el-submenu index="2">
          <template slot="title">前端</template>
            <el-menu-item :index=item.second v-for="item in front" :key="item.id">
              {{ item.second }}
            </el-menu-item>

          <!--<el-menu-item index="HTML">HTML</el-menu-item>-->
          <!--<el-menu-item index="CSS">CSS</el-menu-item>-->
          <!--<el-menu-item index="Javascript">Javascript</el-menu-item>-->
          <!--<el-menu-item index="Vue">Vue</el-menu-item>-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">后台</template>
          <el-menu-item :index=item.second  v-for="item in backstage" :key="item.id">
            {{ item.second }}
          </el-menu-item>

          <!--<el-menu-item index="JavaSE">JavaSE</el-menu-item>-->
          <!--<el-menu-item index="SpringBoot">SpringBoot</el-menu-item>-->
          <!--<el-menu-item index="Maven">Maven</el-menu-item>-->
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">数据库</template>
          <el-menu-item :index=item.second v-for="item in db" :key="item.id">
            {{ item.second }}
          </el-menu-item>

          <!--<el-menu-item index="MyBatis">MyBatis</el-menu-item>-->
          <!--<el-menu-item index="MySQL">MySQL</el-menu-item>-->
          <!--<el-menu-item index="JPA">JPA</el-menu-item>-->
        </el-submenu>

      </el-menu>
    </el-col>
    <el-col :span="1" :offset="3">
      <router-link :to="{name:'Profile'}" class="fontwhite">账号名</router-link>
    </el-col>
    <el-col :span="1">
      <router-link :to="{name:'Publish'}" class="fontwhite">发表</router-link>
    </el-col>
    <el-col :span="1">
      <router-link :to="{name:'Rank'}" class="fontwhite">排行榜</router-link>
    </el-col>
    <el-col :span="1">
      <router-link :to="{name:'Login'}" class="fontwhite">登出</router-link>
    </el-col>
  </el-row>

</template>

<script>
import {config} from "../../utils/global"
import axios from 'axios'
  export default {
  name: "MenuHeader",
  data() {
    return {
      defautActive: 'topic',
      front: [],
      db:[],
      backstage:[]
    };
  },
  mounted() {
    this.frontf()
    this.dbf()
    this.backstagef()
  },
  methods: {
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
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
  .el-row{
    background-color: #ee6e73;
    /*height: 65px;*/
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
