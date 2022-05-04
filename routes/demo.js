// 项目&demo路由
let express = require('express');
const { findAllDemoService, addDemoService, reviseDemoService, deleteDemoService } = require('../service/demoService');
let router = express.Router();

// 获取所有项目
router.get('/',async function (req, res, next) {
  res.send(await  findAllDemoService());
})

// 添加项目
router.post('/',async function (req, res, next) {
  res.send(await addDemoService(req.body));
})

// 修改项目
router.put('/:id',async function (req, res, next) {
  res.send(await reviseDemoService(req.params.id,req.body));
})

// 删除项目
router.delete('/:id',async function (req, res, next) {
  res.send(await deleteDemoService(req.params.id));
})

module.exports = router;