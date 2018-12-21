<template>
  <el-container class="main">
    <el-header>
      <div class="head">
        <el-menu :default-active="$route.path" mode="horizontal" @slect="handleSelect"
                  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                  router>
          <el-menu-item index="/">博客主页</el-menu-item>      
          <el-menu-item index="/post">发表文章</el-menu-item>
          <el-menu-item index="/me">我的文章</el-menu-item>
          <el-badge :value="3">
            <el-menu-item index="/notice">消息中心</el-menu-item>
          </el-badge>
          <el-menu-item index="/users">用户管理</el-menu-item>
          <el-dropdown @command="onCommand" v-if="username">
            <span class="el-dropdown-link" @click="pop">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user">个人</el-dropdown-item>
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="pop" class="login-link" v-else>Login</span>
          <Login @changeVisible="closeDialogForm" @hasLogged="openWebSocket" :dialogFormVisible="isVisible"/>    
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu style="height:100%" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/query">
            <i class="el-icon-menu"></i>
            <span slot="title">条件查询</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">统计分析</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import http from "@/api"
import config from '@/assets/config'
import Login from '@/components/Login.vue'
export default {
  name: 'Main',
  components: {
    Login,
  },
  data(){
    return {
      isVisible: false,
      ws: {},
      wsData: {},
    }
  },
  created(){ //页面刷新重新连接ws
    if(this.username) {
      this.openWebSocket()
    }
  },
  computed: {
    username: function(){
      return this.$store.state.username
    }
  },
  methods: {
    handleSelect(key){
      let crumbList = []
      if(key == '/') {
        crumbList.push({ title: '博客主页', path: '/' })
      } else if (key == '/post') {
        crumbList.push({ title: '发表文章', path: '/post' })
      } else if(key == '/me') {
        crumbList.push({ title: '我的文章', path: '/me' })
      } else if(key == '/users') {
        crumbList.push({ title: '用户管理', path: '/users' })
      } 
      sessionStorage.setItem('crumb', JSON.stringify(crumbList))
    },
    closeDialogForm(){
      this.isVisible = false
    },
    logout(){
      this.$confirm('确定退出当前账号？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        http.logout(this.username)
          .then(({data}) => {
            if(data.code) {
              this.$store.dispatch('userLogout')
              this.ws.send(JSON.stringify({ type: 'logout', username: this.username }))
              this.ws.onclose()
              this.$message({ type: 'success', message: '已退出当前账号' })
              this.$router.push('/')              
            } else {
              this.$message({ type: 'error', message: data.message })
            }
          })
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
      if(!this.username) { //未登录状态下 弹出登录注册框
        this.isVisible = true
      }
    },
    openWebSocket(){
      this.ws = new WebSocket(`${config.wsServer}`)
      this.ws.onopen = () => {
        console.log(this.username + ':user login ws is opened')
        this.ws.send(JSON.stringify({ type: 'login', username: this.username }))
      }
      this.ws.onmessage = (ev) => {
        console.log(ev.data)
        if(ev.data)
        this.wsData = JSON.parse(ev.data)
        this.$notify({
          title: '消息通知',
          message: `收到一条新评论`,
          duration: 0
        });
      }
      this.ws.onclose = () => {
        console.log(this.username + ':login ws is closed')
      }
    }
  }
};
</script>

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
    outline: none;
  }
  .el-badge__content.is-fixed { 
    margin-top: 10px;
    margin-right: 10px;
    border: none;
  }
}
</style>
