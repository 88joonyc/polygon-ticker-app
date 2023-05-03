
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch')
const bodyParser = require('body-parser');


const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

const headerOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.APISECRETEKEY}`
    }
}

// get all tickers
app.get('/api/ticker', (req, res) => {
  fetch(`${process.env.APIENDPOINT}/v3/reference/tickers`, headerOptions)
    .then( response => response.json())
    .then( json => res.send(json))
    .catch(err => console.log(err))
});

app.get('/api/ticker/details/:ticker', (req, res) => {
    fetch(`${process.env.APIENDPOINT}/v3/reference/tickers/${req.params.ticker.toUpperCase()}`, headerOptions)
    .then(response => response.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))
})

app.get('/api/ticker/news/:ticker', async (req, res) => {
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

// app.post('/api/ticker/details/image', jsonParser, (req, res) => {

//   const { image } = req.body
//   const url = image.replace(/(^\w+:|^)\/\//, '')
  
//   fetch(`http://${url}`, headerOptions)
//   .then(response => res.send(response.text()))
// })


// search specific ticker
app.post('/api/search', jsonParser, (req, res) => {
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
app.get('/api/search/by/:keyword', (req, res) => {
  fetch(`${process.env.ALPHAAPIENDPOINT}/query?function=SYMBOL_SEARCH&keywords=${req.params.keyword}&apikey=${process.env.ALPHASECRETKEY}`)
   .then(response => response.json())
   .then(data => res.send(data))
   .catch(err => console.log(err))
});



// port & start server

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port:${PORT}`))