'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Stan Bankman',
        email: 'demo@demo.io',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg'
      },
      {
        fullName: 'Steve Jisch',
        email: 'demo2@demo.io',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg'
      },
      {
        fullName: 'Buster Posing',
        email: 'demo3@demo.io',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      fullName: { [Op.in]: ['Stan Bankman', 'Steve Jisch', 'Buster Posing'] }
    }, {});
  }
};