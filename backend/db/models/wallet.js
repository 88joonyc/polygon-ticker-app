'use strict';
// const db = require('./models');
// db.sequelize.init();

module.exports = (sequelize, DataTypes) => {
  var Wallet = sequelize.define('Wallet', {
    buyingPower: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accountType: DataTypes.STRING
  }, {});
  Wallet.associate = function(models) {
    Wallet.belongsTo(models.User, { foreignKey: "userId" })
  };

  Wallet.make = async function ({userId, buyingPower, accountType}) {
    const wallet = await Wallet.create({
      buyingPower,
      userId,
      accountType
    });
    return await Wallet.findByPk(wallet.id)
  };

  Wallet.updateWallet = async function({userId, accountType, amount}) {
    
    const wallet = await Wallet.findOne({
      where: {
        userId,
        accountType
      }
    });
    
    const json = await wallet.update(
        {'buyingPower': wallet.buyingPower - amount },
        { where: { "id": wallet.id } }
      );

    return await Wallet.findByPk(wallet.id)
  };

  return Wallet;
};