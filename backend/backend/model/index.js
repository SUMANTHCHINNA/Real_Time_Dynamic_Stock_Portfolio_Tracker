const bcrypt = require('bcrypt')
const user = require('./user')
const presentStock = require('../model/presentStock.json')
const shockprices = require('../model/stockprices.json')
const stock = require('./stock')
const price = require('./stockPrice')
const mystock = require('./myStock.json')
const { insertDB } = require('../utils/index')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const stockPrice = require('./stockPrice')
dotenv.config()


const checkEmail = async (email) => {
    return await user.findOne({ email })

}
const insertUser = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const data =
    {
        username, email, password: hashedPassword
    }

    return await user.create(data);
}

const checkPassword = async (hashedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.KEY)

}

const getUserById = async (id) => {
    const a = await user.find({ _id: id }) || null
    return a
}

const checkUser = (email) => {
    return user.findOne({ email })
}

const insertStock = async ({ stockName, symbol, quantity, buyPrice, userId }) => {
    const data =
    {
        stockName, symbol, quantity, buyPrice, userId
    }
    const i = await stock.create(data)
    return i

}

const showUserStocks = async (userId) => {

    const data = await stock.find({ userId: userId });
    const d = await mystock.filter((data) => data.userId == userId)
    const i = await insertDB(data, 'myStock')
    if (!data) {
        return `No stocks found for this user`
    }
    else {
        return data
    }

};

const update_stock = async (id, userId, update) => {
    const c = stock.findOne({ _id: id, userId: userId })

    if (c) {
        const u = await stock.findByIdAndUpdate({ _id: id }, { ...update })
        const s = await stock.find({ userId: userId })
        return s
    }
    else {
        return `stock not found`
    }
}

const getList = async (userId) => {
    const stocks = await stock.find({ userId: userId })
    const symbols = stocks.map(stock => stock.symbol)
    return (symbols)
}


const storeStock = async (stockPrices) => {
    const data = stockPrices
    const w = await insertDB(data, 'presentStock')
    return `data stored sucessfully`
}




const portfolioDistribution = (userId) => {
    const topSet = {};
    let tV = 0;
    for (i = 0; i < mystock.length; i++) {
        const y = mystock[i].symbol;
        const yc = mystock[i].stockName;
        const x = mystock[i].quantity;
        const n = presentStock[y];
        tV = tV + (x * n);
        topSet[yc] = (x * n);
    }

    const findTopPrice = Object.values(topSet);
    const maxOne = Math.max(...findTopPrice);
    const maxPair = Object.entries(topSet).find(([key, value]) => value === maxOne);

    const port = {
        totalValue: tV,
        topPerformingStock: maxPair ? { name: maxPair[0], value: maxPair[1] } : null,
        portfolioDistribution: {}
    };

    for (const [key, value] of Object.entries(topSet)) {
        const percentage = (value / tV) * 100;
        port.portfolioDistribution[key] = `${percentage.toFixed(2)}%`;
    }

    return (port);

}

const viewData = async (stockValues) => {
    try {
        const y = await price.collection.drop()
        for (let i = 0; i < stockValues.length; i++) {
            const add = stockValues[i];
            const a = await price.create(add)
        }

    } catch (error) {
        return error

    }
}




const mystock_delete = async (id, userId) => {
    const c = stock.findOne({ _id: id, userId: userId })
    if (c) {
        const d = await stock.findByIdAndDelete(id)
    }
    const s = await stock.find({ userId: userId })
    return s

}

const findByEmail = async (email) => {
    return await user.findOne({ email });
};

const showPrices = async () => {
    const s = await price.find()
    return s
}

module.exports = {
    checkEmail,
    insertUser,
    checkPassword,
    createToken,
    getUserById,
    checkUser,
    insertStock,
    showUserStocks,
    update_stock,
    getList,
    storeStock,
    portfolioDistribution,
    viewData,
    mystock_delete,
    findByEmail,
    showPrices
}