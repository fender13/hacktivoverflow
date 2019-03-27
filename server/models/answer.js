const mongoose = require('mongoose')

const dbconnect = process.env.URL_DB
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

const schema = mongoose.Schema

const AnswerSchema = new schema({
    answer: {
        type: String,
        required: true
    },
    QuestionId: {
        type: schema.Types.ObjectId,
        ref: 'Questions',
        required: true
    },
    vote: [{
        type: schema.Types.ObjectId,
        ref: 'Users'
    }],
    UserId: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Answers = mongoose.model('Answers', AnswerSchema)

module.exports = Answers