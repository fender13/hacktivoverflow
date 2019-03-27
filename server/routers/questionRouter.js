const router = require('express').Router()
const controller = require('../controllers/questionController')

const authentication = require('../middlewares/authentication')

// post new question
router.post('/', authentication, controller.createQustion)

// get all questions
router.get('/findall', controller.findAll)

// get all user questions
router.get('/user', controller.findQuestion)

// get one question
router.get('/:id', authentication, controller.getDataQuestion)

// add 1 vote
router.post('/addvote/:id', authentication, controller.voteUpQuestion)

// remove take off vote
router.post('/downvote/:id', authentication, controller.voteDownQuestion)

// delete question
router.delete('/:id', authentication, controller.deleteQuestion)

// update question
router.put('/:id', authentication, controller.updateQuestion)

// add best answer
router.put('/best/:id', authentication, controller.bestAnswer)

module.exports = router