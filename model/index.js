const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const user = require('./user.json')
const universal = require('../model/universalStock.json')
const mystock = require('../model/myStock.json')
const presentStock = require('../model/presentStock.json')
const shockprices = require('../model/stockprices.json')
const { insertDB } = require('../utils/index')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const checkEmail = (email) => {
    return user.find((data) => data.email == email) ? true : false
}
const insertUser = async ({ username, email, password }) => {
    const userId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = [
        ...user,
        {
            userId, username, email, password: hashedPassword
        }
    ]
    const i = await insertDB(data, 'user')
}

const checkPassword = async (email, password) => {
    const s_user = user.find((data) => data.email == email)
    const h_password = s_user.password
    return await bcrypt.compare(password, h_password)

}

const createToken = (userId) => {
    const u = jwt.sign({ userId }, process.env.KEY)
    return (u)
}

const getUserById = (id) => {
    return (user.find((data) => data.userId === id))
}

const checkUser = (email) => {
    return user.find((data) => data.email == email)
}

const insertStock = async ({ stockName, ticker, quantity, buyPrice, userId }) => {
    const id = uuidv4()
    const data = [
        ...universal,
        {
            id, stockName, ticker, quantity, buyPrice, userId
        }
    ]
    const i = await insertDB(data, 'universalStock')
    return i

}

const showUserStocks = async (userId) => {
    const data = universal.filter((data) => data.userId == userId)
    const i = await insertDB(data, 'mystock')
    return i

}

const delete_stock = async (id, userId) => {
    const c = mystock.find((data) => data.id == id)
    if (c && c.userId == userId) {
        const refresh = universal.filter((data) => data.id != id)
        const r = await insertDB(refresh, 'universalStock')
        return `Stock Deleted Successfully`
    }
    else {
        return `Stock Not Found`
    }
}

const update_stock = async (id, userId, update) => {
    const c = mystock.find((data) => data.id == id && data.userId == userId) ? true : false
    if (c) {
        const ind = mystock.findIndex((data) => data.id == id)
        mystock[ind] = { ...mystock[ind], ...update }
        const data = [...mystock]
        const i = await insertDB(data, 'mystock')
        return `Stock updated Successfully`
    }
    else {
        return `stock not found`
    }
}

const getList = (userId) => {
    const l = []
    for (i = 0; i < mystock.length; i++) {
        l.push(mystock[i].ticker)
    }
    return l
}

const storeStock = async (stockPrices) => {
    const data = stockPrices
    const w = await insertDB(data, 'presentStock')
    return `data stored sucessfully`
}




const portfolioDistribution = () => {
    const topSet = {};
    let tV = 0;
    for (i = 0; i < mystock.length; i++) {
        const y = mystock[i].ticker;
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
    const data = [stockValues]
    const w = await insertDB(data, 'stockprices')

}


const showStocks = () => {
    const s = shockprices
    return (s)
}

const mystock_delete = async (id, userId) => {
    const c = mystock.find((data) => data.id == id)
    if (c && c.userId == userId) {
        const refresh = mystock.filter((data) => data.id != id)
        const r = await insertDB(refresh, 'myStock')
        return `Stock Deleted Successfully`
    }

}

const universal_update = async (id, userId, update) => {
    const c = universal.find((data) => data.id == id && data.userId == userId) ? true : false
    if (c) {
        const ind = universal.findIndex((data) => data.id == id)
        universal[ind] = { ...universal[ind], ...update }
        const data = [...universal]
        const i = await insertDB(data, 'universalStock')

    }
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
    delete_stock,
    update_stock,
    getList,
    storeStock,
    portfolioDistribution,
    viewData,
    showStocks,
    mystock_delete,
    universal_update
}