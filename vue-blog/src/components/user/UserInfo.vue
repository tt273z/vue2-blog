<template>
  <div class="user-info" v-loading="loading">
    <el-upload
      class="avatar-uploader"
      :action="$apiURL + '/upload'"
      :data="uploadData"
      :show-file-list="false"
      :on-success="getAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img :src="$imageURL + avatarSrc" class="avatar" alt="点击修改头像" />
    </el-upload>
    <p class="name">{{ userInfo.name }}</p>
  </div>
</template>

<script>
import http from "@/api"
export default {
  name: 'UserInfo',
  created(){
    this.getUserInfo()
  },
  data(){
    return {
      user: this.$store.state.username,
      loading: true,
      userInfo: {},
      avatarSrc: 'default.jpg',
      uploadData: {
        name: this.$store.state.username
      }
    }
  },
  methods: {
    getUserInfo(){
      http.getUserInfo(this.user)
        .then(({ data }) => {
          this.userInfo = data
          this.avatarSrc = data.avatar
          this.loading = false
        })
    },
    getAvatarSuccess(res, file) {
      console.log(file)
      this.avatarSrc = res.avatar
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
.user-info {
  text-align: center;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: pointer;
  }
  .name {
    font-size: 20px;
    font-weight: 700;
    padding: 10px 0;
  }
}
</style>
