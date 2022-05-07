// blog 数据表操作
const blogModel = require('./model/blogModel');
const blogTypeModel = require('./model/blogTypeModel');

// 分页获取文章
module.exports.findBlogByPageDao = async function (pageInfo) {
  // 查看客户端地址栏传来的 query信息中是否有指定 categoryId (文章分类) 信息
  if (pageInfo.categoryId && pageInfo.categoryId !== '-1') {
    // 根据文章分类信息查询
    return await blogModel.findAndCountAll({
      include: [ // 关联
        {
          model: blogTypeModel,
          as: 'category',
          where: {
            id: +pageInfo.categoryId
          }
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit, // 跳过的数据 根据 page来算
      limit: pageInfo.limit * 1
    })
  } else {
    // 根据分页查询
    return await blogModel.findAndCountAll({
      include: [ // 关联
        {
          model: blogTypeModel,
          as: 'category'
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit, // 跳过的数据 根据 page来算
      limit: pageInfo.limit * 1
    })
  }
}

// 获取单篇文章
module.exports.findOneBlogByIdDao = async function (id) {
  return await blogModel.findByPk(id, {
    include: [ // 关联
      {
        model: blogTypeModel,
        as: 'category'
      }
    ],
  })
}

// 添加文章
module.exports.addBlogDao = async function (newBlogInfo) {
  return await blogModel.create(newBlogInfo);
}

// 修改文章
module.exports.updateBlogDao = async function (id, newBlogInfo) {
  await blogModel.update(newBlogInfo,{
    where:{
      id
    }
  })

  // 将更改后的文章返回
  return await blogModel.findByPk(id);
}

// 删除文章
module.exports.deleteBlogDao = async function (id) {
  return await blogModel.destroy({
    where:{
      id
    }
  });
}

// 根据文章分类 id 获取其文章数量
module.exports.blogCountByBlogType = async function (categoryId) {
  return await blogModel.count({
    where:{
      categoryId
    }
  })
}

// 根据文章分类 id 删除文章
module.exports.deleteBlogByCategoryId = async function (categoryId) {
  return await blogModel.destroy({
    where:{
      categoryId
    }
  })
}
