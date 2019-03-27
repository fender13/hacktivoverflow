const mongoose = require('mongoose')

const dbconnect = process.env.URL_DB
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const QuestionSchema = new schema({
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: [{
        type: schema.Types.ObjectId,
        ref: 'Answers'
    }],
    vote: [{
        type: schema.Types.ObjectId,
        ref: 'Users'
    }],
    UserId: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bestAnswer: [{
        type: schema.Types.ObjectId,
        ref: 'Users'
    }],
    createdAt: {
        type: Date,
        required: true
    }
})

const Questions = mongoose.model('Questions', QuestionSchema)

module.exports = Questions