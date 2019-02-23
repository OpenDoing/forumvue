<template>
  <el-container>
    <el-footer height="140px">
      <el-row >
        <el-col :span="6" :offset="4">
          <h1 class="fontwhite">Chuzhou University</h1>
        </el-col>
        <el-col :span="6" :offset="6">
          <h1 class="fontwhite">Links</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <div class="fontwhite">致力于校内交流的社交平台</div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="fontwhite"><a href="http://www.chzu.edu.cn/">关于我们</a></div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px">
        <el-col :span="6" :offset="4">
          <div class="fontwhite">你想说的，都在这里</div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="fontwhite"><router-link to="/back/login">2019年本科毕业设计</router-link> </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>

  .el-footer {
    background-color: #ee6e73;
    height: 100px;
  }
  .fontwhite{
    color: white;
  }
  .fontwhite .mar{
    color: white;
    margin-top: 5px;
  }
  a { text-decoration:none;
    color:white;}
  a:visited{color:white;}
</style>
