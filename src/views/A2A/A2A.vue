<template>
  <div>
    <el-row class="headerA">
      <el-col :span="8" :offset="4">
        <h2 class="fontwhite">SOFIA规约转Alloy规约原型工具</h2>
      </el-col>
    </el-row>

    <el-row class="mt30">
      <el-col :span="2" :offset="4">
        <el-button>打开规约</el-button>
      </el-col>

      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">转换</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success">保存</el-button>
      </el-col>
    </el-row>

    <el-row class="mt30">
      <el-col :span="8" :offset="4">
        <el-input
          type="textarea"
          v-model="sofia"
          :placeholder="sofia"
          :rows="20"/>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input
          type="textarea"
          v-model="alloy"
          :placeholder="alloy"
          :rows="20"/>
      </el-col>
    </el-row>

    <el-row class="mt30">
      <el-col :span="17" :offset="4">
        <el-input
          type="textarea"
          v-model="okok"
          :rows="5"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "A2A",
      data(){
          return{
            okok:'转换成功!',
            sofia:'{\n' +
            '\n' +
            'Spec AbsData;\n' +
            '\tuses String;\n' +
            '\tAttr\n' +
            '\t\tcontent: String;\n' +
            'End\n' +
            '\n' +
            'Spec SOData;\n' +
            'extends AbsData;\n' +
            '\tuses Integer;\n' +
            '\tAttr\n' +
            '\t\towner: Integer;\n' +
            'End\n' +
            '\n' +
            'Spec ListOfAbsData;\n' +
            '\tuses AbsData,Integer;\n' +
            '\tAttr\n' +
            '\t\tdatas[0..*]:AbsData;\n' +
            '\t\tlength:Integer;\n' +
            'End\n' +
            '\n' +
            'Spec AbsDB;\n' +
            '\tuses ListOfAbsData;\n' +
            '\tAttr\n' +
            '\t\tdatas: ListOfAbsData;\n' +
            'End\n' +
            '\n' +
            'Spec DataDB;\n' +
            'extends AbsDB;\n' +
            'End\n' +
            '\n' +
            'Spec DataOpReturn;\n' +
            '\tuses Integer,AbsData,AbsDB,SOData;\n' +
            '\tAttr\n' +
            '\t\tid:Integer;\n' +
            '\t\tdata:SOData;\n' +
            '\t\tdatabase:AbsDB;\n' +
            'End\n' +
            '\n' +
            'Spec VoteOp;\n' +
            '\tConst: grant, revoke, update;\t\t\n' +
            'End\n' +
            '\n' +
            'Spec DataOp;\n' +
            '\tuses Integer,String,\n' +
            '\t\tAbsData,Data,DataOpReturn,DataDB,GetObjByID,SetOp,Bool;\n' +
            '\tOperation\n' +
            '\t\tcreatedata(DataDB,Integer,String):DataOpReturn;\n' +
            ' \t\tupdatedata(DataDB,String,Integer):DataOpReturn;\n' +
            '\tAxiom\n' +
            '\t\t//create\n' +
            '\t\tFor all op:DataOp, db:DataDB, uid:Integer, c:String that\n' +
            '\t\t\tlet\n' +
            '\t\t\t\tre = op.createdata(db,uid,c).data\t\n' +
            '\t\t\tin\n' +
            '\t\t\t\tre.owner = uid, if re <> null, uid > 0;\n' +
            '\t\t\t\tre.content = c, if re <> null;\n' +
            '\t\t\tEnd\n' +
            '\t\tEnd\n' +
            '\n' +
            '\t\tFor all op:DataOp, db:DataDB, i:Integer, s:String that\n' +
            '\t\t\top.updatedata(db,s,i).data.content = s;\n' +
            '\t\t\top.updatedata(db,s,i).id = i;\n' +
            '\t\tEnd\n' +
            '\n' +
            '\t\tFor all op:DataOp, uid:Int, db:DataDB, c1,c2:String that\n' +
            '\t\t\top.updatedata(op.createdata(db,uid,c1).database, c2, op.createdata(db,uid,c1).id).data.content = c2;\n' +
            '\t\t\n' +
            '\t\tEnd\n' +
            '\t\t\t\n' +
            '\t\t\n' +
            'End\n' +
            '}',
            alloy:'sig AbsData { \n' +
            '    content:String\n' +
            '}\n' +
            'sig SOData extends AbsData{ \n' +
            '    owner:Integer\n' +
            '}\n' +
            'sig AbsDB { \n' +
            '    datas:set Int lone -> lone AbsData\n' +
            '}\n' +
            'sig DataDB extends AbsDB{ \n' +
            '\n' +
            '}\n' +
            'sig DataOpReturn { \n' +
            '    database:AbsDB,\n' +
            '    data:SOData,\n' +
            '    id:Integer\n' +
            '}\n' +
            'enum VoteOp {grant, revoke, update}\n' +
            '\n' +
            'pred createdata[c:String, createdataRe0:DataOpReturn, uid:Integer, db:DataDB]{ \n' +
            'createdataRe0 != null && uid > 0 => createdataRe0.owner = uid\n' +
            'createdataRe0 != null =>createdataRe0.content = c\n' +
            '}\n' +
            '\n' +
            'pred updatedata[s:String, updatedataRe0:DataOpReturn, i:Integer, db:DataDB]{ \n' +
            'updatedataRe0.data.content=s\n' +
            'updatedataRe0.id=i\n' +
            '}\n' +
            '\n' +
            'Assert assert0{ \n' +
            '  all uid:Int, createdataRe0:DataOpReturn, updatedataRe1:DataOpReturn, db:DataDB, c1:String, c2:String { \n' +
            '  updatedata[createdataRe0.database,c2,createdataRe0.id, updatedataRe1] && createdata[db,uid,c1, createdataRe0] => {\n' +
            ' updatedataRe1.data.content=c2} }}',
            message:'错误信息',
            options: [{
              value: '选项1',
              label: '基本模块'
            }, {
              value: '选项2',
              label: '组合模块（抽象）'
            }, {
              value: '选项3',
              label: '组合模块（实现）'
            }],
            value: '基本模块'
          }
      }
    }
</script>

<style scoped>
  .headerA {
    background-color: #409EFF;
    /*height: 65px;*/
    box-shadow: 0 2px 8px rgba(30,20,20,.1);
  }
  .fontwhite{
    color: white;
  }
  .mt30{
    margin-top: 30px;
  }
</style>
