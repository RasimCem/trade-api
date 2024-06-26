'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfolio.hasMany(models.Transaction, {foreignKey: 'portfolioId', as: 'transactions'});
      Portfolio.hasOne(models.User, {foreignKey: 'id', as: 'user'});
      Portfolio.hasMany(models.PortfolioItem, {foreignKey: 'portfolioId', as: 'items'});

    }
  }
  Portfolio.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};