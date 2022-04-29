// admin 数据表操作
const adminModel = require('./model/adminModel');

// 登录
module.exports.loginDao = async function (loginInfo) {
  // 数据库查询
  const result = await adminModel.findOne({
    where:{
      loginId:loginInfo.loginId,
      loginPwd:loginInfo.loginPwd
    }
  })

  return result;
}

// 更新管理员信息
module.exports.updateAdminDao = async function (newAccountInfo) {
  // 更新表数据
  const result = await adminModel.update(newAccountInfo,{
    where:{
      loginId:newAccountInfo.loginId,
    }
  })
  
  return result;
}