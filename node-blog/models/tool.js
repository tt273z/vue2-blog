const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const moment = require('moment')

// json:{ beginDate endDate author title tag } 
const queryByCondition = (req, res, next) => {
	let json = JSON.parse(req.body.json)
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

const getYearPvStatistics = (req, res, next) => {
	let startTime = moment().year(moment().year()).startOf('year').format('YYYY-MM-DD HH:mm')
	let endTime = moment().year(moment().year()).endOf('year').format('YYYY-MM-DD HH:mm')
	Model.Post
		.where('time')
		.gte(startTime).lte(endTime)
		.select('pv comments time')
		.exec((err, docs) => {
			if(err) return next(err)
			let result = []
			for(let i = 1; i < 13; i++) {
				let m = `${moment().year()}-${i>9?i: '0'+i}`
				result.push({
					month: m,
					pno: 0,
					pv: 0,
					com: 0
				})
			}
			docs.map(e => {
				let d = moment(e.time).format('MM')
				result[d-1].pv += e.pv
				result[d-1].pno++
				result[d-1].com += e.comments.length					
			})
			res.json(result)
		})
}

const getTagsWordCloud = (req, res, next) => {
	Model.Post.find({}, (err, docs) => {
		if(err) return next(err)
		let result = []
		docs.map(e => {
			e.tags.map(tag => {
				let flag = result.some(item => {
					if(tag == item.name) {
						return item.value++
					}
					return false
				})
				if(!flag){
					result.push({
						name: tag,
						value: 1
					})
				}
			})
		})
		res.json(result)
	})
}



router.post('/tool/query', queryByCondition)
router.get('/tool/getYearPvStatistics', getYearPvStatistics)
router.get('/tool/getTagsWordCloud', getTagsWordCloud)

module.exports = router