<template>
    <div>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-menu
            :router="true"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/back/teacher">账号审核</el-menu-item>
            <el-menu-item index="/back/user">用户管理</el-menu-item>

            <el-menu-item index="/back/topic" >帖子管理</el-menu-item>
            <el-menu-item index=""><a href="https://github.com/OpenDoing/forumvue/commits" target="_blank">系统版本</a></el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

    </div>
</template>

<script>
export default {
  name: "Back",
  data() {
    return {
      activeIndex: '/back/teacher'
    }
  },
  methods: {
    handleSelect() {

    }
  }
}
</script>

<style scoped>
  .el-row{
    background-color: #545c64;
    /*height: 65px;*/
    box-shadow: 0 2px 8px rgba(30,20,20,.1);
  }
</style>
