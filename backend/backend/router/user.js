const express = require('express')
const router = express.Router()
const { userRegister, userLogin, validateToken } = require('../controller/user')

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/verify', validateToken)




module.exports = router