'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stocks', [
      {
        "ticker": "AAPL",
        "purchasePrice": 159.70,
         "qty": 200,
         "userId": 1
      },
      {
        "ticker": "GOOG",
        "purchasePrice": 142.70,
         "qty": 250,
         "userId": 1
      },
      {
        "ticker": "AMZN",
        "purchasePrice": 129.70,
         "qty": 100,
         "userId": 1
      },
      {
        "ticker": "TSLA",
        "purchasePrice": 692.70,
         "qty": 20,
         "userId": 1
      },
      {
        "ticker": "DIS",
        "purchasePrice": 19.70,
         "qty": 120,
         "userId": 1
      },
      {
        "ticker": "NFLX",
        "purchasePrice": 169.71,
         "qty": 220,
         "userId": 1
      },
      {
        "ticker": "LULU",
        "purchasePrice": 16.70,
         "qty": 201,
         "userId": 1
      },
      {
        "ticker": "MSFT",
        "purchasePrice": 69.70,
         "qty": 234,
         "userId": 1
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
