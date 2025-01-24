// import React from "react";
// import axios from "axios";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import "../src/App.css"; // Import the CSS file

// const Dashboard = ({ token }) => {
//     const [data, setData] = React.useState(null);
//     const [load, setLoad] = React.useState(true);

//     React.useEffect(() => {
//         async function dashboard() {
//             setLoad(true);
//             const options = {
//                 method: "GET",
//                 url: "http://localhost:1324/api/stock/metrics",
//                 headers: {
//                     Authorization:
//                         `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             };

//             try {
//                 const { data } = await axios.request(options);
//                 console.log(data);
//                 if (data.status) {
//                     setData(data.message);
//                     setLoad(false);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         dashboard();
//     }, []);

//     if (load) {
//         return <h2>Loading...</h2>;
//     }

//     return (
//         <div className="dashboard-container">
//             <h1 className="dashboard-title">Stock Portfolio</h1>
//             <div className="portfolio-metrics">
//                 <h2 className="metrics-title">Portfolio Metrics:</h2>
//                 <ul className="metrics-list">
//                     <li>
//                         Total Portfolio Value:{" "}
//                         <span className="metrics-value">{data.totalValue}</span>
//                     </li>
//                     <li>
//                         Top-Performing Stock:{" "}
//                         <span className="metrics-value">
//                             {console.log(data.topPerformingStock)}
//                             {data.topPerformingStock !== null ? data.topPerformingStock.name + ' - ' + data.topPerformingStock.value : ''}
//                         </span>
//                     </li>
//                     <li>Portfolio Distribution:</li>
//                     <ul>
//                         {
//                             Object.keys(data.portfolioDistribution).length > 0 ?
//                                 Object.keys(data.portfolioDistribution).map((item, index) => (
//                                     <ul key={index}>
//                                         <li>
//                                             <span className="metrics-value">
//                                                 {item} : {data.portfolioDistribution[item]}
//                                             </span>
//                                         </li>
//                                     </ul>
//                                 )) : <></>
//                         }
//                     </ul>
//                 </ul>
//             </div>

//             {/* Plus button to navigate to AddStock page */}
//             <Link to="/add-stock" className="plus-button">
//                 <span className="plus-icon">+</span>
//             </Link>
//         </div>
//     );
// };

// export default Dashboard;


import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../src/App.css";

const Dashboard = ({ token }) => {
    const navigate = useNavigate(); // Use the navigate hook for redirect
    const [data, setData] = React.useState(null);
    const [load, setLoad] = React.useState(true);

    React.useEffect(() => {
        // Check if token exists in localStorage
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            // Redirect to login if token is not found
            navigate("/login");
        }

        async function dashboard() {
            setLoad(true);
            const options = {
                method: "GET",
                url: "http://localhost:1324/api/stock/metrics",
                headers: {
                    Authorization: `Bearer ${storedToken}`, // Use token from localStorage
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.request(options);
                console.log(data);
                if (data.status) {
                    setData(data.message);
                    setLoad(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        dashboard();
    }, [navigate]);

    if (load) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Stock Portfolio</h1>
            <div className="portfolio-metrics">
                <h2 className="metrics-title">Portfolio Metrics:</h2>
                <ul className="metrics-list">
                    <li>
                        Total Portfolio Value:{" "}
                        <span className="metrics-value">{data.totalValue}</span>
                    </li>
                    <li>
                        Top-Performing Stock:{" "}
                        <span className="metrics-value">
                            {data.topPerformingStock !== null
                                ? data.topPerformingStock.name + " - " + data.topPerformingStock.value
                                : ""}
                        </span>
                    </li>
                    <li>Portfolio Distribution:</li>
                    <ul>
                        {Object.keys(data.portfolioDistribution).length > 0
                            ? Object.keys(data.portfolioDistribution).map((item, index) => (
                                <ul key={index}>
                                    <li>
                                        <span className="metrics-value">
                                            {item} : {data.portfolioDistribution[item]}
                                        </span>
                                    </li>
                                </ul>
                            ))
                            : null}
                    </ul>
                </ul>
            </div>

            <Link to="/add-stock" className="plus-button">
                <span className="plus-icon">+</span>
            </Link>
        </div>
    );
};

export default Dashboard;
