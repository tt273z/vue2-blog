const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')

// json:{ beginDate endDate author title tag } 
const queryByCondition = (req, res, next) => {
	let json = JSON.parse(req.body.json)
	console.log(req.body.json)
	function reg(key) { return new RegExp(key, 'i') }
	let condition = []
	if(json.title != undefined && json.title != '') {
		condition.push({ title: { $regex: reg(json.title) } })
	}
	if(json.author != undefined && json.title != '') {
		condition.push({ author: { $regex: reg(json.author) } })
	}
	if(json.tags != undefined && json.tags != '') {
		condition.push({ tags: json.tags })
	}
	if(json.beginDate != undefined && json.beginDate != '') {
		condition.push({ time: { $gte: moment(json.beginDate).format('YYYY-MM-DD HH:mm') } })
	}	
	if(json.endDate != undefined && json.endDate != '') {
		// condition.push({ time: { $gte: new Date(json.beginDate), $lte: new Date(json.endDate) } })
		condition.push({ time: { $lte: moment(json.endDate).format('YYYY-MM-DD HH:mm') } })
	}	
	if(condition.length) {
		Model.Post.find({ $and: condition }, (err, docs) => {
			if(err) return next(err)
		  return res.json(docs)
		})		
	} else {
		Model.Post.find({}, (err, docs) => {
			if(err) return next(err)
		  return res.json(docs)
		})
	}
}



router.post('/tool/query', queryByCondition)

module.exports = router