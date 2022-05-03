// 处理 blogType 模块的业务逻辑
const { validate } = require('validate.js');
const { addBlogTypeDao, findAllBlogTypeDao,findOneBlogTypeDao,reviseBlogTypeDao,deleteBlogTypeDao } = require('../dao/blogTypeDao');
const blogTypeModel = require('../dao/model/blogTypeModel');
const { ValidationError, NotFoundError } = require('../utils/errors');
const { formatResponse, handleDataPattern } = require('../utils/tool');

// 添加文章分类
module.exports.addBlogTypeService = async function (newBlogTypeInfo) {
  // 数据验证规则
  const blogTypeRule = {
    name:{
      presence:{
        allowEmpty:false,
      },
      type:'string'
    },
    order:{
      presence:{
        allowEmpty:false,
      },
      type:'number'
    }
  }

  // 数据验证
  const validateResult = validate.validate(newBlogTypeInfo,blogTypeRule);
  if(!validateResult){
    // 验证通过
    newBlogTypeInfo.articleCount = 0; //新增文章分类 文章数量初始为 0

    const result = await addBlogTypeDao(newBlogTypeInfo);
    if(result && result.dataValues){
      // 添加成功
      return formatResponse(200,'success',result.dataValues)
    }
  } else {
    // 数据验证失败
    throw new ValidationError('数据验证失败');
  }
}

// 获取文章分类
module.exports.findAllBlogTypeService = async function () {
  const result = await findAllBlogTypeDao();
  if(result){
    // 有文章分类
    let blogTypeArr = handleDataPattern(result);      // 处理数组类型的响应数据
    blogTypeArr.sort((a,b) => a.order - b.order);     // 响应数据按照 order 大小顺序排序
    return formatResponse(200,'success',blogTypeArr);
  } else {
    // 没有文章分类 
    return formatResponse(200,'success',[]);
  }

}

// 获取一个文章分类
module.exports.findOneBlogTypeService = async function (id) {
  const result = await findOneBlogTypeDao(id);
  if(result && result.dataValues){
    // 查询成功
    return formatResponse(200,'success',result.dataValues);
  } else {
    // 查询失败
    throw new NotFoundError();
  }
}

// 修改文章分类
module.exports.reviseBlogTypeService = async function (id,blogTypeInfo) {
  const result = await reviseBlogTypeDao(id,blogTypeInfo);
  if(result && result.dataValues){
    // 修改成功
    return formatResponse(200,'success',result.dataValues);
  } else {
    // 修改失败 没找到对应的文章分类 id 有误
    throw new NotFoundError();
  }
}

// 删除文章分类
module.exports.deleteBlogTypeService = async function (id) {
  const result = await deleteBlogTypeDao(id);
  if(result){
    // 删除成功 返回受影响的文章数量
    return formatResponse(200,'success',true);
  }
}

// 根据 id 新增对应文章分类的数量
module.exports.addBlogType = async function (id) {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save(); 
  return;
}