const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { getUserById } = require('../model/index')

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'

        if (token) {
            token = req.headers.authorization.split(' ')[1]
            const { userId } = jwt.verify(token, process.env.KEY)
            const user = getUserById(userId);

            if (!user) {
                res.status(404).json({ status: false, message: `User not found` })
            }
            else {
                const { username, email } = user
                req.user = { username, email, userId }
                next()
            }
        }
        else {
            return res.status(404).json({ status: false, message: `Unauthorized access` })
        }
    } catch (error) {
        res.status(404).json({ status: false, message: error.message })
    }
}

module.exports = auth
