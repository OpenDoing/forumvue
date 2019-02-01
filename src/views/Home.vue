<template>
  <div>
  <Header></Header>
  <el-main>
    <el-row>
      <h2 class="hcenter">Description</h2>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
      <div class="hcenter">滁州学院论坛基于Springboot开发的web项目，是一个学习论坛，为学院学习者提供一个学习的社区化平台。
        主要功能有登录、注册、浏览话题、发表话题、 话题分类浏览、评论、统计、排名等等。
        它是一个校内讨论交流的平台，师生可以畅所欲言。
      </div>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <h2 class="hcenter">Technologies</h2>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="hcenter">Java 8 Standard Edition、 SpringBoot、 MyBatis、 HTML、 Javascript、 CSS（Materialize）、 Maven、 MySql
        </div>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <h2 class="hcenter">Software tools</h2>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <div class="hcenter">IDEA、 Navicat [MySQL]、PostMan
        </div>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <h2 class="hcenter">Framework</h2>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5">
        <div class="hcenter">Vue
        </div>
      </el-col>
    </el-row>
  </el-main>
  <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from  './components/Footer'
export default {
  name: "Home",
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
  .el-main{
    height: 520px;
  }
  .hcenter{
    display: flex;
    justify-content:center;
  }
  .mt20{
    margin-top: 20px;
  }
  /*垂直居中*/
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
