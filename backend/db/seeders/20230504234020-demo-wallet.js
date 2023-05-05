'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wallets', [
    {
      userId: '1',
      buyingPower: 10000000
    },
    {
      userId: '2',
      buyingPower: 10000000
    },
    {
      userId: '3',
      buyingPower: 10000000
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wallets', null, {});
    
  }
};
