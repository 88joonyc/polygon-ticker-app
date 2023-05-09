'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastPrice: {
      type: DataTypes.INTEGER,
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
    const stock = await Stock.create({
      ticker,
      originalPrice,
      qty,
      userId
    });
    return await stock.findByPk(wallet.id)
  };

  Stock.update = async function ({ userId, ticker, amount}) {
    const stock = await Stock.findOne({
      where: {
        userId,
        ticker
      }

    })

    const data = await Stock.update(
      {'lastPrice': stock.lastPrice - amount },
      { where: { id: wallet.id } }
    )
    
    return await Stock.findByPk(wallet.id)

  }

  Stock.sell = async function ({ }) {
    // tbc . . .
  };

  return Stock;
};