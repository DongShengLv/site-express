// setting 数据表操作
const settingModel = require('./model/settingModel');

// 获取全局设置
module.exports.findSettingDao = async function () {
  return await settingModel.findOne();
}

// 修改全局设置
module.exports.reviseSettingDao = async function (newSettingInfo) {
  await settingModel.update(newSettingInfo, {
    where:{
      id:1
    }
  })

  return await settingModel.findOne();
}