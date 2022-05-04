// demo 数据表操作
const demoModel = require('./model/demoModel');

// 获取所有项目
module.exports.findAllDemoDao = async function () {
  return await demoModel.findAll();
}

// 添加项目
module.exports.addDemoDao = async function (newDemoInfo) {
  return await demoModel.create(newDemoInfo);
}

// 修改项目
module.exports.reviseDemoDao = async function (id, newDemoInfo) {
  await demoModel.update(newDemoInfo,{
    where:{
      id
    }
  }) 

  return await demoModel.findByPk(id);
}

// 删除项目
module.exports.deleteDemoDao = async function (id) {
  return demoModel.destroy({
    where:{
      id
    }
  })
}
