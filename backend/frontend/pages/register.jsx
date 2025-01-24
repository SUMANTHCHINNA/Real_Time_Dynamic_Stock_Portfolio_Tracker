import { useState } from "react";
import "../src/App.css"; // Import the CSS file
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register({ setToken }) {
    const navigate = useNavigate()
    const [register, setRegister] = useState({ username: '', email: '', password: '' })

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:1324/api/user/register", register);
            const { status, message, } = res.data
            if (status) {
                setMessage(message);
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
                navigate("/")
            } else {
                setError(message)
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }


    return (
        <div className="login-container">
            <h2 className="login-title">Stock Portfolio</h2>
            <div className="login-form-container">
                <form className="login-form" onSubmit={registerUser}>
                    <input
                        type="text"
                        className="username-input"
                        placeholder="UserName"
                        value={register.username}
                        onChange={(e) => setRegister({ ...register, username: e.target.value })}
                    />
                    <input
                        type="text"
                        className="login-input email-input"
                        placeholder="Email address"
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    />
                    <input
                        type="password"
                        className="login-input password-input"
                        placeholder="Password"
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    />
                    <button className="login-btn" type="submit">Register</button>
                </form>
                {/* <h4 className="forgot-password">Forgotten account?</h4>
                <h4 className="signup-prompt">Sign up for system</h4> */}
                <h4> {message.length > 0 ? <span color="green">{message}</span> : <span color="red">{error}</span>} </h4>
            </div>
            <Link to={"../login"} className="signup-link">login</Link>
        </div>
    );
}

export default Register;
