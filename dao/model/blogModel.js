// 文章模型
const sequelize = require('../dbConnect');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toc: {
    type: DataTypes.TEXT,  //文章目录 字符串数组
    allowNull: false
  },
  htmlContent:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  thumb:{   //缩略图                  
    type: DataTypes.STRING,
    allowNull:false
  },
  htmlContent:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  scanNumber:{    // 浏览数
    type: DataTypes.INTEGER,
    allowNull:false
  },
  commentNumber:{   //评论数
    type: DataTypes.INTEGER,
    allowNull:false
  },
  createDate:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  freezeTableName: true, //表名不是复数
  createdAt: false,
  updatedAt: false,
  paranoid: true
})