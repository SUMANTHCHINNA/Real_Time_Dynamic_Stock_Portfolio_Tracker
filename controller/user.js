const { checkEmail, insertUser, checkPassword, createToken, checkUser } = require('../model/index')

const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(404).json({ status: false, message: `Please fill all fields` })
        }
        else if (username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0) {
            res.status(404).json({ status: false, message: `Please fill all fields` })
        }
        else if (await checkEmail(email)) {
            res.status(404).json({ status: false, message: `User already exist please login` })
        }

        else {
            const s = await insertUser({ username, email, password })
            res.status(200).json({ status: true, message: `User Registered Sucessfully` })
        }

    } catch (error) {
        res.status(404).json({ status: false, message: error.message })
    }

}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ status: false, message: `please fill all fields` })
        }
        else if (email.trim().length == 0 || password.trim().length == 0) {
            res.status(400).json({ status: false, message: `please fill all fields` })
        }
        else if (!checkEmail(email)) {
            res.status(400).json({ status: false, message: `User not registered, please register` })

        }
        else if (true) {
            const c = await checkPassword(email, password)
            if (!c) {
                res.status(404).json({ status: true, message: `unauthorized access` })
            }
            else {
                const user = checkUser(email)
                const token = createToken(user.userId)
                res.status(200).json({ status: true, message: `LoggedIn successfully`, token })
            }
        }
        else {
            res.status(404).json({ status: false, message: `unauthorized access` })
        }

    } catch (error) {
        res.status(404).json({ status: false, message: error.message })
    }
}



module.exports = {
    userRegister,
    userLogin,

}