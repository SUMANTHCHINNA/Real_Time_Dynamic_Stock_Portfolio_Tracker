import React, { useState } from "react";
import axios from "axios";
import "../src/App.css"; // Import the CSS file

const AddStock = ({ token }) => {
    const [stock, setStock] = useState({
        stockName: "",
        symbol: "",
        buyPrice: "",
        quantity: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStock({ ...stock, [name]: value });
    };

    const handleSubmit = async (e) => {
        console.log(stock)
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:1324/api/stock/add", stock, {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.data.status) {
                alert("Stock added successfully!");
                setStock({ name: "", symbol: "", price: "", quantity: "" }); // Reset form
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add stock!");
        }
    };

    return (
        <div className="add-stock-container">
            <h1 className="add-stock-title">Add Stock</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Stock Name"
                    value={stock.stockName}
                    onChange={(e) => setStock({ ...stock, stockName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="symbol"
                    placeholder="Symbol"
                    value={stock.symbol}
                    onChange={(e) => setStock({ ...stock, symbol: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Stock Price"
                    value={stock.price}
                    onChange={(e) => setStock({ ...stock, buyPrice: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={stock.quantity}
                    onChange={(e) => setStock({ ...stock, quantity: e.target.value })}
                    required
                />
                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
};

export default AddStock;
