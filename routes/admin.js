// 管理员路由
let express = require('express');
let router = express.Router();

const { loginService,updateService } = require('../service/adminService');
const { formatResponse,analysisToken } = require('../utils/tool');

// 登录
router.post('/login', async function(req, res, next) {
  // 首先对验证码进行验证

  let result = await loginService(req.body);
  // 判断用户是否登录成功
  if(result.token){
    // 设置响应头
    res.setHeader("authentication",result.token);

    res.send(formatResponse(200,"success",result.data));
  }else{

  }
});

// 恢复登录
router.get('/whoami', async function (req,res,next) {
  // 获取客户端请求头中的 token
  const token = req.get("Authorization");
  // 解析 token 还原用户信息
  let result = await analysisToken(token);
  // 返回给客户端
  res.send(formatResponse(200,'success',{
    id:result.id,
    name:result.name,
    loginId:result.loginId
  }));
})

// 更新管理员信息
router.put('/',async function (req,res,next) {
  // 获取客户端出来的信息数据
  const accountInfo = req.body;
  let result = await updateService(accountInfo);
  res.send(result);
})

module.exports = router;