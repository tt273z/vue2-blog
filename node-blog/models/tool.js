const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const mongoose = require('mongoose')

// json:{ beginDate endDate author title tag } 
const queryByCondition = (res, req, next) => {
	let json = req.body.json
	function reg(key) { return new RegExp(key, 'i') }
	Model.post.find({
		$or: [
			{ title: { $regex: reg(json.title) } },
			{ author: { $regex: reg(json.author) } },
			{ tags: json.tags },
			{ time: { $gte: new Date(json.beginDate), $lte: new Date(json.endDate) } }
		]
	}, (err, docs) => {
		if(err) return next(err)
	  return res.json(docs)
	})
}



router.post('/tool/query', queryByCondition)

module.exports = router