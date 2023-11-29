'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type.hasMany(models.Lodging, {foreignKey : "typeId"})
      // define association here
    }
  }
  Type.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : { msg : "Name already in use"},
      validate : {
        notNull : {
          msg : "Name is Required"
        },
        notEmpty : {
          msg : "Name is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};