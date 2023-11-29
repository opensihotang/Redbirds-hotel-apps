'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lodging.belongsTo(models.User, {foreignKey : "authorId"})
      Lodging.belongsTo(models.Type, {foreignKey : "typeId"})
      Lodging.hasMany(models.Bookmark, {foreignKey : "LodgingId"})
      // define association here
    }
  }
  Lodging.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Name is Required"
        },
        notEmpty : {
          msg : "Name is Required"
        }
      }
    },
    facility: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Facility is Required"
        },
        notEmpty : {
          msg : "Facility is Required"
        }
      }
    },
    roomCapacity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Room Capacity is Required"
        },
        notEmpty : {
          msg : "Room Capacity is Required"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Img URL is Required"
        },
        notEmpty : {
          msg : "Img URL is Required"
        },
        isUrl : {
          msg : "Please Insert Correct URL"
        }
      }
    },
    
    authorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "AuthorId is Required"
        },
        notEmpty : {
          msg : "AuthorId is Required"
        }
      }
    },
    location: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Location is Required"
        },
        notEmpty : {
          msg : "Location is Required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Price is Required"
        },
        notEmpty : {
          msg : "Price is Required"
        },
        min : {
          args : 250000,
          msg : "Minimal Price 250000"
        }
        
      }
    },
    typeId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "TypeId is Required"
        },
        notEmpty : {
          msg : "TypeId is Required"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      defaultValue : 'Active'
    }
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};