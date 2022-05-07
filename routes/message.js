// 文章评论路由
let express = require('express');
const { addMessageService, findMessageByPageService, deleteMessageService } = require('../service/messageService');
let router = express.Router();

// 添加留言或评论
router.post('/',async function (req, res, next) {
  res.send(await addMessageService(req.body));
})

// 获取留言或评论
router.get('/',async function (req, res, next) {
  res.send(await findMessageByPageService(req.query));
})

// 删除留言或评论
router.delete('/:id',async function (req, res, next) {
  res.send(await deleteMessageService(req.params.id));
})

module.exports = router;