# User Management API's

1. POST /api/user/register - new user to register by providing username, email and password
2. POST /api/user/login - Logs in a user and provides a JWT token for authentication in future requests.

# Stock Management APIs

3. POST /api/stocks/add - Adds a new stock to the user's portfolio.
4. get /api/stocks/myStocks - Retrieves all stocks in the user's portfolio.
5. PATCH /api/stocks/update/:stockId - Updates the details (quantity or buy price) of an existing stock
6. DELETE /api/stocks/delete/:stockId -  Deletes a stock from the user's portfolio


# Portfolio Metrics APIs

7. GET /api/stock/metrics - Calculates and returns key metrics of the user's portfolio such as total portfolio value, top-performing stock, and portfolio distribution based on real-time stock prices
8. GET /api/stock/prices - Fetches real-time stock prices for a list of tickers in bulk.




# user API samples :
1. POST /api/user/register

{
  "username" : "user",
  "email": "user@example.com",
  "password": "password123"
}

2. POST /api/user/login

{
  "email": "user@example.com",
  "password": "password123"
}

# Stock API samples

3. POST /api/stocks/add

{
  "stockName": "Apple",
  "ticker": "AAPL",
  "quantity": 5,
  "buyPrice": 150
}

# Portfolio Metrics APIs sample


7. GET /api/portfolio/metrics
{
  "totalPortfolioValue": 9060,
  "topPerformingStock": {
    "stockName": "Amazon",
    "ticker": "AMZN",
    "value": 6100
  },
  "portfolioDistribution": [
    {
      "stockName": "Apple",
      "ticker": "AAPL",
      "percentage": 8.83
    },
    {
      "stockName": "Tesla",
      "ticker": "TSLA",
      "percentage": 23.84
    },
    {
      "stockName": "Amazon",
      "ticker": "AMZN",
      "percentage": 67.33
    }
  ]
}





# Error messages

{
  "error": "Stock not found",
  "message": "The stock ticker provided is invalid"
}


# calculation metrics
1. Total Portfolio Value:
Total Value = ∑ (Quantity × Real-Time Price)

2. Top-Performing Stock:
Distribution (%) = (Stock Value ÷ Total Portfolio Value) × 100


# sample

# stock data :
[
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

# Real time stock prices

{
  "AAPL": 160,
  "TSLA": 720,
  "AMZN": 3050
}

# Total Portfolio Value:
# Formula:
Total Value = ∑ (Quantity × Real-Time Price)

calculation:
Apple = 5 * 160 = 800
Tesla = 3 * 720 = 2160
Amazon = 2 * 3050 = 6100
Total Value = 800 + 2160 + 6100 = 9060

# Top-Performing Stock:
# calculation
Apple: 800
Tesla : 2160
Amazon : 6100
Top-Performing Stock: Amazon with value : 6100

#  Portfolio Distribution:
# Formula:
Distribution (%) = (Stock Value ÷ Total Portfolio Value) × 100

# calculation:
Apple : (800 / 9060) * 100 = 8.83%
Tesla : (2160 / 9060) * 100 = 23.84%
Amazon : (6100 / 9060) * 100 = 67.33%

# Construct API Response

{
  "totalPortfolioValue": 9060,
  "topPerformingStock": {
    "stockName": "Amazon",
    "ticker": "AMZN",
    "value": 6100
  },
  "portfolioDistribution": [
    { "stockName": "Apple", "ticker": "AAPL", "percentage": 8.83 },
    { "stockName": "Tesla", "ticker": "TSLA", "percentage": 23.84 },
    { "stockName": "Amazon", "ticker": "AMZN", "percentage": 67.33 }
  ]
}
# Send Response to Frontend

Portfolio Metrics:
========================
Total Portfolio Value: $9060
Top-Performing Stock: Amazon (AMZN) - $6100
Portfolio Distribution:
  - Apple (AAPL): 8.83%
  - Tesla (TSLA): 23.84%
  - Amazon (AMZN): 67.33%
========================


API Keys to fetch real time stock data

Alpha Vantage : 69Y2PSAIWN96L3X5
finnhub : ctr6879r01qpe8vbtmpgctr6879r01qpe8vbtmq0
twelvedata : db523456236347c5a0d65bc5d37b6dad
'''
sample API : https://api.twelvedata.com/time_series?symbol=MSFT,AAPL,GOOGL,AMZN,IBM&interval=1day&outputsize=1&apikey=db523456236347c5a0d65bc5d37b6dad
'''





# some companies

# Technology Companies:

1. GOOGL - Alphabet Inc. (Google)
2. MSFT - Microsoft Corporation
3. TSLA - Tesla, Inc.
4. META - Meta Platforms, Inc. (Facebook)
5. NFLX - Netflix, Inc.
6. NVDA - NVIDIA Corporation

# Consumer Goods:
7. PG - Procter & Gamble Co.
8. KO - Coca-Cola Company
9. PEP - PepsiCo, Inc.
10. WMT - Walmart Inc.

# Financials:
11. JPM - JPMorgan Chase & Co.
12. BAC - Bank of America Corporation
13. C - Citigroup Inc.
14. GS - Goldman Sachs Group, Inc.

# Energy:
16. XOM - Exxon Mobil Corporation
17. CVX - Chevron Corporation
18. SLB - Schlumberger Limited

# Healthcare:
19. JNJ - Johnson & Johnson
20. PFE - Pfizer Inc.
21. MRK - Merck & Co., Inc.

# Industrials:
22. BA - Boeing Company
23. CAT - Caterpillar Inc.
24. GE - General Electric Company

# Miscellaneous:
25. AMAT - Applied Materials, Inc.
26. ADBE - Adobe Inc.
27. INTC - Intel Corporation
