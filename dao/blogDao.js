// blog 数据表操作
const blogModel = require('./model/blogModel');
const blogTypeModel = require('./model/blogTypeModel');

// 添加文章
module.exports.addBlogDao = async function (newBlogInfo) {
  return await blogModel.create(newBlogInfo);
}

// 修改文章

// 删除文章

// 分页获取文章
module.exports.findBlogByPageDao = async function (pageInfo) {
  // 查看客户端地址栏传来的 query信息中是否有指定 categoryId (文章分类) 信息
  if(pageInfo.categoryId && pageInfo.categoryId !== '-1'){
    // 根据文章分类信息查询
    return await blogModel.findAndCountAll({
      include:[   // 关联
        {
          model:blogTypeModel,
          as:'category',
          where:{
            id:+pageInfo.categoryId
          }
        }
      ],
      offset :(pageInfo.page * 1 -1) * pageInfo.limit,   // 跳过的数据 根据 page来算
      limit:pageInfo.limit * 1
    })
  } else {
    // 根据分页查询
    return await blogModel.findAndCountAll({
      include:[   // 关联
        {
          model:blogTypeModel,
          as:'category'
        }
      ],
      offset :(pageInfo.page * 1 -1) * pageInfo.limit,   // 跳过的数据 根据 page来算
      limit:pageInfo.limit * 1
    })
  }
}

// 获取单篇文章