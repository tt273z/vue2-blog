<template>
  <div id="app">
    <el-container>
      <el-header><Head/></el-header>
      <el-container>
        <el-aside width="200px"><Side/></el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Head from './components/Head.vue'
import Side from './components/Side.vue'
export default {
  name: 'app',
  components: {
    Head,
    Side
  }
};
</script>

<style>
html, body, #app > .el-container, #app { height: 100%; }
body, ul, li, p, h1, h2 {
  padding: 0; 
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  padding: 0 !important;
  line-height: 60px;
}
.el-main {
  background-color: #F5F5F5;
}
.content {
  line-height: 1.5;
  color: #333;
}
a:hover {
  color: orangered;
  text-decoration: underline;
  cursor: pointer;
}
.el-tag {
  margin-right: 5px;
}
.top { height: 40px; }

</style>
