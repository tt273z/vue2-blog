const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const chalk = require('chalk')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const token = require('../utils/token')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

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
	let user = {
		name: req.body.name,
		password: req.body.password
	}
	Model.User.findOne({ name: user.name }, (err, docs) => {
		if(err) return next(err)
		if(!docs){ //用户不存在
			console.log(error('用户' + user.name + '不存在'))
			res.json({
				message: '用户不存在',
				code: 0
			})
		} else if(user.password === docs.password) {
			console.log(success('用户' + user.name + '登录成功'))
			Model.User.updateOne({ name: user.name }, { online: 1 }, (err) => {
				if(err) {
					console.log(error('用户在线状态更新失败'))
				} else {
					console.log(success('用户在线状态更新成功：已在线'))
				}
			})
			res.json({
				data: {
					name: user.name,
					password: user.password,
					token: token.createToken(user.name)
				},
				message: '用户登录成功',
				code: 1
			})
		} else {
			res.json({
				message: '密码错误',
				code: 0
			})
		}
	})
}

//登出
const logout = (req, res, next) => {
	Model.User.updateOne({ name: req.query.name }, { online: 0 }, (err) => {
		if(err) {
			console.log(error('用户在线状态更新失败'))
			res.json({
				message: '用户登出异常',
				code: 0
			})
			return next(err)
		} else {
			console.log(success('用户在线状态更新成功：已离线'))
			res.json({
				message: '用户登出成功',
				code: 1
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

//将消息标为已读
const noticeIsRead = (req, res, next) => {
	if(req.query.id) {
		Model.User.updateOne({ 'notice._id': ObjectId(req.query.id) },
			{ $set: { 'notice.$.isread': 1 } }, (err) => {
			if(err) return next(err)
			res.send(new Number(1))
		})
	} else { //id不存在 全部标为已读
		Model.User.findOne({ name: req.query.name }, (err, doc) => {
			if(err) return next(err)
			doc.notice.map(e => {
				e.isread = 1
			})
			Model.User.updateOne({ name: req.query.name }, { notice: doc.notice },
				err => {
					console.log(req.query.name + '：消息全部标为已读')
					res.send(new Number(1))
				})
		})
	}
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
router.get('/logout', token.checkToken, logout)
router.get('/users', token.checkToken, getUsers)
router.post('/delUser', token.checkToken, delUser)
router.get('/getUser', token.checkToken, getUserByName)
router.post('/upload', token.checkToken, uploadAvatar)
router.get('/noticeIsRead', noticeIsRead)


module.exports = router