// 处理 blog 的业务逻辑
const { ValidationError } = require('../utils/errors');
const { validate } = require('validate.js');
const {
  addBlogDao,
  findBlogByPageDao,
  findOneBlogByIdDao,
  updateBlogDao,
  deleteBlogDao
} = require('../dao/blogDao');
const blogTypeModel = require('../dao/model/blogTypeModel');
const { formatResponse, handleDataPattern } = require('../utils/tool');
const { addBlogType } = require('./blogTypeService');
const { findOneBlogTypeDao } = require('../dao/blogTypeDao');

// 扩展验证规则
validate.validators.categoryIdIsExist = async function (id) {
  const blogTypeInfo = await blogTypeModel.findByPk(id);
  if (blogTypeInfo && blogTypeInfo.dataValues) {
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
    title: {
      presence: {
        allowEmpty: false,
      },
      type: 'string'
    },
    description: {
      presence: {
        allowEmpty: true,
      },
      type: 'string'
    },
    toc: {
      presence: {
        allowEmpty: true,
      },
      type: 'string'
    },
    htmlContent: {
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
      categoryIdIsExist: true //可自行扩展验证规则
    }
  }

  try {
    // 数据验证 异步验证
    await validate.async(newBlogInfo, blogRule);

    const result = await addBlogDao(newBlogInfo);
    if (result && result.dataValues) {
      // 添加文章成功
      // 新增文章对应的文章分类数量也要增加
      await addBlogType(newBlogInfo.categoryId);
      return formatResponse(200, 'success', result.dataValues);
    }

  } catch (err) {
    throw new ValidationError('数据验证失败');
  }
}

// 修改文章
module.exports.updateBlogService = async function (id,newBlogInfo) {
  // 判断正文内容是否改变 因为正文内容的改变会影响 TOC
  if(newBlogInfo.htmlContent){
    // 需要处理 TOC 目录
    newBlogInfo.toc = JSON.stringify('["a":"2"]');
  }

  const result = await updateBlogDao(id, newBlogInfo);
  // 处理 TOC
  result.dataValues.toc = JSON.parse(result.dataValues.toc);
  return formatResponse(200,'success',result.dataValues);
}

// 删除文章
module.exports.deleteBlogService = async function (id) {
  // 先根据 id 查询文章
  const result = await findOneBlogByIdDao(id);
  if(result && result.dataValues){
    // 查询成功 该文章对应的文章分类的分类数量减一
    const categoryInfo = await findOneBlogTypeDao(result.dataValues.categoryId);
    categoryInfo.articleCount--;
    await categoryInfo.save();
    // 该文章下的所有评论也一同删除

    // 删除文章
    await deleteBlogDao(id);
    return formatResponse(200,'success',true);
  }
  
}

// 分页获取文章
module.exports.findBlogByPageService = async function (pageInfo) {
  const result = await findBlogByPageDao(pageInfo);
  let rows = handleDataPattern(result.rows);
  // 针对 TOC 将其还原成数组
  rows.forEach(item => {
    item.toc = JSON.parse(item.toc)
  })
  return formatResponse(200, 'success', {
    "total": result.count,
    "rows": rows
  })
}

// 获取单篇文章
module.exports.findOneBlogByIdService = async function (id, token) {
  const result = await findOneBlogByIdDao(id);
  if (result && result.dataValues) {
    // 获取成功
    // 处理 TOC数据格式
    result.dataValues.toc = JSON.parse(result.dataValues.toc);

    // 判断是客户端还是后台的请求
    if (!token) {
      // 客户端请求 文章的浏览数量增加
      result.scanNumber++ ;
      await result.save();
    } 

    return formatResponse(200, 'success', result.dataValues);
    
  } else {
    throw new ValidationError('数据验证失败');
  }
}