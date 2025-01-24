import React, { useState } from "react";
import "../src/App.css"; // Import the CSS file
import axios from "axios";


const MyStocks = ({ token }) => {
    const [stocks, setStocks] = useState(null);
    const [load, setLoad] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

    async function myStocks() {
        const options = {
            method: 'GET',
            url: 'http://localhost:1324/api/stock/mystocks',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };
        try {
            const { data } = await axios.request(options);
            console.log(data)
            if (data.status) {
                setStocks(data.message)
                setLoad(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        myStocks()
    }, [])
    if (load) {
        return <h2>load</h2>

    }
    console.log(stocks)
    const openModal = (stock) => {
        localStorage.setItem("id", stock._id)
        setSelectedStock(stock);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        localStorage.removeItem("id")
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        // Here, handle the update logic (e.g., updating stock info)
        e.preventDefault()
        const options = {
            method: 'PATCH',
            url: `http://localhost:1324/api/stock/update/${localStorage.getItem("id")}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { stockName: selectedStock.stockName, quantity: selectedStock.quantity, buyPrice: selectedStock.buyPrice }
        };
        try {
            const { data } = await axios.request(options);
            if (data.status) {
                myStocks()
            }
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem("id")
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedStock((prevStock) => ({
            ...prevStock,
            [name]: value,
        }));
    };


    const deleteStock = async (id) => {
        const options = {
            method: 'DELETE',
            url: `http://localhost:1324/api/stock/delete/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        try {
            const { data } = await axios.request(options);
            console.log(data);
            myStocks()

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="stocks-container">
            <h1 className="stocks-title">Stocks</h1>
            {stocks.length > 0 ?
                stocks.map((stock, index) => (
                    <div key={index} className="stock-info">
                        <h2 className="stock-name">
                            {stock.stockName} ({stock.ticker})
                        </h2>
                        <p className="stock-quantity">Quantity: {stock.quantity}</p>
                        <p className="stock-price">Buy Price: ${stock.buyPrice}</p>
                        <div className="stock-actions">
                            <button className="action-button edit" onClick={() => openModal(stock)}>
                                <i className="fa fa-edit"></i> Edit
                            </button>
                            <button className="action-button delete" onClick={() => deleteStock(stock._id)}>
                                <i className="fa fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                )) : <h1>No stocks found</h1>
            }

            {/* Modal */}
            {isModalOpen && selectedStock && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Stock</h2>
                        <div className="modal-inputs">
                            <label>
                                Company Name:
                                <input
                                    type="text"
                                    name="stockName"
                                    value={selectedStock.stockName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={selectedStock.quantity}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Buy Price:
                                <input
                                    type="number"
                                    name="buyPrice"
                                    value={selectedStock.buyPrice}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Total Investment:
                            </label>
                        </div>
                        <div className="modal-actions">
                            <button className="submit-button" onClick={(e) => handleSubmit(e)}>
                                Submit
                            </button>
                            <button className="close-button" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyStocks;
