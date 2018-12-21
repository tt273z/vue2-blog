<template>
  <el-dialog class="login-dialog" width="400px" :visible.sync="dialogFormVisible" :close-on-press-escape="false" :show-close="false" :center="true" :before-close="closeDialog">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="loginForm">
        <!-- loginform -->
        <el-form :label-position="'left'" :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="loginForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="registerForm">
        <!-- registerform -->
        <el-form :label-position="'left'" :model="registerForm" :rules="registerRules" ref="registerForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="registerForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPassword">
            <el-input type="password" v-model="registerForm.checkPassword" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/api"
import { mapActions } from "vuex"
export default {
  name: "Login",
  props: {
    //props的数据只能被父组件改动 不要试图在子组件内部改变父组件传入的数据
    dialogFormVisible: Boolean
  },
  mounted() {},
  data() {
    var checkPass = (rule, value, callback) => {
      if (value != this.registerForm.password) {
        callback(new Error("两次密码输入不一致"))
      } else {
        callback()
      }
    };
    return {
      loginForm: {
        name: "",
        password: ""
      },
      loginRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      registerForm: {
        name: "",
        password: "",
        checkPassword: ""
      },
      registerRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: checkPass, trigger: "blur" }
        ]
      },
      formLabelWidth: "80px",
      activeName: "loginForm"
    };
  },
  methods: {
    //消息弹窗 success/info/error/warn
    present(message, type) {
      this.$message({
        message: message,
        type: type ? type : 'info',
        duration: 2000
      });
    },
    //表单提交
    submit() {
      this.$refs[this.activeName].validate(valid => {
        if (valid) {
          this.activeName == 'loginForm'? this.doLogin()
            : this.doRegister()
        }
      })
    },
    //actions分发 直接调用this.userLogin() 相当于 this.$store.dispatch('userLogin')
    ...mapActions(['userLogin', 'userLogout']),
    //登录请求
    doLogin() {
      http.login({
        name: this.loginForm.name, 
        password: this.loginForm.password 
      }).then(({ data }) => {  //要注意这里原本参数是一些响应信息 其中的data才是后台传来的数据
        let res = data
        if (res.code) {
          this.present(res.message, 'success')
          this.userLogin(res.data)
          this.clearForm()
          this.closeDialog()
        } else {
          this.present(res.message, 'error')
          this.loginForm.password = ''
        }
      }).catch(err => {
        console.log(err)
      })
      
    },
    //注册请求
    doRegister(){
      console.log(http)
      http.register({
        name: this.registerForm.name,
        password: this.registerForm.password
      }).then(({ data }) => {
        let res = data
        if (res.code) {
          this.present(res.message, 'success')
          this.activeName = 'loginForm'
          this.clearForm()
          this.$emit('hasLogged')
        } else {
          this.present(res.message, 'error')
          this.registerForm.password = this.registerForm.checkPassword = ''
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //清除表单
    clearForm(){
      this.$refs.loginForm.resetFields()
      this.$refs.registerForm.resetFields()
    },
    closeDialog() {
      this.clearForm()
      this.$emit('changeVisible')
    },
  }
}
</script>
<style lang="scss">
.login-dialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0 25px;
  }
  .el-tabs__header {
    margin: 0 0 40px;
  }
  .el-tabs__item {
    font-weight: 16px;
    font-weight: 700;
  }
}
</style>

