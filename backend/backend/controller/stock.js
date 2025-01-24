const { insertStock, showUserStocks, update_stock, getList, storeStock, portfolioDistribution, mystock_delete, universal_update, showPrices, viewData } = require('../model/index')
const dotenv = require('dotenv')
const Stock = require('../model/stock')
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Price = require('../model/stockPrice');
const User = require('../model/user')


const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 86400 }); // Cache expires after 60 seconds
dotenv.config()
const addStock = async (req, res) => {
    try {
        console.log(req.body);
        const { stockName, symbol, quantity, buyPrice } = req.body
        if (!stockName || !symbol || !quantity || !buyPrice) {
            res.status(404).json({ status: false, message: `Fill all details` })
        }
        else {
            const userId = req.user.userId
            const insert = await insertStock({ stockName, symbol, quantity, buyPrice, userId })
            res.status(200).json({ status: true, message: `stock added sucessfully` })
        }

    } catch (error) {
        res.status(404).json({ status: false, message: error.message })
    }
}

const myStocks = async (req, res) => {
    try {
        const userId = req.user.userId
        const i = await showUserStocks(userId)
        res.status(200).json({ status: true, message: i })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}

const deleteStock = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.userId
        const u = await mystock_delete(id, userId)

        res.status(200).json({ status: true, message: `Stock deleted sucessfully`, u })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }

}

const updateStock = async (req, res) => {
    try {
        const update = req.body
        const id = req.params.id
        const userId = req.user.userId
        const u = await update_stock(id, userId, update)
        res.status(200).json({ status: true, message: `Stock updated sucessfully`, u })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }


}







const getMetrics = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch the user's list of stocks from MongoDB
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        const list = await getList(userId) // Assuming 'stocks' is an array of stock tickers in the User document
        // [ 'AMZN', 'AAPL' ]
        const fl = list.join(',');
        // AMZN,AAPL

        const url = `https://api.twelvedata.com/time_series?symbol=${fl}&interval=1min&outputsize=1&apikey=${process.env.APIKEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const stockPrices = {};

        for (const [symbol, details] of Object.entries(data)) {
            if (details.values && details.values[0]) {
                stockPrices[symbol] = details.values[0].close;
            }
        }

        await showUserStocks(userId)
        await storeStock(stockPrices)


        // Calculate portfolio distribution (you can implement the logic as needed)
        const p = await portfolioDistribution(userId);

        res.status(200).json({ status: true, message: p });

    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ status: false, message: error.message });
    }
};








const getPrices = async (req, res) => {
    try {
        const userId = req.user.userId;
        const list = await getList(userId);
        // [ 'AMZN', 'AAPL' ]
        const fl = list.join(',');
        // AMZN,AAPL

        const url = `https://api.twelvedata.com/time_series?symbol=${fl}&interval=1min&outputsize=1&apikey=${process.env.APIKEY}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async data => {
                const stockValues = {};
                for (const [symbol, details] of Object.entries(data)) {
                    if (details.values && Array.isArray(details.values)) {
                        stockValues[symbol] = details.values;
                    } else {
                        console.warn(`No valid data for symbol: ${symbol}`);
                    }
                }

                const stockDataPromises = Object.entries(stockValues).map(([symbol, values]) => {
                    return values.map(async (value) => {
                        // Save each stock price record in the MongoDB collection
                        return Price.updateOne(
                            { symbol: symbol, datetime: value.datetime },
                            {
                                $set: {
                                    symbol: symbol,
                                    datetime: value.datetime,
                                    open: value.open,
                                    high: value.high,
                                    low: value.low,
                                    close: value.close,
                                    volume: value.volume,
                                },
                            },
                            { upsert: true }  // Insert if not exists
                        );
                    });
                });

                // Wait for all stock data to be saved in MongoDB
                await Promise.all(stockDataPromises.flat()); // Flatten array of promises

                // Step 5: Fetch updated stock data for the user from MongoDB
                const stockData = await Price.find({ symbol: { $in: list } });

                // Step 6: Return the stock data in the response
                res.status(200).json({ status: true, message: stockData });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                res.status(500).json({ status: false, message: 'Failed to fetch stock data.' });
            });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};


module.exports = {
    addStock,
    myStocks,
    deleteStock,
    updateStock,
    getMetrics,
    getPrices,
    universal_update

}