const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/controllersUsers')
const validate = require('./validation')
const guard = require('../../../helpers/guard')
const checkToken = require('../../../helpers/checkToken')
const {createAccountLimiter} = require('../../../helpers/rate-limit-reg')

router.post('/auth/register', createAccountLimiter, validate.validationUser, userController.register)
router.post('/auth/login', validate.validationUser, userController.login)
router.post('/auth/logout', guard, userController.logout)
router.get('/current', checkToken, userController.getUserInfo)
router.patch('/', checkToken, userController.updateSubscription)

module.exports = router