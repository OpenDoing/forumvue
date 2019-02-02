<template>
    <el-row class="vcenter">
      <el-col :span="3" :offset="4">
        <div class="vline vcenter"><p class="fonttopic">所有话题</p></div>
      </el-col>
      <el-col :span="3" :offset="11">
        <div class="vline vcenter"><p class="fonttopic">话题数量：{{count}}</p></div>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: "TopicRow",
  props:{
    count: Number
  }
}
</script>

<style scoped>
  .el-row {
    height: 60px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
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
</style>
