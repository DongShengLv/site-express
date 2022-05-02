// 文章路由
let express = require('express');
const { addBlogService, findBlogByPageService } = require('../service/blogService');
let router = express.Router();

// 添加文章
router.post('/',async function (req, res, next) {
  res.send(await addBlogService(req.body));
})

// 修改文章
router.put('/:id',async function (req, res, next) {
  console.log('1111');
})

// 删除文章
router.delete('/:id',async function (req, res, next) {
  console.log('1111');
})

// 分页获取文章
router.get('/',async function (req, res, next) {
  res.send(await findBlogByPageService(req.query));
})

// 获取单篇文章
router.get('/:id',async function (req, res, next) {
  console.log('1111');
})


module.exports = router;