// message 数据表操作

const blogModel = require("./model/blogModel");
const messageModel = require("./model/messageModel")
const { Op } = require('sequelize');

// 添加留言或评论
module.exports.addMessageDao = async function (newMessageInfo) {
  return await messageModel.create(newMessageInfo);
} 

// 分页获取留言或评论
module.exports.findMessageByPageDao = async function (pageInfo) {
  // 根据 blogId 判断是获取文章评论还是留言
  if(pageInfo.blogId){
    // 获取评论 分为两种情况 一种是获取全部评论 一种是获取对应文章下的评论
    // 根据客户端传来的请求参数中的  blogId字段 如果 blogId的值为 'all' 则是获取全部
    if(pageInfo.blogId === 'all'){
      // 获取全部
      return await messageModel.findAndCountAll({
        offset:(pageInfo.page * 1 - 1) * pageInfo.limit,
        limit:+pageInfo.limit,
        where:{
          blogId:{
            [Op.ne] : null
          }
        },
        include:[
          {
            model:blogModel,
            as:'blog'
          }
        ]
      })
    } else {
      // 返回对应文章的评论
      return await messageModel.findAndCountAll({
        offset:(pageInfo.page * 1 - 1) * pageInfo.limit,
        limit:+pageInfo.limit,
        where:{
          blogId:+pageInfo.blogId
        },
        order:[['createDate','DESC']]  //根据创建日期降序排列
      })
    }

  } else {
    // 获取留言
    return await messageModel.findAndCountAll({
      offset:(pageInfo.page * 1 - 1) * pageInfo.limit,
      limit:+pageInfo.limit,
      where:{
        blogId:null
      },
      order:[['createDate','DESC']]   //根据创建日期降序排列
    })
  }
}

// 删除留言或评论
module.exports.deleteMessageDao = async function (id) {
  return await messageModel.destroy({
    where:{
      id
    }
  })
}

// 根据文章 id 删除评论
module.exports.deleteCommentByBlogIdDao = async function (blogId) {
  return await messageModel.destroy({
    where:{
     blogId
    }
  })
}