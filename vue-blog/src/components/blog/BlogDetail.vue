<template>
  <div class="blog-detail">
    <div class="top">
      <Crumb :crumbList="crumbList" v-fl/>
      <el-button icon="el-icon-arrow-left" plain size="mini" v-fr @click="back()">返回</el-button>
    </div>
    <el-card>
      <h1 class="title">{{ blogInfo.title }}</h1>
      <p class="author">{{ blogInfo.author }} | {{ blogInfo.time }} <span class="pv">Visited: {{ blogInfo.pv? blogInfo.pv: 0 }}</span></p>
      <p class="content">{{ blogInfo.content }}</p>
      <p class="tags" v-if="blogInfo.tags&&blogInfo.tags.length">
        <span style="color:#aaa;font-size:14px;">Tags: </span>
        <el-tag type="info" size="mini" v-for="(tag, index) in blogInfo.tags" :key="index">{{ tag }}</el-tag>
      </p>
      <div class="comment-wrap">
        <p class="bottom-line comment-title">评论列表({{ comments.length }})</p>
        <p v-if="!comments.length" style="text-align:center;padding:20px 0;color:#bbb;">还没有人评论 _(:3 」∠ )_</p>
        <div class="comment-main" v-for="(com, index) in comments" :key="index">
          <p class="name"><a>{{ com.name }}</a></p>
          <p class="detail">#{{ index + 1 }}楼 {{ com.time }}</p>
          <p class="text">{{ com.text }}</p>
        </div>
        <div class="comment-form">
          <p class="comment-title">发表评论</p>
          <el-input class="margin-bottom" v-model="comment" type="textarea" resize="none"></el-input>
          <el-button class="btn" type="primary" @click="addComment">发表评论</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "@/api"
export default {
  name: "BlogDetail",
  created() {
    this.getPosts()
    this.crumbList = JSON.parse(sessionStorage.getItem('crumb'))
    this.crumbList.push({ title: '文章详情' })
  },
  data() {
    return {
      blogInfo: {},
      id: this.$route.params.id,
      comment: '',
      comments: [],
      crumbList: []
    }
  },
  methods: {
    getPosts() {
      http.getPostsById(this.id).then(
        ({ data }) => {
          this.blogInfo = data
          this.comments = data.comments
        },
        err => {
          console.log(err);
        }
      )
    },
    addComment(){
      if(!this.comment) {
        this.$message.error('评论内容不能为空')
        return
      }
      http.addComment({
        name: this.$store.state.username,
        id: this.id,
        text: this.comment
      }).then(({ data }) => {
        if(data) {
          this.$message({ message: '评论成功', type: 'success' })
          this.getPosts()
          this.comment = ''
        } else {
          this.$message({ message: '评论失败', type: 'error' })
        }
      })
    },
  }
};
</script>

<style scoped lang="scss">
.blog-detail {
  width: 75%;
  margin: auto;
  .pv {
    float: right;
  }
  .title {
    font-size: 26px;
    text-align: center;
  }
  .author {
    font-size: 12px;
    padding: 10px 0;
    font-weight: 700;
    color: #aaa;
  }
  .btn {
    float: right;
    margin-right: 10px;
    color: #607d8b;
  }
  .content {
    padding: 10px 0 90px;  
  }
  .comment-wrap {
    margin-top: 20px;
    .comment-main {
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
      .detail {
        font-size: 12px;
        color: #757575;
      }
      .text {
        padding: 15px 0;
        line-height: 1.5;
        font-size: 14px;
      }
      .name {
        font-size: 14px;
      }
    }
    .comment-form {
      overflow: hidden;
      margin-top: 10px;
      .btn {
        float: right;
        color: #fff;
      }
    }
    .comment-title {
      color: #545c64;
      font-size: 14px;
      font-weight: 700;
    }
  }
  .bottom-line {
    border-bottom: 1px solid #ccc;
  }
  .margin-bottom {
    margin-bottom: 10px;
  }
}
</style>
