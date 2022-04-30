// banner 数据表操作
const bannerModel = require('./model/bannerModel');

// 获取首页标语
module.exports.findBannerDao = async function () {
  return await bannerModel.findAll();
}

// 设置标语
module.exports.updateBannerDao = async function (bannerArr) {
  // 由于接口设置 设置标语时客户端会携带三条数据信息 
  // 首先将表的记录全部删除 
  await bannerModel.destroy({
    truncate:true
  })

  // 再批量写入数据
  await bannerModel.bulkCreate(bannerArr);
  
  // 将新的数据返回
  return await bannerModel.findAll();
}