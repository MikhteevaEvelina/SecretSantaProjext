const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const hobbyRouter = require('./hobbyRouter')
const pairRouter = require('./pairRouter')


router.use('/user', userRouter)
router.use('/hobby', hobbyRouter)
router.use('/pair', pairRouter)

module.exports = router