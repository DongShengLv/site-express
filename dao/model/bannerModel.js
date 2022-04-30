// 首页标语模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

// 定义数据模型
module.exports = sequelize.define('banner', {
  midImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bigImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})