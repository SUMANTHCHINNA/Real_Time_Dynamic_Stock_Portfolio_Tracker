const { insertStock, showUserStocks, delete_stock, update_stock, getList, storeStock, portfolioDistribution, viewData, showStocks, mystock_delete, universal_update } = require('../model/index')
const dotenv = require('dotenv')
dotenv.config()
const addStock = async (req, res) => {
    try {
        const { stockName, ticker, quantity, buyPrice } = req.body
        if (!stockName || !ticker || !quantity || !buyPrice) {
            res.status(404).json({ status: false, message: `Fill all details` })
        }
        else {
            const userId = req.user.userId
            const insert = await insertStock({ stockName, ticker, quantity, buyPrice, userId })
            res.status(200).json({ status: true, message: insert })
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
        const d = await delete_stock(id, userId)
        const u = await mystock_delete(id, userId)

        res.status(200).json({ status: true, message: d })

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
        const up = await universal_update(id, userId, update)
        res.status(200).json({ status: true, message: u })

    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }


}

const getMetrics = async (req, res) => {
    try {
        const userId = req.user.userId
        const list = await getList(userId)
        // [ 'AMZN', 'AAPL' ]
        const fl = list.join(',')
        // AMZN,AAPL

        const url = `https://api.twelvedata.com/time_series?symbol=${fl}&interval=1h&outputsize=1&apikey=${process.env.APIKEY}`
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const stockPrices = {};
                for (const [symbol, details] of Object.entries(data)) {
                    if (details.values && details.values[0]) {
                        stockPrices[symbol] = details.values[0].close;
                    }
                }

                const s = storeStock(stockPrices)
                const p = portfolioDistribution()
                res.status(200).json({ status: true, message: p })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}

const getPrices = async (req, res) => {
    try {
        const userId = req.user.userId;
        const list = await getList(userId);
        // [ 'AMZN', 'AAPL' ]
        const fl = list.join(',');
        // AMZN,AAPL

        const url = `https://api.twelvedata.com/time_series?symbol=${fl}&interval=1h&outputsize=1&apikey=${process.env.APIKEY}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const stockValues = {};
                for (const [symbol, details] of Object.entries(data)) {
                    if (details.values) {
                        stockValues[symbol] = details.values;
                    }
                }

                const n = viewData(stockValues);
                const s = showStocks()
                res.status(200).json({ status: true, message: s })

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
}

module.exports = {
    addStock,
    myStocks,
    deleteStock,
    updateStock,
    getMetrics,
    getPrices,
    universal_update

}