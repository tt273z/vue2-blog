<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from '@/components/Main.vue'
export default {
  name: 'app',
  components: {
    Main
  },
};
</script>

<style lang="scss">
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
