const express = require('express')
const router = express.Router()
const { addStock, myStocks, deleteStock, updateStock, getMetrics,getPrices } = require('../controller/stock')
const auth = require('../middleware/auth')

router.use(auth)
router.post('/add', addStock)
router.get('/myStocks', myStocks)
router.delete('/delete/:id', deleteStock)
router.patch('/update/:id', updateStock)
router.get('/metrics', getMetrics)
router.get('/showprices',getPrices)


module.exports = router