// 管理员模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

// 定义数据模型
module.exports = sequelize.define('admin', {
  loginId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})