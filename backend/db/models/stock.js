'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    lastPrice: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Stock.associate = function (models) {
    Stock.belongsTo(models.User, { foreignKey: 'userId' })
  };

  Stock.all = async function ({ id }) {
    const stocks = await Stock.findAll({
      where: {
        userId: id
      }
    })

    return await stocks
  };

  Stock.purchase = async function ({ ticker, originalPrice, qty, userId }) {

    originalPrice = parseFloat(originalPrice).toFixed(2)

    const found = await Stock.findOne({
      where: {
        userId,
        ticker
      }
    })

    if (found) {
      return Stock.updateStock({ userId, ticker, amount: originalPrice, qty })
    } else {
      const stock = await Stock.create({
        ticker,
        originalPrice,
        lastPrice: originalPrice,
        qty,
        userId
      });

      return {type:  'purchase', response: await Stock.findByPk(stock.id)}
    }
  };

  Stock.updateStock = async function ({ userId, ticker, amount, qty }) {

    const stock = await Stock.findOne({
      where: {
        userId,
        ticker
      }
    })
    
    await Stock.update(
      { 'lastPrice': amount },
      { where: { "id": stock.dataValues.id } },
    )
      
    await Stock.update(
      { 'qty': stock.dataValues.qty + parseInt(qty) },
      { where: { "id": stock.dataValues.id } }
    )

    return {type: "update:", response: await Stock.findByPk(stock.dataValues.id)}

  }

  Stock.sell = async function ({ }) {
    // tbc . . .
  };

  return Stock;
};