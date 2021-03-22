'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for deing associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);

      Product.belongsToMany(models.Transaction, {
        through: {
          model: "ProductTransaction",

        }
      });
    }
  };
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};