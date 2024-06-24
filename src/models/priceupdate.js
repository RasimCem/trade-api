'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceUpdate.init({
    userId: DataTypes.INTEGER,
    symbol: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PriceUpdate',
  });
  return PriceUpdate;
};