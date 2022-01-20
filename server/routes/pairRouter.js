const Router = require('express')
const router = new Router()
const pairController = require('../controllers/pairController')
const checkRole = require('../middleware/RoleCheckMiddleware')
const authMiddleware = require("../middleware/AuthMiddleware");

router.post('/', checkRole('ADMIN'), pairController.create)
router.post('/generate', checkRole('ADMIN'), pairController.createAll)
router.get('/', pairController.getAll)
router.get('/:id', authMiddleware, pairController.getOneBySanta)

module.exports = router