const express = require('express')
const app = express()
const cors = require('cors')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT)

const userRouter = require('./routers/userRouter')
const questionRouter = require('./routers/questionRouter')
const answerRouter = require('./routers/answerRouter')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/question', questionRouter)
app.use('/answer', answerRouter)


app.get('*', (req, res) => {
    res.status(404).json({
        message: 'ERROR 404 - PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('SERVER IS ON AND LISTEN TO PORT',port)
})

