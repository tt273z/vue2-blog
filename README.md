# vue2-blog

一个基于 vue2 + express4 + mongodb 的简单博客应用

> vue2 + vuex + vue-router + element-ui + axios + express + mongodb

## 本地运行
``` bash
# 1. 启动数据库
mongod.exe

# 2. 后端服务运行 => localhost:3000
cd node-blog
npm install
npm run dev

# 3. 前端项目运行 => localhost:8080
cd vue-blog
npm install
npm run serve
```

## 功能
- 登录注册
- 文章管理(发表/编辑/删除
- 文章综合查询(根据日期/名称模糊/tag等查询
- 数据统计页面(echarts/eacharts-wordcloud
- 用户
  - 用户账号管理
  - 用户详情页
- 前端登录拦截
