// import { Link } from "react-router-dom";
// import "../src/App.css";

// const Sidebar = () => {
//     return (
//         <div className="app">
//             <nav className="sidebar">
//                 <h2>Stock Portfolio</h2>
//                 <ul>
//                     <li>
//                         <Link to="/">Dashboard</Link>
//                     </li>
//                     <li>
//                         <Link to="/mystocks">MyStocks</Link>
//                     </li>
//                     <li>
//                         <Link to="/stockprices">StockPrices</Link>
//                     </li>
//                     <li>
//                         <Link to={"/login"} className="logout">LogOut</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

// export default Sidebar



import { Link, useNavigate } from "react-router-dom";
import "../src/App.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Redirect to login page
        navigate("/login");
    };

    return (
        <div className="app">
            <nav className="sidebar">
                <h2>Stock Portfolio</h2>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/mystocks">MyStocks</Link>
                    </li>
                    <li>
                        <Link to="/stockprices">StockPrices</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout">LogOut</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
