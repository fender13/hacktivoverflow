const model = require('../models/user')
const ENV = require('dotenv')
ENV.config()

const comparePassword = require('../helpers/comparePassword')

const jwt = require('jsonwebtoken')

class UserController {
    static userRegister(req, res) {
        const { firstName, lastName, email, username, password } = req.body

        model.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        })
            .then(function(data) {
                res.status(201).json(data)
            })

            .catch(function(e) {
                if (e.errors.firstName) {
                    res.status(400).json({
                        firstName: e.errors.firstName.message
                    })
                } else if (e.errors.lastName) {
                    res.status(400).json({
                        lastName: e.errors.lastName.message
                    })
                } else if (e.errors.username) {
                    res.status(400).json({
                        username: e.errors.username.message
                    })
                } else if (e.errors.email) {
                    res.status(400).json({
                        email: e.errors.email.message
                    })
                } else {
                    res.status(500).json({
                        message: 'Terjadi kesalahan pada server. Cobalah beberapa saat lagi..'
                    })
                }
            })
    }

    static userLogin(req, res) {
        const { username, password } = req. body
        let dataUser
        model.findOne({
            username: username
        })
            .then(function(user) {
                dataUser = user
                if (!user) {
                    res.status(400).json({
                        message: 'EMAIL ATAU PASSWORD ANDA SALAH'
                    })
                } else {
                    return comparePassword(password, dataUser.password)
                }
            })

            .then(function(result) {
                if (!result) {
                    res.status(400).json({
                        message: 'EMAIL ATAU PASSWORD ANDA SALAH'
                    })
                } else {
                    const payload = {
                        id: dataUser._id,
                        username: dataUser.username
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET)
                    res.status(200).json({
                        token: token,
                        id: dataUser._id,
                        username: dataUser.username
                    })
                }
            })
            
            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }
}

module.exports = UserController