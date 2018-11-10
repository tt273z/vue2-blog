<template>
  <div class="post">
    <h1 style="margin:5px 0">发表文章</h1>
    <p class="label">标题：</p>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <p class="label">正文：</p>
    <el-input :rows="12" type="textarea" v-model="content" resize="vertical" placeholder="请输入文章内容"></el-input>
    <el-row>
      <p class="label">标签：</p>
      <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="delTag(tag)">
        {{tag}}
      </el-tag>
      <el-input class="tag-input" v-if="inputVisible" v-model="inputTag" ref="saveTagInput"
                size="small" @keyup.enter.native="addTag" @blur="addTag">
      </el-input>
      <el-button v-else class="tag-btn" size="small" @click="showInput">+ 新标签</el-button>
      <el-button class="post-btn" type="primary" @click="submit">Post</el-button>
    </el-row>
  </div>
</template>

<script>
import http from '@/api'
export default {
  name: 'BlogPost',
  data(){
    return {
      title: '',
      content: '',
      tags: [],
      inputVisible: false,
      inputTag: ''
    }
  },
  methods: {
    submit(){
      if(this.$store.state.username){
        this.post()
      } else {
        this.$message({ message: '发表文章前请先登录' })
      }
    },
    post(){
      if(!this.title && !this.content) {
        this.$message({ message: '标题和文章内容不可为空' })
        return
      }
      http.post({
        author: this.$store.state.username,
        title: this.title,
        content: this.content,
        tags: this.tags
      }).then(({ data }) => {
        if(data.code){
          this.$message({ message: data.message, type: 'success' })
          this.$router.push({ path: '/' })
        } else {
          this.$message({ message: '操作失败' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    delTag(tag){ //删除标签
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => { //输入框获得焦点
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addTag() {
      if (this.inputTag) { //防止添加空值以及回车提交 同时触发blur 重复添加tag
        this.tags.push(this.inputTag)
      }
      this.inputVisible = false
      this.inputTag = ''
    }
  }
}
</script>

<style lang="scss">
.post {
  .label {
    padding: 10px 0;
    font-size: 14px;
    font-weight: 700;
  }
  .post-btn {
    float: right;
  }
  .tag-input {
    width: 90px;
  }
}
</style>