const jwt = require('jsonwebtoken')

module.exports = {
	createToken: (name) => {
		return jwt.sign({ name: name }, 'secret', { expiresIn: '12h' })
	},
	checkToken: (req, res, next) => {
		console.dir(req.headers)
		//这里的 authorization 需要小写
		let token = req.headers['authorization'].split(' ')[1]
	 	try{
	 		let decoded = jwt.verify(token, 'secret')
	 		console.log(decoded)
	 	}catch(e){
	 		console.log(e)
	 		return res.status(401).json({
	 			code: 401,
	 			message: 'token 过期请重新登录'
	 		})
	 	}	
	 	next()
	}
}
