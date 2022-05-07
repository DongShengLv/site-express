// 全局设置路由
let express = require('express');
const { findSettingService, reviseSettingService } = require('../service/settingService');
let router = express.Router();

// 获取全局设置
router.get('/',async function (req, res, next) {
  res.send(await findSettingService());
})

// 修改全局设置
router.put('/',async function (req, res, next) {
  res.send(await reviseSettingService(req.body));
})

module.exports = router;