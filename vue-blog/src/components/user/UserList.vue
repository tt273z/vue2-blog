<template>
  <div class="user-list">
    <el-table v-loading="loading" :data="userList" style="width:100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="list">
          <el-button @click="handleClick(list.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="deleteRow(list.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/api"
export default {
  name: 'UserList',
  mounted(){
    this.getUsers()
  },
  data(){
    return {
      userList: [],
      loading: true
    }
  },
  methods: {
    handleClick(row){
      console.log(row)
    },
    //删除当前行
    deleteRow(row){
      http.delUser({
        name: row.name
      }).then(({ data }) => {
        if(data) {
          this.$message({
            type: 'success',
            message: '成功删除一条记录'
          })          
        } else {
          this.$message({ message: '操作失败' })
        }
        this.getUsers()
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取用户
    getUsers(){
      http.getUsers()
        .then(({ data }) => {
          if(data){
            this.userList = data
            this.loading = false
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">

</style>
