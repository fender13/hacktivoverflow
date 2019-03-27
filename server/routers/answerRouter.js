const router = require('express').Router()
const controller = require('../controllers/answerController')

const authentication = require('../middlewares/authentication')

// post an answer
router.post('/:id', authentication, controller.createAnswer)

// vote up an answer
router.post('/voteup/:id', authentication, controller.voteUpAnswer)

// vote down an answer
router.post('/votedown/:id', authentication, controller.voteDownAnswer)

// get one answer
router.get('/:id', authentication, controller.findOneAnswer)

// update answer
router.put('/:id', authentication, controller.updateAnswer)

// delete an answer
router.delete('/:id', authentication, controller.deleteAnswer)

module.exports = router