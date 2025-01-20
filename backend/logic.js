// Required Output Sample

// Portfolio Metrics:
// ========================
// Total Portfolio Value: $9060
// Top-Performing Stock: Amazon (AMZN) - $6100
// Portfolio Distribution:
//   - Apple (AAPL): 8.83%
//   - Tesla (TSLA): 23.84%
//   - Amazon (AMZN): 67.33%
// ========================


const data = [
    {
        "stockName": "Apple",
        "ticker": "AAPL",
        "quantity": 5,
        "buyPrice": 150
    },
    {
        "stockName": "Tesla",
        "ticker": "TSLA",
        "quantity": 3,
        "buyPrice": 700
    },
    {
        "stockName": "Amazon",
        "ticker": "AMZN",
        "quantity": 2,
        "buyPrice": 3000
    }
]

const real = {
    "AAPL": 160,
    "TSLA": 720,
    "AMZN": 3050
}

// # Total Portfolio Value:
// # Formula:
// Total Value = ∑ (Quantity × Real-Time Price)

// calculation:
// Apple = 5 * 160 = 800
// Tesla = 3 * 720 = 2160
// Amazon = 2 * 3050 = 6100
// Total Value = 800 + 2160 + 6100 = 9060



const topSet = {}
let totalValue = 0
for (i = 0; i < data.length; i++) {
    const y = (data[i].ticker)
    const yc = (data[i].stockName)
    const x = (data[i].quantity)
    const n = real[y]
    totalValue = totalValue + (x * n)
    topSet[yc] = (x * n)

}
console.log(`Total Portfolio Value:${totalValue}`)



// # Top-Performing Stock:
// # calculation
// Apple: 800
// Tesla : 2160
// Amazon : 6100
// Top-Performing Stock: Amazon with value : 6100

// console.log(topSet)
const findTopPrice = Object.values(topSet)
const maxOne = (Math.max(...findTopPrice))
const maxPair = Object.entries(topSet).find(([key, value]) => value == maxOne)
console.log(`Top-Performing Stock: ${maxPair[0]} : ${maxPair[1]}`)

// #  Portfolio Distribution:
// # Formula:
// Distribution (%) = (Stock Value ÷ Total Portfolio Value) × 100

// # calculation:
// Apple : (800 / 9060) * 100 = 8.83%
// Tesla : (2160 / 9060) * 100 = 23.84%
// Amazon : (6100 / 9060) * 100 = 67.33%

//const topSet = { Apple: 800, Tesla: 2160, Amazon: 6100 }
const port = {}
console.log(topSet)
console.log(totalValue)
for (const [key, value] of Object.entries(topSet)) {
    console.log(`${key} : ${(value / totalValue) * 100}%`);
}

/*
Total Portfolio Value:9060
Top-Performing Stock: Amazon : 6100
{ Apple: 800, Tesla: 2160, Amazon: 6100 }
9060
Apple : 8.830022075055188%
9060
Apple : 8.830022075055188%
Tesla : 23.841059602649008%
Amazon : 67.3289183222958%
*/