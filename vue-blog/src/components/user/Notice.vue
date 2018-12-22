<template>
  <div class="notice">
    <el-checkbox v-model="notRead" @change="changeNotReadCheck">未读</el-checkbox>
    <el-checkbox v-model="isRead" @change="changeIsReadCheck">已读</el-checkbox>    
    <el-button type="primary" size="mini" style="margin: 0 0 16px 16px;">全部标为已读</el-button>
    <el-card style="margin-bottom:5px;" shadow="hover" v-for="(notice, index) in noticeList" 
             :key="index" class="card">
      <el-badge is-dot :hidden="!!notice.isread">
        <p v-fl class="notice-title">收到一条新评论</p>
        <el-button v-fr type="text" size="mini">查看</el-button>
        <el-button v-fr type="text" size="mini" :disabled="notice.isread" @click="noticeIsRead(notice._id)">已读 </el-button>
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
      isRead: true,
      notRead: true,
      noticeList: [],
      isReadDisabled: true
    }
  },
  created(){
    this.getNoticeList()
  },
  methods: {
    getNoticeList(){
      http.getUserInfo(this.$store.state.username)
        .then(({ data }) => {
          this.noticeList = data.notice
        })
    },
    changeNotReadCheck(ev){
      console.log(ev)
    },
    changeIsReadCheck(ev){
      console.log(ev)
    },
    noticeIsRead(id){
      http.getNoticeIsRead(id)
        .then(({ data }) => {
          this.getNoticeList()
        })
    }
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