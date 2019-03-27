const questionModel = require('../models/question')
const answerModel = require('../models/answer')

const jwt = require('jsonwebtoken')

class QuestionController {
    static createQustion(req, res) {
        const { title, question } = req.body
        let decode = jwt.decode(req.headers.token) 

        questionModel.create({
            title: title,
            question: question,
            UserId: decode.id,
            createdAt: new Date()
        })
            .then(function(data) {
                res.status(201).json(data)
            })
            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static findAll(req, res) {
        questionModel.find()
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static findQuestion(req, res) {
        let decode = jwt.decode(req.headers.token) 
        questionModel.find({
            UserId: decode.id
        })
            .then(function(data) {
                res.status(200).json(data)
            })
            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static getDataQuestion(req, res) {
        const id = req.params.id
        const getId = { _id: id }

        questionModel.findOne(getId)
            .populate({
                path: 'answer',
                populate: { path: 'UserId' } // <--- specify the model explicitly
            })
            .populate('UserId')

            .then(function(data) {
                res.status(200).json(data)
            })

            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static voteUpQuestion(req, res) {
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        questionModel.findOne(getId)
            .then(function(data) {
                if (data.UserId == decode.id) {
                    return res.status(400).json({
                        message: 'TIDAK BOLEH VOTE JAWABAN SENDIRI'
                    })
                }

                let count = 0
        
                for (let i = 0; i < data.vote.length; i++) {
                    if (data.vote[i] == decode.id) {
                        count++
                    }
                }

                if (count > 0) {
                    res.status(400).json({
                        message: 'TIDAK BOLEH UP-VOTE JAWABAN YANG SAMA LEBIH DARI 1 KALI'
                    })
                } else {
                    return questionModel.findOneAndUpdate(getId, 
                            { "$push": { "vote": decode.id } },
                            { "new": true, "upsert": true }
                        )
                }
            })

            .then(function(data) {
                res.status(200).json(data)
            })

            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    } 

    static voteDownQuestion(req, res) {
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        questionModel.findOneAndUpdate(getId, 
                { "$pull": { "vote": decode.id } },
                { "new": true, "upsert": true }
            )

            .then(function(data) {
                res.status(200).json(data)
            })

            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static deleteQuestion(req, res) {
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }
        
        questionModel.findOne(getId)
            .then(function(data) {
                if (data.UserId != decode.id) {
                    res.status(400).json({
                        message: 'DILARANG MENGHAPUS DATA ORANG LAIN'
                    })
                } else {
                    return questionModel.findByIdAndDelete(getId)
                }
            })

            .then(function(data) {
                res.status(200).json(data)
            })

            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static updateQuestion(req, res) {
        const { title, question } = req.body
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        questionModel.findOne(getId)
            .then(function(data) {
                if (data.UserId != decode.id) {
                    res.status(400).json({
                        message: 'DILARANG UPDATE PUNYA ORANG LAIN'
                    })
                } else {
                    return questionModel.findOneAndUpdate(getId, {
                        title: title,
                        question: question,
                    })
                }
            })

            .then(function(data) {
                res.status(200).json(data)
            })

            .catch(function(e) {
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static bestAnswer(req, res) {

    }
}

module.exports = QuestionController