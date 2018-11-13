<template>
  <el-breadcrumb :separator="separator">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item> -->
    <el-breadcrumb-item :to="{ path: crumb.path }" v-for="(crumb,idx) in crumbList" :key="idx">{{ crumb.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'Crumb',
  props: {
    separator: { type: String, default: '/' },
    crumbList: { type: Array }
  },
  data(){
    return {

    }
  },
}
</script>
