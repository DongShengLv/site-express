// 处理 admin 模块的业务逻辑
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { loginDao,updateAdminDao } = require('../dao/adminDao');
const { ValidationError } = require('../utils/errors');
const { formatResponse } = require('../utils/tool');

// 处理登录
module.exports.loginService = async function (loginInfo){
  loginInfo.loginPwd = md5(loginInfo.loginPwd); //对密码进行加密
  // 进行数据库匹配
  let data = await loginDao(loginInfo);
  if(data && data.dataValues){
    // 登录成功 
    data = {
      id:data.dataValues.id,
      name:data.dataValues.name,
      loginId:data.dataValues.loginId
    }
    // 查看用户有无勾选登录 7天 没有设置的话默认登录有效期 1天
    let loginPeriod = null;
    if(loginInfo.remember){
      loginPeriod = parseInt(loginInfo.remember);
    }else{
      loginPeriod = 1;
    }

    // 生成 token
    const token = jwt.sign(data,md5(process.env.JWT_SECRET),{expiresIn:60*60*24*loginPeriod});
    
    // 将数据与 token返回
    return {
      data,
      token
    }
  }

  return {data}
}

// 处理更新
module.exports.updateService = async function (accountInfo){
  // 根据客户端传来的信息 在数据库进行查询对应的用户 （使用的旧密码）
  let adminInfo = await loginDao({
    loginId:accountInfo.loginId,
    loginPwd:md5(accountInfo.oldLoginPwd)
  });

  if(adminInfo && adminInfo.dataValues){
    // 用户信息输入正确 可以修改管理员信息
    let newPassword = md5(accountInfo.loginPwd);
    // 更新后的管理员信息
    let newAccountInfo = {
      name:accountInfo.name,
      loginId:accountInfo.loginId,
      loginPwd:newPassword
    };

    // 等待查询
    await updateAdminDao(newAccountInfo);

    return formatResponse(200,'success',{
      loginId:newAccountInfo.loginId,
      name:newAccountInfo.name,
      id:adminInfo.dataValues.id
    })
  }else{
    // 用户旧密码输入错误 抛出错误
   throw new ValidationError('旧密码不正确');
  }
}
