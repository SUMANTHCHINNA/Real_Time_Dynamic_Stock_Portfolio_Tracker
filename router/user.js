const express = require('express')
const router = express.Router()
const { userRegister, userLogin, a } = require('../controller/user')

router.post('/register', userRegister)
router.post('/login', userLogin)




module.exports = router