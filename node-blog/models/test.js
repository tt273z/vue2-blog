const express = require('express')
const Model = require('../mongodb/db')
const router = express.Router()
const path = require('path')


async function test(req, res){
	var docs = await Model.Test.find({}, '-_id')
	res.json(docs)
}

const getPath = (req, res, next) => {
	var root = path.join(__dirname, '../public/images/')
	res.send(root)
}

router.get('/', test)
router.get('/path', getPath)

module.exports = router