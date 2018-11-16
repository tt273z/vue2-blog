<template>
  <div class="blog-list" v-loading.fullscreen.lock="loading">
    <!-- <el-button type="text" style="float:right" @click="getAllPosts">点击获取全部文章</el-button>       -->
    <el-card shadow="hover" v-for="(blog, index) in blogList" 
             :key="index" class="card" >
      <p class="title" @click="getDetail(blog._id)">{{ blog.title }}</p>
      <p class="content">{{ blog.content }}</p>
      <p class="author"><a @click.stop="getPostsByUser(blog.author)">@{{ blog.author }}</a> Posted at {{ blog.time }}
        阅读({{ blog.pv? blog.pv: 0 }}) 评论({{ blog.comments? blog.comments.length: 0 }})        
      </p>
    </el-card>
    <h1 v-if="!blogList.length" style="text-align:center">没有文章可以看 (逃</h1>
  </div>
</template>

<script>
import http from '@/api'
export default {
  name: 'BlogList',
  created(){
    this.getAllPosts()
    sessionStorage.setItem('crumb', JSON.stringify([{ title: '博客主页', path: '/' }]))
  },
  data(){
    return {
      blogList: [],
      loading: true,
    }
  },
  methods: {
    getAllPosts(){
      http.getAllPosts()
        .then(({ data }) => {
          if(data){
            this.blogList = data
            this.loading = false
          }
        }).catch(err => {
          console.log(err)
        })
    },
    getDetail(id){
      this.$router.push({ name: 'postid', params: { id: id } })
    },
    getPostsByUser(user){
      this.loading = true
      http.getPostsByUser(user)
        .then(({ data }) => {
          this.blogList = data
          this.loading = false
        }, err => {
          console.log(err)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.blog-list {
  width: 90%;
  min-width: 700px;
  margin: auto;
  .card {
    width: 100%;
    max-height: 150px;
    margin-bottom: 5px;

    .title {
      padding: 10px 0;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
    }
    .content {
      line-height: 1.5;
      font-size: 14px;
      color: #555;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .author {
      font-size: 14px;
      padding: 10px 0;
      text-align: right;
      color: #A8B1BA;
    }
  }
  .el-card__body {
    padding: 0 20px;
  }
}

</style>