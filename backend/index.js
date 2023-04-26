
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
});

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

  fetch(`${process.env.APIENDPOINT}/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${start}/${end}?adjusted=${adjusted}&sort=${sort}}&limit=${limit}`, headerOptions)
    .then(response => response.json())
    .then(json => res.send(json))
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port:${PORT}`))