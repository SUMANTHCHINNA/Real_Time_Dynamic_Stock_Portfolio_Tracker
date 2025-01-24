const { checkEmail, insertUser, checkPassword, createToken, findByEmail } = require('../model/index')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getUserById } = require('../model/index');
dotenv.config();

const userRegister = async (req, res) => {
    try {
        if (Object.keys(req.body).length <= 0) {
            return res.status(400).json({ status: false, message: `Please fill all fields` })
        }
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: `Please fill all fields` })
        }

        if (username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).json({ status: false, message: `Please fill all fields` })
        }

        const c = await checkEmail(email)
        if (c) {
            return res.status(400).json({ status: false, message: `User already exist please login` })
        }
        const user = await insertUser({ username, email, password })
        const token = createToken(user._id)
        return res.status(200).json({ status: true, message: `Registered Sucessfully`, token })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }

}


const userLogin = async (req, res) => {
    try {
        if (Object.keys(req.body).length <= 0) {
            return res.status(400).json({ status: false, message: `Please fill all fields` })
        }
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All fields must be filled" });
        }

        const user = await findByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found, please register" });
        }

        const isPasswordValid = await checkPassword(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }

        const token = createToken(user._id);
        return res.status(200).json({ status: true, message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const validateToken = async (req, res) => {
    try {
        let token = req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer';
        if (token) {
            token = req.headers.authorization.split(' ')[1];
            const { _id } = jwt.verify(token, process.env.KEY);


            const user = await getUserById(_id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            let data = { username: user.username, email: user.email, userId: _id };
            return res.status(200).json({ status: true, message: data });
        } else {
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}



module.exports = {
    userRegister,
    userLogin,
    validateToken
}