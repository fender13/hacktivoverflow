const router = require('express').Router()
const controller = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

const jwt = require('jsonwebtoken')

const ENV = require('dotenv')
ENV.config()

// register a user
router.post('/register', controller.userRegister)

// login user
router.post('/login', controller.userLogin)

// verify if token already exist
router.get('/verify', authentication, (req, res) => {
    let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    res.status(200).json({
        message: 'User is verified',
        username: decoded.username
    })
})

module.exports = router