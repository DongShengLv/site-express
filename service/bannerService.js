// 处理 banner的业务逻辑
const { findBannerDao,updateBannerDao } = require('../dao/bannerDao');
const { handleDataPattern } = require('../utils/tool');

// 查询首页标语
module.exports.findBannerService = async function (){
  return handleDataPattern(await findBannerDao());
}

// 设置标语 
module.exports.updateBannerService = async function (bannerArr) {
  return handleDataPattern(await updateBannerDao(bannerArr));
}