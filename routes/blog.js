// 文章路由
let express = require('express');
const {
  addBlogService,
  findBlogByPageService,
  findOneBlogByIdService,
  updateBlogService,
  deleteBlogService
} = require('../service/blogService');
let router = express.Router();

// 添加文章
router.post('/', async function (req, res, next) {
  res.send(await addBlogService(req.body));
})

// 修改文章
router.put('/:id', async function (req, res, next) {
  res.send(await updateBlogService(req.params.id,req.body));
})

// 删除文章
router.delete('/:id', async function (req, res, next) {
  res.send(await deleteBlogService(req.params.id));
})

// 分页获取文章
router.get('/', async function (req, res, next) {
  res.send(await findBlogByPageService(req.query));
})

// 获取单篇文章
router.get('/:id', async function (req, res, next) {
  // 两种情况  1:客户端用户访问文章 此时文章的浏览数会增加 2:后台获取文章 文章的浏览数不发生改变
  // 根据请求头中是否携带 token 来区分，客户端访问文章不需要携带 token 而后台获取文章则需要
  // 获取请求头 将请求头中的 authorization的值作为参数传递
  const reqHeaders = req.headers;
  res.send(await findOneBlogByIdService(req.params.id, reqHeaders.authorization));
})


module.exports = router;