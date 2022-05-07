// 处理 setting 的业务逻辑

const { findSettingDao, reviseSettingDao } = require("../dao/settingDao");
const { formatResponse } = require("../utils/tool");

// 获取全局设置
module.exports.findSettingService = async function () {
  const result = await findSettingDao();
  return formatResponse(200, 'success', result.dataValues);
}

// 修改全局设置
module.exports.reviseSettingService = async function (newSettingInfo) {
  const result = await reviseSettingDao(newSettingInfo);
  return formatResponse(200, 'success', result.dataValues);
}