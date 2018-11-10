<template>
  <div class="blog-edit">
    <h1 style="margin:5px 0">修改文章</h1>
    <p class="label">标题：</p>
    <el-input v-model="blogInfo.title" ></el-input>
    <p class="label">正文：</p>
    <el-input :rows="12" type="textarea" v-model="blogInfo.content" resize="vertical"></el-input>
    <el-row>
      <p class="label">标签：</p>
      <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="delTag(tag)">
        {{tag}}
      </el-tag>
      <el-input class="tag-input" v-if="inputVisible" v-model="inputTag" ref="saveTagInput"
                size="small" @keyup.enter.native="addTag" @blur="addTag">
      </el-input>
      <el-button v-else class="tag-btn" size="small" @click="showInput">+ 新标签</el-button>
      <el-button class="post-btn" type="primary" @click="submit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import http from '@/api'
export default {
  name: 'BlogEdit',
  data(){
    return {
      blogInfo: {},
      id: this.$route.params.id,
      tags: [],
      inputVisible: false,
      inputTag: ''
    }
  },
  created(){
    this.getPosts()
  },
  methods: {
    submit(){
      this.$store.state.username && this.edit()
    },
    edit(){
      http.editPosts({
        id: this.id,
        title: this.blogInfo.title,
        content: this.blogInfo.content,
        tags: this.tags
      }).then(({ data }) => {
        if(data){
          this.$message({ message: '编辑成功', type: 'success' })
          this.$router.push({ path: '/' })
        } else {
          this.$message({ message: '操作失败' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getPosts(){
      http.getPostsById(this.id)
        .then(({ data }) => {
          this.blogInfo = data
          this.tags = data.tags
        }, err => {
          console.log(err)
        })
    },
    delTag(tag){
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addTag() {
      if (this.inputTag) {
        this.tags.push(this.inputTag)
      }
      this.inputVisible = false
      this.inputTag = ''
    }
  }
}
</script>

<style scoped lang="scss">
.blog-edit {
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