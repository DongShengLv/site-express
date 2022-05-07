// 处理 message 的业务逻辑

const { validate } = require("validate.js");
const { findOneBlogByIdDao } = require("../dao/blogDao");
const { addMessageDao, findMessageByPageDao, deleteMessageDao } = require("../dao/messageDao");
const { ValidationError } = require("../utils/errors");
const { readDirLength, formatResponse, handleDataPattern } = require('../utils/tool');
const dir = './public/static/avatar';

// 添加留言或评论
module.exports.addMessageService = async function (newMessageInfo) {
  // 定义数据验证规则
  let messageRule = {
    nickname:{
      presence:{
        allowEmpty:false
      },
      type:'string'
    },
    content:{
      presence:{
        allowEmpty:false
      },
      type:'string'
    },
    blogId:{
      type:'number'
    },
  }

  // 进行数据验证
  const validateResult = validate.validate(newMessageInfo,messageRule);
  if(!validateResult){
    // 因为留言板跟文章评论公用一个数据模型 针对文章评论需要携带文章ID进行判断
    newMessageInfo.blogId = newMessageInfo.blogId ? newMessageInfo.blogId : null;
    newMessageInfo.createDate = Date.now();
    // 生成用户评论头像
    // 读取存放头像的目录
    let files = await readDirLength(dir);
    // 随机生成下标
    let randomIndex = Math.floor(Math.random() * files.length);
    // 设置随机头像
    newMessageInfo.avatar = '/static/avatar/' + files[randomIndex];

    // 新增
    const result = await addMessageDao(newMessageInfo);

    // 如果是文章评论 文章的评论数也要增加
    if(newMessageInfo.blogId){
      const blogData = await findOneBlogByIdDao(newMessageInfo.blogId);
      blogData.commentNumber++;
      await blogData.save();
    }

    return formatResponse(200,'success',result.dataValues);

  } else {
    throw new ValidationError('数据验证失败');
  }
}

// 分页获取留言或评论
module.exports.findMessageByPageService = async function (pageInfo) {
  const result = await findMessageByPageDao(pageInfo);
  let rows = handleDataPattern(result.rows);
  let count = result.count;
  return formatResponse(200,'success',{
    total:count,
    data:rows
  })
}

// 删除留言或评论
module.exports.deleteMessageService = async function (id) {
  await deleteMessageDao(id);
  return formatResponse(200,'success',true);
}