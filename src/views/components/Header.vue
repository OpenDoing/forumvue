<template>
   <el-row class="vcenter">
     <el-col :span="6" :offset="4">
       <h2 class="fontwhite">滁州学院论坛</h2>
     </el-col>
     <el-col :span="1" :offset="6">
       <router-link :to="{name:'Home'}" class="fontwhite">主页</router-link>
     </el-col>
     <el-col :span="1" >
       <router-link :to="{name:'Login'}" class="fontwhite">登录</router-link>
     </el-col>
     <el-col :span="1" >
       <router-link :to="{name:'Register'}" class="fontwhite">注册</router-link>
     </el-col>
   </el-row>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
  .el-row{
    background-color: #ee6e73;
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
  }
  .router-link-active {
     text-decoration: none;
   }

</style>
