<template>
  <div>
    <MenuHeader></MenuHeader>
    <el-main>
      <el-row>
        <el-col :span="8" :offset="3">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8" :offset="1">
aa
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import MenuHeader from './components/MenuHeader'
export default {
  name: "Profile",
  components: {
    MenuHeader
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
