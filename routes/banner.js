// 首页标语路由
let express = require('express');
let router = express.Router();
const { findBannerService,updateBannerService } = require('../service/bannerService');
const { formatResponse } = require('../utils/tool');

// 获取首页标语
router.get('/',async function (req, res, next) {
  const result = await findBannerService()
  if(result){
    res.send(formatResponse(200,'success',result));
  }
});

// 设置标语
router.post('/',async function (req, res, next) {
  const result = await updateBannerService(req.body);
  if(result){
    res.send(formatResponse(200,'success',result));
  }
})

module.exports = router;