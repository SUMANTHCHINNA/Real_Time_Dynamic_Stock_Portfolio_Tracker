import React from "react";
import axios from "axios";
import "../src/App.css"; // Import the CSS file

const StockPrices = ({ token }) => {
    const [data, setData] = React.useState(null);
    const [load, setLoad] = React.useState(true);

    React.useEffect(() => {
        async function showPrice() {
            setLoad(true);
            const options = {
                method: 'GET',
                url: 'http://localhost:1324/api/stock/showprices',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            try {
                const { data } = await axios.request(options);
                if (data.status) {
                    console.log(data);
                    setData(data.message);  // Updated to 'message' from the response object
                    setLoad(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        showPrice();
    }, []);

    if (load) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="stock-prices-page">
            <h1 className="page-title">Current Stock Prices</h1>
            <br />
            {
                data.length > 0 ?
                    data.map((item) => (
                        <div className="stock-prices-container" key={item._id}>
                            <div className="stock-card">
                                <h2 className="stock-symbol">{`Stock Symbol: ${item.symbol}`}</h2>
                                <p className="stock-detail">{`Date and Time: ${item.datetime}`}</p>
                                <p className="stock-detail">{`Open Price: $${item.open}`}</p>
                                <p className="stock-detail">{`High Price: $${item.high}`}</p>
                                <p className="stock-detail">{`Low Price: $${item.low}`}</p>
                                <p className="stock-detail">{`Close Price: $${item.close}`}</p>
                                <p className="stock-detail">{`Volume: ${item.volume}`}</p>
                            </div>
                        </div>
                    )) :
                    <h1 className="no-stocks">No Stocks Found</h1>
            }
        </div>
    );
};

export default StockPrices;
