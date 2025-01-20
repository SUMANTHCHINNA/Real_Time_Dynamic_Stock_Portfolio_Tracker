// import "../src/App.css"; // Import the CSS file
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Login({ setToken }) {
//     const navigate = useNavigate()
//     const [register, setRegister] = useState({ email: '', password: '' })

//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');

//     async function registerUser(e) {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:1324/api/user/login", register);
//             const { status, message, } = res.data
//             if (status) {
//                 setMessage(message);
//                 setToken(res.data.token)
//                 localStorage.setItem("token", res.data.token)
//                 navigate("/")
//             } else {
//                 setError(message)
//             }
//         } catch (error) {
//             console.log(error)
//             setError(error.response.data.message)
//         }
//     }

//     return (
//         <div className="login-container">
//             <h2 className="login-title">Facebook</h2>
//             <div className="login-form-container">
//                 <form className="login-form" onSubmit={registerUser}>
//                     <h3 className="login-heading">Log in to Facebook</h3>
//                     <input
//                         type="text"
//                         className="login-input email-input"
//                         placeholder="Email address or phone number"
//                         value={register.email}
//                         onChange={(e) => setRegister({ ...register, email: e.target.value })}
//                     /><br />
//                     <input
//                         type="password"
//                         className="login-input password-input"
//                         placeholder="Password"
//                         value={register.password}
//                         onChange={(e) => setRegister({ ...register, password: e.target.value })}
//                     /><br />
//                     <button className="login-btn" type="submit">Log in</button>
//                     <h4> {message.length > 0 ? <span color="green">{message}</span> : <span color="red">{error}</span>} </h4>
//                 </form>
//             </div>
//             <Link to={"../register"}>Sign Up</Link>
//         </div>
//     );
// }

// export default Login;



import "../src/App.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
    const navigate = useNavigate();
    const [register, setRegister] = useState({ email: '', password: '' });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:1324/api/user/login", register);
            const { status, message, } = res.data;
            if (status) {
                setMessage(message);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token); // Store token in localStorage
                navigate("/"); // Redirect to dashboard
            } else {
                setError(message);
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Stock Portfolio</h2>
            <div className="login-form-container">
                <form className="login-form" onSubmit={registerUser}>
                    {/* <h3 className="login-heading">Log in to Stock Portfolio</h3> */}
                    <input
                        type="text"
                        className="login-input email-input"
                        placeholder="Email address"
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    /><br />
                    <input
                        type="password"
                        className="login-input password-input"
                        placeholder="Password"
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    /><br />
                    <button className="login-btn" type="submit">Log in</button>
                    <h4> {message.length > 0 ? <span color="green">{message}</span> : <span color="red">{error}</span>} </h4>
                </form>
            </div>
            <Link to={"../register"} className="signup-link">Sign Up</Link>
        </div>
    );
}

export default Login;
