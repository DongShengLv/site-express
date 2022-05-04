// 项目&demo模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('demo', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  github: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: false
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