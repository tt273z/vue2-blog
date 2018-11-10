<template>
  <div class="head">
    <el-menu :default-active="$route.path" mode="horizontal" @select="handleSelect" 
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
              router>
      <el-menu-item index="/">博客主页</el-menu-item>      
      <el-menu-item index="/post">发表文章</el-menu-item>
      <el-menu-item index="/me">我的文章</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的文章</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="/users">用户管理</el-menu-item>
      <el-dropdown @command="onCommand" v-if="$store.state.username">
        <span class="el-dropdown-link" @click="pop">
          {{ topText }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span @click="pop" class="login-link" v-else>{{ topText }}</span>
      <Login @changeVisible="closeDialogForm" :dialogFormVisible="isVisible"/>    
    </el-menu>

  </div>
</template>

<script>
import Login from './Login.vue'
export default {
  name: 'Head',
  components: {
    Login
  },
  data(){
    return {
      isVisible: false,
    }
  },
  computed: {
    //右上角显示文字 已登录显示用户名未登录显示login
    topText: function(){
      return this.$store.state.username? this.$store.state.username: 'Login'
    }
  },
  methods: {
    handleSelect(key, keyPath){
      console.log('nav clicked ' + key + ' path: ' + keyPath)
    },
    closeDialogForm(){
      this.isVisible = false
    },
    logout(){
      this.$confirm('确定退出当前账号？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('userLogout')
        this.$message({ type: 'success', message: '已退出当前账号' })
        this.$router.push('/')
      })          
      
    },
    onCommand(com){ //点击下拉框的子项触发
      if(com == 'user') {
        this.$router.push({ path: '/person' })
      } else {
        this.logout()
      }
    },
    pop(){
      if(!this.$store.state.username) { //未登录状态下 弹出登录注册框
        this.isVisible = true
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.head {
  .el-dropdown {
    color: #ffd04b;
    float: right;
    margin-right: 20px;
  } 
  .el-dropdown-link {
    cursor: pointer;
    outline: none;
  }
  .login-link {
    float: right;
    margin-right: 20px;
    color: #ffd04b;
    font-size: 14px;
    cursor: pointer;
  }

}

</style>