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
- 登录、注册
- 用户个人文章管理(发表、编辑、删除
- 文章综合查询
- 数据统计页面
- 用户
  - 用户账号管理
  - 用户详情页
- 用户登录拦截
