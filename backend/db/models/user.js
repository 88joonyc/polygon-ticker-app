'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    photo: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    User.hasMany(models.Wallet, { foreignKey: "userId" })
  };

  User.prototype.toSafeObject = function() { 
    const { id, fullName, photo } = this; 
    return { id, fullName, photo };
  };
  
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  
  User.signup = async function ({ fullName, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      fullName,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};  

