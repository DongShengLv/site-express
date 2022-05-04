// 处理 demo 的业务逻辑

const { validate } = require("validate.js");
const { findAllDemoDao, addDemoDao, reviseDemoDao, deleteDemoDao } = require("../dao/demoDao");
const { ValidationError } = require("../utils/errors");
const { formatResponse, handleDataPattern } = require("../utils/tool");

// 获取所有项目
module.exports.findAllDemoService = async function () {
  const result = await findAllDemoDao();
  const data = handleDataPattern(result);
  // 将 description 还原成数组
  data.forEach(item => {
    item.description = JSON.parse(item.description);
  })
  return formatResponse(200,'success',data);
}

// 添加项目
module.exports.addDemoService = async function (newDemoInfo) {
  // 将 description 项目描述转换为字符串  （定义数据模型时 类型规定为 STRING）
  newDemoInfo.description = JSON.stringify(newDemoInfo.description);

  // 定义验证规则
  const demoRule = {
    name:{
      presence:{
        allEmpty:false
      },
      type:'string'
    },
    description:{
      presence:{
        allEmpty:false
      },
      type:'string'
    },
    url:{
      presence:{
        allEmpty:false
      },
      type:'string'
    },
    github:{
      presence:{
        allEmpty:false
      },
      type:'string'
    },
    thumb:{
      type:'string'
    },
    order:{
      presence:{
        allEmpty:false
      },
      type:'integer'
    },
  }

  const validateResult = validate.validate(newDemoInfo,demoRule);

  if(!validateResult){
    // 验证通过
    const result = await addDemoDao(newDemoInfo);
    // 将 description 的数据格式转换成数组 
    result.dataValues.description = JSON.parse(result.dataValues.description);
    return formatResponse(200,'success',[result.dataValues]);
  } else {
    throw new ValidationError('数据验证失败')
  }
}

// 修改项目
module.exports.reviseDemoService = async function (id, newDemoInfo) {
  if(newDemoInfo.description) newDemoInfo.description = JSON.stringify(newDemoInfo.description);
  const result = await reviseDemoDao(id, newDemoInfo);
  result.dataValues.description = JSON.parse(result.dataValues.description);
  return formatResponse(200,'success',[result.dataValues]);
}

// 删除项目
module.exports.deleteDemoService = async function (id) {
  await deleteDemoDao(id);
  return formatResponse(200,'success',true);
}