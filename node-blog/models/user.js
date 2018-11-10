const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const chalk = require('chalk')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const token = require('../utils/token')

const error = chalk.bold.red
const success = chalk.bold.green


//注册
const register = (req, res, next) => {
	let user = new Model.User({
		name: req.body.name,
		password: req.body.password,
		token: token.createToken(req.body.name)
	})

	//检查用户是否存在
	Model.User.findOne({ name: user.name }, (err, docs) => {
		if(err) return next(err)
		if(docs){
			console.log(error('用户' + user.name + '已存在'))
			res.json({
				message: '用户已存在',
				code: 0
			})
		} else {
			user.save(err => {
				if(err) return next(err)
				console.log(success('用户' + user.name + '注册成功'))
				res.json({
					data: user,
					message: '用户注册成功',
					code: 1
				})
			})
		}
	})
}

//登录
const login = (req, res, next) => {
	let password = req.body.password
	Model.User.findOne({ name: req.body.name }, (err, docs) => {
		if(err) return next(err)
		if(!docs){ //用户不存在
			console.log(error('用户' + req.body.name + '不存在'))
			res.json({
				message: '用户不存在',
				code: 0
			})
		} else if(req.body.password === docs.password) {
			console.log(success('用户' + req.body.name + '登录成功'))
			res.json({
				data: {
					name: req.body.name,
					password: req.body.password,
					token: token.createToken(req.body.name)
				},
				message: '用户登录成功',
				code: 1
			})
		} else {
			console.log('密码错误')
			res.json({
				message: '密码错误',
				code: 0
			})
		}
	})
}

//获取用户列表
const getUsers = (req, res, next) => {
	Model.User.find({}, (err, docs) => {
		if(err) return next(err)
		if(docs) {
			res.json(docs)
		}
	})
}

//删除用户
const delUser = (req, res, next) => {
	Model.User.deleteOne({ name: req.body.name }, (err) => {
		if(err) { //send参数不能为数字 可以是Buffer对象，String，对象或Array
			res.send(new Number(0))
		} else {
			res.send(new Number(1))
		}
	})
}

//根据用户名获取单个用户信息
const getUserByName = (req, res, next) =>　{
	Model.User.findOne({ name: req.query.name }, (err, docs) => {
		if(err) return next(err)
		res.json(docs)
	})
}

//图片上传
const uploadAvatar = (req, res, next) => {
	let form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 编码
  form.keepExtensions = true // 保留扩展名
  form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小
  form.uploadDir = path.join(__dirname, '../public/images/') //存储路径 最后要注意加/否则会被存在public下
  form.parse(req, (err, fileds ,files) => { // 解析 formData数据
    if(err) { 
    	res.send(new Number(0))
    	return next(err) 
    } else {
    	let username = fileds.name //用户名
	    let oldPath = files.file.path // 获取文件路径
	    let imgname = files.file.name //图片名
	    let userImgname = imgname.replace(/[^.]+/, username) //将文件名改为 用户名.jpg
	    let newPath = path.join(path.dirname(oldPath), userImgname) 
      fs.rename(oldPath, newPath, (err) => { 
        if(err) return next(err)
        Model.User.updateOne({ name: username },  //改变用户的头像url
        	{
        		avatar: userImgname 
        	}, err => {
        		if(err) return next(err)
				    res.json({
				    	code: 1,
				    	avatar: userImgname
				    })              		
        	})
      })
    }

  })
}


router.post('/register', register)
router.post('/login', login)
router.get('/users', token.checkToken, getUsers)
router.post('/delUser', token.checkToken, delUser)
router.get('/getUser', token.checkToken, getUserByName)
router.post('/upload', token.checkToken, uploadAvatar)


module.exports = router