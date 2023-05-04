const express = require('express')
const router = express.Router();
const yahooFinance = require('yahoo-finance');
const bodyParser = require('body-parser');
const { error } = require('console');

// const app = express();
const jsonParser = bodyParser.json();
// app.use(cors());

const headerOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.APISECRETEKEY}`
    }
}

// get all tickers
router.get('/', (req, res) => {
  fetch(`${process.env.APIENDPOINT}/v3/reference/tickers`, headerOptions)
    .then( response => response.json())
    .then( json => res.send(json))
    .catch(err => console.log(err))
});

router.get('/details/:ticker', (req, res) => {
    fetch(`${process.env.APIENDPOINT}/v3/reference/tickers/${req.params.ticker.toUpperCase()}`, headerOptions)
    .then(response => response.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

router.get('/news/:ticker', async (req, res) => {
  try {
    const news = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${req.params.ticker.toUpperCase()}`, headerOptions)
    if (news.ok) {
      const json = await news.json()
      console.log(json)
      res.send(json)
    }

  } catch (error) {
    console.log(error)
  }
})

// search specific ticker
router.post('/search', jsonParser, (req, res) => {
  const {
    ticker,
    multiplier,
    timespan,
    start,
    end,
    adjusted,
    sort,
    limit,
  } = req.body

  fetch(`${process.env.APIENDPOINT}/v2/aggs/ticker/${ticker.toUpperCase()}/range/${multiplier}/${timespan}/${start}/${end}?adjusted=${adjusted}&sort=${sort}}&limit=${limit}`, headerOptions)
    .then(response => response.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))

});

// to alphavantage.io - uses polygoin (which is a paid service but free on alpah)
router.get('/search/by/:keyword', (req, res) => {
  fetch(`${process.env.ALPHAAPIENDPOINT}/query?function=SYMBOL_SEARCH&keywords=${req.params.keyword}&apikey=${process.env.ALPHASECRETKEY}`)
   .then(response => response.json())
   .then(data => res.send(data))
   .catch(err => console.log(err))
});

// yahoo finance - fetches multiple stocks for user homepage
router.get('/search/multiple', async (req, res) => {
  
  var SYMBOLS = [
    'AAPL',
    'AMZN',
    'GOOGL',
    'YHOO'
  ];

  yahooFinance.historical({
    symbols: SYMBOLS,
    from: '2012-01-01',
    to: '2012-12-31',
    period: 'd'
  }).then(data => res.send(data))
});



module.exports = router;