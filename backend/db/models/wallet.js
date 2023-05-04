'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    buyingPower: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users'
        }
      }
    },
    externalAccount: DataTypes.STRING
  }, {});
  Wallet.associate = function(models) {
    Wallet.belongsTo(models,User, {foreignKey: "userId"})
  };

  Wallet.make = async function ({userId, buyingPower}) {
    const wallet = await Wallet.create({
      buyingPower,
      userId
    });
    return await Wallet.findByPk(wallet.id)
  };

  return Wallet;
};