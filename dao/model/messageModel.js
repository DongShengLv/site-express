// 留言板模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('message', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createDate: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  avatar:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})