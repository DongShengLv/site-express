// blogType 数据表操作
const blogTypeModel = require('./model/blogTypeModel');

// 新增文章分类
module.exports.addBlogTypeDao = async function (newBlogTypeInfo) {
  return await blogTypeModel.create(newBlogTypeInfo);
}

// 获取文章分类
module.exports.findAllBlogTypeDao = async function () {
  return await blogTypeModel.findAll();
}

// 获取一个文章分类
module.exports.findOneBlogTypeDao = async function (id) {
  return await blogTypeModel.findByPk(id);
}

// 修改文章分类
module.exports.reviseBlogTypeDao = async function (id,blogTypeInfo) {
  // 修改
  const result = await blogTypeModel.update(blogTypeInfo,{
    where:{
      id
    }
  })
  
  if(result[0] !== 0){
    // 修改成功
    // 改完后查询一下
    return await blogTypeModel.findByPk(id);
  } else {
    // 修改失败 
    return false;
  }

  
}

// 删除文章分类
module.exports.deleteBlogTypeDao = async function (id) {
  return await blogTypeModel.destroy({
    where:{
      id
    }
  })
} 
