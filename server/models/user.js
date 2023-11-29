'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bycript');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Lodging, {foreignKey : "authorId", onDelete: 'CASCADE'})
      User.hasMany(models.Bookmark, { foreignKey : "AuthorId", onDelete: 'CASCADE'})
      // define association here
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Username is Required"
        },
        notEmpty : {
          msg : "Username is Required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: {
        msg: "Email address already in use!"
      },
      validate : {
        notNull : {
          msg : "Email is Required"
        },
        notEmpty : {
          msg : "Email is Required"
        },
        isEmail : {
          isEmail : true,
          msg : "Insert Correct Email"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password is Required"
        },
        notEmpty : {
          msg : "Password is Required"
        },
        checkPassword(value){
          if(value.length < 5){
            throw new Error("Password minimal 5 characters")
          }
        }
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    // hooks : {
    //   beforeCreate(user, options){
    //     user.password = hashPassword(user.password)
    //   }
    // },
    sequelize,
    modelName: 'User',
  });
  //hooks untuk hash password
   User.beforeCreate((user)=> {
    user.password = hashPassword(user.password)
   })

  return User;
};