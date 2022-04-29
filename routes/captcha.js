// 验证码
let express = require('express');
let router = express.Router();
const { getCaptchaService } = require('../service/captchaService');

// 验证码
router.get('/', async function(req, res, next) {
  // 生成一个验证码
  const captcha = await getCaptchaService();
  // 将验证码数据保存到 session中
  req.session.captcha = captcha.text;
  // 设置响应头
  res.setHeader('Content-Type','image/svg+xml');

  res.send(captcha.data);
});

module.exports = router;