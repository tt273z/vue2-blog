<template>
  <div class="my-blog">
    <el-table v-loading="loading" :data="blogList" style="width:100%">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="time" label="日期"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="list">
          <el-button @click="edit(list.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="del(list.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/api"
export default {
  name: 'MyBlog',
  mounted(){
    this.getPosts()
  },
  data(){
    return {
      blogList: [],
      loading: true,
      user: sessionStorage.getItem('user')
    }
  },
  methods: {
    //点击编辑跳转到编辑页面
    edit(row){
      this.$router.push({ name: 'edit', params: { id: row._id } })
    },
    //删除当前行
    del(row){
      this.$confirm('确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        http.delPosts({
          id: row._id
        }).then(({ data }) => {
          if(data) {
            this.$message({ type: 'success', message: '删除成功' })          
          } else {
            this.$message({ message: '操作失败' })
          }
          this.getPosts()
        }).catch(err => {
          console.log(err)
        })        
      }).catch(() => { }) 
    },
    // 获取我的文章
    getPosts(){
      http.getPostsByUser(this.user)
        .then(({ data }) => {
          this.blogList = data
          this.loading = false
        }, err => {
          console.log(err)
        })
    },
  }
}
</script>

<style lang="scss">
</style>
