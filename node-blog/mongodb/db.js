const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:true})

const db = mongoose.connection

db.on('error', console.error.bind(console, '数据库连接失败'))
db.once('open', () => {
	console.log('数据库连接成功')
})

//模式
const testSchema = new Schema({
	name: String
})

const userSchema = new Schema({
	name: String,
	password: String,
	avatar: { type: String, default: 'default.jpg' },
	token: String,
	online: { type: Number, default: 0 },
	//type 0==comment评论 pid文章id cid评论id isread 0未读 1已读  
	notice: [{ id: String, type: String, pid: String, cid: String, isread: { type: Number, default: 0 } }]
})

const postSchema = new Schema({
	author: String,
	title: String,
	content: String,
	time: String,
	// name评论人用户名
	comments: [{ id: String, name: String, time: String, text: String }],
	tags: Array,
	pv: { type: Number, default: 0 }
})

const commentSchema = new Schema({
	name: String,
	time: String,
	title: String,
	comment: String
})

//模型
module.exports = {
	Test: mongoose.model('Test', testSchema),
	User: mongoose.model('User', userSchema),
	Post: mongoose.model('Post', postSchema),
	Comment: mongoose.model('Comment', commentSchema)
}

