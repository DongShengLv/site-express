// 处理 captcha 的业务逻辑
const svgCaptcha = require('svg-captcha');

  // 生成 svg验证码
module.exports.getCaptchaService = async function () {

  return svgCaptcha.create({
    size:4,
    ignoreChars:"iIl10oO",
    noise:6,
    color:true
  })

}