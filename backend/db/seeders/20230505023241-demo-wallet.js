'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Wallets', [
      {
        userId: 1,
        buyingPower: 10000000,
        accountType: 'dollars'
      },
      {
        userId: 1,
        buyingPower: 10000000,
        accountType: 'bitcoin'
      },
      {
        userId: 2,
        buyingPower: 10000000,
        accountType: 'dollars'
      },
      {
        userId: 3,
        buyingPower: 10000000,
        accountType: 'dollars'
      },
  ], {});
  
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Wallets', null, {});

  }
};
