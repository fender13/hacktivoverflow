const questionModel = require('../models/question')
const answerModel = require('../models/answer')

const jwt = require('jsonwebtoken')

class AnswerController {
    static createAnswer(req, res) {
        const QuestionId = req.params.id
        const { answer } = req.body
        let decode = jwt.decode(req.headers.token) 
        let answerData

        answerModel.create({
            answer: answer,
            QuestionId: QuestionId,
            UserId: decode.id,
            createdAt: new Date()
        })
            
            .then(function(data) {
                answerData = data
                return questionModel.findOneAndUpdate(QuestionId,
                        { "$push": { "answer": data._id } },
                        { "new": true, "upsert": true }
                    )
            }) 

            .then(function(databaru) {
                res.status(201).json(answerData)
            })

            .catch(function(e) {
                console.log(e)
                res.status(500).json({
                    error: e.message
                })
            })
    }

    static voteUpAnswer(req, res) {
        const id = req.params.id        
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        answerModel.findOne(getId)
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
                    return answerModel.findOneAndUpdate(getId, 
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

    static voteDownAnswer(req, res) {
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        answerModel.findOneAndUpdate(getId, 
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

    static findOneAnswer(req, res) {
        answerModel
            .findOne({
                _id: req.params.id
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

    static updateAnswer(req, res) {
        const { answer } = req.body
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        answerModel.findOne(getId) 
            .then(function(data) {
                if (data.UserId != decode.id) {
                    res.status(400).json({
                        message: 'DILARANG UPDATE PUNYA ORANG LAIN'
                    })
                } else {
                    return answerModel.findOneAndUpdate(getId, {
                        answer: answer
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

    static deleteAnswer(req, res) {
        const id = req.params.id
        let decode = jwt.decode(req.headers.token) 
        const getId = { _id: id }

        answerModel.findOne(getId) 
            .then(function(data) {
                const questionId = { _id: data.QuestionId}
                if (data.UserId != decode.id) {
                    res.status(400).json({
                        message: 'DILARANG DELETE PUNYA ORANG LAIN'
                    })
                } else {
                    return questionModel.findOneAndUpdate(questionId, 
                        { "$pull": { "answer": data.QuestionId } },
                        { "new": true, "upsert": true }
                    )
                }
            })

            .then(function(data) {
                console.log(data, 'masuk')
                return answerModel.findByIdAndDelete(getId)
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
}

module.exports = AnswerController