const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/:id', authMiddleware, userController.update)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', authMiddleware, userController.getOne)
router.get('/', userController.getAll)
router.delete('/:id', authMiddleware, userController.deleteOne)

module.exports = router