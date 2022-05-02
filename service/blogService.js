// 处理 blog 的业务逻辑
const { ValidationError } = require('../utils/errors');
const { validate } = require('validate.js');
const { addBlogDao, findBlogByPageDao } = require('../dao/blogDao');
const blogTypeModel = require('../dao/model/blogTypeModel');
const { formatResponse, handleDataPattern } = require('../utils/tool');
const { addBlogType } = require('./blogTypeService');

// 扩展验证规则
validate.validators.categoryIdIsExist = async function (id) {
  const blogTypeInfo = await blogTypeModel.findByPk(id);
  if(blogTypeInfo && blogTypeInfo.dataValues){
    // 能查到对应的文章分类
    return;
  }
  return 'CategoryId Is Not Exist';
}

// 添加文章
module.exports.addBlogService = async function (newBlogInfo) {
  // 处理文章目录 TOC
  // 将 TOC格式转换成字符串
  newBlogInfo.toc = JSON.stringify('[{a:1}]');
  // 初始化新文章的其他信息
  newBlogInfo.scanNumber = 0;
  newBlogInfo.commentNumber = 0;

  // 定义验证规则
  const blogRule = {
    title:{
      presence: {
        allowEmpty: false,
      },
      type: 'string'
    },
    description:{
      presence: {
        allowEmpty: true,
      },
      type: 'string'
    },
    toc:{
      presence: {
        allowEmpty: true,
      },
      type: 'string'
    },
    htmlContent:{
      presence: {
        allowEmpty: false,
      },
      type: 'string'
    },
    commentNumber: {
      presence: {
        allowEmpty: false,
      },
      type: 'integer'
    },
    createDate: {
      presence: {
        allowEmpty: false,
      },
      type: 'integer'
    },
    categoryId: {
      presence: true,
      type: 'integer',
      categoryIdIsExist:true   //可自行扩展验证规则
    }
  }

  try {
    // 数据验证 异步验证
    await validate.async(newBlogInfo,blogRule);

    const result = await addBlogDao(newBlogInfo);
    if(result && result.dataValues){
      // 添加文章成功
      // 新增文章对应的文章分类数量也要增加
      await addBlogType(newBlogInfo.categoryId);
      return formatResponse(200,'success',result.dataValues);
    }
      
  } catch (err) {
    throw new ValidationError('数据验证失败');
  }
}

// 修改文章

// 删除文章

// 分页获取文章
module.exports.findBlogByPageService = async function (pageInfo) {
  const result = await findBlogByPageDao(pageInfo);
  let rows = handleDataPattern(result.rows);
  // 针对 TOC 将其还原成数组
  rows.forEach(item => {
    item.toc = JSON.parse(item.toc)
  })
  return  formatResponse(200,'success',{
    "total":result.count,
    "rows":rows
  })
}

// 获取单篇文章