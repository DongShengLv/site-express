// 文章类型路由
let express = require('express');
let router = express.Router();
const {
  addBlogTypeService,
  findAllBlogTypeService,
  findOneBlogTypeService,
  reviseBlogTypeService,
  deleteBlogTypeService
} = require('../service/blogTypeService');

// 添加文章分类
router.post('/', async function (req, res, next) {
  res.send(await addBlogTypeService(req.body));
})

// 获取文章分类
router.get('/', async function (req, res, next) {
  res.send(await findAllBlogTypeService());
})

// 获取一个文章分类
router.get('/:id', async function (req, res, next) {
  res.send(await findOneBlogTypeService(req.params.id));
})

// 修改文章分类
router.put('/:id', async function (req, res, next) {
  res.send(await reviseBlogTypeService(req.params.id,req.body));
})

// 删除文章分类
router.delete('/:id', async function (req, res, next) {
  res.send(await deleteBlogTypeService(req.params.id));
})

module.exports = router;