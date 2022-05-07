// 全局设置数据模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('setting', {
  avatar:{
    type: DataTypes.STRING,
    allowNull:false
  }, 
  siteTitle:{
    type: DataTypes.STRING,
    allowNull:false
  },
  github:{
    type: DataTypes.STRING,
    allowNull:false
  },
  qq:{
    type: DataTypes.STRING,
    allowNull:false
  },
  qqQrCode:{
    type: DataTypes.STRING,
    allowNull:false
  },
  weixin:{
    type: DataTypes.STRING,
    allowNull:false
  },
  weixinQrCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  githubName:{
    type: DataTypes.STRING,
    allowNull:false
  },
  favicon:{                  
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})