<template>
  <div class="notice">
    <el-checkbox v-model="checked" @change="changeCheck">未读</el-checkbox>
    <el-checkbox v-model="checked">已读</el-checkbox>    
    <el-button type="primary" size="mini" style="margin: 0 0 16px 16px;">全部标为已读</el-button>
    <el-card style="margin-bottom:5px;" shadow="hover" v-for="(notice, index) in noticeList" 
             :key="index" class="card">
      <el-badge is-dot :hidden="!!notice.isread">
        <p v-fl class="notice-title">收到一条新评论</p>
        <el-button v-fr type="text" size="mini">查看</el-button>
        <el-button v-fr type="text" size="mini">已读 | </el-button>
      </el-badge>
    </el-card>
  </div>
</template>
<script>
import http from "@/api"
export default {
  name: 'Notice',
  data(){
    return {
      checked: true,
      noticeList: []
    }
  },
  created(){
    http.getUserInfo(this.$store.state.username)
      .then(({ data }) => {
        this.noticeList = data.notice
      })
  },
  methods: {
    changeCheck(ev){
      console.log(ev)
    },
  }
};
</script>

<style lang="scss">
.notice {
  .el-badge__content.is-fixed.is-dot {
    position: absolute;
    left: -20px;
    top: -5px;
  }
  .el-badge {
    display: block;
  }
  .notice-title {
    font-size: 14px;
  }
}
</style>