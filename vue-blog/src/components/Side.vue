<template>
  <el-menu style="height:100%" default-active="2" @open="handleOpen" @close="handleClose" 
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
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
</template>
<script>
export default {
  name: 'Side',
  date(){
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath){
      console.log(key, keyPath)
    },
    handleClose(key, keyPath){
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>

</style>
