'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    ticker: DataTypes.STRING,
    purchasePrice: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
  };
  return Stock;
};