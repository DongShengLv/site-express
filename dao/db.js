// 数据库初始化操作
const sequelize = require('./dbConnect');
const adminModel = require('./model/adminModel');
const md5 = require('md5');

// 同步
sequelize.sync({ alter: true }).then(async () => {
  console.log('所有模型同步创建完成');

  // 同步之后 一些表需要一些初始化数据
  // 先查询表内是否有数据 没有则添加初始化数据
  const adminCount = await adminModel.count();
  if(!adminCount){
    // 没有数据 进行初始化
    await adminModel.create({
      loginId:'admin',
      name:'超级管理员',
      loginPwd:md5('123456')
    });

    console.log('初始化完成');
  }
})

module.exports = sequelize;