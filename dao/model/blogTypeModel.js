// 文章分类模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('blogType',{
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  articleCount:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  order:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})