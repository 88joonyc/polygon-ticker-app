'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stocks', [
      {
        "ticker": "AAPL",
        "originalPrice": 159.70,
        "lastPrice": 100.00,
         "qty": 200,
         "userId": 1
      },
      {
        "ticker": "GOOG",
        "originalPrice": 142.70,
        "lastPrice": 100.00,
         "qty": 250,
         "userId": 1
      },
      {
        "ticker": "AMZN",
        "originalPrice": 129.70,
        "lastPrice": 100.00,
         "qty": 100,
         "userId": 1
      },
      {
        "ticker": "TSLA",
        "originalPrice": 692.70,
        "lastPrice": 100.00,
         "qty": 20,
         "userId": 1
      },
      {
        "ticker": "DIS",
        "originalPrice": 19.70,
        "lastPrice": 100.00,
         "qty": 120,
         "userId": 1
      },
      {
        "ticker": "NFLX",
        "originalPrice": 169.71,
        "lastPrice": 100.00,
         "qty": 220,
         "userId": 1
      },
      {
        "ticker": "LULU",
        "originalPrice": 16.70,
        "lastPrice": 100.00,
         "qty": 201,
         "userId": 1
      },
      {
        "ticker": "MSFT",
        "originalPrice": 69.70,
        "lastPrice": 100.00,
         "qty": 234,
         "userId": 1
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
