// 数据库初始化操作
const sequelize = require('./dbConnect');
const adminModel = require('./model/adminModel');
const bannerModel = require('./model/bannerModel');
const blogTypeModel = require('./model/blogTypeModel');
const blogModel = require('./model/blogModel');
const demoModel = require('./model/demoModel');
const messageModel = require('./model/messageModel');
const settingModel = require('./model/settingModel');
const md5 = require('md5');


(async () => {
  // 关联表数据
  // 文章与文章分类的关联
  blogTypeModel.hasMany(blogModel,{ foreignKey:'categoryId', targetKey:'id' });
  blogModel.belongsTo(blogTypeModel,{ foreignKey:'categoryId', targetKey:'id', as:'category' });

  // 文章和文章评论的关联
  blogModel.hasMany(messageModel,{ foreignKey:'blogId', targetKey:'id' });
  messageModel.belongsTo(blogModel,{ foreignKey:'blogId', targetKey:'id', as:'blog' });

  // 将数据模型与表进行同步
  await sequelize.sync({ alter: true });

  console.log('所有模型同步创建完成');
  // 同步之后 一些表需要一些初始化数据
  // 先查询表内是否有数据 没有则添加初始化数据
  // 管理员初始化数据
  const adminCount = await adminModel.count();
  // 没有数据 进行初始化
  if(!adminCount){
    // 没有数据 进行初始化
    await adminModel.create({
      loginId:'admin',
      name:'超级管理员',
      loginPwd:md5('123456')
    });

    console.log('admin初始化完成');
  }

  // 首页标语初始化数据
  const bannerCount = await bannerModel.count();
  if(!bannerCount){
    await bannerModel.bulkCreate([
      {
        'midImg':'/public/images/bg_min01.jpg',
        'bigImg':'/public/images/bg_big02.jpg',
        'title':'布朗山环绕湖',
        'description':'布朗山环绕湖的风景摄影'
      },
      {
        'midImg':'/public/images/bg_min03.jpg',
        'bigImg':'/public/images/bg_big04.jpg',
        'title':'湖边桥上的人',
        'description':'湖边桥上的坐着的人在想着什么呢'
      },
      {
        'midImg':'/public/images/bg_min05.jpg',
        'bigImg':'/public/images/bg_big06.jpg',
        'title':'湖泊与山脉',
        'description':'湖泊与山脉交相呼应'
      }
    ]);

    console.log('banner初始化完成');
  }

  // 全局设置初始化
  const settingCount = await settingModel.count();
  if(!settingCount){
    await settingModel.create({
      avatar:'/static/avatar/01.png',
      siteTitle:'我的个人空间',
      github:'',
      qq:'1779984948',
      qqQrCode:'',
      weixin:'time_1895',
      weixinQrCode:'',
      mail:'1779984948@qq.com',
      icp:'',
      githubName:'DS',
      favicon:''
    })

    console.log('setting初始化完成');
  }
})();



module.exports = sequelize;